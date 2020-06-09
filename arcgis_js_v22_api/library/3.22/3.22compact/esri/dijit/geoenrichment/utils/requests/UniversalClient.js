// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/utils/requests/UniversalClient","dojo/_base/declare dojo/_base/lang dojo/_base/url dojo/Deferred dojo/request/xhr dojo/io-query dojo/sniff dojo/when esri/kernel esri/config esri/lang esri/urlUtils ../UrlUtil ./BinaryData ./FileContent ./MultipartDataBuilder".split(" "),function(u,p,G,v,w,x,y,H,m,q,z,r,n,A,B,C){function D(a,b){if(b)this.reject(b);else{var d=a.xhr,e=d.getResponseHeader&&d.getResponseHeader("Content-Type");a.status=d.status;a.data=new A(d.response||d.responseBody||
d.responseText,e);this.resolve(a)}}var E=0,F=y("safari");return u(null,{constructor:function(a){"string"===typeof a?this.url=a:"object"===typeof a&&p.mixin(this,a)},url:null,preventCache:null,usePost:!1,timeout:0,multipartThreshold:0,useCommonAuth:!1,useProxy:!1,allowSSL:null,send:function(a,b){return this.sendUrlRequest(this.prepareUrlRequest(a,b),"UniversalClient.send")},prepareUrlRequest:function(a,b){"string"===typeof a?a={urlSuffix:a}:a||(a={});b||(b={});var d=a.url||this.url,e=a.urlSuffix;d||
(d=e,e=null);if(!d)throw Error("URL is missing.");var c=r.urlToObject(d),d=n.combine(c.path,e),e=c.query||{};"object"===typeof b.content&&(e=p.mixin(e,b.content));c=b.requireSSL;!0!==c&&!1===this.allowSSL&&(c=!1);!1!==c&&!0===this.allowSSL&&/^https/i.test(window.location.protocol)&&(c=!0);if(m.id){var f=m.id.findCredential(d);!f&&this.useCommonAuth&&(f="string"==typeof this.useCommonAuth?m.id.findCredential(this.useCommonAuth):m.id.credentials[0]);f&&(e.token||!1===e.token||(e.token=f.token),f.ssl&&
!1!==c&&(c=!0))}!0===c&&(d=n.toHttpsUrl(d));!1===e.token&&delete e.token;var k=b.handleAs||"json";"json"===k&&(e.f="json");var f=(b.sendAs||(b.usePost||this.usePost||e.token?"post":"get")).toLowerCase(),c="multipart"==f?!0:b.sendAs?!1:null,t=0,g;for(g in e){var l=e[g];l instanceof B?c=!0:("object"==typeof l&&(l=e[g]=JSON.stringify(l)),!c&&0<this.multipartThreshold&&(t+=g.length+(l?l.length:0)+2))}!1!==c&&0<this.multipartThreshold&&t>this.multipartThreshold&&(c=!0);if(b.useProxy||!r.hasSameOrigin(d,
window.location.href)&&this.useProxy&&!b.hasOwnProperty("useProxy")){var h=n.getProxyUrl();h&&(d=h+"?"+d)}g=(g=b.hasOwnProperty("preventCache")?b.preventCache:this.preventCache)||null===g&&h||F?"_ts\x3d"+(new Date).getTime()+E++:"";h={handleAs:k};if(k=Number(z.isDefined(b.timeout)?b.timeout:this.timeout))h.timeout=k;k="get"!=f||c;f=c?null:x.objectToQuery(e);k||(k=f.length+d.length+g.length+1>=q.defaults.io.postLength);h.method=k?"POST":"GET";h.headers={"X-Requested-With":null};h.headers["Content-Type"]=
"undefined"!=typeof b.contentType?b.contentType:"application/x-www-form-urlencoded; charset\x3dutf-8";c?(c=new C,c.addVariables(e),c.build(h)):k?h.data=f:f&&(d+="?"+f,g&&(d+="\x26"+g),g=null);!f&&g&&(d+="?"+g);return{url:d,options:h}},sendUrlRequest:function(a,b){b=b||"UniversalClient.sendUrlRequest";var d=a.deferred||new v,e="bin"==a.options.handleAs;e&&(a.options.handleAs="blob");var c=w(a.url,a.options,!0);e&&(c.handleResponse=D);var f=this;c.then(function(c){c=f._handleResponse(c,a.options);c instanceof
Error?(498===c.code&&f._handleInvalidTokenError(c),d.reject(c)):d.resolve(f._makeResponse(b.toString(),c))},function(a){d.reject(f._makeError(a))});return d.promise},requestToUrl:function(a){if(a.options.headers&&a.options.headers["Content-Type"]&&0==a.options.headers["Content-Type"].indexOf("multipart/form-data"))return null;var b=a.url;if(a=a.options.data){if(b.length+a.length>=q.defaults.io.postLength)return null;b+="?"+a}return b},_handleResponse:function(a,b){return"json"==b.handleAs&&a&&this._parseError(a)||
a},_makeResponse:function(a,b){return b},_makeError:function(a){return a},_parseError:function(a){return a},_handleInvalidTokenError:function(a){}})});