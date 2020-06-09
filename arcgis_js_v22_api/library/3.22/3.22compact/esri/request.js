// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/request","require dojo/_base/array dojo/_base/config dojo/_base/Deferred dojo/_base/lang dojo/_base/url dojo/_base/xhr ./core/request/script dojo/request/iframe dojo/dom-construct dojo/io-query ./kernel ./config ./sniff ./lang ./urlUtils ./deferredUtils".split(" "),function(T,F,J,t,u,U,v,aa,ba,W,X,g,ca,n,G,q,da){function C(a){a=new U(a);return(a.host+(a.port?":"+a.port:"")).toLowerCase()}function ea(a){return this._xhr?this._xhr.getResponseHeader(a):null}function K(a,d,b,e){var Q=!1,
w=!1,x,k;G.isDefined(d)&&(u.isObject(d)?(Q=!!d.useProxy,w=!!d.usePost,x=d.crossOrigin):Q=!!d);a=u.mixin({},a);a._ssl&&(a.url=a.url.replace(/^http:/i,"https:"));10>n("ie")&&!fa.test(a.url)&&(a.url=encodeURI(a.url));d=a.content;var f=a.url,h=b&&a.form,y=m;x=G.isDefined(x)?x:y.useCors;a.load=function(c){var b;c&&(c.error?(b=u.mixin(Error(),c.error),b.log=!!J.isDebug):"error"===c.status&&(b=u.mixin(Error(),c),b.log=!!J.isDebug),b&&(a.failOk=!b.log,G.isDefined(b.httpCode)||(b.httpCode=b.code)));return b||
c};a.error=function(a,c){c&&c.xhr&&c.xhr.abort();a instanceof Error||(a=u.mixin(Error(),a));a.log=!!J.isDebug;y.errorHandler(a,c);return a};a._token&&(a.content=a.content||{},a.content.token=a._token);var p=0,l;d&&f&&(l=X.objectToQuery(d),p=l.length+f.length+1,n("esri-url-encodes-apostrophe")&&(p=l.replace(/'/g,"%27").length+f.length+1));a.timeout=G.isDefined(a.timeout)?a.timeout:y.timeout;a.handleAs=a.handleAs||"json";try{var A,z,c=x&&q.canUseXhr(a.url)&&!/https?:\/\/[^\/]+\/[^\/]+\/admin\/?(\/.*)?$/i.test(a.url),
D=q.hasSameOrigin(a.url,window.location.href)||c,H=w||b||p>y.postLength?!0:!1,Y=D||-1===a.handleAs.indexOf("json")||!a.callbackParamName||b?!1:!0,B=q.getProxyRule(a.url)||y.alwaysUseProxy||Q||(!Y||H)&&!D?!0:!1;b&&!n("esri-file-upload")&&!B&&c&&(B=!0);if(B)if(A=q.getProxyUrl(f,x),z=A.path,A._xo&&(c=!0),!H&&z.length+1+p>y.postLength&&(H=!0),a.url=z+"?"+f,H)a.content=u.mixin(A.query||{},d);else{var Z=X.objectToQuery(u.mixin(A.query||{},d));Z&&(a.url+="?"+Z);a.content=null}if(!Y||H||B){var L=a.headers;
!c||L&&L.hasOwnProperty("X-Requested-With")||(L=a.headers=L||{},L["X-Requested-With"]=null);if(b){var r=a.callbackParamName||"callback.html",C=a.callbackElementName||"textarea",M,R,N,S,K=h.elements?h.elements.length:0,E;if(d=a.content)for(M in d.token&&-1<f.toLowerCase().indexOf("/sharing/servers/")&&(f+=(-1===f.indexOf("?")?"?":"\x26")+"token\x3d"+d.token,a.url=B?z+"?"+f:f,delete d.token),d)if(N=d[M],G.isDefined(N)){R=null;for(S=0;S<K;S++)if(E=h.elements[S],E.name===M){R=E;break}R?R.value=N:e?h.append(M,
N):h.appendChild(W.create("input",{type:"hidden",name:M,value:N}))}if(n("esri-file-upload"))F.forEach(h.elements,function(a){a.name===r&&h.removeChild(a)}),a.contentType=!1,a.postData=e?h:new FormData(h),delete a.form;else{h.enctype="multipart/form-data";9>n("ie")&&(h.encoding="multipart/form-data");h.method="post";F.some(h.elements,function(a){return a.name===r})||h.appendChild(W.create("input",{type:"hidden",name:r,value:C}));if(-1!==f.toLowerCase().indexOf("addattachment")||-1!==f.toLowerCase().indexOf("updateattachment"))f+=
(-1===f.indexOf("?")?"?":"\x26")+r+"\x3d"+C,a.url=B?z+"?"+f:f;delete a.content}}if(c&&!a.hasOwnProperty("withCredentials")&&"with-credentials"===m.useCors){e=B?z:f;var I=q.canUseXhr(e,!0),V=-1<I?m.corsEnabledServers[I]:null;if(V&&V.hasOwnProperty("withCredentials"))V.withCredentials&&(a.withCredentials=!0);else if(g.id){var P=g.id.findServerInfo(e);P&&P.webTierAuth&&(a.withCredentials=!0)}}a=O?O(a):a;if(H){if(b&&!n("esri-file-upload")){k=new t(function(){T.cancel()});var T=ba.post(a.url,a).then(function(a){k.resolve(a)}).otherwise(function(a){k.reject(a)});
k.addCallback(function(c){return a.load(c)});k.addErrback(function(c){return a.error(c)});return k}!B&&n("safari")&&(a.url+=(-1===a.url.indexOf("?")?"?":"\x26")+"_ts\x3d"+(new Date).getTime()+ha++);return v.post(a)}return v.get(a)}a=O?O(a):a;a.jsonp=a.callbackParamName;a.query=a.content;k=new t(function(){U.cancel()});var U=aa.get(a.url,a).then(function(a){k.resolve(a)}).otherwise(function(a){k.reject(a)});k.addCallback(function(c){return a.load(c)});k.addErrback(function(c){return a.error(c)});return k}catch(ga){return k=
new t,k.errback(a.error(ga)),k}}function E(a){var d=m.corsStatus,b=q.canUseXhr(a,!0);-1<b&&m.corsEnabledServers.splice(b,1);var e=new t;e.reject({log:!!J.isDebug});d[C(a)]=e.promise;return b}function I(a){var d=m.corsStatus;try{var b=C(a);if(m.corsDetection&&m.useCors&&n("esri-cors")&&a&&-1!==a.toLowerCase().indexOf("/rest/services")&&!q.hasSameOrigin(a,window.location.href)&&!q.canUseXhr(a)){if(d[b])return d[b];var e=new t;d[b]=e.promise;v.get({url:a.substring(0,a.toLowerCase().indexOf("/rest/")+
6)+"info",content:{f:"json"},failOk:!0,handleAs:"json",headers:{"X-Requested-With":null},timeout:1E3*m.corsDetectionTimeout}).then(function(d){d?(q.canUseXhr(a)||m.corsEnabledServers.push(b),e.resolve()):e.reject()},function(a){e.reject()});return e.promise}}catch(Q){console.log("esri._detectCors: an unknown error occurred while detecting CORS support")}return ia}function P(a){O=a}function r(a,d,b,e){function l(a){a._pendingDfd=K(b,e,t,y);if(!a._pendingDfd){a.ioArgs=a._pendingDfd&&a._pendingDfd.ioArgs;
var c=Error("Deferred object is missing");c.log=!!J.isDebug;a.errback(c);a._pendingDfd=null;return a}a._pendingDfd.addCallback(function(b){a.ioArgs=a._pendingDfd&&a._pendingDfd.ioArgs;e.returnFullResponse&&(b={data:b,_xhr:a.ioArgs&&a.ioArgs.xhr,getHeader:ea});a.callback(b);a._pendingDfd=null}).addErrback(function(c){var d,D,f;c&&(d=c.code,D=c.subcode,f=(f=c.messageCode)&&f.toUpperCase());if(c&&403==d&&(4==D||c.message&&-1<c.message.toLowerCase().indexOf("ssl")&&-1===c.message.toLowerCase().indexOf("permission"))){if(!b._ssl){b._ssl=
b._sslFromServer=!0;r(a,!0,b,e);return}}else if(c&&415==c.status){if(E(b.url),!b._err415){b._err415=1;r(a,!0,b,e);return}}else if(g.id&&-1!==F.indexOf(g.id._errorCodes,d)&&!g.id._isPublic(b.url)&&!x&&(403!=d||-1===F.indexOf(ja,f)&&(!G.isDefined(D)||2==D&&b._token))){a._pendingDfd=g.id.getCredential(b.url,{token:b._token,error:c});a._pendingDfd.addCallback(function(c){b._token=c.token;b._credential=c;b._ssl=b._sslFromServer||c.ssl;r(a,!0,b,e)}).addErrback(function(c){a.errback(c);a._pendingDfd=null});
return}a.ioArgs=a._pendingDfd&&a._pendingDfd.ioArgs;a.errback(c);a._pendingDfd=null})}var w=b.form,x=e.disableIdentityLookup,k=e._preLookup,f=!1;if(n("esri-workers")&&!1!==m.useWorkers)if(!0===e.useWorkers||!0===m.useWorkers)f=!0;else if(e.workerOptions){var h=e.workerOptions;if(h.callback||h.worker&&h.worker.worker instanceof Worker)f=!0}var y=w&&n("esri-file-upload")&&w instanceof FormData,t=w&&(w.elements?F.some(w.elements,function(a){return"file"===a.type}):y),u=-1!==b.url.toLowerCase().indexOf("token\x3d")||
b.content&&b.content.token||t&&F.some(w.elements,function(a){return"token"===a.name})?1:0;if(!d){a.addCallback(function(a){if((/\/sharing\/rest\/accounts\/self/i.test(b.url)||/\/sharing\/rest\/portals\/self/i.test(b.url))&&!u&&!b._token&&a.user&&a.user.username){m.webTierAuthServers.push(C(b.url));a=m.corsEnabledServers;var c=q.canUseXhr(b.url,!0),d={host:C(b.url),withCredentials:!0};if(-1===c)a.push(d);else{var e=a[c];"object"===typeof e?e.withCredentials=!0:a.splice(c,1,d)}}if(a=b._credential)if(c=
(c=g.id.findServerInfo(a.server))&&c.owningSystemUrl)c=c.replace(/\/?$/,"/sharing"),(a=g.id.findCredential(c,a.userId))&&-1===g.id._getIdenticalSvcIdx(c,a)&&a.resources.splice(0,0,c)});a.addBoth(function(a){delete b._credential;!a||n("ie")&&a.nodeType||(a._ssl=b._ssl)});var A=b.load,z=b.error;A&&a.addCallback(function(b){var c=a._pendingDfd,c=c&&c.ioArgs;return A.call(c&&c.args,b,c)});z&&a.addErrback(function(b){var c=a._pendingDfd,c=c&&c.ioArgs;return z.call(c&&c.args,b,c)})}!g.id||u||b._token||
g.id._isPublic(b.url)||x&&!k||!(d=g.id.findCredential(b.url))||(b._token=d.token,b._ssl=d.ssl);f?e.workerOptions&&e.workerOptions.worker?(p||(p=v),v=e.workerOptions.worker,l(a)):T(["./workers/RequestClient"],function(b){p||(p=v);if(e.workerOptions){var c=e.workerOptions;v=b.getClient(c.callback,c.cbFunction)}else v=b.getClient();l(a)}):(p&&(v=p,p=null),l(a));return a}function l(a,d){a.url=q.fixUrl(a.url);d=d||{};var b=new t(da._dfdCanceller);I(a.url).always(function(){r(b,!1,a,d)});return b}var p=
null,O,m=ca.defaults.io,ja=["COM_0056","COM_0057"],ha=0,fa=/%[0-9A-F]{2}/i,ia=function(){var a=new t;a.resolve();return a.promise}();l._makeRequest=K;l._processRequest=r;l._disableCors=E;l._detectCors=I;l.setRequestPreCallback=P;n("extend-esri")&&(g.request=l,g._makeRequest=K,g._processRequest=r,g._disableCors=E,g._detectCors=I,g.setRequestPreCallback=P);return l});