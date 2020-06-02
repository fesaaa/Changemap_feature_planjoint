define([
  "dojo/_base/declare", "dojo/_base/lang", "dojo/json", "esri/request", "esri/utils", "esri/arcgis/Portal"
], function(
  declare, lang, JSON, esriRequest, esriUtils, esriPortal
) {
  return declare([], {
    // group ID for JS API samples
     groupId: "b99ada9698614e97a4859e9fc160169d", // production
    // groupId: "5ee54ab665164db29ea9cfd0bafb89ed", // devext 
     subDomain: "www",
    // subDomain: "devext",
    loaded: false,
    portal: null,
    portalGroup: null,
    portalUrl: null,
    tagLookup: null,
    // default query string properties to search for samples
    timer: null, // used to throttle searches done by byKeyword

    constructor: function(options) {
      this.subDomain = options.subDomain || this.subDomain;
      this.groupId = options.groupId || this.groupId;
      this.portalUrl = document.location.protocol + "//" + this.subDomain + ".arcgis.com";
      this.portal = new esri.arcgis.Portal(this.portalUrl);
      this.portal.queryGroups({
        q: this.groupId
      }).then(lang.hitch(this, function(groups) {
        // console.log("queryGroups: ", groups);
        this.portalGroup = groups.results[0];
        this.loaded = true;
        this.onLoad();
      }), function(error) {
        console.log("error querying Portal groups: ", error);
      });

      this.tagLookup = {
        "latest_samples": "new",
        "api_tour": "intro",
        "map": "map",
        "map_configuration": "mapconfig",
        "html5": "html5",
        "widgets": "widget",
        "layers": "layers",
        "vector_feature_layers": "feature_layer",
        "popups_and_info_windows": "popups",
        "layouts": "layout",
        "bing_maps": "bing",
        "time": "time",
        "graphics": "graphics",
        "renderers": "renderer",
        "editing": "editing",
        "query_and_select": "query",
        "find_and_identify": "find_identify",
        "geocoding": "geocoding",
        "geoprocessing": "geoprocessing",
        "network_analyst": "network_analyst",
        "toolbars": "toolbar",
        "geometry_service": "geometry_service",
        "image_services": "image_service",
        "mobile": "mobile",
        "maps_from_arcgis_com": "arcgis_online",
        "portal": "arcgis_portal_api",
        "data_access": "data_access",
        "javascript_frameworks": "javascript_framework",
        "arcgis_server_10.1": "arcgis_server_ten_one",
        "arcgis_server": "arcgis_server",
        "analytics": "analytics",
        "secure_resources": "security",
        "directions_and_routing": "directions",
        "printing": "printing",
        "dynamic_layers": "dynamic_layer",
        "tiled_layers": "tiled_layer",
        "image_layers": "raster_layer"
      };

      // the three functions below are provided as callbacks 
      // use hitch to make sure they execute in the proper context
      this.categoryResults = lang.hitch(this, this.categoryResults);
      this.nameResults = lang.hitch(this, this.nameResults);
      this.nextResults = lang.hitch(this, this.nextResults);
    },

    byCategory: function(category) {
      // console.log("in by cat: ", this.portalGroup);
      var tag = this.tagLookup[category];
      var groupQuery = {
        // query by tag, category name tags are prefixed with "jssample_"
        q: "jssample_" + tag + " NOT jssample_archive", 
        // q: "jssample_" + tag, 
        num: 100,
        sortField: "title"
      };
      return this.portalGroup.queryItems(groupQuery);
    },

    byKeyword: function(keyword) {
      // save keyword in a feature service on arcgis.com
      this.saveKeyword(keyword);
      // console.log("sample search byKeyword");
      var groupQuery = {
        // query by keyword, return up to 100 samples
        // wrap in parens to make the query a group
        // q: "(" + keyword + " NOT jssample_archive)",
        q: "(" + keyword + ")",
        num: 100,
        sortField: "title"
      };
      return this.portalGroup.queryItems(groupQuery);
    },

    byName: function(name) {

    },

    getNextPage: function(offset) {

    },

    categoryResults: function(response) {
      // console.log("results from search by category: ", response);
      return response;
    },

    nameResults: function(response) {

    },

    nextResults: function(response) {

    },

    onLoad: function() {
      // onLoad event
    },

    saveKeyword: function(keyword) {
      // max length for keyword is 256
      keyword = keyword.slice(0, 256);
      // console.log("save keyword:  ", keyword);
      var content = {
        features: [JSON.stringify({
          "geometry":null,
          "attributes": { 
            "env": this.subDomain,
            "term": keyword,
            "when": "" + new Date().getTime()
          }
        })],
        rollbackOnFailure: false,
        f: "json"
      };
      var url = document.location.protocol + "//services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/js-search-terms/FeatureServer/0/addFeatures";
      esriRequest({
        url: url,
        content: content
      }, { usePost: true }).then(
        function(success) {
          // console.log("esri-samples-search::save succeeded:  ", success);
        }, 
        function(error) {
          // console.log("esri-samples-search::save failed:  ", error);
        }
      );
    },

    error: function(err) {
      console.log("error searching for samples: ", error);
    }
  });
});

