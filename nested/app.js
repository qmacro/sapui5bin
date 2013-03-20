jQuery.sap.registerModulePath("nested", "http://localhost/nested");

// build the application shell and place on paged
var oShell = sap.ui.view({
    type : sap.ui.core.mvc.ViewType.JS,
    id : "shellView",
    viewName : "nested.views.shell"
});

oShell.placeAt("uiArea");

// Map Object
var map;
