XMLResourceBundleDeclaration
============================

In the SDK Developer Guide docu, specifically the "The Model View Controller (MVC) Approach in SAPUI5" section, it says it's possible to declaratively specify a resource bundle in the XML view definition (see section "Data Binding in XML Views"). 

This is very neat, and saves on the usual incantations in, say, the Component definition, that would look like this:

    // set i18n model
    var i18nModel = new sap.ui.model.resource.ResourceModel({
        bundleUrl : "i18n/messageBundle.properties"
    });
    oView.setModel(i18nModel, "i18n");

Instead, you can declare this with a couple of attributes on the root (view) element:

	<mvc:View
		resourceBundleName="qmacro.i18n.messageBundle"
		resourceBundleAlias="i18n"
		...

This sapui5bin runnable shows this in action.
