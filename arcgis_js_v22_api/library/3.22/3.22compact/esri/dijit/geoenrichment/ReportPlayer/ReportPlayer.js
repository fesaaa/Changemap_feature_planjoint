// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/ReportPlayer/templates/ReportPlayer.html":'\x3cdiv data-dojo-attach-point\x3d"mainNode" class\x3d"esriGEReportPlayer esriGENonSelectable esriGEReportPlayerFullScreen"\x3e\r\n\r\n    \x3cdiv data-dojo-attach-point\x3d"normalViewDiv"\x3e\r\n\r\n        \x3cdiv data-dojo-attach-point\x3d"playerHeader" class\x3d"reportPlayer_header"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"infographicsSelectDiv" class\x3d"reportPlayer_infographicsSelectDiv"\x3e\x3c/div\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"areaTitleDiv" class\x3d"reportPlayer_areaTitleDiv"\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"areaTitleInnerDiv" class\x3d"dijitInline reportPlayer_areaTitleInnerDiv"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"areasSelectDiv" class\x3d"reportPlayer_areasSelectDiv"\x3e\x3c/div\x3e\r\n            \x3cdiv class\x3d"reportPlayer_zoomSelectPageSelectBlock"\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"zoomSelectDiv" class\x3d"dijitInline reportPlayer_zoomSelectDiv"\x3e\x3c/div\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"pageSelectDiv" class\x3d"dijitInline reportPlayer_pageSelectDiv"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"commandButtonsContainer" class\x3d"reportPlayer_commandButtonsContainer"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n\r\n        \x3cdiv data-dojo-attach-point\x3d"printableDivContainer" class\x3d"reportPalyer_printableDivContainer"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"printableDiv" class\x3d"reportPalyer_printableDiv"\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"reportContainerDiv"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n\r\n        \x3cdiv class\x3d"reportPlayer_headerPageNavigator" data-dojo-attach-point\x3d"headerPageNavigator"\x3e\r\n            \x3cdiv class\x3d"reportPlayer_paginationArrowUp" data-dojo-attach-point\x3d"prevPageButton" title\x3d"${nls.previousPage}"\x3e\x3c/div\x3e\r\n            \x3cdiv class\x3d"reportPlayer_paginationArrowDown" data-dojo-attach-point\x3d"nextPageButton" title\x3d"${nls.nextPage}"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n\r\n    \x3c/div\x3e\r\n\r\n    \x3cdiv data-dojo-attach-point\x3d"errorViewDiv" class\x3d"reportPlayer_errorMessage"\x3e\r\n        ${nls.cantPlayReportError}\r\n    \x3c/div\x3e\r\n\r\n    \x3cdiv data-dojo-attach-point\x3d"waitingDiv" class\x3d"esriGEAbsoluteStretched esriGEHidden reportPlayer_waitingDiv"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/geoenrichment/ReportPlayer/ReportPlayer","dojo/_base/declare dojo/_base/lang dojo/Deferred dojo/dom-class dojo/on dojo/when dojo/promise/all dijit/_WidgetBase dijit/_TemplatedMixin ./dataProviders/commands/_config ./playerSupports/_CommandSupport ./playerSupports/_KeyboardNavigationSupport ./playerSupports/_LogoSupport ./playerSupports/_MapSupport ./playerSupports/_PageNavigationSupport ./playerSupports/_PlayerAreaSelectSupport ./playerSupports/_PrintSupport ./playerSupports/_ReportContainersSwitcher ./playerSupports/_SmartLayoutSupport ./playerSupports/_ZoomSupport ./playerSupports/_HeaderArrangeSupport ./printing/PageOptionsDialog/PageOptionsDialog ./ReportPlayerViewModel ./PlayerResizeModes ./PlayerZoomBehaviors ./PlayerThemes ./core/layout/LayoutBuilder esri/dijit/geoenrichment/utils/DomUtil esri/dijit/geoenrichment/utils/Queue esri/dijit/geoenrichment/utils/WaitingUtil dojo/text!./templates/ReportPlayer.html dojo/i18n!../../../nls/jsapi".split(" "),
function(m,e,n,h,L,f,M,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,k,I,d,J,l,K,g){g=g.geoenrichment.dijit.ReportPlayer.ReportPlayer;return m([p,q,t,v,w,z,A,B,C,y,u,x,D],{templateString:K,nls:g,dataProvider:null,config:{},isSlidesView:!1,theme:k.DARK,allowKeyboardNavigation:!0,showAreaTitle:!0,resizeMode:G.AUTO,listenToWindowResize:!0,printConfig:{subtitle:g.preparedByEsri,printDialogClass:E},defaultZoomBehavior:H.RESET,_viewModel:null,_initPromise:null,_reportData:null,_analysisAreaIndex:0,_disableAnimation:!1,
postCreate:function(){this.inherited(arguments);Object.assign(r,this.config);d.hide(this.errorViewDiv);this._applyTheme()},startup:function(){this.inherited(arguments);!this._viewModel&&this._reportData&&(this._viewModel=new F,this._disableAnimation&&(this._viewModel.chartAnimationAllowed=!1),this._viewModel.layoutBuilder=(new this._getLayoutBuilder)(),this._initPromise=f(this._viewModel.layoutBuilder.initialize()))},_getLayoutBuilder:function(){return I},playReport:function(a,b){var c=this;this._showWaiting();
return f(this.dataProvider.getReportData(a),function(a){return c.setReportData(a,b)},function(a){c._showError(a)})},_isDataBeingSetFlag:!1,setReportData:function(a,b){var c=this;b=b||{};b.disableAnimation&&(this._disableAnimation=!0);this._isDataBeingSetFlag=!0;this.onSetReportDataStart();var d=new n;if(!1===b.preloadAllPages||1==a.analysisAreas.length)this._resetLoadedFlags(),this._resetMapBuilder(),this._setReportData(a).then(d.resolve,d.reject);else{var f=function(){0>e?d.resolve():c._setReportData(a,
{analysisAreaIndex:e--,rerenderContent:!1}).then(function(){setTimeout(f,30)},d.reject)};!1!==b._resetLoadedContents&&(this._resetLoadedFlags(),this._resetMapBuilder());var e=a.analysisAreas.length-1;f()}this._showWaiting();return d.promise.always(function(){c._removeWaiting();c._isDataBeingSetFlag=!1;c.onSetReportDataEnd();c._emitPendingResizedEvent();if(b.waitUntilAllContentIsReady)return c.isContentLoading()})},refresh:function(a){return this._reportData&&f(this.setReportData(this._reportData,
{waitUntilAllContentIsReady:!(!a||!a.waitUntilAllContentIsReady),_resetLoadedContents:!(!a||!a.rerenderContent)}),function(){this.showPageAt(0);return this.resize()}.bind(this))},showAnalysisAreaAt:function(a,b){var c=this._setReportData(this._reportData,{analysisAreaIndex:a,rerenderContent:!(!b||!b.rerenderContent)});return b&&b.waitUntilAllContentIsReady?this.isContentLoading():c},_setReportData:function(a,b){var c=this;b=b||{};var e=!1!==b.rerenderContent;this._reportData=a;d.hide(this.normalViewDiv);
d.hide(this.errorViewDiv);this._analysisAreaIndex=this._reportData&&void 0!==b.analysisAreaIndex?b.analysisAreaIndex:0;if(this._reportData)return d.show(this.normalViewDiv),this._updateMapPortalUrl(),this._setFallbackMapImageInfos(this._reportData.mapImageInfos),this.startup(),f(this._initPromise,function(){c._updateAreaSelect();c._configureViewModel();return f(c._setReportContainer(e),function(a){return!0===a&&c.__doApplyTemplateJson(b)})});this._showError()},__doApplyTemplateJson:function(a){a=
this.getCurrentReportContainer().fromJson(this._reportData.templateJson,{waitUntilAllContentIsReady:!0});this._registerContntainerLoadPromise(a);this._setCurrentContainerLoaded();this.showPageAt(this._currentPageIndex);return this.resize()},_loadQueue:null,isContentLoading:function(){return this._loadQueue&&this._loadQueue.getLoadPromise()},_registerContntainerLoadPromise:function(a){var b=this;this._loadQueue||(this._loadQueue=new J({onLoadStart:function(){d.enableContentAbsolute(b.commandButtonsContainer,
!1)},onLoadEnd:function(){d.enableContentAbsolute(b.commandButtonsContainer,!0)}}));this._loadQueue.add(a)},getReportData:function(){return this._reportData},updateTemplateJson:function(a){this._reportData&&a&&(this._reportData.templateJson=a)},getReportTitle:function(){return this._reportData&&this._reportData.reportTitle||""},getCurrentAnalysisAreaIndex:function(){return this._analysisAreaIndex},getCurrentAnalysisArea:function(){return this._reportData&&this._reportData.analysisAreas[this._analysisAreaIndex]},
_configureViewModel:function(){var a=this;this._viewModel.setTheme(this._reportData.theme);var b=this.__getCurrentAnalysisAreaConfiguration();this._viewModel.setDynamicReportInfo({fieldData:b.fieldData,features:b.features,infographicOptions:this._reportData.infographicOptions,attachmentsStore:this._reportData.attachmentsStore,createMapFunc:e.hitch(this,this._createMap),reportType:this._reportData.reportType,isClassic:this._reportData.isClassic,isFixedDataMode:!this._reportData.config.geoenrichmentUrl});
this._viewModel.getDynamicImageFunc=e.hitch(this,this._getReportLogo);this._viewModel.enrichFieldData=function(c){return a.dataProvider.enrichFieldData(c,e.mixin({analysisAreas:[b.analysisArea],fieldData:b.fieldData},a._reportData.config))}},__getCurrentAnalysisAreaConfiguration:function(){this._reportData.infographicOptions&&this._reportData.infographicOptions.setCurrentAnalysisAreaIndex(this._analysisAreaIndex);var a=e.mixin({},this._reportData.fieldData);a.featureData=[this._reportData.fieldData.featureData[this._analysisAreaIndex]];
var b=this._reportData.analysisAreas[this._analysisAreaIndex];return{fieldData:a,analysisArea:b,features:[b.feature]}},getNumberOfPages:function(){return this.getCurrentReportContainer().getNumberOfPages()},notifyShown:function(){this.getCurrentReportContainer()&&this.getCurrentReportContainer().notifyShown()},_showWaiting:function(){this.normalViewDiv.style.opacity="0.01";l.showProgress(this.waitingDiv,"esriGEReportPlayerProgress");d.show(this.waitingDiv)},_removeWaiting:function(){l.removeProgress(this.waitingDiv);
d.hide(this.waitingDiv);this.normalViewDiv.style.opacity=""},_showError:function(a){a&&console.log(a);d.hide(this.normalViewDiv);d.show(this.errorViewDiv);this.onError(a)},setPrintMode:function(a){h[a?"add":"remove"](this.domNode,"esriGEReportPlayerInPrinting")},resize:function(){this._applyTheme();return this.inherited(arguments)},_applyTheme:function(){h.remove(this.domNode,"playerThemeDark playerThemeLight");h.add(this.domNode,this.theme==k.DARK?"playerThemeDark":"playerThemeLight")},_pendingResizeEvent:null,
_emitResizedEvent:function(a){this._pendingResizeEvent={isPaginating:!!a};this._isDataBeingSetFlag||this._emitPendingResizedEvent()},_emitPendingResizedEvent:function(){this._pendingResizeEvent&&(this.onResized(this._pendingResizeEvent.isPaginating),this._pendingResizeEvent=null)},onSetReportDataStart:function(){},onSetReportDataEnd:function(){},onResized:function(a){},onError:function(a){}})});