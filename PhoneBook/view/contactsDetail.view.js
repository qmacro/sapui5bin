sap.ui.jsview("view.contactsDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.Form
	*/ 
	getControllerName : function() {
		return "view.contactsDetail";
	},
	
	onBeforeFirstShow: function(oEvent){
		this.getController().onBeforeFirstShow(oEvent);
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.Form
	*/ 
	createContent : function(oController) {
		
		// Step 1. Create empty page
		var btnCall = new sap.m.Button( { 	text : "{i18n>CALL}", 
											tooltip : "{i18n>CALL}",
											type : sap.m.ButtonType.Accept,
											icon : "sap-icon://outgoing-call",
											press:  [ oController.onCall, oController ]});
		
		var btnText = new sap.m.Button( { 	text : "{i18n>TEXT}", 
											tooltip : "{i18n>TEXT}",
											type : sap.m.ButtonType.Transparent,
											icon : "sap-icon://discussion",
											press:  [ oController.onText, oController ]});		

		var btnMail = new sap.m.Button( { 	text : "{i18n>MAIL}", 
											tooltip : "{i18n>MAIL}",
											type : sap.m.ButtonType.Transparent,
											icon : "sap-icon://email",
											press:  [ oController.onMail, oController ]});					
		
		var vBox = new sap.m.VBox({
			width : "100%",
			items : []
		});
		
		
		// Master Data
		var fieldContent = [];
		fieldContent.push(new sap.ui.commons.Title({ text: "{i18n>CONTACT_GROUP}" }));
		fieldContent.push(new sap.m.Label({ text: "{i18n>PHONE}" }));
		fieldContent.push(new sap.m.Text({ text: "{phone}" }));
		fieldContent.push(new sap.m.Label({ text: "{i18n>EMAIL}" }));
		fieldContent.push(new sap.m.Text({ text: "{email}" }));
		fieldContent.push(new sap.m.Label({ text: "{i18n>DOB}" }));
		fieldContent.push(new sap.m.Text({ text: "{dob}" }));		
		
		var simpleForm = new sap.ui.commons.form.SimpleForm({ minWidth : 1024,
		      maxContainerCols : 2,
		      content : fieldContent });
		
		vBox.addItem(simpleForm);
		
		// Address
		var fieldContent = [];
		fieldContent.push(new sap.ui.commons.Title({ text: "{i18n>ADDRESS_GROUP}" }));
		
		fieldContent.push(new sap.m.Label({ text: "{i18n>ADDRESS}" }));
		fieldContent.push(new sap.m.Text({ text: "{address}" }));
		fieldContent.push(new sap.m.Label({ text: "{i18n>ADDRESS2}" }));
		fieldContent.push(new sap.m.Text({ text: "{address2}" }));
		fieldContent.push(new sap.m.Label({ text: "{i18n>CITY}" }));
		fieldContent.push(new sap.m.Text({ text: "{city}" }));
		fieldContent.push(new sap.m.Label({ text: "{i18n>STATE}" }));
		fieldContent.push(new sap.m.Text({ text: "{state}" }));
		fieldContent.push(new sap.m.Label({ text: "{i18n>PCODE}" }));
		fieldContent.push(new sap.m.Text({ text: "{pcode}" }));
		fieldContent.push(new sap.m.Label({ text: "{i18n>COUNTRY}" }));
		fieldContent.push(new sap.m.Text({ text: "{country}" }));		
		
		fieldContent.push(new sap.m.Button( { 	text : "{i18n>MAPS}", 
												tooltip : "{i18n>MAPS}",
												type : sap.m.ButtonType.Transparent,
												icon : "sap-icon://map-2",
												press:  [ oController.onMaps, oController ]}));
		
		var simpleForm = new sap.ui.commons.form.SimpleForm({ minWidth : 1024,
		      maxContainerCols : 2,
		      content : fieldContent });
		
		vBox.addItem(simpleForm);
		
		// Social

		var fieldContent = [];
		fieldContent.push(new sap.ui.commons.Title({ text: "{i18n>SOCIAL}" }));
		
		fieldContent.push(new sap.m.Label( { text: "{i18n>TWITTER}" }));
		fieldContent.push(new sap.m.Link( { text: "{twitter}", 
											href: "{twitterURL}",
											target: "_blank" }));
		
		var textSkype = new sap.m.Text({ text: "{skype}" });
		fieldContent.push(new sap.m.Label( { text: "{i18n>SKYPE}" }));
		fieldContent.push(new sap.m.Link( { text: "{skype}",
											href: "{skypeURL}" }));
		
		var simpleForm = new sap.ui.commons.form.SimpleForm({ minWidth : 1024,
		      maxContainerCols : 2,
		      content : fieldContent });
		
		vBox.addItem(simpleForm);
		
		return new sap.m.Page({
			title: "{fullname}",
			showNavButton: jQuery.device.is.phone ? true : false,
			navButtonTap: [ oController.onBack, oController],
			content: [ vBox ],
			footer: new sap.m.Bar({
				contentRight: [ btnCall, btnText, btnMail ]
			})
		});		

	},

});
