sap.ui.jsview("cart.order", {

	getControllerName : function() {
		return "cart.order";
	},

	createContent : function(oController) {
		var c = sap.ui.commons;
		var aControls = [];
		var oLayout = new sap.ui.commons.layout.MatrixLayout("header", {
			layoutFixed : false
		});

		// Headings
		oLayout.createRow(new c.TextView({
			design : 'Standard',
			text : "Category",
			width : "20ex"
		}), new c.TextView({
			design : 'Standard',
			text : "Product",
			width : "20ex"
		}), new c.TextView({
			design : 'Standard',
			text : "Price",
			width : "15ex"
		}), new c.TextView({
			design : 'Standard',
			text : "Quantity",
			width : "10ex"
		}), new c.TextView({
			design : 'Standard',
			text : "Sub Total",
			width : "15ex"
		}));
		
		// add first cart line
		oController.createTableRow(oLayout);
		aControls.push(oLayout);

		// totals
		var oLayout2 = new sap.ui.commons.layout.MatrixLayout("layout2", {
			layoutFixed : true,
			width : '105ex',
			columns : 5
		});

		oLayout2.setWidths('15ex', '20ex', '25ex', '20ex', '5ex');

		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan : 5
		});
		oCell.addContent(new sap.ui.commons.HorizontalDivider());
		oLayout2.createRow(oCell);

		oLayout2.createRow(new c.TextView({
			design : 'H4',
			text : "Total Value",
			width : "15ex"
		}), new c.TextView("tvGrandTotal", {
			design : 'H4',
			width : "15ex"
		}));
		aControls.push(oLayout2);

		aControls.push(new c.Button({
			text : "Add Product",
			press : function() {
				oController.createTableRow(oLayout);
			}
		}), new c.Button({
			text : "Create Order",
			press : function() {
				oController.createOrder();
			}
		}));
		return aControls;
	}

});
