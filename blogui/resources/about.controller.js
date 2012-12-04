sap.ui.controller("resources.about", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
  onInit: function() {

    /*
    var sServiceUrl = this.getServiceUrl();

    var oModel = new sap.ui.model.json.JSONModel();
    console.log("onInit(): this is " + this);
    oModel.loadData('/qmacro/scratchpad/sapteched.json');
    this.getView().setModel(oModel);

    var oTable = this.byId("idTable1");
    oTable.bindRows("/results");

    oTable.attachRowSelectionChange(function(oEvent) {
      var index = oEvent.getParameter("rowIndex");
      var oContext = oTable.isIndexSelected(index) ? index : undefined;
      console.log("row selected: " + oContext);
    });
    */


  },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }

});
