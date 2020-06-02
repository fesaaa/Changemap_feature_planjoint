// Class responsible for building the UI for sample categories
// and samples from a specific category.

define([
  "dojo/_base/declare", 
  "dojo/_base/lang",
  "dojo/dom", 
  "dojo/dom-construct", 
  "dojo/dom-style", 
  "dojo/_base/array", 
  "./esri-js-api-categories",
  "dojo/domReady!"
  ], 
  function(declare, lang, dom, dc, ds, arr, categoriesJson) {
  return declare([], {
    categoriesDom: null,
    categoriesJson: categoriesJson,
    categoriesRequest: null,
    showCategoryThumbnails: null,
    subDomain: "www",
    // subDomain: "devext",
    loaded: false,
    loading: "",
    rootCategories: null,
    rootSamples: null,
    thumbnailBase: "", 

    constructor: function(args) {
      this.loading = args.loading;
      this.subDomain = args.subDomain || this.subDomain;
      this.rootCategories = args.rootCategories;
      this.rootSamples = args.rootSamples;
      this.showCategoryThumbnails = args.showCategoryThumbnails;
      this.thumbnailBase = document.location.protocol + "//" + this.subDomain + ".arcgis.com/sharing/content/items/";
      if ( !this.showCategoryThumbnails ) {
        return;
      }
      this.buildCategoryThumbnails(this.categoriesJson);
    },

    buildCategoryThumbnails: function(response) {
      var rw = dc.create("div", {
        "class": "results-wrapper",
        "id": "category-thumbs"
      }); // parent node for categories

      var catList = dc.create("ul"); // unordered list node for sample chiclets

      // create a list item for each sample category
      arr.forEach(response, function(cat, idx) {
        var li = !(idx % 2) ? // add class="left" for even nodes, including zero
          dc.create("li", { "class": "left" }) : 
          dc.create("li");
        var sampleLink = dc.create("a", {
          "href": "index.html#" + cat.tag
        }, li);
        dc.create("img", {
          "align": "left",
          "alt": cat.name,
          "src": cat.thumbnail,
          "title": cat.name
        }, sampleLink);
        dc.create("span", {
          "innerHTML": cat.name
        }, sampleLink);
        dc.place(li, catList); // add each category to the list
      });
      dc.place(catList, rw); // add the category list to the page
      this.categoriesDom = rw;
      
      this.loaded = true;
      this.onLoad();
    },

    buildSampleThumbnails: function(response, category) {
      // remove previous sample markup, if it exists
      // use empty as the parent node will be re-used
      this.removeSamples(dc.empty);

      // console.log("build sample thumbs, length: ", response.results.length, this);
      
      // build markup for new samples
      var rw = dom.byId("sample-thumbs") || dc.create("div", {
        "class": "results-wrapper",
        "id": "sample-thumbs"
      // }, dom.byId("content-wrapper")); // parent node for categories
      });

      // only samples with both a snippet and url will be displayed
      var samples = arr.filter(response.results, function(r) { 
        return r.title && r.snippet && r.url;
      });
      // console.log("results and samples lengths: ", response.results.length, samples);

      // show number of samples returned in a div
      var suffix = (samples.length === 1) ? " sample" : " samples";
      var resultLabel = "";
      if ( category ) {
        resultLabel = category + " category:  ";
      } else {
        resultLabel = "Search results:  ";
      }
      dc.create("div", {
        "id": "resultCount",
        "innerHTML": resultLabel + samples.length + suffix
      }, rw);

      var hashPieces = location.hash.split("/");
      var s = (samples.length === 1) ? " sample" : " samples";
      if ( hashPieces.length > 1 && hashPieces[1] === "category" ) {
        dc.create("span", {
          "innerHTML": "\"" + hashPieces[2] + "\" category (" + samples.length + s + ")"
        }, rw);
      } else if ( hashPieces.length > 1 && hashPieces[1] === "search") {
        dc.create("span", {
          "innerHTML": "samples matching: \"" + hashPieces[2] + "\" (" + samples.length + s + ")"
        }, rw);
      }

      // sort the samples so that samples tagged with jssample_archive are
      // shown after all other samples
      samples.sort(function(a, b) {
        if (arr.indexOf(a.tags, "jssample_archive") > -1) {
          return 1;
        }
        if (arr.indexOf(b.tags, "jssample_archive") > -1) {
          return -1;
        }
        return 0;
      });

      var sampleList = dc.create("ul"); // unordered list node for sample chiclets

      // create a list item for each sample category
      arr.forEach(samples, function(sample, idx) {
        // console.log("archived? ", sample.title, arr.indexOf(sample.tags, "jssample_archive"));
        var li = !(idx % 2) ? // add class="left" for even nodes, including zero
          dc.create("li", { "class": "left" }) : 
          dc.create("li");
        // find the ugly sample name and build the URL to the description page
        var pieces = sample.url.split("/samples/");
        var uglyName = pieces[pieces.length - 1].replace("/", "");
        // console.log("uglyName:  ", uglyName);
        var sampleLink = dc.create("a", {
          "href": uglyName + ".html",
          "target": "_blank"
        }, li);
        dc.create("img", {
          "align": "left",
          "alt": sample.title,
          "src": this.thumbnailBase + sample.id + "/info/" + sample.thumbnail,
          "title": sample.title
        }, sampleLink);
        
        // trim long sample snippets
        var sampleSnippet = (sample.snippet.length > 200) ? 
          sample.snippet.slice(0, 197) + "..." :
          sample.snippet;

        dc.create("span", {
          "class": "break-word",
          // wrap in p tag so "word-wrap: break-word" works
          "innerHTML": "<p>" + sample.title + ":  " + sampleSnippet + "</p>"
        }, sampleLink);
        dc.place(li, sampleList); // add each category to the list
      }, this);
      // insert the sample markup
      dc.place(sampleList, rw); // add the category list to the page
      dc.place(rw, this.rootSamples, "before");
      // scroll to top
      // window.scrollTo(0, 0);
      rw.scrollIntoView();
    },

    empty: function() {
      this.removeCategories();
      this.removeSamples(dc.empty);
    },

    removeCategories: function() {
      var categoriesDom = dom.byId("category-thumbs");
      if ( categoriesDom ) {
        dc.destroy(categoriesDom);
        // console.log("removed category thumbnails");
      }
    },

    removeSamples: function(method) {
      var current = dom.byId("sample-thumbs");
      if ( current ) {
        method(current);
      }
    },

    showCategories: function() {
      // console.log("samples-ui: show cats top", this.categoriesJson, this.categoriesDom);
      if ( !this.categoriesJson || !this.categoriesDom ) {
        // console.log("cat json or dom does not exist...return");
        return;
      } 

      // console.log("samples-ui: past cat json/dom check");
      // remove any sample thumbnails
      // use destory as the container needs to be completely removed
      this.removeSamples(dc.destroy); 
      
      // console.log("samples-ui: called remove samples");
      // copy the DOM structure for the categories
      // insert the copy so it can be destroyed without worry
      var clonedCategories  = lang.clone(this.categoriesDom);
      dc.place(clonedCategories, dom.byId(this.rootCategories), "before");
      // console.log("samples-ui: placed cloned cats", clonedCategories, dom.byId("samplePane"));
      this.hideLoading();
    },

    showSamples: function(response, category) {
      // console.log("show samples", this);
      this.removeCategories();
      // console.log("in show samples: ", category);
      this.buildSampleThumbnails(response, category);
      this.hideLoading();
    },

    onLoad: function() {
      // stub for an event listener
      // console.log("\tonLoad fired");
    },

    showLoading: function() {
      if ( !dom.byId(this.loading) ) {
        // create the loading message element if it doesn't exist
        // this is necessary when on a page for a specific sample
        dc.create("div", {
          innerHTML: "Loading thumbnails...<img src=\"../graphics/loading_black.gif\">",
          id: "samplesLoading",
          style: {
            display: "none"
          }
        }, this.rootCategories);
      }
      ds.set(dom.byId(this.loading), "display", "block");
    },

    hideLoading: function() {
      ds.set(dom.byId(this.loading), "display", "none");
    },

    error: function(err) {
      console.log("generic error from esriSamplesUI: ", err);
    }
  });
});
