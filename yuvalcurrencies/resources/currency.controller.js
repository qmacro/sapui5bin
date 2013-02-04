sap.ui.controller("resources.currency", {

  displayCurrency:function(oModel){
    var oTable = sap.ui.getCore().byId("ID_CurrencyTable");
    oTable.setModel(oModel);
    oTable.bindRows("/CurrencyCollection");
  },
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
  onInit: function() {

    var oModel = new sap.ui.model.odata.ODataModel('/proxy/ER4/sap/opu/sdata/IWFND/CURRENCY/');
    this.displayCurrency(oModel);

  }

});
