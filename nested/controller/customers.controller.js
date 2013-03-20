sap.ui.controller("nested.controller.customers", {
    
    onInit : function() {
     	
	if (this.oView.sId == "vwCustomers") {      
		var sServiceUrl = "http://services.odata.org/Northwind/Northwind.svc/";
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl);
		this.getView().setModel(oModel);
		sap.ui.getCore().byId("tblCustomers").bindRows("Customers");
		}
	},

    onRowSelect : function(oEvent) {
	// don't know why this doesnt work so that
	var that = sap.ui.getCore().byId("vwCustomers").getController();
	
	// get the binding context of the first selected row
	var oContext = oEvent.getParameter("rowContext");
	sap.ui.getCore().byId("vwDetails--lytCustomerDetails").setBindingContext(oContext);
	sap.ui.getCore().byId("vwDetails--vwCustomerImage").setBindingContext(oContext);
	
	// bind Customers->Orders to nested view
	 sap.ui.getCore().byId("vwOrders--tblOrders").bindRows(oContext + "/Orders");
	
	// get the address of the customer
	that.codeAddress();
    },

    onAfterRendering : function(oEvent) {
	// on load of customer view initiate map canvas
	if (oEvent.oSource.getId() == "vwCustomers") {
	    this.initialize_map();
	}

    },

    initialize_map : function() {
	this.geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(-34.397, 150.644);
	var myOptions = {
	    zoom : 15,
	    center : latlng,
	    mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	window.map = new google.maps.Map($('#map_canvas').get(0), myOptions);
    },

    getLocationName : function() {
	// return the customers location
	var oTable = sap.ui.getCore().byId("tblCustomers");
	var oContext = oTable.getContextByIndex(oTable.getSelectedIndex());

	var oModel = oTable.getModel();
	var region = oModel.getProperty("Region", oContext);
	var city = oModel.getProperty("City", oContext);
	var country = oModel.getProperty("Country", oContext);

	if (region !== null) {
	    return city + " " + region + " " + country;
	} else {
	    return city + " " + country;
	}
    },

    codeAddress : function() {
	this.geocoder.geocode({
	    'address' : this.getLocationName()
	}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		map.setCenter(results[0].geometry.location);
		new google.maps.Marker({
		    map : map,
		    position : results[0].geometry.location
		});
	    } else {
		alert("Geocode was not successful for the following reason: "
			+ status);
	    }
	});
    }

});