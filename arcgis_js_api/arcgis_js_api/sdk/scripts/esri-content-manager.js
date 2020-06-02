define([
  "dojo/_base/declare", 
  "dojo/_base/lang", 
  "dojo/window", 
  "dojo/on", 
  "dojo/dom", 
  "dojo/dom-style", 
  "dojo/dom-class", 
  "dojo/dom-construct",
  "dojo/query", 
  "dojo/dom-geometry"
], function(
  declare, lang, win, on, dom, domStyle, domClass, domConstruct, domQuery, domGeom
) {
  var manager = declare([], {
    toc: null,
    tocId: null, // id for a content pane containing the table of contents
    topicPaneId: null, // id for a content pane that displays content
    deafultTopic: null,

    constructor: function(args) {
      this.toc = args.toc;
      this.tocId = args.tocId;
      this.topicPaneId = args.topicPaneId;

      // setContentHeight is called when the window is resized
      // give it proper context
      this.setContentHeight = lang.hitch(this, this.setContentHeight);
    }, 

    start: function() {
      // set toc and content area heights so that each is independently scrollable
      this.setContentHeight();
    },

    setContentHeight: function() {
      // resize the toc and content areas
      var contentHeight = this.calcContentHeight();
      var tocNode = domQuery(".grid_3.contentWrapper")[0];
      // topic node could be .grid_9.contentWrapper or .grid_12.contentWrapper
      // dependning on whether or not the TOC is visible
      var topicNode = domQuery(".grid_9.contentWrapper").length ? 
        domQuery(".grid_9.contentWrapper")[0] :
        domQuery(".grid_12.contentWrapper")[0];
      domStyle.set(tocNode, { height: contentHeight, overflow: "auto" });
      domStyle.set(topicNode, { height: contentHeight, overflow: "auto" });
    },

    calcContentHeight: function() {
      // figure out how big each pane should be
      var winHeight = win.getBox().h;
      var headerHeight = domGeom.getMarginBox(dom.byId("nav")).h;
      // console.log("win, header: ", winHeight, headerHeight);
      var tocNode = domQuery(".grid_3.contentWrapper")[0];
      var topMargin = domStyle.get(tocNode, "marginTop");
      var height = (winHeight - headerHeight - topMargin) + "px";
      return height;
    }
  });
  return manager;
});