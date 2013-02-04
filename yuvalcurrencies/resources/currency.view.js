//jQuery.sap.require("currencies.resources.utils.utility");

/**
* First Application View - this is the application's starting point. It builds the application window.  
*/
//var oBundle = jQuery.sap.resources({url:"mybundle.properties"});

sap.ui.jsview("resources.currency", {

      getControllerName : function() {
         return "resources.currency";
      },

      createContent : function(oController) {
        var oShell = this.createShell();
           oShell.addContent(this.createCurrencyTable());   
           return oShell;
      },

      createShell:function(oController){
          var oShell = sap.ui.ux3.Shell("ID_CurrencyShell",{
              appTitle: oBundle.getText("APP_TITLE"),
              showLogoutButton:false,
              showSearchTool: false,
              showInspectorTool: false,
              showFeederTool: false,
              worksetItems: [new sap.ui.ux3.NavigationItem("navItemList",{key: "CurrencyList", text:oBundle.getText("WORKSET_TITLE") }) ]
          });
          return oShell;
      },

      /**
     * Returns a table with the required columns, each column is bound for a specific odata service property  
     * @returns {sap.ui.table.Table}
     */
      createCurrencyTable:function(){
        var oTable = new sap.ui.table.Table("ID_CurrencyTable", {
            visibleRowCount  : 20,
              selectionMode: sap.ui.table.SelectionMode.None
          });

         oTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text:oBundle.getText("CURRENCY_CODE")}),
              template: new sap.ui.commons.TextView().bindProperty("text", "Code"),
             sortProperty: "Code",
          }));

          oTable.addColumn(new sap.ui.table.Column({
             label: new sap.ui.commons.Label({text:oBundle.getText("CURRENCY_TEXT")}),
             template: new sap.ui.commons.TextView().bindProperty("text", "Text"),
            sortProperty: "Text",
         }));

         return oTable;          

      }

});