sap.ui.controller("view.Search", {
	
	onInit: function() {		
		oModelSearch = new sap.ui.model.json.JSONModel();
		oModelSearch.setData("mockdata/Contacts.json");
		sap.ui.getCore().setModel(oModelSearch, "search");
	 	oModelSearch.loadData("mockdata/Contacts.json", "", false);	 	
		oItemTemplate = new sap.m.StandardListItem(
				{
					title: "{search>Name}",
					info: "{search>ID}",
					type:  sap.m.ListType.Active,
				    tap: [this.onAgent, this],					
				}); 
		oSorter = new sap.ui.model.Sorter("Name", false);	
		this.byId("searchList").bindAggregation("items", {
			path : "search>/",
			template : oItemTemplate,
			sorter : oSorter,
			});

		this.getView().addEventDelegate({
			// not added the controller as delegate to avoid controller functions with similar names as the events
			onBeforeShow : jQuery.proxy(function(oEvt) {
				this.onBeforeShow(oEvt);
			}, this)
		});
	},

	onBeforeShow : function(oEvt) {
		if (oEvt.data.context) {
			this.getView().setBindingContext(oEvt.data.context);
		} 
	},		
		
	onCancel: function() {
//		this.byId("searchText").unbindValue();
	    var oBus = sap.ui.getCore().getEventBus();
		oBus.publish("nav", "to", { 
			id: "Detail", 
		});
	 },
		  
	onSearch: function(oEvt) {
		var oSearchValue = oEvt.getParameters().newValue;
		var oFilter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, oSearchValue);
		this.byId("searchList").bindAggregation("items", {
			path : "search>/",
			template : oItemTemplate,
			sorter : oSorter,
			filters :  [oFilter] 
		    });
		    console.log("SearchLiveChange");
	 },	
		    
	onAgent: function(oEvt) {
//		this.byId("searchText").unbindValue();
		var oBus = sap.ui.getCore().getEventBus();
		var that = this;
		oBus.publish("nav", "to", { 
			id: "Forward",
			data: {
				context : that.getView().getBindingContext(),
				_context: {
					context: oEvt.oSource.getBindingContext("search"),
					name: "search"
				}
			}
		});	
		
	  },		
});
