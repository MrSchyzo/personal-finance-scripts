/// <reference path="scenario/Commons.ts"/>

namespace SheetsUtils {
  export function nextFreeRow(
    column: String,
    sheet: GoogleAppsScript.Spreadsheet.Sheet
  ): number {
    let rabbit = 1;
    let hop = 1;
  
    // Exponentially hopping until an empty cell is found
    while (sheet.getRange(`${column}${rabbit}`).getValue() !== "") {
      rabbit += hop;
      hop += hop;
    }
  
    // Halving the hopping until hop is zero: empty go back, non-empty go forth
    while (hop > 1) {
      hop /= 2;
      if (sheet.getRange(`${column}${rabbit}`).getValue() !== "") {
        rabbit += hop;
      } else {
        rabbit -= hop;
      }
    }
  
    // If we are in an empty cell, this is it; if not, it's the cell after
    return sheet.getRange(`${column}${rabbit}`).getValue() !== ""
      ? rabbit + 1
      : rabbit;
  }
  
  export function getValuesFromColumn(column: String, sheet: GoogleAppsScript.Spreadsheet.Sheet): string[] {
    const firstFreeRow = nextFreeRow(column, sheet)
    return sheet.getRange(`${column}1:${column}${firstFreeRow - 1}`).getValues().flatMap(x => x)
  }
  
  export function getSheet(name: string): GoogleAppsScript.Spreadsheet.Sheet {
    return SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(name) ?? (() => {throw new Error(`'${name}' must exist as a sheet`)})();
  }

  export function loadSheetConfiguration(): Commons.SheetConfiguration {
    const configSheet = SheetsUtils.getSheet("Configurazione")
    const accounts = SheetsUtils.getValuesFromColumn("A", configSheet).slice(1)
    const expenses = SheetsUtils.getValuesFromColumn("F", configSheet).slice(1)
    return new Commons.SheetConfiguration(accounts, expenses)
  }
}
