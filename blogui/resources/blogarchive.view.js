sap.ui.jsview("resources.blogarchive", {
  getControllerName : function() {
    return "resources.blogarchive";
},

  createContent : function(oController) {

    var postbody = new sap.ui.core.HTML("postbody", {
      content: "{content}",
      preferDOM: false,
      sanitizeContent: true
    });

    var oPanel = new sap.ui.commons.Panel("idPostPanel1", {});
    oPanel.setTitle(new sap.ui.commons.Title("idTitle1", {text: "{title}"}));
    oPanel.addContent(new sap.ui.core.HTML("idHtml1", {
      content: "{content}",
      preferDOM: false
    }));

    var oTable = new sap.ui.table.Table({
      id: this.createId("blogarchiveTable"),
      selectionMode: sap.ui.table.SelectionMode.Single,
      rowHeight: 30,
      visibleRowCount: 5,
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
    oTable.attachRowSelectionChange(function(oEvent) {
      var context = oEvent.getParameter("rowContext");
      console.log("context is " + context);
      oPanel.setBindingContext(context);
    });

    oTable.getColumns()[0].setWidth("25%");
    
    return new sap.ui.commons.layout.VerticalLayout({
      content: [oTable, new sap.ui.commons.HorizontalDivider(), oPanel],
      width: "100%"
    });


  }

});
