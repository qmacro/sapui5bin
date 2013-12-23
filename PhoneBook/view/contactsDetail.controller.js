sap.ui.controller("view.contactsDetail", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.taskDetails
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.taskDetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.taskDetails
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.taskDetails
*/
//	onExit: function() {
//
//	},
	
    onSubmit : function(oEvent) {
		// navigate to product page
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
		  id : "idProcesses"
		});    	
    },

	onBack : function(oEvent) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},
	
	onCall : function(oController) {
		//tel:
		var oData = this.oView.getBindingContext().oModel.getProperty(this.oView.getBindingContext().sPath);
		sap.m.URLHelper.triggerTel( oData.phone );
	},
	
	onText : function (oController) {
		//sms:
		var oData = this.oView.getBindingContext().oModel.getProperty(this.oView.getBindingContext().sPath);
		sap.m.URLHelper.triggerSms( oData.phone );
	},
	
	onMail : function (oController) {
		//mailto:
		var oData = this.oView.getBindingContext().oModel.getProperty(this.oView.getBindingContext().sPath);
		if ( jQuery.device.is.phone || jQuery.device.is.tablet ) {
			sap.m.URLHelper.triggerEmail(oData.email);
		} else {
			sap.m.URLHelper.redirect( "mailto://" + oData.email, true );
		}
	},	
	
	onMaps : function (oController) {
		var oData = this.oView.getBindingContext().oModel.getProperty(this.oView.getBindingContext().sPath);
		var mapsURL = encodeURIComponent(oData.address) + "+" + encodeURIComponent(oData.city) + "+" + encodeURIComponent(oData.state) + "+" + encodeURIComponent(oData.pcode) + "+" + encodeURIComponent(oData.country);
		var baseURL = "https://www.google.com/maps/preview#!q=";
		if ( jQuery.device.is.phone || jQuery.device.is.tablet ) {
			baseURL = "comgooglemaps://maps.google.com/?q=";
		}
		sap.m.URLHelper.redirect( baseURL + mapsURL, jQuery.device.is.phone ? false : true );
	},

	onBeforeFirstShow: function(oEvent){
		if(oEvent.data.bindingContext){
			this.getView().setBindingContext(oEvent.data.bindingContext);
		}
	}

});