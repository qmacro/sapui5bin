jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");
sap.ui.app.Application.extend("Application", {

	init : function() {
		this.Locale = new sap.ui.core.Locale(sap.ui.getCore().getConfiguration().getFormatLocale());
		this.sId = null;
		this.aHistoryBuffer = [];
		this.oHistoryView = null;
		this.oHistoryModel = null;


		var oI18nModel = new sap.ui.model.resource.ResourceModel({bundleName:"i18n.i18n", bundleLocale: this.Locale});
	  	sap.ui.getCore().setModel(oI18nModel, "i18n");

	  	var oModel = new sap.ui.model.json.JSONModel("mockdata/Items.json");
		sap.ui.getCore().setModel(oModel);
		oModel.attachRequestCompleted(this.onDataLoaded, this);

	},

	main : function() {
		
		// create app view and put to html root element
		var root = this.getRoot();
		sap.ui.jsview("app", "view.App").placeAt(root);
	},

	onDataLoaded : 	function(){
		sap.ui.getCore().getEventBus().publish("data.loaded");
	},

	getHistoryModel : function(){
  		if (!this.oHistoryModel){
  			var oModel = new sap.ui.model.json.JSONModel("mockdata/HistoryItems.json");
  			oModel.loadData("mockdata/HistoryItems.json", "", false);
  			this.oHistoryModel = new sap.ui.model.json.JSONModel(oModel.getData());
  		}
  		if (this.aHistoryBuffer.length > 0){
  			var aData = this.oHistoryModel.getData();
  			var aDataNew = this.aHistoryBuffer.slice();
  			for (var i = 0; i < aData.length; i++){
  				aDataNew.push(aData[i]);
  		}
  		this.oHistoryModel.setData(aDataNew);
  		this.aHistoryBuffer = [];
  		}
  		return this.oHistoryModel;
	},

	changeState : function(sNewState){
		var oModel = sap.ui.getCore().getModel();
		var aDataOld = oModel.getData();
		var aDataNew = [];
		for (var i = 0; i < aDataOld.length; i++){
			if (aDataOld[i].Id == this.sId){
				aDataOld[i].StatusText = sNewState;
				aDataOld[i].ProceededOn = new Date();
				this.aHistoryBuffer.push(aDataOld[i]);
			} else {
				aDataNew.push(aDataOld[i]);
			}
		}
		oModel.setData(aDataNew);
		if (this.oHistoryView){
		}
	},
	setCurrentId : function(sId){
		//change to event
		this.sId = sId;
	}	
});



