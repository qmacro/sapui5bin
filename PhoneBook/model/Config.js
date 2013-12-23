jQuery.sap.declare("model.Config");

model.Config = {};

(function() {
	var responderOn = jQuery.sap.getUriParameters().get("responderOn");
	model.Config.isMock = ("true" === responderOn);
})();

model.Config.getServiceUrl = function() {

	return model.Config.getHost()
			+ "https://spreadsheets.google.com/feeds/cells/0AsSW06f14AJYdFg0Tmg1QkttU2hvaTJLeUEzaHdKeFE/od6/public/values?alt=json"; //&callback=cellEntries";

};

model.Config.getUser = function() {

	return "";

};

model.Config.getPwd = function() {

	return "";

};

model.Config.getHost = function() {

	return "http://www.plinky.it/examples/openUI5/phonebook/proxy.php?url=";

};

// @ sourceURL=./model/Config.js
