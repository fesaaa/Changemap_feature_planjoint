// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/layers/ImageServiceLayerMixin","dojo/_base/declare dojo/_base/lang dojo/_base/Deferred dojo/_base/array dojo/_base/json dojo/_base/config dojo/_base/connect dojo/has dojo/io-query dojo/DeferredList ../kernel ../config ../lang ../request ../deferredUtils ../urlUtils ../geometry/Extent ../geometry/Point ../geometry/Polygon ./MosaicRule ./RasterFunction ./DimensionalDefinition ./Raster ./PixelBlock ./pixelFilters/VectorFieldPixelFilter ./rasterFormats/ImageCanvasDecoder ./TimeInfo ./Field ../graphic ../tasks/ImageServiceIdentifyTask ../tasks/ImageServiceIdentifyParameters".split(" "),
function(K,g,k,l,t,B,O,Q,R,fa,S,T,C,u,r,M,L,U,V,D,E,W,X,N,Y,Z,aa,ba,ca,da,ea){K=K(null,{declaredClass:"esri.layers.ImageServiceLayerMixin",_rasterFieldPrefix:"Raster.",_renderingRuleFieldSubPrefix:"ServicePixelValue.",_rasterFunctionServiceInfoProps:"bandCount pixelType hasRasterAttributeTable hasHistograms minValues maxValues meanValues stdvValues".split(" "),_rasterFunctionTemplateInfos:{},_pixelTypeRanges:{U1:[0,1],U2:[0,3],U4:[0,15],U8:[0,255],S8:[-128,127],U16:[0,65535],S16:[-32768,32767]},_eventMap:{"rendering-change":!0,
"mosaic-rule-change":!0,"spatial-reference-change":!0,"renderer-change":!0},constructor:function(a,b){this.useMapTime=b&&b.hasOwnProperty("useMapTime")?!!b.useMapTime:!0},_initialize:function(a,b){this._url=M.urlToObject(a);this.raster=new X(this._url.path);this.infoTemplate=b&&b.infoTemplate;var c=b&&b.imageServiceParameters;this.format=c&&c.format;this.compressionTolerance=c&&c.compressionTolerance?c.compressionTolerance:.01;this.interpolation=c?c.interpolation:null;this.compressionQuality=c?c.compressionQuality:
null;this.bandIds=c?c.bandIds:null;this.mosaicRule=c?c.mosaicRule:null;this.renderingRule=c?c.renderingRule:null;this.renderer=c?c.renderer:null;this.useMapDimensionValue=b&&b.hasOwnProperty("useMapDimensionValue")?!!b.useMapDimensionValue:!0;this.activeMapDimensions=b&&b.activeMapDimensions;this._params=g.mixin({},this._url.query,{f:"image",interpolation:this.interpolation,format:this.format,compressionQuality:this.compressionQuality,bandIds:this.bandIds?this.bandIds.join(","):null},c?c.toJson():
{});this.pixelFilter=b&&b.pixelFilter;this.originalPixelData=this.pixelData=null;this.hasDataChanged=!0;this._requestDataHandler=g.hitch(this,this._requestDataHandler);this._requestDataErrorHandler=g.hitch(this,this._requestDataErrorHandler);this._rasterReadPromise=null;this._initLayer=g.hitch(this,this._initLayer);this._queryVisibleRastersHandler=g.hitch(this,this._queryVisibleRastersHandler);this._visibleRasters=[];this._rasterAttributeTableFields=[];this._rasterAttributeTableFeatures=[];this._renderingRuleAttributeTable=
{};this._useRenderingRuleAttributeTable=!1;this._loadCallback=b&&b.loadCallback;(c=b&&b.resourceInfo)?this._initLayer(c):u({url:this._url.path,content:g.mixin({f:"json"},this._url.query),callbackParamName:"callback",load:this._initLayer,error:this._errorHandler});this.registerConnectEvents()},disableClientCaching:!1,_initLayer:function(a,b){if(null!==a&&void 0!==a){this._findCredential();(this.credential&&this.credential.ssl||a&&a._ssl)&&this._useSSL();var c=this.minScale,e=this.maxScale;g.mixin(this,
a);this.minScale=c;this.maxScale=e;this.initialExtent=this.fullExtent=this.extent=new L(a.extent);this.spatialReference=this.initialExtent.spatialReference;this.pixelSizeX=parseFloat(this.pixelSizeX);this.pixelSizeY=parseFloat(this.pixelSizeY);for(var d=this.minValues,f=this.maxValues,n=this.meanValues,m=this.stdvValues,x=this.bands=[],c=0,e=this.bandCount;c<e;c++)x[c]={min:d[c],max:f[c],mean:n[c],stddev:m[c]};this.timeInfo=(c=this.timeInfo)&&c.timeExtent?new aa(c):null;e=this.fields=[];if(d=a.fields)for(c=
0;c<d.length;c++)e.push(new ba(d[c]));this.version=a.currentVersion;this.version||(this.version="fields"in a||"objectIdField"in a||"timeInfo"in a?10:9.3);C.isDefined(a.minScale)&&!this._hasMin&&this.setMinScale(a.minScale);C.isDefined(a.maxScale)&&!this._hasMax&&this.setMaxScale(a.maxScale);c={};a.defaultMosaicMethod?(c.method=a.defaultMosaicMethod,c.operation=a.mosaicOperator,c.sortField=a.sortField,c.sortValue=a.sortValue):c.method=D.METHOD_NONE;this.defaultMosaicRule=new D(c);this.defaultMosaicRule.ascending=
!0;this._useRenderingRuleAttributeTable=10<this.version&&"esriImageServiceDataTypeThematic"===this.serviceDataType&&!this.hasRasterAttributeTable;this._setDefaultRenderingRule(!0);this._isScientificData()&&(!this.mosaicRule||this.mosaicRule&&!this.mosaicRule.multidimensionalDefinition)&&this._setDefaultMultidimensionalDefinition(!0);10<this.version&&this.hasRasterAttributeTable&&this.getRasterAttributeTable().then(g.hitch(this,function(a){a&&(a.features&&a.fields&&(this.rasterAttributeTable=g.clone(a)),
a.features&&0<a.features.length&&(this._rasterAttributeTableFeatures=g.clone(a.features)),a.fields&&0<a.fields.length&&(this._rasterAttributeTableFields=g.clone(a.fields)),!this.renderer||"esri.renderer.ClassBreaksRenderer"!==this.renderer.declaredClass&&"esri.renderer.UniqueValueRenderer"!==this.renderer.declaredClass||this.refresh())}));this._isVectorData()&&!C.isDefined(this.pixelFilter)&&(this.vectorFieldPixelFilter=new Y,this.vectorFieldPixelFilter.isDataUV="esriImageServiceDataTypeVector-UV"===
this.serviceDataType,this.pixelFilter=this.vectorFieldPixelFilter.computeMagnitudeAndDirection,this.getKeyProperties().then(g.hitch(this,this._setFlowRepresentation)));this.loaded=!0;this._setDefaultFilter();this.onLoad(this);if(c=this._loadCallback)delete this._loadCallback,c(this)}},getKeyProperties:function(){var a=this._url.path+"/keyProperties",b=new k(r._dfdCanceller);10<this.version?(b._pendingDfd=u({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),b._pendingDfd.then(function(a){b.callback(a)},
function(a){b.errback(a)})):(a=Error("Layer does not have key properties"),a.log=!!B.isDebug,b.errback(a));return b},getRasterAttributeTable:function(a){var b=this._url.path+"/rasterAttributeTable",c=new k(r._dfdCanceller),e={f:"json"},d=this.hasRasterAttributeTable;a&&a.renderingRule&&(e.renderingRule=t.toJson(a.renderingRule.toJson()),d=!0);10<this.version&&d?(c._pendingDfd=u({url:b,content:e,handleAs:"json",callbackParamName:"callback"}),c._pendingDfd.then(function(a){c.callback(a)},function(a){c.errback(a)})):
(a=Error("Layer does not support raster attribute table"),a.log=!!B.isDebug,c.errback(a));return c},getRenderingRuleAttributeTable:function(a){var b=new k(r._dfdCanceller);if(!a||!a.renderingRule)return b.errback(Error("Rendering rule is not specified")),b;a=a.renderingRule;var c=a.functionName;this._renderingRuleAttributeTable&&c&&this._renderingRuleAttributeTable.hasOwnProperty(c)?b.resolve(this._renderingRuleAttributeTable[c]):b=this.getRasterAttributeTable({renderingRule:a}).then(g.hitch(this,
function(a){var b;a&&a.features&&a.features.length&&a.fields&&a.fields.length&&(b={features:g.clone(a.features),fields:g.clone(a.fields)},c&&(this._renderingRuleAttributeTable[c]=b));return b}));return b},_getRasterAttributeTableFeatures:function(){var a=new k;if(this._rasterAttributeTableFeatures&&0<this._rasterAttributeTableFeatures.length)return a.resolve(this._rasterAttributeTableFeatures),a;if(10<this.version&&this.hasRasterAttributeTable)return a=this.getRasterAttributeTable(),a.then(g.hitch(this,
function(a){a&&a.features&&0<a.features.length&&(this._rasterAttributeTableFeatures=g.clone(a.features))})),a;a.resolve(this._rasterAttributeTableFeatures);return a},_getRenderingRuleAttributeTableFeatures:function(a){a=a&&a.renderingRule;return a?this.getRenderingRuleAttributeTable({renderingRule:a}).then(function(a){return a&&a.features}):(a=new k,a.errback(Error("Rendering rule is not specified")),a)},getCustomRasterFields:function(a){var b=a?a.rasterAttributeTableFieldPrefix:this._rasterFieldPrefix;
a=10.3<=this.version?"esriFieldTypeDouble":"esriFieldTypeString";var c={name:this._rasterFieldPrefix+"ItemPixelValue",alias:"Item Pixel Value",domain:null,editable:!1,length:50,type:a},e={name:this._rasterFieldPrefix+"ServicePixelValue",alias:"Service Pixel Value",domain:null,editable:!1,length:50,type:a},d={name:this._rasterFieldPrefix+"ServicePixelValue.Raw",alias:"Raw Service Pixel Value",domain:null,editable:!1,length:50,type:"esriFieldTypeDouble"},f=this.fields?g.clone(this.fields):[];a=f.length;
f[a]=e;10.4<=this.version&&"esri.layers.ArcGISImageServiceLayer"===this.declaredClass&&(!this.rasterFunctionInfos||!this.rasterFunctionInfos.length||this._isRasterFunctionInfoAvailable("none"))&&(a++,f[a]=d);if(this.capabilities&&-1<this.capabilities.toLowerCase().indexOf("catalog")||this.fields&&0<this.fields.length)a++,f[a]=c;!C.isDefined(this.pixelFilter)||"esriImageServiceDataTypeVector-UV"!==this.serviceDataType&&"esriImageServiceDataTypeVector-MagDir"!==this.serviceDataType||(c={name:this._rasterFieldPrefix+
"Magnitude",alias:"Magnitude",domain:null,editable:!1,type:"esriFieldTypeDouble"},e={name:this._rasterFieldPrefix+"Direction",alias:"Direction",domain:null,editable:!1,type:"esriFieldTypeDouble"},a++,f[a]=c,a++,f[a]=e);a=this._rasterAttributeTableFields;(c=this.renderingRule&&this.renderingRule.functionName)&&this._renderingRuleAttributeTable&&this._renderingRuleAttributeTable.hasOwnProperty(c)&&(a=this._renderingRuleAttributeTable[c].fields);a&&0<a.length&&(a=l.filter(a,function(a){return"esriFieldTypeOID"!==
a.type&&"value"!==a.name.toLowerCase()}),a=l.map(a,function(a){var c=g.clone(a);c.name=b+a.name;return c}),f=f.concat(a));var n=this._rasterFieldPrefix+this._renderingRuleFieldSubPrefix;10.4<=this.version&&this.rasterFunctionInfos&&l.forEach(this.rasterFunctionInfos,function(a){a&&a.name&&"none"!==a.name.toLowerCase()&&(a={name:n+a.name.replace(/ /gi,"_"),alias:a.name,domain:null,editable:!1,type:"esriFieldTypeDouble"},f.push(a))});return f},_prepareGetImageParameters:function(a,b,c,e){e=C.isDefined(e)?
e:this._params;if(this.renderer){var d=this.getExportImageRenderingRule();e.renderingRule=d?t.toJson(d.toJson()):null}d=a.spatialReference.wkid||t.toJson(a.spatialReference.toJson(!1));delete e._ts;g.mixin(e,{bbox:a.xmin+","+a.ymin+","+a.xmax+","+a.ymax,imageSR:d,bboxSR:d,size:b+","+c},this.disableClientCaching?{_ts:(new Date).getTime()}:{});delete e.compressionTolerance;e.format&&"LERC"===e.format.toUpperCase()&&(e.compressionTolerance=this.compressionTolerance);e.token=this._getToken()},getImageUrl:function(a,
b,c,e,d){d=C.isDefined(d)?d:this._params;this._prepareGetImageParameters(a,b,c,d);a=g.clone(d);this._cleanupRequestParams(a);b=this._url.path+"/exportImage?";c=M.addProxy(b+R.objectToQuery(g.mixin(a,{f:"image"})));var f=a.token;c.length>T.defaults.io.postLength||this.useMapImage?this._jsonRequest=u({url:b,content:g.mixin(a,{f:"json"}),callbackParamName:"callback",load:function(a,b){var c=a.href;f&&(c+=-1===c.indexOf("?")?"?token\x3d"+f:"\x26token\x3d"+f);e(M.addProxy(c))},error:this._errorHandler}):
e(c)},onRenderingChange:function(){},onMosaicRuleChange:function(){},onRendererChange:function(){},setInterpolation:function(a,b){this.interpolation=this._params.interpolation=a;b||this.refresh(!0)},setCompressionQuality:function(a,b){this.compressionQuality=this._params.compressionQuality=a;b||this.refresh(!0)},setCompressionTolerance:function(a,b){this.compressionTolerance=a;b||this.refresh(!0)},setBandIds:function(a,b){var c=!1;this.bandIds!==a&&(c=!0);this.bandIds=a;this._params.bandIds=a.join(",");
if(c&&!b)this.onRenderingChange();b||this.refresh(!0)},setDefaultBandIds:function(a){this.bandIds=this._params.bandIds=null;a||this.refresh(!0)},setDisableClientCaching:function(a){this.disableClientCaching=a},setMosaicRule:function(a,b){var c=!1;this.mosaicRule!==a&&(c=!0);this.mosaicRule=a;this._params.mosaicRule=t.toJson(a.toJson());if(c&&!b)this.onMosaicRuleChange();b||this.refresh(!0)},setRenderingRule:function(a,b){var c=!1;this.renderingRule!==a&&(c=!0);this.renderingRule=a;this._params.renderingRule=
a?t.toJson(a.toJson()):null;this._useRenderingRuleAttributeTable&&this.getRenderingRuleAttributeTable({renderingRule:a});if(c)this.onRenderingChange();this._setDefaultFilter();b||this.refresh(!0)},setImageFormat:function(a,b){this.format=this._params.format=a;this._setDefaultFilter();b||this.refresh(!0)},setInfoTemplate:function(a){this.infoTemplate=a},setDefinitionExpression:function(a,b){var c=this.mosaicRule?this.mosaicRule.toJson():{};this.mosaicRule||(this.defaultMosaicRule?c=this.defaultMosaicRule.toJson():
c.method=D.METHOD_NONE);c.where=a;c=new D(c);this.setMosaicRule(c,b);return this},getDefinitionExpression:function(){return this.mosaicRule?this.mosaicRule.where:null},setPixelFilter:function(a){this.pixelFilter=a;this._isDefaultPixelFilter=!1},getPixelData:function(a){return a?(this._useBrowserDecoding()&&(this.originalPixelData={pixelBlock:this._getPixelBlockFromCanvas(this._context,this._map.width,this._map.height),extent:this._map.extent}),this.originalPixelData):this.pixelData},getExportImageRenderingRule:function(){return this._combineRenderingRule(this._convertRendererToRenderingRule(this.renderer),
this.renderingRule)},redraw:function(){this.hasDataChanged=!1;this._setPixelData(this.originalPixelData)},getHistograms:function(){var a=new k(r._dfdCanceller);if(this.hasHistograms)a._pendingDfd=u({url:this._url.path+"/histograms",content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),a._pendingDfd.then(function(b){a.callback(b)},function(b){a.errback(b)});else{var b=Error("Layer does not have histograms.");b.log=!!B.isDebug;a.errback(b)}return a},computeHistograms:function(a){var b=new k(r._dfdCanceller);
if(10.1<=this.currentVersion){a=a||{};var c=a.geometry||this.fullExtent,e=(a.geometry||this.fullExtent).toJson(),c="extent"===c.type?"esriGeometryEnvelope":"esriGeometryPolygon",d=a.renderingRule||this.renderingRule||this.defaultRenderingRule,d=d?d.toJson():null,f=a.mosaicRule||this.mosaicRule||this.defaultMosaicRule,f=f?f.toJson():null;a=a.pixelSize||{x:this.pixelSizeX,y:this.pixelSizeY};b._pendingDfd=u({url:this._url.path+"/computeHistograms",content:g.mixin({f:"json",geometry:JSON.stringify(e),
geometryType:c,renderingRule:JSON.stringify(d),mosaicRule:JSON.stringify(f),pixelSize:JSON.stringify(a),callbackParamName:"callback"}),handleAs:"json"});b._pendingDfd.then(function(a){b.callback(a)},function(a){b.errback(a)})}else e=Error("Layer doesn't support computeHistograms."),e.log=!!B.isDebug,b.errback(e);return b},getRenderingRuleServiceInfo:function(a){var b=new r._fixDfd(new k(r._dfdCanceller));if(!a)return b.errback(Error("Rendering rule is not specified")),b;var c=a&&a.functionName&&!a.functionArguments?
a.functionName:null;return c&&this._rasterFunctionTemplateInfos[c]?(b.resolve(this._rasterFunctionTemplateInfos[c]),b):u({url:this._url.path,content:g.mixin(g.mixin({f:"json",renderingRule:JSON.stringify(a.toJson())},this._url.query)),callbackParamName:"callback",load:g.hitch(this,function(a){var b={};l.forEach(this._rasterFunctionServiceInfoProps,function(c){b[c]=a[c]});return this._rasterFunctionTemplateInfos[c]=b}),error:this._errorHandler})},queryVisibleRasters:function(a,b,c,e){var d=this._map,
f=r._fixDfd(new k(r._dfdCanceller));this._visibleRasters=[];var n,m,x=!0,p=this.infoTemplate?this.infoTemplate.info:null,h=p?g.clone(this.infoTemplate.info.fieldInfos):null;b=b||{};if(p&&this.infoTemplate.info.mediaInfos&&this.infoTemplate.info.mediaInfos.length){var q=[];l.forEach(this.infoTemplate.info.mediaInfos,function(a){q=q.concat(a&&a.value&&a.value.fields||[])});q.length&&l.forEach(h,function(a){a&&-1<q.indexOf(a.fieldName)&&(a.visible=!0)})}if(h&&0<h.length)for(x=!1,n=0;n<h.length;n++)if((m=
h[n])&&m.fieldName.toLowerCase()!==this._rasterFieldPrefix.toLowerCase()+"servicepixelvalue"&&(m.visible||p.title&&-1<p.title.toLowerCase().indexOf(m.fieldName.toLowerCase()))){x=!0;break}var A=(m=this._removeVisualizationStretchFunction(this.renderingRule))&&m.functionName,z=[];if(10.4<=this.version){var v=!1;if(this.rasterFunctionInfos&&h){var w=this._rasterFieldPrefix+this._renderingRuleFieldSubPrefix;l.forEach(this.rasterFunctionInfos,function(a){var b=w+a.name.replace(/ /gi,"_");l.some(h,function(a){return a.visible&&
a.fieldName===b})&&(v=v||A&&A===a.name,z.push(new E({rasterFunction:a.name})))})}m&&!v&&z.push(m)}n=new ea;n.geometry=a.geometry;n.returnGeometry=this._map.spatialReference.equals(this.spatialReference);n.returnCatalogItems=x;n.timeExtent=a.timeExtent;this._params.time&&this.mosaicRule?(a=g.clone(this.mosaicRule),a=this._filterOutTimeDimension(a),n.mosaicRule=a):n.mosaicRule=this.mosaicRule||null;n.renderingRule=10.4>this.version&&m||null;n.renderingRules=z||null;d&&(d=new U((d.extent.xmax-d.extent.xmin)/
d.width,(d.extent.ymax-d.extent.ymin)/d.height,d.extent.spatialReference),n.pixelSize=d);b.requestParams=n;var I=this,d=new da(this.url);(f._pendingDfd=d.execute(n)).addCallbacks(function(a){I._queryVisibleRastersHandler(a,b,c,e,f)},function(a){I._resolve([a],null,e,f,!0)});return f},_queryVisibleRastersHandler:function(a,b,c,e,d){function f(){var a=this.getCustomRasterFields(b),e=this._getDomainFields(a),f=b?b.returnDomainValues:!1,h=b&&b.rasterAttributeTableFieldPrefix,q,v,z,A,k,w,t,u,F,I;this._useRenderingRuleAttributeTable&&
this.renderingRule?(a=this._getRenderingRuleAttributeTableFeatures({renderingRule:this.renderingRule}),I=n):a=this._getRasterAttributeTableFeatures();a.then(g.hitch(this,function(a){for(q=0;q<p.length;q++){y=p[q];y.setInfoTemplate(this.infoTemplate);y._layer=this;if(n){F=n.replace(/ /gi,"").split(",");v=n;z=F;x&&x.length>=q&&(v=x[q].replace(/ /gi,", "),z=x[q].split(" "));y.attributes[this._rasterFieldPrefix+"ItemPixelValue"]=z;y.attributes[this._rasterFieldPrefix+"ServicePixelValue"]=F;m&&(y.attributes[this._rasterFieldPrefix+
"ServicePixelValue.Raw"]=m.replace(/ /gi,"").split(","));if(this.pixelFilter){var b=new N({height:1,width:1,pixelType:"F32",pixels:[],statistics:[]});l.forEach(z,function(a){b.addData({pixels:[a],statistics:{minValue:a,maxValue:a,noDataValue:null}})});this.pixelFilter({pixelBlock:b,extent:new L(0,0,0,0,this._map.spatialReference)});if("esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType)y.attributes[this._rasterFieldPrefix+"Magnitude"]=
b.pixels[0][0],y.attributes[this._rasterFieldPrefix+"Direction"]=b.pixels[1][0]}l.forEach(r,function(a){y.attributes[a.name]=a.value});var P=I||v;if(a&&0<a.length&&(A=l.filter(a,function(a){if(a&&a.attributes)return a.attributes.hasOwnProperty("Value")?a.attributes.Value==P:a.attributes.VALUE==P}),0<A.length&&(k=g.clone(A[0]),h&&k))){u={};for(w in k.attributes)k.attributes.hasOwnProperty(w)&&(t=h+w,u[t]=k.attributes[w]);k.attributes=u;y.attributes=g.mixin(y.attributes,k.attributes)}}f&&e&&0<e.length&&
l.forEach(e,function(a){if(a){var b=y.attributes[a.name];C.isDefined(b)&&(b=this._getDomainValue(a.domain,b),C.isDefined(b)&&(y.attributes[a.name]=b))}},this);J.push(y);this._visibleRasters.push(y)}this._resolve([J,null,!0],null,c,d)}))}var n=a.value,m=a.value,x,p,h=0,q=0,A=this,z=this.objectIdField,v,w,r=[];e=b.requestParams.renderingRules;var k=a.processedValues,F=this.renderingRule&&t.toJson(this._removeVisualizationStretchFunction(this.renderingRule).toJson());if(e&&k&&e.length===k.length){var D=
this._rasterFieldPrefix+this._renderingRuleFieldSubPrefix;l.forEach(e,function(a,b){if(a.functionName){var c={name:D+a.functionName.replace(/ /gi,"_"),value:k[b].replace(/ /gi,"").split(",")};r.push(c);F&&F===t.toJson(a.toJson())&&(n=k[b])}})}e=this.infoTemplate&&this.infoTemplate.info&&this.infoTemplate.info.layerOptions&&this.infoTemplate.info.layerOptions.hasOwnProperty("showNoDataRecords")?this.infoTemplate.info.layerOptions.showNoDataRecords:!0;if(a.catalogItems){var E=0,B,G,H=a.catalogItems.features.length;
w=0;p=Array(H);x=Array(H);v=Array(H);for(h=0;h<H;h++)-1<a.properties.Values[h].toLowerCase().indexOf("nodata")&&w++;B=H-w;for(h=0;h<H;h++)w=!0,-1<a.properties.Values[h].toLowerCase().indexOf("nodata")?(G=B++,e||(w=!1,p.length--,x.length--,v.length--)):G=E++,w&&(p[G]=a.catalogItems.features[h],x[G]=a.properties.Values[h],v[G]=p[G].attributes[z])}this._visibleRasters=[];var y;(a=-1<n.toLowerCase().indexOf("nodata"))&&!e&&(p=[],x=[],v=[]);!n||p||a||(z="ObjectId",p=[],y=new ca(new L(this.fullExtent),
null,{ObjectId:0}),p.push(y));var J=[];p?!this._map.spatialReference.equals(this.spatialReference)&&v&&0<v.length?u({url:this._url.path+"/query",content:{f:"json",objectIds:v.join(","),returnGeometry:!0,outSR:t.toJson(A._map.spatialReference.toJson()),outFields:z},handleAs:"json",callbackParamName:"callback",load:function(a){if(0===a.features.length)A._resolve([J,null,null],null,c,d);else{for(h=0;h<a.features.length;h++)for(q=0;q<p.length;q++)p[q].attributes[z]==a.features[h].attributes[z]&&(p[q].geometry=
new V(a.features[h].geometry),p[q].geometry.setSpatialReference(A._map.spatialReference));f.call(A)}},error:function(a){A._resolve([J,null,null],null,c,d)}}):f.call(this):this._resolve([J,null,null],null,c,d)},getVisibleRasters:function(){var a=this._visibleRasters,b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(a[c]);return b},_getDomainFields:function(a){if(a){var b=[];l.forEach(a,function(a){if(a.domain){var c={};c.name=a.name;c.domain=a.domain;b.push(c)}});return b}},_getDomainValue:function(a,
b){if(a&&a.codedValues){var c;l.some(a.codedValues,function(a){return a.code===b?(c=a.name,!0):!1});return c}},_requestData:function(a,b,c){this._rasterReadPromise&&this._rasterReadPromise.cancel();a=g.clone(a);var e=a._normalize(!0);this._prepareGetImageParameters(e,b,c);b=g.clone(this._params);this._cleanupRequestParams(b);b.extent=a;b.format=b.format||(10.3<=this.version?"lerc":"jpgpng");"lerc"===b.format.toLowerCase()&&!b.lercVersion&&10.5<=this.version&&(b.lercVersion=2);c=null;this._useBrowserDecoding()&&
(c=new Z({ctx:this._context}));b={imageServiceParameters:b,nBands:Math.min(this.bandCount,3),pixelType:this.pixelType,decodeFunc:c?g.hitch(c,"decode"):null};this._rasterReadPromise=this.raster.read(b,this._requestDataHandler,this._requestDataErrorHandler)},_requestDataHandler:function(a){this._rasterReadPromise&&this._rasterReadPromise.isCanceled()||(this.originalPixelData=a,this.hasDataChanged=!0,this._setPixelData(a))},_setPixelData:function(a){a=this._clonePixelData(a);this.pixelFilter&&this.pixelFilter(a);
this.pixelData=a;this._rasterReadPromise&&this._rasterReadPromise.isCanceled()||(this._drawPixelData(),this._rasterReadPromise=null)},_clonePixelData:function(a){if(null===a||void 0===a)return a;var b={};a.extent&&(b.extent=g.clone(a.extent));a=a.pixelBlock;if(null===a||void 0===a)return b;b.pixelBlock=a.clone();return b},_setDefaultFilter:function(){},_getPixelBlockFromCanvas:function(a,b,c){a=a.getImageData(0,0,b,c).data;for(var e=b*c,d=0,f=0,g=new Uint8Array(e),m=new Uint8Array(e),x=new Uint8Array(e),
p=new Uint8Array(e),h=Infinity,q=Infinity,k=Infinity,l=-Infinity,v=-Infinity,w=-Infinity,r,t,u,d=0;d<e;d++)r=a[f++],t=a[f++],u=a[f++],h=h<r?h:r,l=l>r?l:r,q=q<t?q:t,v=v>t?v:t,k=k<u?k:u,w=w>u?w:u,g[d]=r,m[d]=t,x[d]=u,p[d]=a[f++]&1;return new N({width:b,height:c,pixels:[g,m,x],pixelType:"U8",mask:p,statistics:[{minValue:h,maxValue:l},{minValue:q,maxValue:v},{minValue:k,maxValue:w}]})},_useBrowserDecoding:function(){return(void 0===this.pixelFilter||null===this.pixelFilter)&&("jpeg"===this.format.toLowerCase()||
"jpg"===this.format.toLowerCase()||-1<this.format.toLowerCase().indexOf("png"))},getMultidimensionalInfo:function(){var a=this._url.path+"/multiDimensionalInfo",b=new k(r._dfdCanceller);if(this._multidimensionalInfo)return b.resolve(this._multidimensionalInfo),b;10.3<=this.version&&this.hasMultidimensions?(b._pendingDfd=u({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),b._pendingDfd.then(g.hitch(this,function(a){this._multidimensionalInfo=a.multidimensionalInfo;b.callback(a.multidimensionalInfo)}),
function(a){b.errback(a)})):(a=Error("Layer does not support multidimensional info"),a.log=!!B.isDebug,b.errback(a));return b},getDefaultMultidimensionalDefinition:function(){var a,b,c,e=[],d=new k(r._dfdCanceller),f;if(this._defaultMultidimensionalDefinition)return d.resolve(this._defaultMultidimensionalDefinition),d;d._pendingDfd=this.getMultidimensionalInfo();d._pendingDfd.then(g.hitch(this,function(g){a=g;b=a.variables[0].dimensions;for(c in b)b.hasOwnProperty(c)&&"StdTime"!==b[c].name&&(f=b[c],
e.push(new W({variableName:"",dimensionName:f.name,isSlice:!f.hasRanges,values:[this._getDefaultDimensionValue(f)]})));this._defaultMultidimensionalDefinition=e;d.callback(e)}),function(a){d.errback(a)});return d},_getDefaultDimensionValue:function(a){if(a&&a.values&&a.values.length){var b,c,e=Infinity,d,f;if(a.hasRanges)return a.values[0];if(a.name&&"stdz"===a.name.toLowerCase()){for(f=0;f<a.values.length&&(d=a.values[f],c=Math.abs(d-0),c<e&&(e=c,b=d),0!==c);f++);return b}return a.extent[0]}},_setDefaultMultidimensionalDefinition:function(a){var b,
c={};this.getDefaultMultidimensionalDefinition().then(g.hitch(this,function(e){b=e;0<b.length&&(this.mosaicRule?(c=g.clone(this.mosaicRule),c.multidimensionalDefinition=b):this.defaultMosaicRule?(c=g.clone(this.defaultMosaicRule),c.multidimensionalDefinition=b):c=new D({multidimensionalDefinition:b}),this.setMosaicRule(c,a))}))},_setDefaultRenderingRule:function(a){var b={};if(!this.renderingRule&&"esri.layers.ArcGISImageServiceVectorLayer"!==this.declaredClass&&!this.bandIds&&this.rasterFunctionInfos&&
this.rasterFunctionInfos.length&&"none"!==this.rasterFunctionInfos[0].name.toLowerCase())b.rasterFunction=this.rasterFunctionInfos[0].name;else if(!this.renderingRule&&"esri.layers.ArcGISImageServiceVectorLayer"===this.declaredClass&&10.3<this.version){var c="esriImageServiceDataTypeVector-UV"===this.serviceDataType?7:10;b.rasterFunction="Resample";b.rasterFunctionArguments={ResamplingType:c,InputCellSize:{x:this.pixelSizeX,y:this.pixelSizeY}}}b.hasOwnProperty("rasterFunction")&&(this.defaultRenderingRule=
new E(b),this.setRenderingRule(this.defaultRenderingRule,a))},_cleanupRequestParams:function(a){if(!a)return a;if(a.time&&a.mosaicRule){var b=new D(t.fromJson(a.mosaicRule)),b=this._filterOutTimeDimension(b);a.mosaicRule=t.toJson(b.toJson())}var b="displayOnPan drawMode styling id opacity visible resourceInfo useMapDimensionValue extent renderer".split(" "),c;for(c in b)a.hasOwnProperty(b[c])&&delete a[b[c]];return a},_filterOutTimeDimension:function(a){if(a&&a.multidimensionalDefinition&&0<a.multidimensionalDefinition.length){var b=
l.filter(a.multidimensionalDefinition,function(a){return"StdTime"!==a.dimensionName});a.multidimensionalDefinition=b}return a},_removeVisualizationStretchFunction:function(a){var b=a&&a.functionName;if(!b||"stretch"!==b.toLowerCase())return a;var c=a.functionArguments.Raster;return c&&c.functionName&&l.some(this.rasterFunctionInfos,function(a){return c.functionName===a.name})?c:a},_isScientificData:function(){return"esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===
this.serviceDataType||"esriImageServiceDataTypeScientific"===this.serviceDataType},_isVectorData:function(){return"esriImageServiceDataTypeVector-UV"===this.serviceDataType||"esriImageServiceDataTypeVector-MagDir"===this.serviceDataType},_isRasterFunctionInfoAvailable:function(a){return l.some(a&&(this.rasterFunctionInfos||[]),function(b){return b&&b.name&&b.name.toLowerCase()===a.toLowerCase()})},_createPixelData:function(a){a=new N({width:2,height:2,pixels:a,pixelType:this.pixelType,statistics:a});
var b=this.fullExtent.getCenter(),b=new L(b.x,b.y,b.x+this.pixelSizeX,b.y+this.pixelSizeY,this.spatialReference);return{pixelBlock:a,extent:b}},_convertRendererToRenderingRule:function(a){var b=a&&a.declaredClass;if(!b||"esri.renderer.UniqueValueRenderer"!==b&&"esri.renderer.ClassBreaksRenderer"!==b&&"esri.renderer.StretchRenderer"!==b)return null;var c=null;"esri.renderer.StretchRenderer"===b?c=a.toRenderingRule():"esri.renderer.ClassBreaksRenderer"===b?c=this._convertClassifyRenderer(a):"esri.renderer.UniqueValueRenderer"===
b&&(c=this._convertUniqueValueRenderer(a));return c},_getValueField:function(a){if(a&&a.length){var b,c;l.some(a,function(a){if((c=a.name)&&"value"===c.toLowerCase())return b=c,!0});return b}},_convertClassifyRenderer:function(a){var b,c=[],e=[],d=[],f;b=this.renderingRule&&this.renderingRule.functionName;var g,m,k=this.hasRasterAttributeTable,p,h;b&&(k=this._rasterFunctionTemplateInfos[b]?this._rasterFunctionTemplateInfos[b].hasRasterAttributeTable:this.hasRasterAttributeTable,m=this._renderingRuleAttributeTable[b],
h=this._rasterFunctionTemplateInfos[b]);g=m&&m.features?m.features:this._rasterAttributeTableFeatures;p=this._getValueField(m&&m.fields?m.fields:this._rasterAttributeTableFields);k&&g?(l.forEach(a.infos,function(b,c){var e,f=b.symbol.color;f.a&&l.forEach(g,function(g){e=g.attributes[a.attributeField];(e>=b.minValue&&e<b.maxValue||c===a.infos.length-1&&e>=b.minValue)&&d.push([g.attributes[p],f.r,f.g,f.b])},this)},this),b=h&&h.pixelType||this.pixelType,this._adjustColormapToPixelTypeRange(d,b),b=new E,
b.functionName="Colormap",b.functionArguments={},b.functionArguments.Colormap=d,b.variableName="Raster"):(l.forEach(a.infos,function(a,b){f=a.symbol&&a.symbol.color;f.a&&(c.push.call(c,a.minValue,a.maxValue),e.push(b),d.push([b,f.r,f.g,f.b]))}),b=new E,b.functionName="Remap",b.functionArguments={InputRanges:c,OutputValues:e},b.variableName="Raster",m=new E,m.functionName="Colormap",m.functionArguments={Colormap:d,Raster:b},b=m);return b},_convertUniqueValueRenderer:function(a){var b=[],c=this.renderingRule&&
this.renderingRule.functionName,e,d,f,g;c&&(d=this._renderingRuleAttributeTable[c],g=this._rasterFunctionTemplateInfos[c]);e=d&&d.features?d.features:this._rasterAttributeTableFeatures;f=this._getValueField(d&&d.fields?d.fields:this._rasterAttributeTableFields);l.forEach(a.infos,function(c){var d=c.symbol.color;d.a&&(a.attributeField!==f&&e?l.forEach(e,function(e){e.attributes[a.attributeField]==c.value&&b.push([e.attributes[f],d.r,d.g,d.b])},this):b.push([c.value,d.r,d.g,d.b]))},this);this._adjustColormapToPixelTypeRange(b,
g&&g.pixelType||this.pixelType);c=new E;c.functionName="Colormap";c.functionArguments={};c.functionArguments.Colormap=b;c.variableName="Raster";return c},_adjustColormapToPixelTypeRange:function(a,b){var c=this._pixelTypeRanges[b];c&&a.push([Math.floor(c[0]-1),0,0,0],[Math.ceil(c[1]+1),0,0,0]);return a},_combineRenderingRule:function(a,b){if(!a||!b)return a||b;var c=function(a){var b=a.Raster;return b=b&&"esri.layers.RasterFunction"===b.declaredClass?c(b.functionArguments):a},e=g.clone(a);c(e.functionArguments).Raster=
b;return e},_resolve:function(a,b,c,e,d){b&&this[b].apply(this,a);c&&c.apply(null,a);e&&r._resDfd(e,a,d)},_toggleTime:function(){var a=this._map;this.timeInfo&&this.useMapTime&&a&&!this.suspended?(this._timeConnect||(this._timeConnect=O.connect(a,"onTimeExtentChange",this,this._onTimeExtentChangeHandler)),this._setTime(a.timeExtent)):(O.disconnect(this._timeConnect),this._timeConnect=null,this._setTime(null))},setUseMapTime:function(a,b){this.useMapTime=a;this._toggleTime();!b&&this._map&&this.refresh(!0)},
_setTime:function(a){this._params&&(this._params.time=a?a.toJson().join(","):null)},_onTimeExtentChangeHandler:function(a){this.suspended||(this._setTime(a),this.refresh(!0))},handleSpatialReferenceChange:function(){this.onSpatialReferenceChange()}});Q("extend-esri")&&g.setObject("layers.ImageServiceLayerMixin",K,S);return K});