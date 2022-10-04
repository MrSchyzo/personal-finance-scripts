/// <reference path="lib/scenario/AddMoneyTransfer.ts"/>
/// <reference path="lib/scenario/EconomicVariation.ts"/>
/// <reference path="lib/scenario/SplitEconomicVariation.ts"/>
/// <reference path="lib/scenario/CommonExpense.ts"/>
/// <reference path="lib/modal/TutorialModal.ts"/>
/// <reference path="lib/SheetsUtils.ts"/>

function addMoneyTransfer(model: AddMoneyTransfer.Model) {
  AddMoneyTransfer.register(model)
}

function economicVariation(model: EconomicVariation.Model) {
  EconomicVariation.register(model)
}

function splitEconomicVariation(model: SplitEconomicVariation.Model) {
  SplitEconomicVariation.register(model)
}

function commonExpense(model: CommonExpense.Model) {
  CommonExpense.register(model)
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Registra')
    .addItem('Trasferimento', 'AddMoneyTransfer.entrypoint')
    .addItem('Variazione', 'EconomicVariation.entrypoint')
    .addItem('Variazione + anticipo per altri', 'SplitEconomicVariation.entrypoint')
    .addItem('Variazione comune con Ramona', 'CommonExpense.entrypoint')
    .addToUi();

  SpreadsheetApp.getUi()
    .createMenu("Extra")
    .addItem("Link scripting utili", 'TutorialModal.show')
    .addToUi()
}
