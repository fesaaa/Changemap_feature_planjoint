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
define("esri/IdentityManagerBase","dojo/_base/declare dojo/_base/config dojo/_base/lang dojo/_base/array dojo/_base/Deferred dojo/_base/json dojo/_base/url dojo/has dojo/cookie esri/kernel esri/config esri/lang esri/ServerInfo esri/urlUtils esri/deferredUtils esri/request esri/Evented".split(" "),function(H,w,r,k,I,A,x,L,y,m,C,v,D,q,J,E,z){var B={},F=function(a){var b=(new x(a.owningSystemUrl)).host;a=(new x(a.server)).host;var c=/.+\.arcgis\.com$/i;return c.test(b)&&c.test(a)},G=function(a,b){return!(!F(a)||
!b||!k.some(b,function(b){return b.test(a.server)}))},t;z=H(z,{declaredClass:"esri.IdentityManagerBase",constructor:function(){this._portalConfig=r.getObject("esriGeowConfig");this.serverInfos=[];this.credentials=[];this._soReqs=[];this._xoReqs=[];this._portals=[]},defaultTokenValidity:60,tokenValidity:null,signInPage:null,useSignInPage:!0,normalizeWebTierAuth:!1,_busy:null,_gwTokenUrl:"/sharing/generateToken",_agsRest:"/rest/services",_agsPortal:/\/sharing(\/|$)/i,_agsAdmin:/https?:\/\/[^\/]+\/[^\/]+\/admin\/?(\/.*)?$/i,
_adminSvcs:/\/admin\/services(\/|$)/i,_agolSuffix:".arcgis.com",_gwDomains:[{regex:/https?:\/\/www\.arcgis\.com/i,tokenServiceUrl:"https://www.arcgis.com/sharing/generateToken"},{regex:/https?:\/\/dev\.arcgis\.com/i,tokenServiceUrl:"https://dev.arcgis.com/sharing/generateToken"},{regex:/https?:\/\/.*dev[^.]*\.arcgis\.com/i,tokenServiceUrl:"https://devext.arcgis.com/sharing/generateToken"},{regex:/https?:\/\/.*qa[^.]*\.arcgis\.com/i,tokenServiceUrl:"https://qaext.arcgis.com/sharing/generateToken"},
{regex:/https?:\/\/.*.arcgis\.com/i,tokenServiceUrl:"https://www.arcgis.com/sharing/generateToken"}],_legacyFed:[],_regexSDirUrl:/http.+\/rest\/services\/?/ig,_regexServerType:/(\/(MapServer|GeocodeServer|GPServer|GeometryServer|ImageServer|NAServer|FeatureServer|GeoDataServer|GlobeServer|MobileServer|GeoenrichmentServer)).*/ig,_gwUser:/http.+\/users\/([^\/]+)\/?.*/i,_gwItem:/http.+\/items\/([^\/]+)\/?.*/i,_gwGroup:/http.+\/groups\/([^\/]+)\/?.*/i,_errorCodes:[499,498,403,401],_publicUrls:[/\/arcgis\/tokens/i,
/\/sharing\/generatetoken/i,/\/rest\/info/i],registerServers:function(a){var b=this.serverInfos;b?(a=k.filter(a,function(a){return!this.findServerInfo(a.server)},this),this.serverInfos=b.concat(a)):this.serverInfos=a;k.forEach(a,function(a){a.owningSystemUrl&&this._portals.push(a.owningSystemUrl);if(a.hasPortal){this._portals.push(a.server);var b=C.defaults.io.corsEnabledServers,e=this._getOrigin(a.tokenServiceUrl);q.canUseXhr(a.server)||b.push(a.server.replace(/^https?:\/\//i,""));q.canUseXhr(e)||
b.push(e.replace(/^https?:\/\//i,""))}},this)},registerToken:function(a){var b=this._sanitizeUrl(a.server),c=this.findServerInfo(b),d;c||(c=new D,c.server=this._getOrigin(b),c.tokenServiceUrl=this._getTokenSvcUrl(b),c.hasPortal=!0,this.registerServers([c]));(d=this.findCredential(b,a.userId))?r.mixin(d,a):(d=new t({userId:a.userId,server:c.server,token:a.token,expires:a.expires,ssl:a.ssl,scope:this._isServerRsrc(b)?"server":"portal"}),d.resources=[b],this.credentials.push(d));d.onTokenChange(!1)},
toJson:function(){return v.fixJson({serverInfos:k.map(this.serverInfos,function(a){return a.toJson()}),credentials:k.map(this.credentials,function(a){return a.toJson()})})},initialize:function(a){if(a){r.isString(a)&&(a=A.fromJson(a));var b=a.serverInfos;a=a.credentials;if(b){var c=[];k.forEach(b,function(a){a.server&&a.tokenServiceUrl&&c.push(a.declaredClass?a:new D(a))});c.length&&this.registerServers(c)}a&&k.forEach(a,function(a){a.userId&&(a.server&&a.token&&a.expires&&a.expires>(new Date).getTime())&&
(a=a.declaredClass?a:new t(a),a.onTokenChange(),this.credentials.push(a))},this)}},findServerInfo:function(a){var b;a=this._sanitizeUrl(a);k.some(this.serverInfos,function(c){q.hasSameOrigin(c.server,a,!0)&&(b=c);return!!b});return b},findCredential:function(a,b){var c,d;a=this._sanitizeUrl(a);d=this._isServerRsrc(a)?"server":"portal";b?k.some(this.credentials,function(e){q.hasSameOrigin(a,e.server,!0)&&(b===e.userId&&e.scope===d)&&(c=e);return!!c},this):k.some(this.credentials,function(b){q.hasSameOrigin(a,
b.server,!0)&&(-1!==this._getIdenticalSvcIdx(a,b)&&b.scope===d)&&(c=b);return!!c},this);return c},getCredential:function(a,b){var c,d,e=!0;v.isDefined(b)&&(r.isObject(b)?(c=!!b.token,d=b.error,e=!1!==b.prompt):c=b);a=this._sanitizeUrl(a);var p=new I(J._dfdCanceller),f=this._isAdminResource(a),g=c&&this._doPortalSignIn(a)?y("esri_auth"):null;c=c?this.findCredential(a):null;if(g||c)return g=g&&A.fromJson(g),e=Error("You are currently signed in as: '"+(g&&g.email||c&&c.userId)+"'. You do not have access to this resource: "+
a),e.code="IdentityManagerBase.1",e.httpCode=d&&d.httpCode,e.messageCode=d?d.messageCode:null,e.subcode=d?d.subcode:null,e.details=d?d.details:null,e.log=w.isDebug,p.errback(e),p;if(d=this._findCredential(a,b))return p.callback(d),p;if(d=this.findServerInfo(a))!d.hasServer&&this._isServerRsrc(a)&&(d._restInfoDfd=this._getTokenSvcUrl(a,!0),d.hasServer=!0);else{g=this._getTokenSvcUrl(a);if(!g)return e=Error("Unknown resource - could not find token service endpoint."),e.code="IdentityManagerBase.2",
e.log=w.isDebug,p.errback(e),p;d=new D;d.server=this._getOrigin(a);r.isString(g)?(d.tokenServiceUrl=g,e&&(d._selfDfd=this._getPortalSelf(g.replace(/\/sharing\/generatetoken/i,"/sharing/rest/portals/self"),a)),d.hasPortal=!0):(d._restInfoDfd=g,d.hasServer=!0);this.registerServers([d])}return this._enqueue(a,d,b,p,f)},getResourceName:function(a){return this._isRESTService(a)?a.replace(this._regexSDirUrl,"").replace(this._regexServerType,"")||"":this._gwUser.test(a)&&a.replace(this._gwUser,"$1")||this._gwItem.test(a)&&
a.replace(this._gwItem,"$1")||this._gwGroup.test(a)&&a.replace(this._gwGroup,"$1")||""},generateToken:function(a,b,c){var d,e,p,f,g,k,s=new x(window.location.href.toLowerCase()),h=y("esri_auth"),u,K=a.webTierAuth&&!b;f=a.shortLivedTokenValidity;var l;b&&(l=m.id.tokenValidity||f||m.id.defaultTokenValidity,l>f&&(l=f));c&&(d=c.isAdmin,e=c.serverUrl,p=c.token,k=c.ssl,a.customParameters=c.customParameters);if(d)f=a.adminTokenServiceUrl;else if(f=a.tokenServiceUrl,g=new x(f.toLowerCase()),h&&(h=A.fromJson(h),
u=(u=h.auth_tier)&&u.toLowerCase()),("web"===u||a.webTierAuth)&&c&&c.serverUrl&&!k&&"http"===s.scheme&&(q.hasSameOrigin(s.uri,f,!0)||"https"===g.scheme&&s.host===g.host&&"7080"===s.port&&"7443"===g.port))f=f.replace(/^https:/i,"http:").replace(/:7443/i,":7080");c=E(r.mixin({url:f,content:r.mixin({request:"getToken",username:b&&b.username,password:b&&b.password,serverUrl:e,token:p,expiration:l,referer:d||-1!==a.tokenServiceUrl.toLowerCase().indexOf("/sharing/generatetoken")?window.location.host:null,
client:d?"referer":null,f:"json"},a.customParameters),handleAs:"json",callbackParamName:K?"callback":void 0},c&&c.ioArgs),{usePost:!K,disableIdentityLookup:!0,useProxy:this._useProxy(a,c)});c.addCallback(function(c){if(!c||!c.token)return c=Error("Unable to generate token"),c.code="IdentityManagerBase.3",c.log=w.isDebug,c;var d=a.server;B[d]||(B[d]={});b&&(B[d][b.username]=b.password);c.validity=l;return c});c.addErrback(function(a){});return c},isBusy:function(){return!!this._busy},checkSignInStatus:function(a){return this.getCredential(a,
{prompt:!1})},setRedirectionHandler:function(a){this._redirectFunc=a},setProtocolErrorHandler:function(a){this._protocolFunc=a},signIn:function(){},_findCredential:function(a,b){var c=-1,d,e,p,f,g=b&&b.token;d=b&&b.resource;var m=this._isServerRsrc(a)?"server":"portal",s=k.filter(this.credentials,function(b){return q.hasSameOrigin(b.server,a,!0)&&b.scope===m});a=d||a;if(s.length)if(1===s.length)if(d=s[0],p=(e=(f=this.findServerInfo(d.server))&&f.owningSystemUrl)&&this.findCredential(e,d.userId),c=
this._getIdenticalSvcIdx(a,d),g)-1!==c&&(d.resources.splice(c,1),this._removeResource(a,p));else return-1===c&&d.resources.push(a),this._addResource(a,p),d;else{var h,u;k.some(s,function(b){u=this._getIdenticalSvcIdx(a,b);return-1!==u?(h=b,p=(e=(f=this.findServerInfo(h.server))&&f.owningSystemUrl)&&this.findCredential(e,h.userId),c=u,!0):!1},this);if(g)h&&(h.resources.splice(c,1),this._removeResource(a,p));else if(h)return this._addResource(a,p),h}},_addResource:function(a,b){b&&-1===this._getIdenticalSvcIdx(a,
b)&&b.resources.push(a)},_removeResource:function(a,b){var c=-1;b&&(c=this._getIdenticalSvcIdx(a,b),-1<c&&b.resources.splice(c,1))},_useProxy:function(a,b){return b&&b.isAdmin&&!q.hasSameOrigin(a.adminTokenServiceUrl,window.location.href)||!this._isPortalDomain(a.tokenServiceUrl)&&10.1==a.currentVersion&&!q.hasSameOrigin(a.tokenServiceUrl,window.location.href)},_getOrigin:function(a){a=new x(a);return a.scheme+"://"+a.host+(v.isDefined(a.port)?":"+a.port:"")},_sanitizeUrl:function(a){a=q.fixUrl(r.trim(a));
var b=(C.defaults.io.proxyUrl||"").toLowerCase(),c=b?a.toLowerCase().indexOf(b+"?"):-1;-1!==c&&(a=a.substring(c+b.length+1));return q.urlToObject(a).path},_isRESTService:function(a){return-1<a.indexOf(this._agsRest)},_isAdminResource:function(a){return this._agsAdmin.test(a)||this._adminSvcs.test(a)},_isServerRsrc:function(a){return this._isRESTService(a)||this._isAdminResource(a)},_isIdenticalService:function(a,b){var c;if(this._isRESTService(a)&&this._isRESTService(b)){var d=this._getSuffix(a).toLowerCase(),
e=this._getSuffix(b).toLowerCase();c=d===e;c||(c=/(.*)\/(MapServer|FeatureServer).*/ig,c=d.replace(c,"$1")===e.replace(c,"$1"))}else this._isAdminResource(a)&&this._isAdminResource(b)?c=!0:!this._isServerRsrc(a)&&(!this._isServerRsrc(b)&&this._isPortalDomain(a))&&(c=!0);return c},_isPortalDomain:function(a){a=a.toLowerCase();var b=(new x(a)).authority,c=this._portalConfig,d=-1!==b.indexOf(this._agolSuffix);!d&&c&&(d=q.hasSameOrigin(c.restBaseUrl,a,!0));if(!d){if(!this._arcgisUrl&&(c=r.getObject("esri.arcgis.utils.arcgisUrl")))this._arcgisUrl=
(new x(c)).authority;this._arcgisUrl&&(d=this._arcgisUrl.toLowerCase()===b)}d||(d=k.some(this._portals,function(b){return q.hasSameOrigin(b,a,!0)}));return d=d||this._agsPortal.test(a)},_isIdProvider:function(a,b){var c=-1,d=-1;k.forEach(this._gwDomains,function(e,f){-1===c&&e.regex.test(a)&&(c=f);-1===d&&e.regex.test(b)&&(d=f)});var e=!1;if(-1<c&&-1<d)if(0===c||4===c){if(0===d||4===d)e=!0}else if(1===c){if(1===d||2===d)e=!0}else 2===c?2===d&&(e=!0):3===c&&3===d&&(e=!0);if(!e){var p=this.findServerInfo(b),
f=p&&p.owningSystemUrl;f&&(F(p)&&this._isPortalDomain(f)&&this._isIdProvider(a,f))&&(e=!0)}return e},_isPublic:function(a){a=this._sanitizeUrl(a);return k.some(this._publicUrls,function(b){return b.test(a)})},_getIdenticalSvcIdx:function(a,b){var c=-1;k.some(b.resources,function(b,e){return this._isIdenticalService(a,b)?(c=e,!0):!1},this);return c},_getSuffix:function(a){return a.replace(this._regexSDirUrl,"").replace(this._regexServerType,"$1")},_getTokenSvcUrl:function(a){var b,c;if((b=this._isRESTService(a))||
this._isAdminResource(a))return c=a.toLowerCase().indexOf(b?this._agsRest:"/admin/"),b=a.substring(0,c)+"/admin/generateToken",a=a.substring(0,c)+"/rest/info",c=E({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),c.adminUrl_=b,c;if(this._isPortalDomain(a)){var d="";k.some(this._gwDomains,function(b){b.regex.test(a)&&(d=b.tokenServiceUrl);return!!d});d||k.some(this._portals,function(b){q.hasSameOrigin(b,a,!0)&&(d=b+this._gwTokenUrl);return!!d},this);d||(c=a.toLowerCase().indexOf("/sharing"),
-1!==c&&(d=a.substring(0,c)+this._gwTokenUrl));d||(d=this._getOrigin(a)+this._gwTokenUrl);d&&(b=(new x(a)).port,/^http:\/\//i.test(a)&&"7080"===b&&(d=d.replace(/:7080/i,":7443")),d=d.replace(/http:/i,"https:"));return d}if(-1!==a.toLowerCase().indexOf("premium.arcgisonline.com"))return"https://premium.arcgisonline.com/server/tokens"},_getPortalSelf:function(a,b){"https:"===window.location.protocol?a=a.replace(/^http:/i,"https:").replace(/:7080/i,":7443"):/^http:/i.test(b)&&(a=a.replace(/^https:/i,
"http:").replace(/:7443/i,":7080"));return E({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback"},{crossOrigin:!1,disableIdentityLookup:!0})},_hasPortalSession:function(){return y.isSupported()?!!y("esri_auth"):!1},_doPortalSignIn:function(a){if(y.isSupported()){var b=y("esri_auth"),c=this._portalConfig,d=window.location.href,e=this.findServerInfo(a);if(this.useSignInPage&&(c||this._isPortalDomain(d)||b)&&(e?e.hasPortal||e.owningSystemUrl&&this._isPortalDomain(e.owningSystemUrl):
this._isPortalDomain(a))&&(this._isIdProvider(d,a)||c&&(q.hasSameOrigin(c.restBaseUrl,a,!0)||this._isIdProvider(c.restBaseUrl,a))||q.hasSameOrigin(d,a,!0)))return!0}return!1},_checkProtocol:function(a,b,c,d){var e=!0;d=d?b.adminTokenServiceUrl:b.tokenServiceUrl;if(0===r.trim(d).toLowerCase().indexOf("https:")&&0!==window.location.href.toLowerCase().indexOf("https:")&&(!C.defaults.io.useCors||!q.canUseXhr(d)&&!q.canUseXhr(q.getProxyUrl(!0).path)))e=this._protocolFunc?!!this._protocolFunc({resourceUrl:a,
serverInfo:b}):!1,e||(a=Error("Aborted the Sign-In process to avoid sending password over insecure connection."),a.code="IdentityManagerBase.4",a.log=w.isDebug,console.log(a.message),c(a));return e},_enqueue:function(a,b,c,d,e,k){d||(d=new I(J._dfdCanceller));d.resUrl_=a;d.sinfo_=b;d.options_=c;d.admin_=e;d.refresh_=k;this._busy?q.hasSameOrigin(a,this._busy.resUrl_,!0)?this._soReqs.push(d):this._xoReqs.push(d):this._doSignIn(d);return d},_doSignIn:function(a){this._busy=a;var b=this,c=function(c){var d=
a.options_&&a.options_.resource,e=a.resUrl_,f=a.refresh_;-1===k.indexOf(b.credentials,c)&&(f&&-1!==k.indexOf(b.credentials,f)?(f.userId=c.userId,f.token=c.token,f.expires=c.expires,f.validity=c.validity,f.ssl=c.ssl,f.creationTime=c.creationTime,c=f):b.credentials.push(c));c.resources||(c.resources=[]);c.resources.push(d||e);c.scope=b._isServerRsrc(e)?"server":"portal";c.onTokenChange();var d=b._soReqs,l={};b._soReqs=[];k.forEach(d,function(a){if(!this._isIdenticalService(e,a.resUrl_)){var b=this._getSuffix(a.resUrl_);
l[b]||(l[b]=!0,c.resources.push(a.resUrl_))}},b);a.callback(c);k.forEach(d,function(a){a.callback(c)});b._busy=a.resUrl_=a.sinfo_=a.refresh_=null;b._soReqs.length&&b._doSignIn(b._soReqs.shift());b._xoReqs.length&&b._doSignIn(b._xoReqs.shift())},d=function(c){a.errback(c);b._busy=a.resUrl_=a.sinfo_=a.refresh_=null;b._soReqs.length&&b._doSignIn(b._soReqs.shift());b._xoReqs.length&&b._doSignIn(b._xoReqs.shift())},e=function(e,h,f,g){var l=a.sinfo_,n=!a.options_||!1!==a.options_.prompt;b._doPortalSignIn(a.resUrl_)?
(h=y("esri_auth"),e=b._portalConfig,h?(h=A.fromJson(h),c(new t({userId:h.email,server:l.server,token:h.token,expires:null}))):n?(n="",h=window.location.href,n=b.signInPage?b.signInPage:e?e.baseUrl+e.signin:b._isIdProvider(h,a.resUrl_)?b._getOrigin(h)+"/home/signin.html":l.tokenServiceUrl.replace(/\/sharing\/generatetoken/i,"")+"/home/signin.html",n=n.replace(/http:/i,"https:"),e&&!1===e.useSSL&&(n=n.replace(/https:/i,"http:")),0===h.toLowerCase().replace("https","http").indexOf(n.toLowerCase().replace("https",
"http"))?(l=Error("Cannot redirect to Sign-In page from within Sign-In page. URL of the resource that triggered this workflow: "+a.resUrl_),l.code="IdentityManagerBase.5",l.log=w.isDebug,d(l)):b._redirectFunc?b._redirectFunc({signInPage:n,returnUrlParamName:"returnUrl",returnUrl:h,resourceUrl:a.resUrl_,serverInfo:l}):window.location=n+"?returnUrl\x3d"+window.escape(h)):(l=Error("User is not signed in."),l.code="IdentityManagerBase.6",l.log=w.isDebug,d(l))):e?c(new t({userId:e,server:l.server,token:f,
expires:v.isDefined(g)?Number(g):null,ssl:!!h})):n?b._checkProtocol(a.resUrl_,l,d,a.admin_)&&(n=a.options_,a.admin_&&(n=n||{},n.isAdmin=!0),a._pendingDfd=b.signIn(a.resUrl_,l,n).addCallbacks(c,d)):(l=Error("User is not signed in."),l.code="IdentityManagerBase.6",l.log=w.isDebug,d(l))},p=function(){var e=a.sinfo_,h=e.owningSystemUrl,f=a.options_,g,l,n;f&&(g=f.token,l=f.error);n=b._findCredential(h,{token:g,resource:a.resUrl_});!n&&F(e)&&k.some(b.credentials,function(a){this._isIdProvider(h,a.server)&&
(n=a);return!!n},b);n?(f=b.findCredential(a.resUrl_,n.userId))?c(f):G(e,b._legacyFed)?(f=n.toJson(),f.server=e.server,f.resources=null,c(new t(f))):(a._pendingDfd=b.generateToken(b.findServerInfo(n.server),null,{serverUrl:a.resUrl_,token:n.token,ssl:n.ssl})).addCallbacks(function(b){c(new t({userId:n.userId,server:e.server,token:b.token,expires:v.isDefined(b.expires)?Number(b.expires):null,ssl:!!b.ssl,isAdmin:a.admin_,validity:b.validity}))},d):(b._busy=null,g&&(a.options_.token=null),(a._pendingDfd=
b.getCredential(h.replace(/\/?$/,"/sharing"),{resource:a.resUrl_,token:g,error:l})).addCallbacks(function(c){b._enqueue(a.resUrl_,a.sinfo_,a.options_,a,a.admin_)},function(a){d(a)}))},f=a.sinfo_.owningSystemUrl,g=this._isServerRsrc(a.resUrl_),m=a.sinfo_._restInfoDfd;m?m.addCallbacks(function(c){var d=a.sinfo_;d.adminTokenServiceUrl=d._restInfoDfd.adminUrl_;d._restInfoDfd=null;d.tokenServiceUrl=r.getObject("authInfo.tokenServicesUrl",!1,c)||r.getObject("authInfo.tokenServiceUrl",!1,c)||r.getObject("tokenServiceUrl",
!1,c);d.shortLivedTokenValidity=r.getObject("authInfo.shortLivedTokenValidity",!1,c);d.currentVersion=c.currentVersion;d.owningTenant=c.owningTenant;if(c=d.owningSystemUrl=c.owningSystemUrl)b._portals.push(c),!d.hasPortal&&q.hasSameOrigin(c,a.resUrl_,!0)&&(d._selfDfd=b._getPortalSelf(c.replace(/\/?$/,"/sharing/rest/portals/self"),a.resUrl_),d.hasPortal=!0);g&&c?p():e()},function(){a.sinfo_._restInfoDfd=null;var b=Error("Unknown resource - could not find token service endpoint.");b.code="IdentityManagerBase.2";
b.log=w.isDebug;d(b)}):g&&f?p():a.sinfo_._selfDfd?(f=function(c){a.sinfo_._selfDfd=null;var d=c&&c.user&&c.user.username,f=c&&c.allSSL;a.sinfo_.webTierAuth=!!d;d&&b.normalizeWebTierAuth?(a.sinfo_._tokenDfd=b.generateToken(a.sinfo_,null,{ssl:f}),c=function(b){a.sinfo_._tokenDfd=null;e(d,f,b&&b.token,b&&b.expires)},a.sinfo_._tokenDfd.then(c,c)):e(d,f)},a.sinfo_._selfDfd.then(f,f)):e()}});z.prototype.checkLoginStatus=z.prototype.checkSignInStatus;t=H(null,{declaredClass:"esri.Credential",tokenRefreshBuffer:2,
constructor:function(a){r.mixin(this,a);this.resources=this.resources||[];v.isDefined(this.creationTime)||(this.creationTime=(new Date).getTime())},refreshToken:function(){var a=this,b=this.resources&&this.resources[0],c=m.id.findServerInfo(this.server),d=c&&c.owningSystemUrl,e=!!d&&"server"===this.scope,p=e&&G(c,m.id._legacyFed),f=e&&m.id.findServerInfo(d),g,r=(g=c.webTierAuth)&&m.id.normalizeWebTierAuth,s=B[this.server],s=s&&s[this.userId],h={username:this.userId,password:s},u;if(!g||r)if(e&&!f&&
k.some(m.id.serverInfos,function(a){m.id._isIdProvider(d,a.server)&&(f=a);return!!f}),g=f&&m.id.findCredential(f.server,this.userId),!e||g)if(p)g.refreshToken();else{if(e)u={serverUrl:b,token:g&&g.token,ssl:g&&g.ssl};else if(r)h=null,u={ssl:this.ssl};else if(s)this.isAdmin&&(u={isAdmin:!0});else{var t;b&&(b=m.id._sanitizeUrl(b),this._enqueued=1,t=m.id._enqueue(b,c,null,null,this.isAdmin,this),t.addBoth(function(){a._enqueued=0}));return t}return m.id.generateToken(e?f:c,e?null:h,u).addCallback(function(b){a.token=
b.token;a.expires=v.isDefined(b.expires)?Number(b.expires):null;a.creationTime=(new Date).getTime();a.validity=b.validity;a.onTokenChange();"portal"===a.scope&&k.forEach(m.id.credentials,function(b){var c=m.id.findServerInfo(b.server),d=c&&c.owningSystemUrl;if(b!==a&&b.userId===a.userId&&d&&"server"===b.scope&&(q.hasSameOrigin(a.server,d,!0)||m.id._isIdProvider(d,a.server)))G(c,m.id._legacyFed)?(b.token=a.token,b.expires=a.expires,b.creationTime=a.creationTime,b.validity=a.validity,b.onTokenChange()):
b.refreshToken()})}).addErrback(function(){})}},onTokenChange:function(a){clearTimeout(this._refreshTimer);var b=this.server&&m.id.findServerInfo(this.server),c=(b=b&&b.owningSystemUrl)&&m.id.findServerInfo(b);!1!==a&&((!b||"portal"===this.scope||c&&c.webTierAuth&&!m.id.normalizeWebTierAuth)&&(v.isDefined(this.expires)||v.isDefined(this.validity)))&&this._startRefreshTimer()},onDestroy:function(){},destroy:function(){this.userId=this.server=this.token=this.expires=this.validity=this.resources=this.creationTime=
null;var a=k.indexOf(m.id.credentials,this);-1<a&&m.id.credentials.splice(a,1);this.onTokenChange();this.onDestroy()},toJson:function(){return this._toJson()},_toJson:function(){var a=v.fixJson({userId:this.userId,server:this.server,token:this.token,expires:this.expires,validity:this.validity,ssl:this.ssl,isAdmin:this.isAdmin,creationTime:this.creationTime,scope:this.scope}),b=this.resources;b&&0<b.length&&(a.resources=b);return a},_startRefreshTimer:function(){clearTimeout(this._refreshTimer);var a=
6E4*this.tokenRefreshBuffer,b=(this.validity?this.creationTime+6E4*this.validity:this.expires)-(new Date).getTime();0>b&&(b=0);this._refreshTimer=setTimeout(r.hitch(this,this.refreshToken),b>a?b-a:b)}});z.Credential=t;L("extend-esri")&&(m.IdentityManagerBase=z,m.Credential=t);return z});