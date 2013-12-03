jQuery.sap.require("util.Types");

/**
 * Create Controller. Handles all events of the Create view. 
 */
sap.ui.controller("view.Create", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit : function() {
		this.byId("pageCreateFrom").bindProperty("value", {path: "create>/from", formatter: util.Types.DATE});
		this.byId("pageCreateTo").bindProperty("value", {path: "create>/to", formatter: util.Types.DATE});
	},

	/**
	 * Event handler. Called when the "cancel" button of the view is pressed.
	 */
	onCancel: function(oEvt) {
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "back",  {
			id: ""
		});
	},


	/**
	 * Event handler. Called when the "cancel" button of the view is pressed.
	 */
	onDateChanged : function() {
		this._calculateDuration();
	},


	/**
	 * Event handler. Called when the "type" of the select box is changed.
	 * 
	 * @param oEvt {sap.ui.base.Event} the causing event.
	 */
	onTypeChanged : function(oEvt) {
		this.getView().setBindingContext(oEvt.getParameter("selectedItem").getBindingContext());
	},


	/**
	 * Internal helper method. Creates and returns a dialog.
	 * 
	 * @param oTitle {string} 
	 * @returns {sap.m.Dialog} the created dialog.
	 * @private
	 */
	_createDialog : function(oTitle) {
		var oDialog = new sap.m.Dialog({type:"Message",title:oTitle});
		oDialog.addContent(new sap.m.Button({text:"{i18n>view.Create.dialog.button}",tap:function(){oDialog.close();}}).addStyleClass("sapMDialogBtn"));
		oDialog.setModel(this.getView().getModel("i18n"), "i18n");
		return oDialog;
	},


	
	/**
	 * Event handler. Called when the "create" button of the view is pressed.
	 */
	onCreate: function() {
		var oCreateModel = this.getView().getModel("create");
		this._calculateDuration();

		var oDialog = null;
		// TODO: FORM VALIDATION
		if (oCreateModel.getProperty("/length")== "Invalid"){
			oDialog = this._createDialog("{i18n>view.Create.dialog.message.invalid}");
			oDialog.open();
			return;
		}

		var oData = oCreateModel.getData();
		oData.from = util.Types.DATE.formatValue(this._getDates().from, "string");
		oData.to = util.Types.DATE.formatValue(this._getDates().to, "string");
		this.getView().getBindingContext().getObject().items.push(oData);
		this.getView().getModel().setData(this.getView().getModel().getData());
	
		oDialog = this._createDialog("{i18n>view.Create.dialog.message.success}");
		oDialog.open();

		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "back");
	},
	
	
	/**
	 * Calculates and updates the length property of the model.
	 * Workaround -> calc duration should be received from server 
	 */
	_calculateDuration : function() {
		var oCreateModel = this.getView().getModel("create");
		var mDates = this._getDates();
		var iTo = mDates.to.getTime();
		var iFrom = mDates.from.getTime();
		
		// TODO: USE FORM VALIDATION
		if (iTo < iFrom){
			oCreateModel.setProperty("length", "Invalid");
			return;
		}
		
		var iDay=1000*60*60*24;	
		var iLength = Math.ceil(( iTo- iFrom) / iDay) + 1;

		oCreateModel.setProperty("length", iLength + (iLength ===1 ? " day" : " days"));
	},

	
	/**
	 * Returns the parsed values of the "from" and "to" date fields.
	 * 
	 * @return {Object} dates - object with "from" and "to" properties
	 */
	_getDates : function() {
		var oDateType = util.Types.DATE;
		return {
			from : oDateType.parseValue(this.byId("pageCreateFrom").getValue(), "string"),
			to : oDateType.parseValue(this.byId("pageCreateTo").getValue(), "string")
		};
	}
});
