sap.ui.jsview("nested.views.customers", {

	getControllerName : function() {
		return "nested.controller.customers";
	},

	createContent : function(oController) {
		var c = sap.ui.commons;
		var aControls = [];

		// Customers table
		var oTable = new sap.ui.table.DataTable("tblCustomers", {
			title : "Customers",
			width : "100%",
			visibleRowCount : 5,
			selectionMode : sap.ui.table.SelectionMode.Single,
			editable : false,
			rowSelect : oController.onRowSelect
		});

		oTable.setExpandedVisibleRowCount(20);
		oTable.addColumn(new sap.ui.table.Column({
			label : new c.Label({
				text : "Customer ID"
			}),
			template : new c.TextField({
				value : "{CustomerID}"
			})

		}));
		oTable.addColumn(new sap.ui.table.Column({
			label : new c.Label({
				text : "Company Name"
			}),
			template : new c.TextField({
				value : "{CompanyName}"
			})
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label : new c.Label({
				text : "Contact Name"
			}),
			template : new c.TextField({
				value : "{ContactName}"
			})
		}));

		// Customer Map
		var oCustomerMap = new c.layout.MatrixLayout("lytCustomerMap");
		oCustomerMap.setLayoutFixed(false);
		oCustomerMap.createRow(new sap.ui.core.HTML({
		 content : "<div id='map_canvas' style='width: 580px; height: 200px;'></div>"
		}));

		var oCustomerDetailsView = sap.ui.view({
			type : sap.ui.core.mvc.ViewType.XML,
			id : "vwDetails",
			viewName : "nested.views.customerdetails"
		});

		var oOrdersView = sap.ui.view({
			type : sap.ui.core.mvc.ViewType.JSON,
			id : "vwOrders",
			viewName : "nested.views.orders"
		});

		var oLeft = new c.layout.MatrixLayout();
		oLeft.createRow(oTable);
		oLeft.createRow(oOrdersView);

		var oRight = new c.layout.MatrixLayout();
		oRight.createRow(oCustomerDetailsView);
		oRight.createRow(oCustomerMap);

		var oLayout = new c.layout.MatrixLayout("lytMain");
		var oCell1 = new c.layout.MatrixLayoutCell({
			vAlign : c.layout.VAlign.Top
		}).addContent(oLeft);
		var oCell2 = new c.layout.MatrixLayoutCell({
			vAlign : c.layout.VAlign.Top
		}).addContent(oRight);
		oLayout.createRow(oCell1, oCell2);

		aControls.push(oLayout);
		return aControls;
	}
});