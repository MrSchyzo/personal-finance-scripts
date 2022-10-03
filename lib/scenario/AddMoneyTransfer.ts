/// <reference path="../ui/ViewModels.ts"/>
/// <reference path="../ui/Fragments.ts"/>
/// <reference path="Commons.ts"/>
/// <reference path="../SheetsUtils.ts"/>
/// <reference path="../modal/InputModal.ts"/>

namespace AddMoneyTransfer {
  export class Model implements Commons.Inputtable {
    date: Date;
    input: string;
    output: string;
    amount: number;
  
    constructor(date: Date, input: string, output: string, amount: number) {
      this.date = date;
      this.input = input;
      this.output = output;
      this.amount = amount;
    }
  
    inputMetadata(config: Commons.SheetConfiguration): Map<string, ViewModels.DataField> {
      const metadata = new Map<string, ViewModels.DataField>();
      const choices = config.accounts.map(
        (account) => new ViewModels.ChoiceItem(account, account)
      );
  
      metadata.set("date", new ViewModels.InputField("date", "Data trasferimento", "date"));
      metadata.set(
        "output",
        new ViewModels.ChoiceField("output", "Conto invio", choices)
      );
      metadata.set(
        "input",
        new ViewModels.ChoiceField("input", "Conto ricezione", choices)
      );
      metadata.set("amount", new ViewModels.InputField("amount", "Importo", "number"));
  
      return metadata;
    }
  }
  
  export function register(model: Model) {
    let {date, input, output, amount} = model;
    const contabile = SheetsUtils.getSheet("Contabile");
    const dateString = date.toString().split("-").reverse().join("/");
    const amountString = amount.toString().replace(",", "").replace(".", ",")
  
    const startRow = SheetsUtils.nextFreeRow("A", contabile);
  
    contabile
      .getRange(`A${startRow}:A${startRow+1}`)
      .setValue(dateString);
    contabile
      .getRange(`B${startRow}:B${startRow+1}`)
      .setValue(`${output} -> ${input}`);
  
    contabile
      .getRange(`E${startRow}`)
      .setValue(output);
    contabile
      .getRange(`G${startRow}`)
      .setValue(`-${amountString}`);

    contabile
      .getRange(`E${startRow+1}`)
      .setValue(input);
    contabile
      .getRange(`G${startRow+1}`)
      .setValue(amountString);
  }
  
  export function entrypoint() {
    const configuration = SheetsUtils.loadSheetConfiguration()
    const model = new Model(new Date(), "", "", 0).inputMetadata(configuration)
  
    InputModal.show(model, 'addMoneyTransfer', "Trasferimento tra conti");
  };
}
