require([
  "dojo/_base/connect", 
  "dojo/_base/event",
  "dojo/dom", 
  "dojo/dom-style", 
  "dojo/dom-class", 
  "dojo/dom-attr", 
  "dojo/dom-construct", 
  "dojo/on", 
  "dojo/query", 
  "dojo/string", 
  "dojo/_base/array", 
  "dojo/has",
  "dojo/window", 
  "dojo/dom-geometry",
  "js/esri-samples-search", 
  "js/esri-samples-ui", 
  "js/esri-toc",
  "esri/config",
  "dojo/domReady!"
  ],
  function(conn, evt, dom, domStyle, domClass, domAttr, domConstruct, on, domQuery, string, arr, has, win, domGeom, sampleSearch, sampleUI, sampleToc, esriConfig) {
    esriConfig.defaults.io.proxyUrl = "/proxy";
    var path = window.location.pathname;
    var pathPieces = path.split("/");
    // look for index.html in the url or, if after splitting on / 
    // the last piece of pathname is an empty string
    // isIndexPage is used to decided whether or not to display sample
    // thumbnails when clicking on a category 
    // 
    // show thumbnails when on the index page but not when on a specific sample page
    var isIndexPage = (path.indexOf("index.html") > -1) || (pathPieces[pathPieces.length - 1] === "");

    // specify whether to use dev or production
    // used by esri-samples-search and esri-samples-ui
    // var subDomain = "devext";
    var subDomain = "www";
    // var groupId = "5ee54ab665164db29ea9cfd0bafb89ed"; // devext
    var groupId = "b99ada9698614e97a4859e9fc160169d"; // production

    // class to search samples or retrieve samples from a category
    var samples = new sampleSearch({
        subDomain: subDomain,
        groupId: groupId
    });

    // if search form exists, hook up search
    var searchForm = dom.byId("searchForm");
    if ( searchForm ) {
      // enable the search term field
      var searchBox = dom.byId("searchKeyWord");
      domAttr.set(searchBox, "disabled", false);
      
      // search samples or display samples in a category 

      // show thumbnails for sample categories if not on the index.html
      var thumbnails = new sampleUI({ 
        loading: "samplesLoading",
        rootCategories: "wh_footer",
        rootSamples: "samplePane",
        showCategoryThumbnails: isIndexPage,
        subDomain: subDomain,
        groupId: groupId
      });

      // wire up the search form
      // console.log("search form: ", searchForm, evt);
      conn.connect(searchForm, "submit", function(e) {
        // console.log("form submitted, stopping event", e);
        evt.stop(e);
        var term = dom.byId("searchKeyWord").value;
        search(e);
        // add the search term to the url
        // go to /index.html if not currently on that page
        if ( window.location.pathname.indexOf(".html") > -1 ) {
          // remove file name from the path
          var path = window.location.pathname.replace(/\/[a-zA-Z_]*\.html/, "/");
          // console.log("new path:  ", path);
          window.location = path + "#search/" + term;
        } else {
          // console.log("no .html in pathname", window.location.pathname);
          window.location.hash = "#search/" + term;
        }
      });

      // load sample thumbnails is there's a category name in the URL hash
      var hash = window.location.hash;
      if ( hash.length < 2 ) {
        // load thumbnails for each category
        if ( thumbnails.loaded ) {
          thumbnails.showCategories();
        } else {
          var thumbnailsLoad = conn.connect(thumbnails, "onLoad", function() {
            conn.disconnect(thumbnailsLoad);
            thumbnails.showCategories();
          });
        }
      } else {
        // console.log("got a hash...!");
        if ( hash.indexOf("search") === 1 ) {
          // load sample thumbnails that match a search term
          var term = hash.split("search/");
          if ( term.length === 2 ){
            term = unescape(term[1]);
            // console.log("search term from hash: ", term);
            dom.byId("searchKeyWord").value = term;
            search(term);
          }
        } else {
          // need to expand category and load samples thumbnails for that category
          var category = hash.split("#")[1].toLowerCase();
          var categoryNodes = domQuery("span.category", dom.byId("samplesToc"));
          var node = arr.filter(categoryNodes, function(n) {
            // console.log("compare: ", formatCategory(n.innerHTML), category)
            return formatCategory(n.innerHTML) === category;
          }, this);
          if ( node[0] ) {
            // expand the TOC
            // expandCollapse and clickAnchor are defined in tree.js
            expandCollapse(node[0]);
            clickAnchor(node[0]);

            // scroll the catgory of interst into view and display thumbnails
            node[0].scrollIntoView();
            // console.log("about to display sampels for: ", string.trim(node[0].innerHTML));
            displayCategory(category, string.trim(node[0].innerHTML));
          }
        }
      }
    }

    // listen to TOC clicks, expand/collapse as necessary and load thumbnails
    on(dom.byId("samplesToc"), "click", function(e) {
      // console.log("category click: ", e);
      // check that a category name or an arrow 
      // next to a category name was clicked
      var isCategory = domClass.contains(e.target, "category");
      var isCategoryIcon = domClass.contains(e.target, "treeLinkImage");
      if ( !isCategory && !isCategoryIcon ) {
        return;
      }

      if ( isCategoryIcon ) {
        // clicked an icon, find the closest span.category
        // and set that to the event's target
        var catNode = domQuery("span.category", e.target.parentNode)[0];
        delete e.target;
        e.target = catNode;
      }

      // only change the URL when on index.html and a new category is clicked
      if ( isIndexPage ) {
        var category = formatCategory(e.target.innerHTML);
        // console.log("used toc to format category", category);
        var current = window.location.hash;
        var next = "#" + category;
        // console.log("cur and next: ", current, next, current !== next);
        // only update the UI if a new category was clicked
        if ( current !== next ) {
          thumbnails.empty();
          thumbnails.showLoading();
          window.location.hash = next;
          // console.log("updated hash to: ", next);
          // console.log("sample toc click: ", category);
          displayCategory(category, e.target.innerHTML);
        }
      }
    });

    // manage TOC state
    var toc = new sampleToc({ 
      defaultContent: ".",
      node: dom.byId("toggleToc")
    });
    toc.highlightTopic();

    prettyPrint();

    function search(e) {
      thumbnails.empty();
      thumbnails.showLoading();
      // check if the class to query samples is loaded
      if ( samples.loaded ) {
        _search(e);
      } else {
        var loadConnect = conn.connect(samples, "onLoad", function() {
          conn.disconnect(loadConnect);
          _search(e);
        });
      }
    }

    function _search(e) {
      // console.log("into _search");
      var term = (typeof e === "string") ? e : domQuery("#searchKeyWord", e.target)[0].value;
      // console.log("term: ", term);
      // var searchResult = samples.byKeyword(unescape(e.params.term));
      var searchResult = samples.byKeyword(unescape(term));
      searchResult.then(function(response) {
        // console.log("search results: ", response);
        thumbnails.showSamples(response);
        // console.log("called thumbnails.showSamples");
        // ds.set("spinner", "visibility", "hidden");
        // ds.set("searchButton", "disabled", "false");
      }, function(error) {
        // ds.set("spinner", "visibility", "hidden");
        // ds.set("searchButton", "disabled", "false");
        console.log("search error: ", error);
      });
    }

    function displayCategory(category, displayName) {
      // console.log("category handler: ", category);
      if ( samples.loaded ) {
        _displayCategory(category, displayName);
      } else {
        var loadConnect = conn.connect(samples, "onLoad", function() {
          conn.disconnect(loadConnect);
          _displayCategory(category, displayName);
        });
      }
    }

    function _displayCategory(category, displayName) {
      var results = samples.byCategory(category);
      results.then(function(response) {
        // console.log("byCat results: ", response);
        // clear out any previous content
        // domConstruct.empty("samplePane");
        // display sample thumbnails
        thumbnails.showSamples(response, displayName);
      }, function(error) {
        console.log("error from display category: ", error);
        // ds.set("spinner", "visibility", "hidden");
      });    
    }

    // set toc and content area heights so that each is independently scrollable
    setContentHeight();

    // resize as the window resizes
    on(window, "resize", setContentHeight);

    function setContentHeight() {
      // resize the toc and content areas
      var contentHeight = calcContentHeight();
      var tocNode = domQuery(".grid_3.contentWrapper")[0];
      // topic node could be .grid_9.contentWrapper or .grid_12.contentWrapper
      // dependning on whether or not the TOC is visible
      var topicNode = domQuery(".grid_9.contentWrapper").length ? 
        domQuery(".grid_9.contentWrapper")[0] :
        domQuery(".grid_12.contentWrapper")[0];
      domStyle.set(tocNode, { height: contentHeight, overflow: "auto" });
      domStyle.set(topicNode, { height: contentHeight, overflow: "auto" });
    }

    function calcContentHeight() {
      // figure out how big each pane should be
      var winHeight = win.getBox().h;
      var headerHeight = domGeom.getMarginBox(dom.byId("nav")).h;
      // console.log("win, header: ", winHeight, headerHeight);
      var tocNode = domQuery(".grid_3.contentWrapper")[0];
      var topMargin = domStyle.get(tocNode, "marginTop");
      var height = (winHeight - headerHeight - topMargin) + "px";
      return height;
    }

    // remove leading and trailing whitespace
    // replace all spaces between words with underscores
    // string is dojo/string
    function formatCategory(c) {
      var formatted = string.trim(c).toLowerCase().replace(/ /g, "_").replace(/\./g, "_");
      return formatted;
    }
  }
);
