define([
  "dojo/_base/declare",
  "dojo/_base/array", 
  "dojo/_base/event",
  "dojo/_base/lang",
  "dojo/dom", 
  "dojo/dom-style",
  "dojo/dom-class",
  "dojo/dom-attr",
  "dojo/dom-construct",
  "dojo/dom-geometry",
  "dojo/query", 
  "dojo/on", 
  "dojo/keys",
  "dojo/string"
], function(
  declare, array, event, lang, dom, domStyle, domClass, domAttr, domConstruct, domGeometry, domQuery, on, keys, string
) {
    var kidney = declare(null, {
      classList: null,
      classMatches: null,
      classNodes: null, // array holding dom nodes that match current search term
      selectedIndex: null, // index of node in classNodes that is currently selected
      selectedNode: null,

      form: null,
      formContentBox: null,
      input: null,
      results: null,
      baseUrl: null,

      ignore: null,
      upDown: null,

      constructor: function(args) {
        // console.log("ctor...args: ", args);
        lang.mixin(this, args);

        this.selectedIndex = -1;

        this.ignore = [ 
          keys.SHIFT, 
          keys.CTRL, 
          keys.ALT, 
          keys.META, 
          keys.copyKey, 
          keys.CAPS_LOCK,
          keys.LEFT_ARROW,
          keys.RIGHT_ARROW
        ];
        this.upDown = [
          keys.UP_ARROW, 
          keys.DOWN_ARROW
        ];

        // prevent form submission 
        // this will change when there's a new search index to search
        on(this.form, "submit", function(e) {
          event.stop(e);
        });

        domAttr.set(this.input, "disabled", false);

        // give the search box focus
        this.input.focus();
        // monitor changes
        on(this.input, "keyup", lang.hitch(this, this.checkInput));

        // dom node where links to class docs will be inserted
        // var results = dom.byId("results");
        this.results = domConstruct.create("div", {
          id: "results",
          style: {
            overflow: "auto",
            visibility: "hidden",
            width: domStyle.get(this.input, "width") + "px"
          }
        }, this.form);
        
        this.formContentBox = domGeometry.getContentBox(this.form);
        // set content box immediately so that appending the auto-complete 
        // results later doesn't push the rest of the page content down
        domGeometry.setContentSize(this.form, this.formContentBox);
      },

      checkInput: function(e) {
        // bail if a non-letter key was pressed
        if ( array.indexOf(this.ignore, e.keyCode) > -1 ) {
          // console.log("key we can ignore: ", e.keyCode);
          return;
        }

        // check for up or down arrow
        if ( array.indexOf(this.upDown, e.keyCode) > -1 ) {
          // select next/previous result in list
          // console.log("need to select a class");

          // don't do anything if the results div isn't showing
          if ( domStyle.get(this.results, "visibility") === "hidden" ) {
            return;
          }

          // if no selection, select first result in the list
          if ( this.selectedIndex === -1 ) {
            this.selectedIndex = 0;
            this.selectedNode = this.classNodes[this.selectedIndex];
            domClass.add(this.selectedNode, "selected");
            // console.log("no selection...set selected to: ", this.selectedNode);
            return;
          }

          if ( this.selectedIndex > this.classNodes.length - 1 ) {
            this.resetSelectedIndex();
          }

          if ( e.keyCode === keys.UP_ARROW ) {
            // up arrow pressed, select the previous result
            if ( this.selectedIndex > 0 && this.selectedIndex < this.classNodes.length ) {
              domClass.remove(this.selectedNode, "selected");
              this.selectedIndex--;
              this.selectedNode = this.classNodes[this.selectedIndex];
              domClass.add(this.selectedNode, "selected");
            }
          }

          if ( e.keyCode === keys.DOWN_ARROW ) {
            // console.log("down arrow");
            // down arrow pressed, selected the next result
            if ( this.selectedIndex < this.classNodes.length - 1 ) {
              domClass.remove(this.selectedNode, "selected");
              this.selectedIndex++;
              this.selectedNode = this.classNodes[this.selectedIndex];
              domClass.add(this.selectedNode, "selected");
            }
          }
          return;
        }

        // currently hardcoded to max out at 10 results
        // maybe make this configurable?
        this.classMatches = this.findMatches(this.input.value, 10);
        // console.log("found: ", this.classMatches);

        // if no matches, hide the auto-complete div and bail
        if ( this.classMatches.length === 0 ) {
          domStyle.set(this.results, "visibility", "hidden");
          domGeometry.setContentSize(this.form, this.formContentBox);
          return;
        }

        // hide the auto-complete results and clear the selected node
        // when there's only white space or a single character in the box
        if ( this.input.value.length < 2 || string.trim(this.input.value) === "" ) {
          domStyle.set(this.results, "visibility", "hidden");
          domGeometry.setContentSize(this.form, this.formContentBox);
          this.resetSelectedIndex();
          // console.log("\t0 or 1 characters...", this.input.value.length);
          return;
        }

        // append class names to auto-complete result div
        var resultsWrapper = domConstruct.create("div");
        this.classNodes = array.map(this.classMatches, function(c) {
          return this.makeClassLink(c[0], resultsWrapper);
        }, this);
        domConstruct.empty(this.results);
        this.resetSelectedIndex();
        domConstruct.place(resultsWrapper, this.results);
        domStyle.set(this.results, "visibility", "visible");
        // console.log("showing class nodes: ", this.classNodes);

        // console.log("keyup!", this.value, e.keyCode, e);
        if ( e.keyCode === keys.ENTER ) {
          // console.log("hit enter...go to first or selected result");
          // console.log("selected: ", this.selectedNode.href);
          var href;
          if ( !this.selectedNode ) {
            var selected = domQuery("a.selected", this.results)[0];
            if ( !selected.href ) {
              return;
            } else {
              href = selected.href;
            }
          } else {
            href = this.selectedNode.href;
          }
          // go to the amd specific page
          window.location = href.replace(".html", "-amd.html");
        }
      },

      findMatches: function(term, max) {
        // search the classList for matches
        // until the max number of results is reached 
        // or the entire list has been searched
        // 
        // each item in matches is an array
        // first item is the class name that matched
        // second item is the position in the string where the match was found
        // the position is used to sort the matches
        // classes where the match occurs earlier in the string are shown first
        // in the list of potential matches
        var matches = [];
        for ( var i = 0; i < this.classList.length; i++ ) {
          // do not need to use array.indexOf because classList[i] is a string
          var pos = this.classList[i].toLowerCase().indexOf(term.toLowerCase());
          if (  pos > -1 ) {
            // display only class name in most cases
            // in some cases, things like "esri.domUtils" will be displayed
            var classMatch = this.classList[i].split(".");
            classMatch.splice(0, 1);
            var className = classMatch.join(".");
            matches.push([className, pos]);
            // matches.push([this.classList[i], pos]);
          }
          if ( matches.length === max ) {
            break;
          }
        }
        // display shorter class names first
        matches.sort(function(a, b) {
          // console.log(a, b, a[1], b[1]);
          if ( a[1] < b[1] ) {
            return -1;
          }
          if ( a[1] > b[1] ) {
            return 1;
          }
          return 0;
        });
        // console.log("find matches returning", matches);
        if ( matches.length === 0 ) {
          matches.push(["No classes found.", 0]);
        }
        return matches;
      },

      makeClassLink: function(fullName, parent) {
        if ( fullName === "No classes found." ) {
          return domConstruct.create("span", { 
            "innerHTML": fullName
          }, parent);
        }
        var href = this.baseUrl + fullName + ".html";
        var link = domConstruct.create("a", {
          "class": "classMatch",
          "href": href.toLowerCase(),
          "innerHTML": fullName
        }, parent);
        return link;
      },

      resetSelectedIndex: function() {
        this.selectedIndex = -1;
      }
  
    });

    return kidney;
  }
);