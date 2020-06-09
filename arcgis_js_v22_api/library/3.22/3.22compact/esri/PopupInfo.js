// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/PopupInfo","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/json dojo/i18n dojo/has dojo/Deferred dojo/sniff dojo/promise/all dojox/html/entities ./lang ./kernel ./request ./tasks/query ./tasks/QueryTask ./tasks/RelationshipQuery ./tasks/StatisticDefinition ./renderers/arcadeUtils ./layers/support/attributeUtils dojo/i18n!dojo/cldr/nls/number".split(" "),function(w,m,l,G,S,K,C,L,D,M,p,H,N,E,I,O,P,Q,R,J){w=w(null,{declaredClass:"esri.PopupInfo",_reExprField:/^\s*expression\//i,
_exprPrefix:"expression/",_relatedFieldPrefix:"relationships/",initialize:function(a,b){if(a){m.mixin(this,b);this.info=a;this.title=this.getTitle;this.content=this.getContent;this._exprCache=this._compileExpressions(this.info.expressionInfos);var c=this._fieldLabels={},d=this._fieldsMap={};this.info.fieldInfos&&l.forEach(this.info.fieldInfos,function(a){var b=a.fieldName.toLowerCase(),e=this._isExpressionField(b)?this.getExpressionInfo(b):null;c[b]=e?e.title:a.label;d[b]=a},this);this.titleHasRelatedFields=
!(!this.info.title||-1===this.info.title.indexOf("{"+this._relatedFieldPrefix))}},toJson:function(){return G.fromJson(G.toJson(this.info))},getTitle:function(){},getContent:function(){},getFieldInfo:function(a){var b;l.some(this.info&&this.info.fieldInfos,function(c){c.fieldName===a&&(b=c);return!!b});return b},getExpressionInfo:function(a){if(this._isExpressionField(a)){a=a.replace(this._reExprField,"");a=a.toLowerCase();var b;l.some(this.info.expressionInfos,function(c){c.name.toLowerCase()===a&&
(b=c);return!!b});return b}},getComponents:function(a){var b=this.info,c=new C,d,e;b.fieldInfos&&(e=l.filter(b.fieldInfos,function(a){return-1!==a.fieldName.indexOf(this._relatedFieldPrefix)},this));e&&0<e.length&&(d=this._getRelatedRecords({graphic:a,fieldsInfo:e}));d?d.always(m.hitch(this,function(){c.resolve(this._getPopupValues(a))})):c.resolve(this._getPopupValues(a));return c.promise},getAttachments:function(a){var b=a.getSourceLayer();a=a.attributes;if(this.info.showAttachments&&b&&b.hasAttachments&&
b.objectIdField&&(a=a&&a[b.objectIdField]))return b.queryAttachmentInfos(a)},_isExpressionField:function(a){return this._reExprField.test(a)},_compileExpressions:function(a){var b={};l.forEach(a,function(a){var c=a.returnType&&a.returnType.toLowerCase();b[a.name]=R.createAttributeCache({valueExpression:a.expression},"number"!==c)});return b},_fetchAttributes:function(a){var b=m.clone(a.attributes)||{},c=this._exprPrefix,d=this._exprCache;l.forEach(this.info.expressionInfos,function(e){var f=c+e.name;
e=(e=d[e.name])?a._getDataValue(e.attributeInfo,e,Q):null;"string"===typeof e&&(e=M.encode(e));b[f]=e});return b},_getPopupValues:function(a,b){var c=this.info,d=a.getSourceLayer(),e=this._fetchAttributes(a),f=m.clone(e),n=c.fieldInfos,k="",r="",q,g,h,x,t,v=d&&d._getDateOpts&&d._getDateOpts().properties,v=v&&v.slice(0),u={dateFormat:{properties:v,formatter:"DateFormat"+this._insertOffset(this._dateFormats.shortDateShortTime)}};if(this._relatedInfo)for(x in this._relatedInfo)if(this._relatedInfo.hasOwnProperty(x)){var y=
this._relatedInfo[x],F=this._relatedLayersInfo[x];y&&(l.forEach(y.relatedFeatures,function(a){for(t in a.attributes)if(a.attributes.hasOwnProperty(t)&&"esriRelCardinalityOneToOne"===F.relation.cardinality){var b=this._toRelatedFieldName([F.relation.id,t]);e[b]=f[b]=a.attributes[t]}},this),l.forEach(y.relatedStatsFeatures,function(a){for(t in a.attributes)if(a.attributes.hasOwnProperty(t)){var b=this._toRelatedFieldName([F.relation.id,t]);e[b]=f[b]=a.attributes[t]}},this))}n&&l.forEach(n,function(a){g=
a.fieldName;var b=this._getLayerFieldInfo(d,g);b&&(g=a.fieldName=b.name);f[g]=this._formatValue(f[g],g,u);v&&a.format&&a.format.dateFormat&&(a=l.indexOf(v,g),-1<a&&v.splice(a,1))},this);if(d){x=d.types;var w=(y=d.typeIdField)&&e[y];for(g in e)if(e.hasOwnProperty(g)&&-1===g.indexOf(this._relatedFieldPrefix)&&(h=e[g],p.isDefined(h))){var z=this._getDomainName(d,a,x,w,g,h);p.isDefined(z)?f[g]=z:g===y&&(z=this._getTypeName(d,a,h),p.isDefined(z)&&(f[g]=z))}}c.title&&(k=this._processFieldsInLinks(this._fixTokens(c.title,
d),e),k=m.trim(p.substitute(f,k,u)||""));if(b)return{title:k};c.description&&(r=this._processFieldsInLinks(this._fixTokens(c.description,d),e),r=m.trim(p.substitute(f,r,u)||""));n&&(q=[],l.forEach(n,function(a){(g=a.fieldName)&&a.visible&&q.push([this._fieldLabels[g.toLowerCase()]||g,p.substitute(f,"${"+g+"}",u)||""])},this));var A,B;c.mediaInfos&&(A=[],l.forEach(c.mediaInfos,function(a){B=0;h=a.value;switch(a.type){case "image":var b=h.sourceURL,b=b&&m.trim(p.substitute(e,this._fixTokens(b,d)));
B=!!b;break;case "piechart":case "linechart":case "columnchart":case "barchart":var c,b=h.normalizeField;h.fields=l.map(h.fields,function(a){return(c=this._getLayerFieldInfo(d,a))?c.name:a},this);b&&(c=this._getLayerFieldInfo(d,b),h.normalizeField=c?c.name:b);B=l.some(h.fields,function(a){return p.isDefined(e[a])||-1!==a.indexOf(this._relatedFieldPrefix)&&this._relatedInfo},this);break;default:return}if(B){a=m.clone(a);h=a.value;var b=a.title?this._processFieldsInLinks(this._fixTokens(a.title,d),
e):"",g=a.caption?this._processFieldsInLinks(this._fixTokens(a.caption,d),e):"";a.title=b?m.trim(p.substitute(f,b,u)||""):"";a.caption=g?m.trim(p.substitute(f,g,u)||""):"";if("image"===a.type)h.sourceURL=p.substitute(e,this._fixTokens(h.sourceURL,d)),h.linkURL&&(h.linkURL=m.trim(p.substitute(e,this._fixTokens(h.linkURL,d))||""));else{var k,n;l.forEach(h.fields,function(a,b){if(-1!==a.indexOf(this._relatedFieldPrefix))n=this._getRelatedChartInfos(a,h,e,u),n instanceof Array?h.fields=n:h.fields[b]=
n;else{var c=e[a],c=void 0===c?null:c;k=e[h.normalizeField]||0;c&&k&&(c/=k);h.fields[b]={y:c,tooltip:(this._fieldLabels[a.toLowerCase()]||a)+":\x3cbr/\x3e"+this._formatValue(c,a,u,!!k)}}},this)}A.push(a)}},this));return{title:k,description:r,hasDescription:!!c.description,fields:q&&q.length?q:null,mediaInfos:A&&A.length?A:null,formatted:f,editSummary:d&&d.getEditSummary?d.getEditSummary(a):""}},_getRelatedChartInfos:function(a,b,c,d){var e,f,n,k,r,q;e=[];q=this._fromRelatedFieldName(a);r=q[0];f=this._relatedInfo[r];
r=this._relatedLayersInfo[r];f&&l.forEach(f.relatedFeatures,function(g){g=g.attributes;var f,l;for(l in g)if(g.hasOwnProperty(l)&&l===q[1]){f={};k=g[l];b.normalizeField&&(n=-1!==b.normalizeField.indexOf(this._relatedFieldPrefix)?g[this._fromRelatedFieldName(b.normalizeField)[1]]:c[b.normalizeField]);k&&n&&(k/=n);if(b.tooltipField)if(-1!==b.tooltipField.indexOf(this._relatedFieldPrefix)){var r=this._fromRelatedFieldName(b.tooltipField)[1],m=p.isDefined(g[r])?g[r]:r;f.tooltip=m+":\x3cbr/\x3e"+this._formatValue(k,
r,d,!!n)}else f.tooltip=(this._fieldLabels[a.toLowerCase()]||a)+":\x3cbr/\x3e"+this._formatValue(k,b.tooltipField,d,!!n);else f.tooltip=k;f.y=k;e.push(f)}},this);return"esriRelCardinalityOneToMany"===r.relation.cardinality||"esriRelCardinalityManyToMany"===r.relation.cardinality?e:e[0]},_dateFormats:{shortDate:"(datePattern: 'M/d/y', selector: 'date')",shortDateLE:"(datePattern: 'd/M/y', selector: 'date')",longMonthDayYear:"(datePattern: 'MMMM d, y', selector: 'date')",dayShortMonthYear:"(datePattern: 'd MMM y', selector: 'date')",
longDate:"(datePattern: 'EEEE, MMMM d, y', selector: 'date')",shortDateShortTime:"(datePattern: 'M/d/y', timePattern: 'h:mm a', selector: 'date and time')",shortDateLEShortTime:"(datePattern: 'd/M/y', timePattern: 'h:mm a', selector: 'date and time')",shortDateShortTime24:"(datePattern: 'M/d/y', timePattern: 'H:mm', selector: 'date and time')",shortDateLEShortTime24:"(datePattern: 'd/M/y', timePattern: 'H:mm', selector: 'date and time')",shortDateLongTime:"(datePattern: 'M/d/y', timePattern: 'h:mm:ss a', selector: 'date and time')",
shortDateLELongTime:"(datePattern: 'd/M/y', timePattern: 'h:mm:ss a', selector: 'date and time')",shortDateLongTime24:"(datePattern: 'M/d/y', timePattern: 'H:mm:ss', selector: 'date and time')",shortDateLELongTime24:"(datePattern: 'd/M/y', timePattern: 'H:mm:ss', selector: 'date and time')",longMonthYear:"(datePattern: 'MMMM y', selector: 'date')",shortMonthYear:"(datePattern: 'MMM y', selector: 'date')",year:"(datePattern: 'y', selector: 'date')"},_reHref:/href\s*=\s*\"([^\"]+)\"/ig,_reHrefApos:/href\s*=\s*\'([^\']+)\'/ig,
_reEmptyHref:/^href\s*=\s*"\s*"$/i,_reEmptyHrefApos:/^href\s*=\s*'\s*'$/i,_fixTokens:function(a,b){var c=this;return a.replace(/(\{([^\{\r\n]+)\})/g,function(a,e,f){a=c._getLayerFieldInfo(b,f);return"$"+(a?"{"+a.name+"}":e)})},_encodeAttributes:function(a){a=m.clone(a)||{};var b,c;for(b in a)(c=a[b])&&"string"===typeof c&&(c=encodeURIComponent(c).replace(/\'/g,"\x26apos;"),a[b]=c);return a},_processFieldsInLinks:function(a,b){var c=this._encodeAttributes(b),c=m.hitch(this,this._addValuesToHref,b,
c);a&&(a=a.replace(this._reHref,c).replace(this._reHrefApos,c));return a},_addValuesToHref:function(a,b,c,d){d=d&&m.trim(d);c=p.substitute(d&&0===d.indexOf("${")?a:b,c);this._reEmptyHref.test(c)?c='href\x3d"about:blank"':this._reEmptyHrefApos.test(c)&&(c="href\x3d'about:blank'");return c},_getLayerFieldInfo:function(a,b){return a&&a.getField?a.getField(b):null},_formatValue:function(a,b,c,d){var e=this._fieldsMap[b.toLowerCase()],f=e&&e.format;b=-1!==l.indexOf(c.dateFormat.properties,b);var n="number"===
typeof a&&!b&&(!f||!f.dateFormat);if(!p.isDefined(a)||!e||!p.isDefined(f))return n?this._forceLTR(a):a;var k="",e=[],r=f.hasOwnProperty("places")||f.hasOwnProperty("digitSeparator"),q=f.hasOwnProperty("digitSeparator")?f.digitSeparator:!0;if(r&&!b)k="NumberFormat",e.push("places: "+(p.isDefined(f.places)&&(!d||0<f.places)?Number(f.places):"Infinity")),e.length&&(k+="("+e.join(",")+")");else if(f.dateFormat)k="DateFormat"+this._insertOffset(this._dateFormats[f.dateFormat]||this._dateFormats.shortDateShortTime);
else return n?this._forceLTR(a):a;var g=this._applyFormatting(a,k,c);r&&-1<a.constructor.toString().indexOf("Array")&&(g="",l.forEach(a,m.hitch(this,function(a,b){b&&(g+=" ");g+=this._applyFormatting(a,k,c)})));r&&!q&&J.group&&(g=g.replace(new RegExp("\\"+J.group,"g"),""));b&&(g='\x3cspan class\x3d"esriDateValue"\x3e'+g+"\x3c/span\x3e");return n?this._forceLTR(g):g},_applyFormatting:function(a,b,c){return p.substitute({myKey:a},"${myKey:"+b+"}",c)||""},_forceLTR:function(a){var b=L("ie");return b&&
10>=b?a:"\x3cspan class\x3d'esriNumericValue'\x3e"+a+"\x3c/span\x3e"},_insertOffset:function(a){a&&(a=p.isDefined(this.utcOffset)?a.replace(/\)\s*$/,", utcOffset:"+this.utcOffset+")"):a);return a},_getDomainName:function(a,b,c,d,e,f){return(a=a.getDomain&&a.getDomain(e,{feature:b}))&&a.codedValues?a.getName(f):null},_getTypeName:function(a,b,c){return(a=a.getType&&a.getType(b))&&a.name},_getRelatedRecords:function(a){var b=a.graphic,c=new C,d;this._relatedLayersInfo?this._queryRelatedLayers(b).then(m.hitch(this,
function(a){this._setRelatedRecords(b,a);c.resolve(a)}),m.hitch(this,this._handlerErrorResponse,c)):this._getRelatedLayersInfo(a).then(m.hitch(this,function(a){for(d in a)a.hasOwnProperty(d)&&a[d]&&(this._relatedLayersInfo[d].relatedLayerInfo=a[d]);this._queryRelatedLayers(b).then(m.hitch(this,function(a){this._setRelatedRecords(b,a);c.resolve(a)}),m.hitch(this,this._handlerErrorResponse,c))}),m.hitch(this,this._handlerErrorResponse,c));return c.promise},_getRelatedLayersInfo:function(a){var b=a.fieldsInfo,
c,d,e={};c=a.graphic.getSourceLayer();this._relatedLayersInfo||(this._relatedLayersInfo={});l.forEach(b,function(a){var b,d,e,f;b=this._fromRelatedFieldName(a.fieldName);d=b[0];b=b[1];d&&(this._relatedLayersInfo[d]||(l.some(c.relationships,function(a){if(a.id==d)return f=a,!0}),f&&(this._relatedLayersInfo[d]={relation:f,relatedFields:[],outStatistics:[]})),this._relatedLayersInfo[d]&&(this._relatedLayersInfo[d].relatedFields.push(b),a.statisticType&&(e=new P,e.statisticType=a.statisticType,e.onStatisticField=
b,e.outStatisticFieldName=b,this._relatedLayersInfo[d].outStatistics.push(e))))},this);for(d in this._relatedLayersInfo)this._relatedLayersInfo.hasOwnProperty(d)&&this._relatedLayersInfo[d]&&(a=this._relatedLayersInfo[d].relation,a=c.url.replace(/[0-9]+$/,a.relatedTableId),this._relatedLayersInfo[d].relatedLayerUrl=a,e[d]=N({url:a,content:{f:"json"},callbackParamName:"callback"}));return D(e)},_queryRelatedLayers:function(a){var b={},c;for(c in this._relatedLayersInfo)this._relatedLayersInfo.hasOwnProperty(c)&&
(b[c]=this._queryRelatedLayer({graphic:a,relatedInfo:this._relatedLayersInfo[c]}));return D(b)},_queryRelatedLayer:function(a){var b,c,d,e,f,n,k,r,q,g,h,p,t;b=a.graphic;c=b.getSourceLayer();d=c.url.match(/[0-9]+$/g)[0];h=a.relatedInfo;g=h.relatedLayerInfo;p=h.relatedLayerUrl;a=h.relation;l.some(g.relationships,function(a){if(a.relatedTableId===parseInt(d,10))return e=a,!0},this);e&&(f=new E,l.some(g.fields,function(a){if(a.name===e.keyField)return r=-1!==l.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger",
"esriFieldTypeSingle","esriFieldTypeDouble"],a.type)?"number":"string",!0}),e.relationshipTableId&&e.keyFieldInRelationshipTable?(t=new C,this._queryRelatedRecords(b,e).then(m.hitch(this,function(a){var d;d=a[b.attributes[c.objectIdField]];a=l.map(d.features,function(a){return a.attributes[g.objectIdField]},this);h.outStatistics&&0<h.outStatistics.length&&g.supportsStatistics&&(q=new E,q.objectIds=a,q.outFields=f.outFields,q.outStatistics=h.outStatistics);q&&(n=new I(p),n.execute(q).then(m.hitch(this,
function(a){var b=[];b.push(d);b.push(a);t.resolve(b)})))}))):(k="string"===r?e.keyField+"\x3d'"+b.attributes[a.keyField]+"'":e.keyField+"\x3d"+b.attributes[a.keyField],f.where=k,f.outFields=h.relatedFields,h.outStatistics&&0<h.outStatistics.length&&g.supportsStatistics&&(q=new E,q.where=f.where,q.outFields=f.outFields,q.outStatistics=h.outStatistics),n=new I(p),k=[],k.push(n.execute(f)),q&&k.push(n.execute(q))));return k?D(k):t?t.promise:void 0},_setRelatedRecords:function(a,b){this._relatedInfo=
[];for(var c in b)if(b.hasOwnProperty(c)&&b[c]){var d=b[c];this._relatedInfo[c]={};this._relatedInfo[c].relatedFeatures=d[0].features;p.isDefined(d[1])&&(this._relatedInfo[c].relatedStatsFeatures=d[1].features)}},_handlerErrorResponse:function(a,b){a.reject(b)},_fromRelatedFieldName:function(a){var b=[];-1!==a.indexOf(this._relatedFieldPrefix)&&(a=a.split("/"),b=a.slice(1));return b},_toRelatedFieldName:function(a){var b="";a&&0<a.length&&(b=this._relatedFieldPrefix+a[0]+"/"+a[1]);return b},_queryRelatedRecords:function(a,
b){var c=a.getSourceLayer(),d=new O;d.outFields=["*"];d.relationshipId=b.id;d.objectIds=[a.attributes[c.objectIdField]];return c.queryRelatedFeatures(d)}});K("extend-esri")&&(H.PopupInfo=H.PopupInfoTemplate=w);return w});