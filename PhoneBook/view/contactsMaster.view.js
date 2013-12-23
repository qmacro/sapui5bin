sap.ui.jsview("view.contactsMaster", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.tasksMaster
	*/ 
	getControllerName : function() {
		return "view.contactsMaster";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.tasksMaster
	*/ 
	createContent : function(oController) {
		
		// Step 1. Show busy indicator
		var busyDialog = new sap.m.BusyDialog({
			title: "{i18n>LOADING_DATA}",
			text: "{i18n>PLEASE_WAIT}",
			showCancelButton: false
		});
		busyDialog.open();		
		
		var oModel = sap.ui.getCore().getModel();
		
		oModel.attachRequestCompleted(function(){
			busyDialog.close();
		});
		
		oModel.attachRequestFailed(function(){
			busyDialog.close();
			sap.m.MessageBox.show(  "{i18n>ERROR_REMOTE}",
									sap.m.MessageBox.Icon.ERROR,
									"{i18n>ERROR}"
			);
			oModel = new sap.ui.model.json.JSONModel("model/contacts.json");
		});	
		
		// Logo
		var image = new sap.m.Image( { src: 	"img/company-logo.jpg", 
									   width: 	"100%" } );		
		
		var oList = new sap.m.List( {
			showUnread: true,
			mode: jQuery.device.is.phone ? sap.m.ListMode.None : sap.m.ListMode.SingleSelectMaster,
			select: [oController.onListSelect, oController]
		});
		oList.setModel(oModel);
		
		var oNameSorter = new sap.ui.model.Sorter("name", false, function (oContext) {
			var name = oContext.getProperty("name");
			var sKey = name.charAt(0);
			var text = name.charAt(0);
			return {
				key: sKey, // group by first letter of last name
				text: text
			};
		});
		var oLastSorter = new sap.ui.model.Sorter("lastname", false, function (oContext) {
			var name = oContext.getProperty("lastname");
			var sKey = name.charAt(0);
			var text = name.charAt(0);
			return {
				key: sKey, // group by first letter of last name
				text: text
			};
		});
		var oDobSorter = new sap.ui.model.Sorter("dob", false, true);
		
		var oItemTemplate = new sap.m.StandardListItem({
			title: "{fullname}",
			//description: "{phone}",
			//info: "{email}",
			type: jQuery.device.is.phone? sap.m.ListType.Active : sap.m.ListType.None,
			icon: {
				path: "image",
				formatter: function (sIcon) {
					return sIcon; 
				}
			},
			press: [oController.onListItemTap, oController]
		});
		oList.bindAggregation("items", {
			path: "/contents",
			template: oItemTemplate,
			sorter: oLastSorter
		});
		
		// create segmented button for selecting the grouping
		var nameButton = new sap.m.Button({
			text : "{i18n>NAME}",
			//icon : "sap-icon://calendar",
			press : function () {
				oList.getBinding("items").sort(oNameSorter);
			}
		});
		var lastButton = new sap.m.Button({
			text : "{i18n>LASTNAME}",
			//icon : "sap-icon://calendar",
			press : function () {
				oList.getBinding("items").sort(oLastSorter);
			}
		});
		var dobButton = new sap.m.Button({
			text : "{i18n>BIRTHDAY}",
			//icon : "sap-icon://calendar",
			press : function () {
				oList.getBinding("items").sort(oDobSorter);
			}
		});		
		var segmentedButton = new sap.m.SegmentedButton({
			buttons : [ 
				nameButton,
				lastButton,
				//dobButton
			],
			selectedButton : lastButton
		});
		
		return new sap.m.Page({
			title: "{i18n>TITLE}",
			showHeader: true,
			showNavButton: false,
			//navButtonTap: [ oController.onBack, oController],
			headerContent: [ ],
			content: [
				image, oList		
			],
			footer: new sap.m.Bar({
				contentMiddle : segmentedButton
			}),
		});
	}

});