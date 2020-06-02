require([
  "dojo/on", 
  "dojo/dom", 
  "js/esri-toc", 
  "js/esri-content-manager",
  "dojo/domReady!"
], function(
  on, dom, TOC, ContentManager
) {
  // prettify any code snippets
  prettyPrint();
 
  // create the TOC 
  var toc = new TOC({
    defaultContent: "intro_firstmap.html",
    node: dom.byId("toggleToc")
  });
  toc.highlightTopic();

  var manager = new ContentManager({
    toc: toc,
    tocId: "tutorialsToc",
    // topicBasePath: "../jshelp/",
    topicPaneId: "topicPane",
    defaultTopic: "intro_firstmap"
  });
  manager.start();

  // resize toc and content sections as the window resizes
  on(window, "resize", manager.setContentHeight);
});