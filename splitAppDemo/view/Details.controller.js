/**
 * Details Controller. Handles all events of the Details view. 
 */
sap.ui.controller("view.Details", {

	/**
	 * Event handler. Called when the "back" button of the view is pressed.
	 */
	onBack: function() {
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "back");
	},


	/**
	 * Event handler. Called when the "create" button of the view is pressed.
	 * 
	 * @param oEvt {sap.ui.base.Event} the causing event.
	 */
	onCreate: function(oEvt) {
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "to", {
			id: "createPage",
			data: {context : oEvt.oSource.getBindingContext()
			}
		});
	},

	tapHomeButton : function(){}
});