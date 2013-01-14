sap.ui.localResources("cart");
var my = my || {};

function getServiceUrl(sServiceUrl) {
	var sOrigin = window.location.protocol + "//" + window.location.hostname
			+ (window.location.port ? ":" + window.location.port : "");
	if (!jQuery.sap.startsWith(sServiceUrl, sOrigin)) {
		return "proxy/" + sServiceUrl.replace("://", "/");
	} else {
		return sServiceUrl.substring(sOrigin.length);
	}
};

my.formatCurrency = function (value) {
    return "$" + value.toFixed(2);
};

my.LineItem  = function(){
	var self = this;
	self.category = "";
	self.product = "";
	self.price = "";
	self.quantity = 1;
	self.subTotal = function() {
		return self.price ? self.price * parseInt("0" + self.quantity, 10) : 0;
	}; 
};

my.vm = (function (){
	var lines = new Array(),
		addLine = function (){
		 	lines.push(new my.LineItem());
		},
		removeLine = function(line){
			lines.splice( $.inArray(line,lines) ,1);
		},
		grandTotal = function(){
			  var total = 0; 
              $.each(lines, function(line) {
                  total += this.subTotal();
              });
              return total;
		},
		save = function(){
			var dataToSave = new Array();
	        dataToSave = $.map(lines, function(line) {
	            return {
	            	ProductID : line.product,
	            	UnitPrice : line.price,
	            	Quantity : line.quantity
	            } ;
	        });
	        return dataToSave;		
		};
		return{
			lines : lines,
			addLine : addLine,
			removeLine : removeLine,
			grandTotal : grandTotal,
			save : save			
		};
})();

var view = sap.ui.view({
	id : "idorder1",
	viewName : "cart.order",
	type : sap.ui.core.mvc.ViewType.JS
});
view.placeAt("content");