sap.ui.jsview("resources.about", {
  getControllerName : function() {
    return "resources.about";
  },

  createContent : function(oController) {
    var oHtml1 = new sap.ui.core.HTML("html1", {
      content:

        "<p>DJ Adams is an enterprise architect and open source programmer, author, and <a href='http://www.pipetree.com/qmacro/blog/2004/01/hawos-queen-of-grain-mills-2/'>bread-maker</a> living in Manchester. He has a degree in Latin &amp; Greek (Classics) from the University of London, and despite having been <a href='http://macdevcenter.com/pub/a/mac/2002/05/14/oreilly_wwdc_keynote.html?page=2'>referred to</a> as an <a href='http://radar.oreilly.com/2005/11/burn-in-7-dj-adams.html'>alpha geek</a>, can nevertheless tie his own shoelaces and drink <a href='http://untappd.com/user/qmacro/'>beer</a> without spilling it.</p>" +
        "<p>He hacks primarily on <a href='http://www.sap.com/index.epx'>SAP</a> systems for a living, and has been doing for over 20 years, cutting his teeth modifying SAP applications in <a href='http://www.cbttape.org/~jmorrison/s370asm/html/index.html'>S/370 assembler</a>, building realtime interfaces between forklift truck-mounted RF devices and SAP materials and warehouse modules in C (yes, this was pre-<a href='http://help.sap.com/printdocu/core/Print46c/EN/data/pdf/MMWMLVS/MMWMLVS.pdf'>MM-MOB and WM-LSR</a>!), and <a href='CV.html#astrazeneca'>most recently</a> integrating SAP, Ariba, Infor, Siebel, IXOS and Peoplesoft systems with a REST-based ERP business messaging gateway built on an SAP NetWeaver platform and processing tens of thousands of messages per day. Phew!</p>" + 
        "<p>He is an <a href='http://www.sdn.sap.com/irj/scn/weblogs?blog=/pub/wlg/15919'>SAP Mentor</a>, and in 2003 <a href='https://wiki.sdn.sap.com/wiki/display/profile/DJ+Adams'>helped</a> get the <a href='http://www.sdn.sap.com'>SAP Developer Network</a> (SDN) off the ground. He also spent a year working at SAP Walldorf in the 1990s, and is proud to still have some of his code and ideas in core SAP software.</p> " + 
        "<blockquote><p><a href'http://twitter.com/qmacro'>@qmacro</a> You're giving SAP Mentors much inspiration. You're a Mentor's Mentor!<br/><small><a href='http://twitter.com/ttrapp'>@ttrapp</a>, <a href='http://twitter.com/#!/ttrapp/status/54866644270456832'>4th April 2011</a></small></p></blockquote>" +
        "<p>He's recently become a <a href='http://networking.stemnet.org.uk/users/142234'>STEMNET Ambassador</a> and speaks to students in schools &amp; colleges in Manchester about technology and IT careers.</p>" +
        "<p>When not building and integrating systems, he advises enterprises on architecture and integration, from <a href='http://en.wikipedia.org/wiki/Service-oriented_architecture'>SOA</a> to <a href='http://en.wikipedia.org/wiki/Representational_State_Transfer'>REST</a>, from <a href='http://xmpp.org/extensions/xep-0060.html'>pubsub</a> (most recently with <a href='http://wiki.github.com/qmacro/coffeeshop'>Coffeeshop</a>) to <a href='http://xmpp.org'>messaging &amp; presence</a>, from <a href='http://www.rabbitmq.com/'>message queues</a> to <a href='http://blog.webhooks.org/'>webhooks</a>.</p>" +
        "<p>He has written two books for <a href='http://oreilly.com/'>O'Reilly</a>, on <a href='http://oreilly.com/catalog/9780596002022/'>Jabber (XMPP)</a> and on <a href='http://oreilly.com/catalog/9780596005504/'>Google</a>.</p>" +
        "<p>He is married to his theoretical childhood sweetheart <a href='/michelleadams/'>Michelle</a>, and has a son, <a href='http://jcla1.com'>Joseph</a>, of whom he's <strong>very</strong> proud.</p>" 

    });
    return oHtml1;
  }

});
