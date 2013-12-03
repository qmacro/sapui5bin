sap.ui.jsview("nested.views.shell", {

	getControllerName : function() {
		return "nested.controller.shell";
	},

	createContent : function(oController) {
		var aControls = [];

		var oShell = new sap.ui.ux3.Shell({
			id : "myShell",
			showSearchTool : false,
			showInspectorTool : false,
			showFeederTool : false,
			showLogoutButton : false,
			worksetItemSelected : oController.onWorksetItemSelected
		});

		// initiate views let controller determine content
		oShell.addWorksetItem(new sap.ui.ux3.NavigationItem({
			key : "wi_customers",
			text : "Customers"
		}));

		
		oShell.addWorksetItem(new sap.ui.ux3.NavigationItem({
			key : "wi_products",
			text : "Products"
		}));

		
		aControls.push(oShell);

		return aControls;
	}
});