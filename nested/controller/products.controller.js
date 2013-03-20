sap.ui.controller("nested.controller.products", {

    onInit : function() {

	var sServiceUrl = "http://services.odata.org/Northwind/Northwind.svc/";
	
	if(!this.getView().getModel()){
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl);
		this.getView().setModel(oModel);
		
		// load supplier context for the names
		oModel._loadData("Suppliers");
				
		var oFilter = new sap.ui.model.Filter("CategoryID",
			sap.ui.model.FilterOperator.EQ, 1);
		sap.ui.getCore().byId("tblProducts").bindRows("Products", null,
		[ oFilter ]);
		
		var oLITemp = new sap.ui.core.ListItem().bindProperty("key",
					"CategoryID").bindProperty("text", "CategoryName")
					.bindProperty("additionalText", "Description");
				
		sap.ui.getCore().byId("cbCategories").bindItems("Categories", oLITemp,
					null).setValue("Beverages");		
	}
    },

    onRowSelect : function(oEvent) {
	var oContext = oEvent.getParameter("rowContext");
	var oProductDetails = sap.ui.getCore().byId("lytProductDetails");
	oProductDetails.setVisible(true);
	oProductDetails.setBindingContext(oContext);
	
    },
    
    onComboChange : function(oEvent) {
	var categoryID = oEvent.oSource.getSelectedKey();
	var oTable = sap.ui.getCore().byId("tblProducts");
	oTable.setSelectedIndex();
	var oFilter = new sap.ui.model.Filter("CategoryID",
		sap.ui.model.FilterOperator.EQ, categoryID);
	oTable.bindRows("Products", null, [ oFilter ]);

	sap.ui.getCore().byId("lytProductDetails").setVisible(false);	
    }
});