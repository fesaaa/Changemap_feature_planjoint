// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/GeocodeReview/templates/Review.html":'\x3cdiv style\x3d"width:100%; height:100%;"\x3e\r\n  \x3cdiv class\x3d"${baseClass}" data-dojo-attach-point\x3d"BorderContainerNode"  data-dojo-type\x3d"dijit.layout.BorderContainer" gutters\x3d"false"\x3e\r\n    \x3cdiv id\x3d"${headerID}" class\x3d"esriControllerContainer" data-dojo-type\x3d"dijit/layout/ContentPane" data-dojo-props\x3d"region: \'top\'"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"stackControllerNode" data-dojo-type\x3d"dijit.layout.StackController" data-dojo-props\x3d"containerId:\'${stackContainerID}\'"\x3e\x3c/div\x3e\r\n      \x3cdiv class\x3d"learnMoreDiv"\x3e\x3cspan\x3e\x3ca href\x3d"#"\x3e${i18n.common.learnMore}\x3c/a\x3e\x3c/span\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"StackContainerNode" id\x3d"${stackContainerID}" data-dojo-props\x3d"region: \'center\'" data-dojo-attach-point\x3d"stackContainerNode" data-dojo-type\x3d"dijit/layout/StackContainer" style\x3d"width:100%; height:100%;"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"_tab1Node" data-dojo-type\x3d"dijit/layout/ContentPane" name\x3d"Unmatched" title\x3d"${unmatchedUC}"\x3e\r\n        \x3cdiv class\x3d"esriGeocodeGrid" data-dojo-attach-point\x3d"_grid1Node"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv  data-dojo-attach-point\x3d"_tab2Node"  data-dojo-type\x3d"dijit/layout/ContentPane" name\x3d"Matched" title\x3d"${matchedUC}"\x3e\r\n        \x3cdiv class\x3d"esriGeocodeGrid" data-dojo-attach-point\x3d"_grid2Node"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv  data-dojo-attach-point\x3d"_tab3Node"  data-dojo-type\x3d"dijit/layout/ContentPane" name\x3d"Reviewed" title\x3d"${reviewedUC}"\x3e\r\n        \x3cdiv class\x3d"esriGeocodeGrid" data-dojo-attach-point\x3d"_grid3Node"\x3e\x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n\r\n'}});
define("esri/dijit/GeocodeReview","require dojo/on dojo/Evented dojo/has dojo/_base/declare dojo/_base/lang dojo/_base/Deferred dojo/_base/array dojo/text!./GeocodeReview/templates/Review.html dojo/i18n!../nls/jsapi dojo/store/Memory dojo/string dojo/dom dojo/dom-style dojo/dom-class dijit/_WidgetBase dijit/_OnDijitClickMixin dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dgrid/OnDemandGrid dgrid/Selection dgrid/Keyboard dgrid/editor dgrid/extensions/DijitRegistry dgrid/extensions/ColumnHider ../graphic ../geometry/Extent ../geometry/Point ../geometry/webMercatorUtils ../symbols/PictureMarkerSymbol ../tasks/query ../layers/FeatureLayer ../layers/GraphicsLayer ../request ../arcgis/utils ../kernel dijit/layout/StackController dijit/layout/StackContainer dijit/layout/ContentPane dijit/layout/BorderContainer".split(" "),
function(m,k,n,E,t,f,F,u,G,h,l,p,H,v,w,I,J,K,L,M,N,O,z,P,Q,q,A,R,B,x,y,r,S,C,D,T){n=t([I,J,K,L,n],{baseClass:"esriReviewContainer",loaded:!1,templateString:G,widgetsInTemplate:!0,i18n:h,map:null,graphicsLayer:null,suggestionGraphic:null,matchGraphic:null,highlightGraphic:null,_featureLayerCount:null,_tableLayerCount:null,_keywordMap:null,_keywordArray:[],_singleLineInput:!0,_arcgisUrl:f.getObject("esri.arcgis.utils.arcgisUrl"),constructor:function(a,b){t.safeMixin(this,a);this.StandardGrid=t([P,M,
N,O,z,Q]);this._defineGridStores();this._defineColumns();this.stackContainerID=b+"_stackContainerNode";this.headerID=b+"_HeaderNode";this.unmatchedUC=h.widgets.geocodeReview.unmatchedUC;this.matchedUC=h.widgets.geocodeReview.matchedUC;this.reviewedUC=h.widgets.geocodeReview.reviewedUC;this.suggestionGraphic||(this.suggestionGraphic=new x(m.toUrl("./GeocodeReview/images/EsriBluePinCircle26.png"),26,26),this.suggestionGraphic.setOffset(0,12));this.matchGraphic||(this.matchGraphic=new x(m.toUrl("./GeocodeReview/images/EsriGreenPinCircle26.png"),
26,26),this.matchGraphic.setOffset(0,12));this.highlightGraphic||(this.highlightGraphic=new x(m.toUrl("./GeocodeReview/images/EsriYellowPinCircle26.png"),26,26),this.highlightGraphic.setOffset(0,12));this._keywordMap={}},postCreate:function(){this.inherited(arguments);this._generateGrids();this.graphicsLayer=new S;this.map.addLayer(this.graphicsLayer);this._listenerHandles=[k(this.map,"resize",f.hitch(this,function(){this.resize()})),k(window,"resize",f.hitch(this,function(){this.resize()})),this.stackControllerNode.on("addChild",
function(a){w.add(a.controlButton.domNode,"calcite")}),this.stackControllerNode.on("selectChild",f.hitch(this,function(a){var b=this.stackControllerNode.getChildren();u.forEach(b,function(a){a.domNode&&w.remove(a.domNode,"blue")});w.add(a.controlButton.domNode,"blue");this.clearGridSelection();this.stackContainerNode.selectedChildWidget&&(this.currentTab=this.stackContainerNode.selectedChildWidget,this.currentTabId=this.stackContainerNode.selectedChildWidget.id);this.resize();this.graphicsLayer.clear();
this.emit("tab-change",{});this.geocodeMatch&&this.geocodeMatch.reset()})),k(this._gridUnmatchedRef,"dgrid-select",f.hitch(this,function(a){a.rows[0].data.oid?(this.currentSelectedRow=this._unmatchedStore.get(a.rows[0].data.oid),this._selectGridRowEvent(a.rows[0].data.oid,this.currentSelectedRow)):(this.currentSelectedRow=this._unmatchedStore.get(a.rows[0].data[this._tableLayer.objectIdField]),this._selectGridRowEvent(a.rows[0].data[this._tableLayer.objectIdField],this._unmatchedStore.get(a.rows[0].data[this._tableLayer.objectIdField])))})),
k(this._gridMatchedRef,"dgrid-select",f.hitch(this,function(a){this.currentSelectedRow=this._matchedStore.get(a.rows[0].data[this._featureLayer.objectIdField]);this._selectGridRowEvent(a.rows[0].data[this._featureLayer.objectIdField],this._matchedStore.get(a.rows[0].data[this._featureLayer.objectIdField]))})),k(this._gridReviewedRef,"dgrid-select",f.hitch(this,function(a){this.currentSelectedRow=this._reviewedStore.get(a.rows[0].data.id);this._drawReviewedRow(a.rows[0].data)})),k(this._gridMatchedRef,
"dgrid-datachange",f.hitch(this,function(a){var b=null,c,d=a.cell.row.data;this._matchedStore.get(a.cell.row.id).updated=!0;this._matchedStore.get(a.cell.row.id)[a.cell.column.field]=a.value;this._matchedStore.get(a.cell.row.id).location&&(b=this._matchedStore.get(a.cell.row.id).location);c=this._singleLineInput?{id:d[this._featureLayer.objectIdField],address:d[this._keywordMap.Address],location:b,featureType:d.featureType,reviewed:d.reviewed,updated:!0,sourceCountry:this._sourceCountry}:{id:d[this._featureLayer.objectIdField],
address:this._formatLocatorOptions(d),location:b,featureType:d.featureType,reviewed:d.reviewed,updated:!0,sourceCountry:this._sourceCountry};this.emit("row-datachange",{newAddress:a.value,oldAddress:a.oldValue,location:b,rowData:d,returnData:c});this.geocodeMatch&&this.geocodeMatch.geocodeAddress(c);this._applyAddressEdits(this._matchedStore.get(a.cell.row.id))})),k(this._gridUnmatchedRef,"dgrid-datachange",f.hitch(this,function(a){var b=null,c,d=a.cell.row.data;this._unmatchedStore.get(a.cell.row.id).updated=
!0;this._unmatchedStore.get(a.cell.row.id)[a.cell.column.field]=a.value;this._unmatchedStore.get(a.cell.row.id).location&&(b=this._unmatchedStore.get(a.cell.row.id).location);c=this._singleLineInput?{id:d[this._tableLayer.objectIdField],address:d[this._keywordMap.Address],location:b,featureType:d.featureType,reviewed:d.reviewed,updated:!0,sourceCountry:this._sourceCountry}:{id:d[this._tableLayer.objectIdField],address:this._formatLocatorOptions(d),location:b,featureType:d.featureType,reviewed:d.reviewed,
updated:!0,sourceCountry:this._sourceCountry};this.emit("row-datachange",{newAddress:a.value,oldAddress:a.oldValue,location:b,rowData:d,returnData:c});this.geocodeMatch&&this.geocodeMatch.geocodeAddress(c);this._applyAddressEdits(this._unmatchedStore.get(a.cell.row.id))}))];this.geocodeMatch&&this._listenerHandles.push(this._geocodeMatchHandler())},startup:function(){this.inherited(arguments);this.domNode&&this.map&&(this.map.loaded?this._init():k(this.map,"load",f.hitch(this,function(){this._init()})))},
matchFeature:function(a){var b;b=this.currentSelectedRow;b.updated=!0;b.reviewed=!0;b.oid=b[this._unmatchedStore.idProperty];b.location=a.newLocation;this._applyEdits(b);0<this._reviewedStore.query({featureID:a.featureID,featureType:a.featureType}).total?(b=this._reviewedStore.query({featureID:a.featureID,featureType:a.featureType})[0],b.newLocation=a.newLocation):this._reviewedArray.push({id:this._reviewedArray.length,featureID:a.featureID,address:a.address,oldLocation:a.oldLocation,newLocation:a.newLocation,
featureType:a.featureType});this._reviewedStore=new l({data:this._reviewedArray,idProperty:"id"});this._gridReviewedRef.set("store",this._reviewedStore);this._updateTabText();this.refreshGrids();this.emit("match",{id:this._reviewedArray.length,featureID:a.featureID,address:a.address,oldLocation:a.oldLocation,newLocation:a.newLocation,featureType:a.featureType})},clearGridSelection:function(){this._gridUnmatchedRef.clearSelection();this._gridMatchedRef.clearSelection();this._gridReviewedRef.clearSelection()},
refreshGrids:function(){this._gridUnmatchedRef.refresh();this._gridMatchedRef.refresh();this._gridReviewedRef.refresh()},resizeGrids:function(){this._gridUnmatchedRef.resize();this._gridMatchedRef.resize();this._gridReviewedRef.resize()},destroy:function(){u.forEach(this._listenerHandles,function(a){a.remove()});this.map&&(this.map.infoWindow.clearFeatures(),this.map.infoWindow.hide(),this.map.removeLayer(this.graphicsLayer));this.map=this.graphicsLayer=null;this.inherited(arguments)},_init:function(){this.loaded=
!0;this.emit("load",{});this.resize();D.arcgisUrl=this._arcgisUrl;D.getItem(this.itemId).then(f.hitch(this,function(a){var b=a.item.url||a.item.item;-1!==a.item.typeKeywords.indexOf("Hosted Service")&&this._getPublishParams().then(f.hitch(this,function(){this._getDataFromFeatureService(b)}))}))},_applyEdits:function(a){var b=new q;b.attributes=a;"unmatched"===a.featureType&&this._featureLayer&&this._tableLayer?(this._tableLayer.applyEdits(null,null,[b]).then(function(a,b,e){}),b.geometry=a.location,
this._featureLayer.applyEdits([b],null,null).then(function(a,b,e){})):"matched"===a.featureType&&this._featureLayer&&(b.geometry=a.location,this._featureLayer.applyEdits(null,[b],null).then(function(a,b,e){}))},resize:function(){var a=v.get(this.domNode,"height"),b=v.get(H.byId(this.headerID),"height");v.set(this.stackContainerNode.domNode,"height",a-b+"px");this.stackContainerNode.resize();this.resizeGrids();this._tab1Node.resize();this._tab2Node.resize();this._tab3Node.resize()},_applyAddressEdits:function(a){var b=
new q;b.attributes=a;"unmatched"===a.featureType?this._tableLayer.applyEdits(null,[b],null).then(function(a,b,e){}):this._featureLayer.applyEdits(null,[b],null).then(function(a,b,e){})},_selectGridRowEvent:function(a,b){var c;c=this._singleLineInput?{id:a,address:b[this._keywordMap.Address],location:b.location,featureType:b.featureType,reviewed:b.reviewed,updated:b.updated,sourceCountry:this._sourceCountry}:{id:a,address:this._formatLocatorOptions(b),location:b.location,featureType:b.featureType,
reviewed:b.reviewed,updated:b.updated,sourceCountry:this._sourceCountry};this.emit("row-select",c);this.geocodeMatch&&this.geocodeMatch.geocodeAddress(c)},_calcGraphicsExtent:function(a){var b=a[0].geometry,c=b.getExtent(),d,e,g=a.length;null===c&&(c=new A(b.x,b.y,b.x,b.y,b.spatialReference));for(e=1;e<g;e++)b=a[e].geometry,d=b.getExtent(),null===d&&(d=new A(b.x,b.y,b.x,b.y,b.spatialReference)),c=c.union(d);return c},_drawReviewedRow:function(a){this.graphicsLayer.clear();var b=a.newLocation,c=new q(b,
this.matchGraphic),d;a.oldLocation?(a=a.oldLocation,a=new q(a,this.highlightGraphic),d=[a,c],a=this._calcGraphicsExtent(d),this.map.setExtent(a,!0).then(f.hitch(this,function(){var a;for(a=0;a<d.length;a++)this.graphicsLayer.add(d[a])}))):this.map.centerAt(b).then(f.hitch(this,function(){this.graphicsLayer.add(c)}))},_getPublishParams:function(){var a=new F;C({url:this._arcgisUrl+"/"+this.itemId+"/info/publishParameters.json",content:{f:"json"},handleAs:"json",callbackParamName:"callback",load:f.hitch(this,
function(b){this._pubParams=b;var c,d,e=b.layerInfo.publishFieldMap||!1,g;g=b.layers&&b.layers[0]&&!b.addressFields?b.layers[0].addressFields:b.addressFields;Object.keys||(Object.keys=function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c);return b});if(1===Object.keys(g).length){for(c in g)g.hasOwnProperty(c)&&(e&&e.hasOwnProperty(g[c])?(this._keywordMap.Address=e[g[c]],this._keywordArray.push(e[g[c]])):(this._keywordMap.Address=g[c],this._keywordArray.push(g[c])));this._singleLineInput=
!0}else for(d in this._singleLineInput=!1,g)g.hasOwnProperty(d)&&(e&&e.hasOwnProperty(g[d])?(this._keywordMap[d]=e[g[d]],this._keywordArray.push(e[g[d]])):(this._keywordMap[d]=g[d],this._keywordArray.push(g[d])));this._sourceCountry=b.sourceCountry&&!this._keywordMap.CountryCode&&"world"!==b.sourceCountry.toLowerCase()&&"wo"!==b.sourceCountry.toLowerCase()?b.sourceCountry:null;b.geocodeServiceUrl?(this._locatorURL=b.geocodeServiceUrl,this.geocodeMatch&&this.geocodeMatch.updateLocatorURL(this._locatorURL)):
this.geocoder&&this.geocodeMatch&&this.geocodeMatch.updateLocatorURL(this.geocoder);a.resolve(!0)})});return a.promise},_formatLocatorOptions:function(a){var b=[],c;for(c in this._keywordMap)this._keywordMap.hasOwnProperty(c)&&("undefined"!==a[this._keywordMap[c]]?b[c]=a[this._keywordMap[c]]:(this._keywordMap[c].toLowerCase(),b[c]=a[this._keywordMap[c].toLowerCase()]));return b},_getDataFromFeatureService:function(a){var b=a+"/0",c=a+"/1";C({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback",
load:f.hitch(this,function(a){this._fsData=a;0!==a.layers.length?(this._featureLayer=new r(b,{mode:r.MODE_SELECTION,outFields:["*"]}),this._featureLayer.userIsAdmin=!0,this._listenerHandles.push(this._layerLoad())):this._featureLayer=!1;0!==a.tables.length?(this._tableLayer=new r(c,{mode:r.MODE_SELECTION,outFields:["*"]}),this._tableLayer.userIsAdmin=!0,this._listenerHandles.push(this._tableLoad())):(this._tableLayer=!1,this.stackContainerNode.removeChild(this.stackContainerNode.getChildren()[0]))})});
this.resize()},_geocodeMatchHandler:function(){return this.geocodeMatch.on("match",f.hitch(this,function(a){this.matchFeature(a)}))},_layerLoad:function(){return k(this._featureLayer,"load",f.hitch(this,function(){this._queryFeatureLayer()}))},_tableLoad:function(){return k(this._tableLayer,"load",f.hitch(this,function(){this._queryTableLayer()}))},_queryFeatureLayer:function(){var a,b,c,d=[],e=new y;e.where="1 \x3d 1";this._featureLayer.queryFeatures(e).then(f.hitch(this,function(e){for(a=0;a<e.features.length;a++)e.features[a].attributes.updated=
!1,e.features[a].attributes.reviewed=!1,e.features[a].attributes.featureType="matched",c=e.features[a].attributes,b=new R(e.features[a].geometry.getLongitude(),e.features[a].geometry.getLatitude()),c.location=b,d.push(c);e.exceededTransferLimit&&this._getFeatureCount(this._featureLayer).then(f.hitch(this,function(a){this.set("_featureLayerCount",a);this._updateTabText()}));this._test_idKeyword=this._featureLayer.objectIdField;this._gridMatchedRef.set("columns",this._updateColumns(e));this._matchedStore=
new l({data:d,idProperty:this._featureLayer.objectIdField});this._gridMatchedRef.set("store",this._matchedStore);this._updateTabText()}))},_queryTableLayer:function(){var a,b,c=[],d=new y;d.where="1 \x3d 1";this._tableLayer.queryFeatures(d).then(f.hitch(this,function(d){if(0!==d.features.length){for(a=0;a<d.features.length;a++)d.features[a].attributes.updated=!1,d.features[a].attributes.reviewed=!1,d.features[a].attributes.featureType="unmatched",b=d.features[a].attributes,c.push(b);d.exceededTransferLimit&&
this._getFeatureCount(this._tableLayer).then(f.hitch(this,function(a){this.set("_tableLayerCount",a);this._updateTabText()}));this._gridUnmatchedRef.set("columns",this._updateColumns(d));this._unmatchedStore=new l({data:c,idProperty:this._tableLayer.objectIdField});this._gridUnmatchedRef.set("store",this._unmatchedStore);this._updateTabText()}else this._tableLayer=!1,delete this._fsData.tables[0],this.stackContainerNode.removeChild(this.stackContainerNode.getChildren()[0])}))},_getFeatureCount:function(a){var b=
new y;b.returnGeometry=!1;b.returnIdsOnly=!1;b.where="1\x3d1";var c=esriConfig.defaults.io.timeout;esriConfig.defaults.io.timeout=1E4;return a.queryCount(b).then(function(a){esriConfig.defaults.io.timeout=c;return a},function(){esriConfig.defaults.io.timeout=c;return null})},_updateTabText:function(){var a=null!==this._tableLayerCount?this._tableLayerCount:this._unmatchedStore.data.length,b=null!==this._featureLayerCount?this._featureLayerCount:this._matchedStore.data.length;this._unmatchedStore.query({reviewed:!1}).total===
a?this._tab1Node.set("title",p.substitute(h.widgets.geocodeReview.unmatchedTotal,{count:a})):this._tab1Node.set("title",p.substitute(h.widgets.geocodeReview.unmatchedRemaining,{count1:this._unmatchedStore.query({reviewed:!1}).total,count2:a}));this._tab2Node.set("title",p.substitute(h.widgets.geocodeReview.matchedTotal,{count:b}));this._tab3Node.set("title",p.substitute(h.widgets.geocodeReview.reviewedTotal,{count:this._reviewedStore.data.length}))},_generateGrids:function(){this._generateUnmatchedGrid();
this._generateMatchedGrid();this._generateReviewedGrid()},_generateUnmatchedGrid:function(){this._gridUnmatchedRef=new this.StandardGrid({store:this._unmatchedStore,columns:this._unmatchedColumns,noDataMessage:h.widgets.geocodeReview.review.noDataMsg1,selectionMode:"extended",allowSelectAll:!1,cellNavigation:!1},this._grid1Node);this._gridUnmatchedRef.startup();this._gridUnmatchedRef.resize()},_generateMatchedGrid:function(){this._gridMatchedRef=new this.StandardGrid({store:this._matchedStore,columns:this._matchedColumns,
noDataMessage:h.widgets.geocodeReview.review.noDataMsg2,selectionMode:"extended",allowSelectAll:!1,cellNavigation:!1},this._grid2Node);this._gridMatchedRef.startup();this._gridMatchedRef.resize()},_generateReviewedGrid:function(){this._gridReviewedRef=new this.StandardGrid({store:this._reviewedStore,columns:this._reviewedColumns,noDataMessage:h.widgets.geocodeReview.review.noDataMsg3,selectionMode:"extended",allowSelectAll:!1,cellNavigation:!1},this._grid3Node);this._gridReviewedRef.startup();this._gridReviewedRef.resize()},
_defineColumns:function(){this._unmatchedColumns=[];this._matchedColumns=[];this._reviewedColumns=[{label:h.widgets.geocodeReview.idProperty,field:"id",hidden:!0},{label:h.widgets.geocodeReview.review.columnSelectedAddress,field:"address",formatter:f.hitch(this,function(a){return"\x3cimg src\x3d'"+m.toUrl("./GeocodeReview/images/EsriGreenPinCircle26.png")+"' /\x3e"+a}),get:f.hitch(this,function(a){var b="",b="",c;if("object"===typeof a.address)for(c in a.address)a.address.hasOwnProperty(c)&&null!==
a.address[c]&&"Loc_name"!==c&&(b+=a.address[c]+" ");else b=a.address;return b})},{label:h.widgets.geocodeReview.review.columnOriginalLocation,field:"oldLocation",formatter:function(a){return a},get:f.hitch(this,function(a){var b;a.oldLocation&&(b=B.webMercatorToGeographic(a.oldLocation));return a.oldLocation?"X: "+b.x+"\x3cbr /\x3eY: "+b.y:"None"})},{label:h.widgets.geocodeReview.review.columnSelectedLocation,field:"newLocation",formatter:function(a){return a},get:f.hitch(this,function(a){a=B.webMercatorToGeographic(a.newLocation);
return"X: "+a.x+"\x3cbr /\x3eY: "+a.y})},{label:"Type",field:"featureType",hidden:!0}]},_updateColumns:function(a){var b,c,d=[];if(a&&a.fields){for(b=0;b<a.fields.length;b++)c=this._keywordMap.Address&&a.fields[b].name===this._keywordMap.Address||this._keywordMap.Address&&a.fields[b].name===this._keywordMap.Address.toLowerCase()||-1!==u.indexOf(this._keywordArray,a.fields[b].name)?new z({label:a.fields[b].alias||a.fields[b].name,field:a.fields[b].name,editor:"text",editOn:"dblclick",autoSave:!0}):
{label:a.fields[b].alias||a.fields[b].name,field:a.fields[b].name,hidden:!0},a.fields[b].name===this._featureLayer.objectIdField?d.splice(0,0,{label:a.fields[b].name,field:a.fields[b].alias,hidden:!0}):d.push(c);d.push({label:h.widgets.geocodeReview.reviewedUC,field:"reviewed",formatter:function(a){return a},get:f.hitch(this,function(a){return a.reviewed?"\x3cimg src\x3d'"+m.toUrl("./GeocodeReview/images/save.png")+"' /\x3e":""})})}return d},_defineGridStores:function(){this._unmatchedStore=new l({data:"",
idProperty:this._idProperty});this._matchedStore=new l({data:"",idProperty:this._idProperty});this._reviewedArray=[];this._reviewedStore=new l({data:this._reviewedArray,idProperty:this._idProperty})}});E("extend-esri")&&f.setObject("dijit.GeocodeReview",n,T);return n});