jQuery.sap.require("util.Conversions");
jQuery.sap.require("Application");
sap.ui.controller("view.Detail", {

	
	onInit : function() {
		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onBeforeShow : jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
//		this.byId("ApprovalItem").bindProperty("icon", {path: "Type", formatter: util.Conversions.Type2Icon});
//		this.byId("ApprovalItem").bindProperty("description", {path: "DueOn", formatter: util.Conversions.DateShortYTTInText("view.Detail.dueDate")});
		this.byId("Instruction").bindProperty("text", {path: "instructions", formatter: util.Conversions.Array2String});
		this.byId("ItemAttch").bindProperty("icon", {path: "AttchType", formatter: util.Conversions.AttchType2Icon});		
		this.byId("TypeIcon").bindProperty("src", {path: "Type", formatter: util.Conversions.Type2Icon});
		this.byId("PriorityIcon").bindProperty("src", {path: "Priority", formatter: util.Conversions.Priority2Icon});
		this.byId("DueDate").bindProperty("text", {path: "DueOn", formatter: util.Conversions.DateShortYTTInText("view.Detail.dueDate")});
		this.byId("vBox1").setLayoutData(new sap.m.FlexItemData({growFactor: 1}));
		this.byId("vBox2").setLayoutData(new sap.m.FlexItemData({growFactor: 3}));
		this.byId("CreatorName").addStyleClass("styleCreatorName");
		this.byId("RequestType").addStyleClass("styleRequestType");
		this.byId("Instruction").addStyleClass("styleInstruction");		
		this.byId("DueDate").addStyleClass("styleDueDate");
		this.oActionSheet = new sap.m.ActionSheet("actionSheet1", {
			showCancelButton: true,
			buttons: [
			          new sap.m.Button({
			        	  type: sap.m.ButtonType.Accept,
			        	  text: "{i18n>view.Detail.accept}",
			        	  tap: function(){ this.onConfirm();}.bind(this) })			        	
			          ],
			          
// Standard cancel button does not appear on iPad			          
			 cancelButtonText: "{i18n>view.Detail.cancel}",
			 cancelButtonTap: function(){
//                     Do nothing: remain on detail page 	            
			 },
			 
			 placement: sap.m.PlacementType.Top } 
			);
// For ipad, Popover is used for decline and commentary		
		  if (jQuery.device.is.ipad) {
			  
				this.oPopover = new sap.m.Popover("window", {
					// Modal = true, background is greyout and popover needs to be closed	
								placement: "Top",
								modal: true,
								title: "Decline",
								content: [
								          new sap.m.TextArea({
								        	  
								          })
								          
								          ],
							    leftButton: new sap.m.Button("Cancel", {
							    			text: "Cancel",
							    			type: "Back",
							    			tap: function() { this.onExit();}.bind(this) 							    			
							    }),
							    rightButton: new sap.m.Button("Confirm", {
					    			text: "Confirm",
					    			type: "Accept",
					    			tap: function() { this.onConfirmReject();}.bind(this)	
							    }

							    )
							    
							});
		  }
		
	},
	
// for iPad Only	
	onExit: function() {
		
		this.oPopover.close();
	},
	
	
// Confirmation of reject for iPad Only	
	onConfirmReject: function() {
		
	  	oApp.changeState(sap.ui.getCore().getModel("i18n").getResourceBundle().getText("state.Rejected"));
		
	},

	onItems: function(oEvt) {
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "back", { id: "ApprovalItems" });
	},
	
	onReject: function(oEvt) {
		
		if (jQuery.device.is.ipad) {
			var oButton= this.byId("DetailFooter2");
		 	this.oPopover.openBy(oButton);
			}
		else
			{
			var oBus = sap.ui.getCore().getEventBus();
			oBus.publish("nav", "to", { 
			  id: "Reject", 			
			  data: {context : oEvt.oSource.getBindingContext()}
			});
		}
	},

	onAccept: function(oEvt) {
	  	oText = sap.ui.getCore().getModel("i18n").getResourceBundle().getText("view.ApprovalItems.LastActionApproved");
		oCreator = oEvt.getSource().getBindingContext().getProperty("Creator");
		var oButton= this.byId("DetailFooter1");
		this.oActionSheet.openBy(oButton);
		
	},

	onConfirm: function(){
		localStorage.clear("lastAction");
	  	localStorage.setItem("lastAction", oText + " " + oCreator);	
// After following state change, a new request with another Id and Creator shall be handled  	  	
		oApp.changeState(sap.ui.getCore().getModel("i18n").getResourceBundle().getText("state.Approved"));
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "back", { id: "ApprovalItems" });	
	},
	
	onTap: function(oEvt) {
		var sURL = oEvt.getSource().getBindingContext().getProperty("URL");
		sap.m.URLHelper.redirect(sURL, true);	
	},
	
	onForward: function(oEvt) {	
		var oCreator = oEvt.getSource().getBindingContext().getProperty("Creator");
		localStorage.setItem("creator", oCreator);	
		var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "to", { 
			id: "Search",
			data: {context : oEvt.oSource.getBindingContext()} 
		});
	},
	
	onBeforeShow : function(evt) {
		if (evt.data.context) {
			this.getView().setBindingContext(evt.data.context);
		} 

		if (localStorage.getItem("lastAction") != null){ 
			sap.m.MessageToast.show(localStorage.getItem("lastAction"));
			localStorage.clear("lastAction");
		};
	},	

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//   onInit: function() {
//
//   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }

});

