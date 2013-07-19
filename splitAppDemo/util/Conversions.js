jQuery.sap.declare("util.Conversions");
jQuery.sap.require("sap.ui.core.format.DateFormat");

util.Conversions = {};

util.Conversions.AttchType2Icon = function(oValue, sInternalType){ 
	if (oValue == "pdf"){
		return "icons/pdf_attachment_32.png";
	}
	if (oValue == "pptx"){
		return "icons/ppt_attachment_32.png";
	}
	if (oValue == "jpg" || "png" || "bmp" || "gif"){
		return "icons/picture_32.png";
	}
	if (oValue == "docx"){
		return "icons/doc_attachment_32.png";
	}
	if (oValue == "xlsx"){
		return "icons/excel_attachment_32.png";
	}

	return "icons/attachment_32.png";
};

util.Conversions.Type2Icon = function(oValue, sInternalType){ 
	if (oValue == "Leave Request"){
		return "icons/general_leave_32.png";
	}
	
	if (oValue == "Purchase order"){
		return "icons/sales_order_32.png";
	}

	return "icons/approvals_32.png";
};

util.Conversions.Priority2Icon = function(oValue, sInternalType){ 
	if (oValue == "High"){
		return "icons/prio_high.png";
	}
	
	if (oValue == "Low"){
		return "icons/prio_low.png";
	}

	return "";
};

util.Conversions.DateShortYTT = function(oValue, sInternalType){
	if (!oValue) {
		return "";
	}
	var dValue = util.Conversions.createDate(oValue);
	var iDateDay = dValue.getDate();
	var iDateMonth = dValue.getMonth();
	var iDateYear = dValue.getFullYear();
	var dToday = new Date();
	if (iDateDay == dToday.getDate() && iDateMonth == dToday.getMonth() && iDateYear == dToday.getFullYear()){
		return sap.ui.getCore().getModel("i18n").getResourceBundle().getText("util.time.today");
	} 
	var iMilis = Date.parse(dToday) +  util.Conversions.iMillisInDay;
	var dTommorow = new Date(iMilis);
	if (iDateDay == dTommorow.getDate() && iDateMonth == dTommorow.getMonth() && iDateYear == dTommorow.getFullYear()){
		return sap.ui.getCore().getModel("i18n").getResourceBundle().getText("util.time.tomorrow");
	}
	var iMilis = Date.parse(dToday) -  util.Conversions.iMillisInDay;
	var dTYesterday = new Date(iMilis);
	if (iDateDay == dTYesterday.getDate() && iDateMonth == dTYesterday.getMonth() && iDateYear == dTYesterday.getFullYear()){
		return sap.ui.getCore().getModel("i18n").getResourceBundle().getText("util.time.yesterday");
	}
	var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({style:'short'}, oApp.Locale );
	return oDateFormat.format(dValue);	
};

util.Conversions.iMillisInDay = 24 * 60 * 60 * 1000;

util.Conversions.createDate = function(oValue){
	if (oValue instanceof Date){
		return oValue;
	}
	return new Date(Date.parse(oValue.toString()));
};

util.Conversions.Array2String = function(oValue, sInternalType){
	if (!oValue){
		return "";
	}
	var sRet = "";
	for(var i = 0; i <oValue.length; i++){
		if (i>0){
			sRet = sRet + "\n";
		}
		sRet = sRet + oValue[i];
	}
	return sRet;	
};

util.Conversions.DateShortYTTInText = function(sId){
	// var sInternalType = 'view.Detail.dueDate';	
	return function(oValue, sInternalType){
		return sap.ui.getCore().getModel("i18n").getResourceBundle().getText(sId, [util.Conversions.DateShortYTT(oValue, sInternalType)]);
	};
};
