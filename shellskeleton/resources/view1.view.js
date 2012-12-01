sap.ui.jsview("resources.view1", {
  getControllerName : function() {
    return "resources.view1";
},

  createContent : function(oController) {
    var oTable = new sap.ui.table.Table({
      id: this.createId("idTable1"),
      selectionMode: sap.ui.table.SelectionMode.Single,
      rowHeight: 30,
      visibleRowCount: 5,
      columns: [
        new sap.ui.table.Column({
          label: new sap.ui.commons.Label({text: "User"}),
          template: new sap.ui.commons.TextView({text: "{from_user_name}"})
        }),
        new sap.ui.table.Column({
          label: new sap.ui.commons.Label({text: "Tweet"}),
          template: new sap.ui.commons.TextView({text: "{text}"})
        }),
      ]
    });

    oTable.getColumns()[0].setWidth("25%");
    
    return oTable;
  }

});
