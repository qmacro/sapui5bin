sap.ui.jsview("resources.blogrecent", {
  getControllerName : function() {
    return "resources.blogrecent";
  },

  createContent : function(oController) {
    return new sap.ui.commons.layout.VerticalLayout("recentLayout", {
      content: [
        new sap.ui.commons.TextView("recentTitle", {text: "{/entry/0/title}"}),
        new sap.ui.core.HTML("recentContent", {content: "{/entry/0/content}"})
      ]
    });
  }

});
