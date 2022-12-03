/// <reference path="../ui/ViewModels.ts"/>
/// <reference path="../ui/Fragments.ts"/>
/// <reference path="Commons.ts"/>
/// <reference path="../SheetsUtils.ts"/>
/// <reference path="../FormatUtils.ts"/>
/// <reference path="../modal/InputModal.ts"/>

namespace SplitEconomicVariation {
  export class Model implements Commons.Inputtable {
    date: Date;
    economic: string;
    financial: string;
    creditDebitAccount: string;
    label: string;
    amount: number;
    splitRatio: number;

    constructor(
      date: Date,
      economic: string,
      financial: string,
      creditDebitAccount: string,
      label: string,
      amount: number,
      splitRatio: number
    ) {
      this.date = date;
      this.economic = economic;
      this.financial = financial;
      this.creditDebitAccount = creditDebitAccount;
      this.label = label;
      this.amount = amount;
      this.splitRatio = splitRatio;
    }

    inputMetadata(
      config: Commons.SheetConfiguration
    ): Map<string, ViewModels.DataField> {
      const metadata = new Map<string, ViewModels.DataField>();
      const accounts = config.accounts.map(
        (account) => new ViewModels.ChoiceItem(account, account)
      );
      const expenses = config.expenses.map(
        (account) => new ViewModels.ChoiceItem(account, account)
      );

      metadata.set(
        "date",
        new ViewModels.InputField("date", "Data movimento", "date")
      );
      metadata.set(
        "label",
        new ViewModels.InputField("label", "Descrizione movimento", "text")
      );
      metadata.set(
        "economic",
        new ViewModels.ChoiceField("economic", "Tipo spesa/ricavo", expenses)
      );
      metadata.set(
        "financial",
        new ViewModels.ChoiceField("financial", "Conto coinvolto", accounts)
      );
      metadata.set(
        "creditDebitAccount",
        new ViewModels.ChoiceField("creditDebitAccount", "Conto di credito/debito", accounts)
      );
      metadata.set(
        "splitRatio",
        new ViewModels.SliderField("splitRatio", "% parte mia variazione", 0, 100)
      );
      metadata.set(
        "amount",
        new ViewModels.InputField("amount", "Importo complessivo", "number")
      );

      return metadata;
    }
  }

  export function register(model: Model) {
    let {
      date,
      economic,
      financial,
      creditDebitAccount,
      label,
      amount,
      splitRatio
    } = model;

    const contabile = SheetsUtils.getSheet("Contabile");
    const dateString = FormatUtils.dateToString(date);
    const amountString = FormatUtils.numberToString(amount);
    const myRow = SheetsUtils.nextFreeRow("A", contabile);
    const otherRow = myRow + 1;
    const creditDebitRow = otherRow + 1;
    const myAmount = FormatUtils.numberToString(amount * (splitRatio / 100.0));

    contabile.getRange(`A${myRow}`).setValue(dateString);
    contabile.getRange(`B${myRow}`).setValue(`${label} - parte mia`);
    contabile.getRange(`C${myRow}`).setValue(economic);
    contabile.getRange(`E${myRow}`).setValue(financial);
    contabile.getRange(`G${myRow}`).setValue(`=${myAmount}`);

    contabile.getRange(`A${otherRow}`).setValue(dateString);
    contabile.getRange(`B${otherRow}`).setValue(`${label} - anticipo altrui`);
    contabile.getRange(`E${otherRow}`).setValue(financial);
    contabile.getRange(`G${otherRow}`).setValue(`=${amountString}-G${myRow}`);

    contabile.getRange(`A${creditDebitRow}`).setValue(dateString);
    contabile.getRange(`B${creditDebitRow}`).setValue(`${label} - anticipo altrui`);
    contabile.getRange(`E${creditDebitRow}`).setValue(creditDebitAccount);
    contabile.getRange(`G${creditDebitRow}`).setValue(`=-(G${otherRow})`);
  }

  export function entrypoint() {
    const configuration = SheetsUtils.loadSheetConfiguration();
    const model = new Model(new Date(), "", "", "", "", 0, 0).inputMetadata(
      configuration
    );

    InputModal.show(model, "splitEconomicVariation", "Variazione + anticipo altri");
  }
}
