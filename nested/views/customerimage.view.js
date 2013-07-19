sap.ui.jsview("nested.views.customerimage", {

	getControllerName : function() {
		return "nested.controller.customers";
	},

	/**
	 * 
	 * @param oController
	 * @returns {sap.ui.cre.Control}
	 */
	createContent : function(oController) {
		var c = sap.ui.commons;
		var aControls = [];

		oImage = new c.Image("img",{width: "180px", height: "200px"}).bindProperty("src", "CustomerID", function(aVal) {
		  return  "Images/Customers/" + aVal + ".jpg";
       		 });

		aControls.push(oImage);
		return aControls;
	}
});