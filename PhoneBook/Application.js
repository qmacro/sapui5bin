jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application");
jQuery.sap.require("model.Config");
jQuery.sap.require("jquery.sap.resources");

sap.ui.app.Application.extend("Application", {

    init : function() {
  
    	
        function onDataLoaded(){
        	sap.ui.getCore().getEventBus().publish("data.loaded");
        };
        
        function onDataError(){
        	sap.ui.getCore().getEventBus().publish("data.error");
        };        
        
        var url = model.Config.getServiceUrl();
        var oModel = new sap.ui.model.json.JSONModel(url);   
    	sap.ui.getCore().setModel(oModel);
    	oModel.attachRequestCompleted(onDataLoaded, this);
    	oModel.attachRequestFailed(onDataError, this);
    	
        /*
		// set image path model
		var imgModel = new sap.ui.model.json.JSONModel("model/img.json");
		sap.ui.getCore().setModel(imgModel, "img");
		*/
    	
    	// set i18n model
    	var lang = sap.ui.getCore().getConfiguration().getLocale().getLanguage();
		var i18nModel = new sap.ui.model.resource.ResourceModel( { bundleUrl:"i18n/messageBundle.properties",bundleLocale:lang } );
		
		// set the resource model as global model with the name "i18n"
		sap.ui.getCore().setModel(i18nModel, "i18n");
    },
    
    main : function() {     
        // create app view and put to html root element
        var root = this.getRoot();
        sap.ui.jsview("app", "view.App").placeAt(root);
    }

});