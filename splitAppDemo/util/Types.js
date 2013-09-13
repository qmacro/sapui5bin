jQuery.sap.declare("util.Types");

util.Types = function() {
};

util.Types.DATE = new sap.ui.model.type.Date({
	pattern : "yyyy-MM-dd"
});

util.Types.DATE_FULL = new sap.ui.model.type.Date({
	source : {
		pattern : "yyyy-MM-dd"
	},
	pattern : "EEE dd MMM. yyyy"
});