sap.ui.jsview("resources.blogarchive", {
  getControllerName : function() {
    return "resources.blogarchive";
},

  createContent : function(oController) {

    console.log("in view resources.blogarchive createContent()");

    var postbody = new sap.ui.core.HTML("postbody", {content: "{content}"});

    var oPanel = new sap.ui.commons.Panel("postpanel", {
      width: "100%",
      title: new sap.ui.commons.Title({text: "{title}"}),
      content: postbody
    });

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
      console.log("rowSelectionChange!\n" + postbody.getContent());
      //oPanel.removeContent();
      //oPanel.addContent(postbody);
      oPanel.setBindingContext(context);
    });

    oTable.getColumns()[0].setWidth("25%");
    
    return new sap.ui.commons.layout.VerticalLayout({
      content: [oTable, new sap.ui.commons.HorizontalDivider(), oPanel],
      width: "100%"
    });
    //return oPanel;


  }

});
