/// <reference path="../ui/ViewModels.ts"/>
/// <reference path="../ui/Fragments.ts"/>
/// <reference path="Commons.ts"/>
/// <reference path="../SheetsUtils.ts"/>
/// <reference path="../FormatUtils.ts"/>
/// <reference path="../modal/InputModal.ts"/>

namespace EconomicVariation {
  export class Model implements Commons.Inputtable {
    date: Date;
    economic: string;
    financial: string;
    label: string
    amount: number;
  
    constructor(date: Date, economic: string, financial: string, label: string, amount: number) {
      this.date = date;
      this.economic = economic;
      this.financial = financial;
      this.label = label;
      this.amount = amount;
    }
  
    inputMetadata(config: Commons.SheetConfiguration): Map<string, ViewModels.DataField> {
      const metadata = new Map<string, ViewModels.DataField>();
      const accounts = config.accounts.map(
        (account) => new ViewModels.ChoiceItem(account, account)
      );
      const expenses = config.expenses.map(
        (account) => new ViewModels.ChoiceItem(account, account)
      );
  
      metadata.set("date", new ViewModels.InputField("date", "Data movimento", "date"));
      metadata.set("label", new ViewModels.InputField("label", "Descrizione movimento", "text"));
      metadata.set(
        "economic",
        new ViewModels.ChoiceField("economic", "Tipo spesa/ricavo", expenses)
      );
      metadata.set(
        "financial",
        new ViewModels.ChoiceField("financial", "Conto coinvolto", accounts)
      );
      metadata.set("amount", new ViewModels.InputField("amount", "Importo", "number"));
  
      return metadata;
    }
  }
  
  export function register(model: Model) {
    let {date, economic, financial, label, amount} = model;

    const contabile = SheetsUtils.getSheet("Contabile");
    const dateString = FormatUtils.dateToString(date);
    const amountString = FormatUtils.numberToString(amount);
    const startRow = SheetsUtils.nextFreeRow("A", contabile);
  
    contabile
      .getRange(`A${startRow}`)
      .setValue(dateString);
  
    contabile
      .getRange(`B${startRow}`)
      .setValue(label);
  
    contabile
      .getRange(`C${startRow}`)
      .setValue(economic);

    contabile
      .getRange(`E${startRow}`)
      .setValue(financial);
  
    contabile
      .getRange(`G${startRow}`)
      .setValue(`=${amountString}`);
  }
  
  export function entrypoint() {
    const configuration = SheetsUtils.loadSheetConfiguration()
    const model = new Model(new Date(), "", "", "", 0).inputMetadata(configuration)
  
    InputModal.show(model, 'economicVariation', "Variazione semplice");
  };
}
