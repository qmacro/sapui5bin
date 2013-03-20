sap.ui.controller("nested.controller.shell", {

    onInit : function() {
	var oShell = sap.ui.getCore().byId("myShell");
	oShell.setContent(this.getCustomersView());
    },

    onWorksetItemSelected : function(oEvent) {
	// ?? need to get reference to controller
	var that = this.oParent.getController();
	var itemKey = oEvent.getParameter("key");
	var oShell = sap.ui.getCore().byId("myShell");

	switch (itemKey) {
	case "wi_customers":
	    oShell.setContent(that.getCustomersView());
	    break;
	case "wi_products":
	    oShell.setContent(that.getProductsView());
	    break;
	}

    },

    getCustomersView : function() {
	var oView = sap.ui.getCore().byId("vwCustomers");
	if (!oView) {
	    oView = sap.ui.view({
		type : sap.ui.core.mvc.ViewType.JS,
		id : "vwCustomers",
		viewName : "nested.views.customers"
	    });
	}
	return oView;
    },

    getProductsView : function() {
	var oView = sap.ui.getCore().byId("vwProducts");
	if (!oView) {
	    oView = sap.ui.view({
		type : sap.ui.core.mvc.ViewType.JS,
		id : "vwProducts",
		viewName : "nested.views.products"
	    });
	}
	return oView;
    }
});