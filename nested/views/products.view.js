sap.ui.jsview("nested.views.products", {
	getControllerName : function() {
		return "nested.controller.products";
	},

	createContent : function(oController) {
		var c = sap.ui.commons;
		var aControls = [];
		var imgURL = "Images/Products/";

		// Products table
		var oTable = new sap.ui.table.DataTable("tblProducts", {
			title : "Products",
			width : "330px",
			visibleRowCount : 12,
			selectionMode : sap.ui.table.SelectionMode.Single,
			editable : false,
			rowSelect : oController.onRowSelect
		});

		oTable.addColumn(new sap.ui.table.Column({
			width : "220px",
			label : new c.Label({
				text : "Product Name"
			}),
			template : new c.TextField({
				value : "{ProductName}"
			})

		}));
		
		oTable.addColumn(new sap.ui.table.Column({
			width : "80px",
			label : new c.Label({
				text : "Price"
			}),
			template : new c.TextField().bindValue("UnitPrice", function(aVal) {
				if (aVal) {
					return parseFloat(aVal).toFixed(2);
				}
			})
		}));

		var oComboBox = new c.ComboBox("cbCategories", {
			displaySecondaryValues : true,
			change : oController.onComboChange
		});

		var oToolbar = new sap.ui.commons.Toolbar();
		oToolbar.addItem(oComboBox);
		oTable.setToolbar(oToolbar);

		// Product Details
		var oProductDetails = new c.layout.MatrixLayout({
			columns : 3,
			layoutfixed : false,
			widths : [ "220px", "100px", "400px" ]
		});

		oMLC0 = new c.layout.MatrixLayoutCell({
			rowSpan : 8
		});

		oImage = new c.Image({
			width : "200px"
		}).bindProperty("src", "ProductID", function(aVal) {
			return imgURL + aVal + ".jpg";
		});

		oMLC0.addContent(oImage);
		oProductDetails.createRow(oMLC0);

		oProductName = new sap.ui.commons.TextView({
			semanticColor : c.TextViewColor.Positive,
			wrapping : true,
			design : c.TextViewDesign.H1,
			text : "{ProductName}"
		});

		var oMLC1 = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan : 2
		});
		oMLC1.addContent(oProductName);

		oProductDetails.createRow(oMLC1);

		oProductDetails.createRow(new sap.ui.commons.Label({
			text : "Category",
			width : "100px",
			design : c.LabelDesign.Bold
		}), new sap.ui.commons.TextView({
			width : "200px",
		}).bindText("CategoryID", function(aVal) {
			if (aVal) {
				var companyName = "/Categories(" + aVal + ")/CategoryName";
				return this.getModel().getProperty(companyName);
			}
		})

		);

		oProductDetails.createRow(new sap.ui.commons.Label({
			text : "Price",
			width : "100px",
			design : c.LabelDesign.Bold
		}), new sap.ui.commons.TextView({
			width : "200px",
		}).bindText("UnitPrice", function(aVal) {
			if (aVal) {
				return parseFloat(aVal).toFixed(2);
			}
		}));

		oProductDetails.createRow(new sap.ui.commons.Label({
			text : "Quantity",
			width : "100px",
			design : c.LabelDesign.Bold
		}), new sap.ui.commons.TextView({
			width : "200px",
			text : "{QuantityPerUnit}"
		}));

		oProductDetails.createRow(new sap.ui.commons.Label({
			text : "Units In Stock",
			width : "100px",
			design : c.LabelDesign.Bold
		}), new sap.ui.commons.TextView({
			width : "200px",
			text : "{UnitsInStock}"
		}));

		oProductDetails.createRow(new sap.ui.commons.Label({
			text : "Units on Order",
			width : "100px",
			design : c.LabelDesign.Bold
		}), new sap.ui.commons.TextView({
			width : "200px",
			text : "{UnitsOnOrder}"
		}));

		oProductDetails.createRow(new sap.ui.commons.Label({
			text : "Supplier",
			width : "100px",
			design : c.LabelDesign.Bold
		}), new sap.ui.commons.TextView({
			width : "200px",
		}).bindText("SupplierID", function(aVal) {
			if (aVal) {
				var companyName = "/Suppliers(" + aVal + ")/CompanyName";
				return this.getModel().getProperty(companyName);
			}
		}));

		var oLeft = new c.layout.MatrixLayout();
		oLeft.createRow(oTable);

		var oRight = new c.layout.MatrixLayout("lytProductDetails", {
			visible : false
		});
		oRight.createRow(oProductDetails);

		var oLayout = new c.layout.MatrixLayout({
			columns : 2,
			widths : [ "350px", "750px" ]
		});
		
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