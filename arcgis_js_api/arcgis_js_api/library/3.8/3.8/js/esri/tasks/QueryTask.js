/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
define("esri/tasks/QueryTask","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/Deferred dojo/_base/json dojo/has esri/kernel esri/request esri/deferredUtils esri/geometry/normalizeUtils esri/tasks/Task esri/tasks/FeatureSet".split(" "),function(h,g,p,q,m,r,s,l,t,u,v,n){h=h(v,{declaredClass:"esri.tasks.QueryTask",_eventMap:{complete:["featureSet"],"execute-for-count-complete":["count"],"execute-for-ids-complete":["objectIds"],"execute-relationship-query-complete":["featureSets"]},constructor:function(a,
f){this._handler=g.hitch(this,this._handler);this._relationshipQueryHandler=g.hitch(this,this._relationshipQueryHandler);this._executeForIdsHandler=g.hitch(this,this._executeForIdsHandler);this._countHandler=g.hitch(this,this._countHandler);this.source=f&&f.source;this.gdbVersion=f&&f.gdbVersion;this.registerConnectEvents()},__msigns:[{n:"execute",c:4,a:[{i:0,p:["geometry"]}],e:2},{n:"executeForIds",c:3,a:[{i:0,p:["geometry"]}],e:2},{n:"executeForCount",c:3,a:[{i:0,p:["geometry"]}],e:2}],onComplete:function(){},
onExecuteRelationshipQueryComplete:function(){},onExecuteForIdsComplete:function(){},onExecuteForCountComplete:function(){},execute:function(a,f,d,e,b){var c=b.assembly;a=this._encode(g.mixin({},this._url.query,{f:"json"},a.toJson(c&&c[0])));var k=this._handler,w=this._errorHandler;this.source&&(c={source:this.source.toJson()},a.layer=m.toJson(c));this.gdbVersion&&(a.gdbVersion=this.gdbVersion);return l({url:this._url.path+"/query",content:a,callbackParamName:"callback",load:function(a,c){k(a,c,f,
d,b.dfd)},error:function(a){w(a,d,b.dfd)},callbackSuffix:e},this.requestOptions)},executeRelationshipQuery:function(a,f,d){a=this._encode(g.mixin({},this._url.query,{f:"json"},a.toJson()));var e=this._relationshipQueryHandler,b=this._errorHandler;this.gdbVersion&&(a.gdbVersion=this.gdbVersion);var c=new q(t._dfdCanceller);c._pendingDfd=l({url:this._url.path+"/queryRelatedRecords",content:a,callbackParamName:"callback",load:function(a,b){e(a,b,f,d,c)},error:function(a){b(a,d,c)}},this.requestOptions);
return c},executeForIds:function(a,f,d,e){var b=e.assembly;a=this._encode(g.mixin({},this._url.query,{f:"json",returnIdsOnly:!0},a.toJson(b&&b[0])));var c=this._executeForIdsHandler,k=this._errorHandler;this.source&&(b={source:this.source.toJson()},a.layer=m.toJson(b));this.gdbVersion&&(a.gdbVersion=this.gdbVersion);return l({url:this._url.path+"/query",content:a,callbackParamName:"callback",load:function(a,b){c(a,b,f,d,e.dfd)},error:function(a){k(a,d,e.dfd)}},this.requestOptions)},executeForCount:function(a,
f,d,e){var b=e.assembly;a=this._encode(g.mixin({},this._url.query,{f:"json",returnIdsOnly:!0,returnCountOnly:!0},a.toJson(b&&b[0])));var c=this._countHandler,k=this._errorHandler;this.source&&(b={source:this.source.toJson()},a.layer=m.toJson(b));this.gdbVersion&&(a.gdbVersion=this.gdbVersion);return l({url:this._url.path+"/query",content:a,callbackParamName:"callback",load:function(a,b){c(a,b,f,d,e.dfd)},error:function(a){k(a,d,e.dfd)}},this.requestOptions)},_handler:function(a,f,d,e,b){try{var c=
new n(a);this._successHandler([c],"onComplete",d,b)}catch(k){this._errorHandler(k,e,b)}},_relationshipQueryHandler:function(a,f,d,e,b){try{var c=a.geometryType,k=a.spatialReference,g={};p.forEach(a.relatedRecordGroups,function(a){var b={};b.geometryType=c;b.spatialReference=k;b.features=a.relatedRecords;b=new n(b);g[a.objectId]=b});this._successHandler([g],"onExecuteRelationshipQueryComplete",d,b)}catch(h){this._errorHandler(h,e,b)}},_executeForIdsHandler:function(a,f,d,e,b){try{this._successHandler([a.objectIds],
"onExecuteForIdsComplete",d,b)}catch(c){this._errorHandler(c,e,b)}},_countHandler:function(a,f,d,e,b){try{var c,g=a.features,h=a.objectIds;if(h)c=h.length;else{if(g)throw Error("Unable to perform query. Please check your parameters.");c=a.count}this._successHandler([c],"onExecuteForCountComplete",d,b)}catch(l){this._errorHandler(l,e,b)}}});u._createWrappers(h);r("extend-esri")&&g.setObject("tasks.QueryTask",h,s);return h});