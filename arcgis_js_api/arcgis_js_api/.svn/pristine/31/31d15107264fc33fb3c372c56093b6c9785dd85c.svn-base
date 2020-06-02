dojo.provide("extras.LayerListToggle");

// a simple class to show/hide the list of WebTiledLayers
// when the app's width is < 800px
dojo.declare("extras.LayerListToggle", null, {
  onMapStyle: null,
  offMapStyle: null,
  constructor: function(args) {
    // console.log("ctor args: ", args);
    dojo.mixin(this, args);
    this.onMapStyle = { 
      "background": "#777", 
      "left": "10px", 
      "padding": "5px",
      "position": "absolute", 
      "top": "10px", 
      "width": "12em",
      "zIndex": "40"
    };
    this.offMapStyle = { 
      "background": "", 
      "left": "", 
      "padding": "",
      "position": "", 
      "top": "", 
      "width": "",
      "zIndex": ""
    };
  },

  toggle: function() {
    // when the list is absolutely positioned, it's on the map
    var position = dojo.style(this.list, "position");
    // check position to find out where the list should be place
    var listOnMap = (position == "absolute") ? true : false;
    if ( listOnMap ) {
      this.moveToSidebar();
    } else {
      this.moveToMap();
    }
  },

  moveToMap: function() {
    // add shadow class, modify CSS
    dojo.addClass(this.list, "shadow");
    dojo.style(this.list, this.onMapStyle);
    // move layer list to be a child of the map
    dojo.place(this.list, "map", "first");
  },

  moveToSidebar: function() {
    // remove shadow class, modify CSS
    dojo.removeClass(this.list, "shadow");
    dojo.style(this.list, this.offMapStyle);
    // dom node to the side bar
    dojo.place(this.list, this.listContainer, "last");
  }
});
