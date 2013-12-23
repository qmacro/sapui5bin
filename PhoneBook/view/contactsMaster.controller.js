sap.ui.controller("view.contactsMaster", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.tasksMaster
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.tasksMaster
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.tasksMaster
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.tasksMaster
*/
//	onExit: function() {
//
//	},
	
	onListSelect: function(oEvent){
		var oBindingContext = oEvent.getParameter("listItem").getBindingContext();
		var viewId = oBindingContext.sPath;
		viewId = viewId.replace(/\//g,"_");
		
		
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewName: "view.contactsDetail",
			viewId: "Detail" + viewId,
			data: {
				bindingContext: oBindingContext
			}
		});
	},	
	
	onListItemTap: function(oEvent){
		var oBindingContext = oEvent.getSource().getBindingContext();
	
		sap.ui.getCore().getEventBus().publish("nav", "to", {
			viewName: "view.contactsDetail",
			viewId: "Detail" + oEvent.getParameter("id"),
			data: {
				bindingContext: oBindingContext
			}
		});
	},	

	onBack : function(oEvent) {
		sap.m.URLHelper.redirect(model.Config.getHome());
	},
	
});