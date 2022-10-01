/// <reference path="../ui/ViewModels.ts"/>

namespace Commons {
  export class SheetConfiguration {
    accounts: string[];
    expenses: string[];
  
    constructor(accounts: string[], expenses: string[]) {
      this.accounts = accounts;
      this.expenses = expenses;
    }
  }
  
  export interface Inputtable {
    inputMetadata(sheetConfiguration: SheetConfiguration): Map<string, ViewModels.DataField>;
  }  
}
