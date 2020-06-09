// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/RasterAnalysisMixin","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/json dojo/store/Memory dojo/string dojo/has dojo/dom-class dojo/dom-style dojo/dom-attr ../../kernel ../../lang ./AnalysisBase ./_AnalysisOptions ./utils ../../layers/RasterFunction".split(" "),function(k,e,p,q,g,r,m,t,u,l,v,w,x,y,z,h,n){k=k([z,y],{declaredClass:"esri.dijit.analysis.RasterAnalysisMixin",map:null,outputLayerName:null,resultParameter:"outputRaster",rasterGPToolName:"GenerateRaster",
analysisType:"raster",i18n:null,returnProcessInfo:null,_geometryService:null,_findDeepestArgsForRerun:!1,constructor:function(a,c){this._pbConnects=[];a.containerNode&&(this.container=a.containerNode)},destroy:function(){this.inherited(arguments);p.forEach(this._pbConnects,q.disconnect);delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments);e.mixin(this.i18n,this.toolNlsName)},postCreate:function(){this.inherited(arguments);u.add(this._form.domNode,"esriSimpleForm");this._outputLayerInput.set("validator",
e.hitch(this,this.validateServiceName));this._buildUI()},startup:function(){console.log("startup")},validateServiceName:function(a){return h.validateServiceName(a,{textInput:this._outputLayerInput})},_getJobParameters:function(){},_getRasterFunction:function(){},_getRasterArguments:function(){},_getOutputItemProperties:function(){},_setDefaultInputs:function(){},_resetUI:function(){},_getDefaultOutputItemProperties:function(a,c,b){c=this._getDefaultRenderingRule(c);var d=this._getDefaultPopupInfo();
return{visibility:!0,opacity:a||1,interpolation:b||"RSP_NearestNeighbor",renderingRule:c,popupInfo:d}},_getDefaultRenderingRule:function(a){var c=new n;c.functionName="Stretch";c.functionArguments={StretchType:5,DRA:!1,Gamma:[1],UseGamma:!0};c.outputPixelType="U8";var b=new n;b.functionName="Colormap";b.functionArguments={colorRamp:a||"Aspect",Raster:c};return b},_getDefaultPopupInfo:function(){return{title:this.get("outputLayerName"),description:null,fieldInfos:[{fieldName:"Raster.ServicePixelValue",
label:"Service Pixel Value",isEditable:!1,isEditableOnLayer:!1,visible:!1,format:{places:2,digitSeparator:!0}},{fieldName:"Raster.ServicePixelValue.Raw",label:"Pixel Value",isEditable:!1,isEditableOnLayer:!1,visible:!0,format:{places:2,digitSeparator:!0}}],showAttachments:!1,layerOptions:{showNoDataRecords:!0},mediaInfos:[]}},_getReRunRFxArgs:function(a,c){var b={};this._findFunction(a,c,b);return b&&b.rasterFunctionArguments},_findFunction:function(a,c,b){var d=a&&a.rasterFunction,f=this._getRasterFunction();
if(d&&b&&"object"===typeof b){if(d===f&&(b.rasterFunction=a.rasterFunction,b.rasterFunctionArguments=a.rasterFunctionArguments,!c))return;this._findFunction(a.rasterFunctionArguments&&a.rasterFunctionArguments.Raster,c,b)}},_getSelectedLayerIndexFromUI:function(a,c){if(!a||!c)return-1;var b=-1;p.forEach(a,function(a,f){a&&a.label.toLowerCase()===c.toLowerCase()&&(b=f)});return b},_setAnalysisGpServerAttr:function(a){a&&(this.analysisGpServer=a,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.rasterGPToolName))},
_setInputLayersAttr:function(a){this.inputLayers=a},_setInputLayerAttr:function(a){this.inputLayer=a},_getInputLayerAttr:function(){return this.inputLayer},_getOutputLayerNameAttr:function(){this._outputLayerInput&&(this.outputLayerName=this._outputLayerInput.get("value"));return this.outputLayerName},_setOutputLayerNameAttr:function(a){this.outputLayerName=a},_setDisableRunAnalysisAttr:function(a){this._saveBtn.set("disabled",a)},_setDisableExtentAttr:function(a){this._useExtentCheck.set("checked",
!a);this._useExtentCheck.set("disabled",a)},_getDisableExtentAttr:function(){this._useExtentCheck.get("disabled")},_setMapAttr:function(a){this.map=a},_getMapAttr:function(){return this.map},_handleModeCrumbClick:function(a){a.preventDefault();this._onClose(!0)},_onClose:function(a){a&&(this._save(),this.emit("save",{save:!0}));this.emit("close",{save:!a})},_save:function(){},_handleShowCreditsClick:function(a){a.preventDefault();a={};this._form.validate()&&(a.inputLayer=g.toJson(h.constructAnalysisInputLyrObj(this.get("inputLayer"))),
a.OutputName=g.toJson({serviceProperties:{name:this.get("outputLayerName")}}),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=g.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,a).then(e.hitch(this,function(a){this._usageForm.set("content",a);this._usageDialog.show()})))},_handleSaveBtnClick:function(a){if(this._form.validate()){this._saveBtn.set("disabled",!0);var c=this._webLayerTypeSelect.get("value"),b=this.get("inputLayer");a={};var d=
this._getJobParameters();if(!x.isDefined(d)){var d={},f={};f.rasterFunction=this._getRasterFunction();f.rasterFunctionArguments=this._getRasterArguments();d.rasterFunction=g.toJson(f);var e={Raster:{url:b.url,name:b.name}};b.renderingRule&&(e.Raster.renderingRule=b.renderingRule.toJson());b.mosaicRule&&(e.Raster.mosaicRule=b.mosaicRule.toJson());d.functionArguments=g.toJson(e);this.showChooseExtent&&!this.get("disableExtent")&&this._useExtentCheck.get("checked")&&(b={},e=this.map.extent._normalize(!0),
b.rasterFunction="Clip",b.rasterFunctionArguments={ClippingGeometry:e,ClippingType:1,Extent:e,Raster:f},d.rasterFunction=g.toJson(b))}d.OutputName=g.toJson({serviceProperties:{name:this.get("outputLayerName")}});d.returnProcessInfo=this.returnProcessInfo;f={};this.showChooseExtent&&!this.get("disableExtent")&&this._useExtentCheck.get("checked")&&!d.rasterFunction&&(f.extent=this.map.extent._normalize(!0));d.context=g.toJson(f);a.jobParams=d;if("permanentLayer"===c){a.itemParams={description:this.i18n.itemDescription,
tags:m.substitute(this.i18n.itemTags,{layername:this.inputLayer.name,fieldname:d.field||"",valuelayername:d.valuelayername||""}),snippet:this.i18n.itemSnippet};if(c=this._getOutputItemProperties())a.itemParams.text=c;this.showSelectFolder&&(a.itemParams.folder=this.get("folderId"));a.analysisType=this.analysisType;this.execute(a)}else"dynamicLayer"===c&&this._handleSaveDynamicLayer(d)}},_handleSaveDynamicLayer:function(a){this.get("inputLayer");this.analysisGpServer.replace("RasterAnalysisTools/GPServer",
"RasterRendering/ImageServer?viewId\x3d");g.fromJson(a.OutputName);a=new n;a.functionName=this._getRasterFunction();a.functionArguments=this._getRasterArguments()},_handleAnalysisLayerChange:function(a){"browse"===a?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"point"'),this._browsedlg.show()):(this.inputLayer=this.inputLayers[a],this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(a){this.inputLayer&&
(this.inputLayer.name&&v.set(this._interpolateToolDescription,"innerHTML",m.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name})),a&&(this.outputLayerName=m.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name})),this._outputLayerInput.set("value",this.outputLayerName));this._resetUI()},_handleBrowseItemsSelect:function(a){a&&a.selection&&h.addAnalysisReadyLayer({item:a.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:this._browsedlg,widget:this}).always(e.hitch(this,
this._updateAnalysisLayerUI,!0))},_buildUI:function(){var a=!0;this._loadConnections();this.signInPromise.then(e.hitch(this,h.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer,analysisMode:"raster"}));if(this.rasterFunction){var c=this._getReRunRFxArgs(this.rasterFunction,this._findDeepestArgsForRerun);c&&e.mixin(this,c)}this.functionArguments&&this.functionArguments.Raster&&this.set("inputLayer",this.functionArguments.Raster);this.get("showSelectAnalysisLayer")&&(this.inputLayers&&
this.inputLayer&&!h.isLayerInLayers(this.inputLayer,this.inputLayers)&&this.inputLayers.push(this.inputLayer),this.get("inputLayer")||!this.get("inputLayers")||this.rerun||this.set("inputLayer",this.inputLayers[0]),h.populateAnalysisLayers(this,"inputLayer","inputLayers"));h.addReadyToUseLayerOption(this,[this._analysisSelect]);this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),a=!1);this.inputLayer&&this._updateAnalysisLayerUI(a);l.set(this._chooseFolderRow,"display",
!0===this.showSelectFolder?"block":"none");this.showSelectFolder&&this.getFolderStore().then(e.hitch(this,function(a){this.folderStore=a;h.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}));this._chooseLayerTypeRow&&(l.set(this._chooseLayerTypeRow,"display",!0===this.showSelectLayerType?"block":"none"),a=new r({data:[{name:this.i18n.permanentLayer,id:"permanentLayer"},
{name:this.i18n.dynamicLayer,id:"dynamicLayer"}]}),this._webLayerTypeSelect.set("store",a),this._webLayerTypeSelect.set("value","permanentLayer"));l.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none");l.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none");this._setDefaultInputs()},_loadConnections:function(){this.on("start",e.hitch(this,"_onClose",!1));this._connect(this._closeBtn,"onclick",e.hitch(this,"_onClose",!0))},_connect:function(a,c,
b){this._pbConnects.push(q.connect(a,c,b))}});t("extend-esri")&&e.setObject("dijit.analysis.RasterAnalysisMixin",k,w);return k});