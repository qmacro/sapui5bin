/**
 * LeaveRequests Controller. Handles all events of the LeaveRequests view. 
 */
sap.ui.controller("view.LeaveRequests", {

	/**
	 * Event handler. Called when the "create" button of the view is pressed.
	 * 
	 * @param oEvt {sap.ui.base.Event} the causing event.
	 */
	onCreate: function(oEvt) {
		var oBus = sap.ui.getCore().getEventBus();

		var oList = this.byId("leaveRequestList").byId("list");
		oBus.publish("nav", "to", {
			id: "createPage",
			data: {context : oList.getItems()[0].getBindingContext()
			}
		});
	},


	/**
	 * Event handler. Called when the "show details" button of the view is pressed.
	 * 
	 * @param oEvt {sap.ui.base.Event} the causing event.
	 */
	onShowDetails: function(oEvt) {
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "to", {
			id: "detailsPage",
			data: {context : oEvt.oSource.getBindingContext()
			}
		});
	}

});