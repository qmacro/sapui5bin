sap.ui.jsview("resources.blogarchive", {
  getControllerName : function() {
    return "resources.blogarchive";
},

  createContent : function(oController) {
    var oTable = new sap.ui.table.Table({
      id: this.createId("blogarchiveTable"),
      selectionMode: sap.ui.table.SelectionMode.Single,
      rowHeight: 30,
      visibleRowCount: 15,
      columns: [
        new sap.ui.table.Column({
          label: new sap.ui.commons.Label({text: "Date"}),
          template: new sap.ui.commons.TextView("idPublished", {})
            .bindProperty("text", "published", function(val) {
              return val && moment(new Date(val)).fromNow();
            })
        }),
        new sap.ui.table.Column({
          label: new sap.ui.commons.Label({text: "Post"}),
          template: new sap.ui.commons.TextView({text: "{title}"})
        }),
      ]
    });

    oTable.getColumns()[0].setWidth("25%");
    
    return oTable;
  }

});
