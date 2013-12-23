sap.ui.jsview("view.App", {

	getControllerName: function () {
		return "view.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scrollbars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		this.app = new sap.m.SplitApp();
		
		this.app.addMasterPage(sap.ui.jsview("Master", "view.contactsMaster"));
		this.app.addDetailPage(sap.ui.jsview("Empty", "view.emptyView"));
		
		return new sap.m.Shell("Shell", {
			title : "{i18n>SHELL_TITLE}",
			showLogout : false,
			app : this.app,
			homeIcon : {
				'phone' : 'img/57_iPhone_Desktop_Launch.png',
				'phone@2' : 'img/114_iPhone-Retina_Web_Clip.png',
				'tablet' : 'img/72_iPad_Desktop_Launch.png',
				'tablet@2' : 'img/144_iPad_Retina_Web_Clip.png',
				'favicon' : 'img/favicon.ico',
				'precomposed': false
			}
		});
	}
});
//@ sourceURL=./view/App.view.js