sap.ui.controller("cart.order", {

	onInit : function() {
//		var sUrl = "http://nplhost.mysap.com:8042/sap/opu/odata/sap/NWORDERS/",
//			user = "developer",
//			pwd = "ch4ngeme";
		
		var sUrl = "http://services.odata.org/Northwind/Northwind.svc/",
			user, pwd;
		
		//proxy
		//sUrl = getServiceUrl(sUrl);

		if (!this.getView().getModel()) {
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true, user, pwd);
			this.getView().setModel(oModel);
		}

	},

	createTableRow : function(oLayout) {
		var c = sap.ui.commons;
		var i = oLayout.getRows().length - 1;
		var that = this;
		var oComboBox1 = new c.ComboBox("cbCategories" + i, {
			displaySecondaryValues : true,
			change : that.onCategoryChange
		});
		var oLITemp = new sap.ui.core.ListItem().bindProperty("key",
				"CategoryID").bindProperty("text", "CategoryName")
				.bindProperty("additionalText", "Description");
		oComboBox1.bindItems("/Categories", oLITemp, null).setValue("..Select");
		var oComboBox2 = new c.ComboBox("cbProducts" + i, {
			change : that.onProductChange,
			visible : false
		});
		
		var oPrice = new c.TextField("tvPrice" + i, {
			maxLength : 8,
			width : "10ex",
			editable: false,
			visible : false,
			textAlign : 'End'
		});

		var oQty = new c.TextField("tfQty" + i, {
			maxLength : 5,
			width : "10ex",
			visible : false,
			textAlign :'End',
			liveChange : that.onQtyChange
		});

		var oSub = new c.TextField("tvSub" + i, {
			maxLength : 10,	
			width : "15ex",
			editable : false,
			visible : false,
			textAlign :'End'
		});
		
		var oBut = new c.Button("btDelete" + i, {
			text : "Delete",
			style: c.ButtonStyle.Reject,
			press : function() {
				view.getController().deleteLine(i, oLayout);
		}});
		
		oLayout.createRow(oComboBox1, oComboBox2, oPrice, oQty, oSub, oBut);
		my.vm.addLine();
	},

	onCategoryChange : function(oEvent) {

		// get line line number
		var line = this.getId().replace(/[^0-9]+/ig, ""),
			cartLine = my.vm.lines[line];

		// set invisible price qty and subtotal
		sap.ui.getCore().byId("tvPrice" + line).setVisible(false);
		sap.ui.getCore().byId("tfQty" + line).setVisible(false);
		sap.ui.getCore().byId("tvSub" + line).setVisible(false);
		
		var oComboBox2 = sap.ui.getCore().byId("cbProducts" + line);
		var oContext = oEvent.getParameter("selectedItem").getBindingContext();
		
		var oLITemp = new sap.ui.core.ListItem().bindProperty("key", "ProductID")
				.bindProperty("text", "ProductName");
		
		cartLine.category = oEvent.getParameter("selectedItem").getKey();
		
		oComboBox2.bindItems("/" + oContext + "/Products",
				oLITemp, null).setValue("..Select");
		oComboBox2.setVisible();

		//reset values and show updated total
		cartLine.product ="";
		cartLine.price ="";
		sap.ui.getCore().byId("tvGrandTotal").setText(my.formatCurrency(my.vm.grandTotal()));	
	},

	onProductChange : function(oEvent) {
		var oContext = oEvent.getParameter("selectedItem").getBindingContext(),
			oModel = view.getModel(),
			line = this.getId().replace(/[^0-9]+/ig, ""),
			oPrice = sap.ui.getCore().byId("tvPrice" + line),
			oQty = sap.ui.getCore().byId("tfQty" + line),
			oSub = sap.ui.getCore().byId("tvSub" + line),
			cartLine = my.vm.lines[line];
		
		cartLine.product = oEvent.getParameter("selectedItem").getKey();
		cartLine.price = parseFloat(oModel.getProperty("UnitPrice", oContext));
		
		oPrice.setValue(my.formatCurrency(cartLine.price)).setVisible();

		// set qty
		if (cartLine.quantity == undefined || cartLine.quntity == 0){
			cartLine.quantity = 1;
		}
		oQty.setValue(cartLine.quantity).setVisible();

		// sub total
		oSub.setValue(my.formatCurrency(cartLine.subTotal())).setVisible();
		sap.ui.getCore().byId("tvGrandTotal").setText(my.formatCurrency(my.vm.grandTotal()));

	},
	
	onQtyChange : function(oEvent) {
		var sText = oEvent.getParameter("liveValue");

		// get line line number
		var line = this.getId().replace(/[^0-9]+/ig, ""),
		    cartLine = my.vm.lines[line];

        cartLine.quantity = parseInt("0" + sText);
		sap.ui.getCore().byId("tvSub" + line).setValue(my.formatCurrency(cartLine.subTotal()));
		sap.ui.getCore().byId("tvGrandTotal").setText(my.formatCurrency(my.vm.grandTotal()));
	},

	createOrder : function(){
		var oModel = view.getModel(),
		    order_details = my.vm.save(),
			today = new Date(),
			oDateTimeFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-dd'T'HH:mm:ss"
			}),
			order = {	
				CustomerID : 'BERGS',
				EmployeeID : '01',
				OrderDate :  oDateTimeFormat.format(today),
				RequiredDate : oDateTimeFormat.format(today),
				ShippedDate : null, // 
				Order_Details : order_details
			};

		var success = function (data, response) {
			  if (response.statusCode === 201){
				  sap.ui.commons.MessageBox.show(data.OrderID + " " + response.statusText ,
						  sap.ui.commons.MessageBox.Icon.SUCCESS,
						  "Success", sap.ui.commons.MessageBox.Action.OK);
			  };
			},
			error = function () {
				 sap.ui.commons.MessageBox.show("An Error ocurred" ,
						  sap.ui.commons.MessageBox.Icon.ERROR,
						  "Error", sap.ui.commons.MessageBox.Action.OK);
			
			};
			 
//	   oModel.create("/Orders", order, null, success, error);
			
		var orderStr = 	JSON.stringify(order_details, undefined, 2);

		 sap.ui.commons.MessageBox.show(orderStr, sap.ui.commons.MessageBox.Icon.SUCCESS,
		  "Order: 0000000001", sap.ui.commons.MessageBox.Action.OK);
	},
	
	deleteLine : function (line, oLayout){
		//remove line from cart
		my.vm.removeLine(line);
		//remove line from layout
		oLayout.getRows()[line+1].destroyCells();
		oLayout.removeRow(line+1);
		//recalculate total
		sap.ui.getCore().byId("tvGrandTotal").setText(my.formatCurrency(my.vm.grandTotal()));
	}
		
});
