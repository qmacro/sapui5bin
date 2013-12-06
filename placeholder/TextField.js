 (function () {
    /**
     * this control extends the standard Textfield and adds placeholder like
     * functionality for browsers that dont support 'placeholder' eg <ie9
     * if the Textfield value is initial the placeholder text is set, on focus
     * the placeholder text is removed, uses the following style
     *    .placeHolder { color: #b3b3b3 !important} 
     */

    "use strict";
    /*jslint browser: true*/
    /*global jQuery,sap*/
    jQuery.sap.declare("my.controls.TextField");
    jQuery.sap.require("sap.ui.commons.TextField.extend");
    sap.ui.commons.TextField.extend("my.controls.TextField", {
        renderer: {
            renderInnerAttributes: function (oRm, oTextField) {
                if (!this.isInputSupported) {
                    if (oTextField.getValue() === oTextField.getPlaceholder()) {
                        oRm.addClass('placeHolder'); //set placeholder class
                    }
                }
            },
        },

        init: function () {
            if (sap.ui.commons.TextField.init) { // check whether superclass has an init() method
                sap.ui.commons.TextField.init.apply(this, arguments); // call super.init()
            }

            // determine whether placeholders are supported
          this.isInputSupported = 'placeholder' in document.createElement('input');
        },

        setPlaceholder: function (text) {
            sap.ui.commons.TextField.prototype.setPlaceholder.apply(this, arguments); //call super methods	
            if (!this.isInputSupported && this.getValue() === "") {
                this.setValue(text); //value === placeholder
            }
        },

        onfocusin: function () { //onFocus clear placeholder
            sap.ui.commons.TextField.prototype.onfocusin.apply(this, arguments); //call super methods
            if (this.getValue() === this.getPlaceholder()) {
                this.setValue("");
                jQuery.sap.byId(this.getId()).removeClass('placeHolder');
            }
        },

        onfocusout: function () { //onBlur set placeholder
            sap.ui.commons.TextField.prototype.onfocusout.apply(this, arguments); //call super methods
            if (this.getValue() === '' && !this.isInputSupported) {
                this.setValue(this.getPlaceholder());
                jQuery.sap.byId(this.getId()).addClass('placeHolder');
            }
        }
    });
}());