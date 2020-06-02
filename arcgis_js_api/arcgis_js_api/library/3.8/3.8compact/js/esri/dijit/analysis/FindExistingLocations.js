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
require({cache:{"url:esri/dijit/analysis/templates/FindExistingLocations.html":'\x3cdiv class\x3d"esriAnalysis"\x3e\n    \x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" style\x3d"margin-top:0.5em; margin-bottom: 0.5em;"\x3e\n      \x3cdiv data-dojo-attach-point\x3d"_aggregateToolContentTitle" class\x3d"analysisTitle"\x3e\n        \x3ctable class\x3d"esriFormTable" \x3e \n          \x3ctr\x3e\n            \x3ctd class\x3d"esriToolIconTd"\x3e\x3cdiv class\x3d"findLocationsIcon"\x3e\x3c/div\x3e\x3c/td\x3e\n            \x3ctd class\x3d"esriAlignLeading"\x3e${i18n.findExistingLocations}\x3c/td\x3e\n            \x3ctd\x3e\n              \x3cdiv class\x3d"esriFloatTrailing" style\x3d"padding:0;"\x3e\n                  \x3cdiv class\x3d"esriFloatLeading"\x3e\n                    \x3ca href\x3d"#" class\x3d\'esriFloatLeading helpIcon\' esriHelpTopic\x3d"toolDescription"\x3e\x3c/a\x3e\n                  \x3c/div\x3e\n                  \x3cdiv class\x3d"esriFloatTrailing"\x3e\n                    \x3ca href\x3d"#" data-dojo-attach-point\x3d"_closeBtn" title\x3d"${i18n.close}" class\x3d"esriAnalysisCloseIcon"\x3e\x3c/a\x3e\n                  \x3c/div\x3e              \n              \x3c/div\x3e                \n            \x3c/td\x3e\n          \x3c/tr\x3e\n        \x3c/table\x3e\n      \x3c/div\x3e\n      \x3cdiv style\x3d"clear:both; border-bottom: #333 thin solid; height:1px;width:100%;"\x3e\x3c/div\x3e\n    \x3c/div\x3e\n    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"_form" readOnly\x3d"true"\x3e\n       \x3ctable class\x3d"esriFormTable"  data-dojo-attach-point\x3d"_aggregateTable"  style\x3d"border-collapse:collapse;border-spacing:5px;" cellpadding\x3d"5px" cellspacing\x3d"5px"\x3e \n         \x3ctbody\x3e\n          \x3ctr\x3e\n            \x3ctd colspan\x3d"3"\x3e\n              \x3clabel class\x3d"esriFloatLeading  esriTrailingMargin025"\x3e${i18n.oneLabel}\x3c/label\x3e\n              \x3clabel data-dojo-attach-point\x3d"_findExpLabel" class\x3d""\x3e${i18n.findExpLabel}\x3c/label\x3e\n              \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' esriHelpTopic\x3d"Expression"\x3e\x3c/a\x3e\n            \x3c/td\x3e\n          \x3c/tr\x3e\n          \x3ctr\x3e\n            \x3ctd colspan\x3d"3" style\x3d"padding:1px"\x3e\n              \x3cdiv data-dojo-attach-point\x3d"expressionGridCtr" style\x3d"width:100%"\x3e\n              \x3c/div\x3e\n            \x3c/td\x3e\n          \x3c/tr\x3e\n          \x3ctr\x3e\n            \x3ctd colspan\x3d"3" class\x3d"clear"\x3e\x3c/td\x3e\n          \x3c/tr\x3e\n           \n          \x3ctr\x3e\n            \x3ctd colspan\x3d"2"\x3e\n              \x3clabel class\x3d"esriFloatLeading esriTrailingMargin025"\x3e${i18n.twoLabel}\x3c/label\x3e\n              \x3clabel class\x3d"longTextInput"\x3e${i18n.outputLayerLabel}\x3c/label\x3e\n            \x3c/td\x3e\n            \x3ctd class\x3d"shortTextInput"\x3e\n              \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' esriHelpTopic\x3d"OuputName"\x3e\x3c/a\x3e \n            \x3c/td\x3e             \n          \x3c/tr\x3e\n          \x3ctr\x3e\n            \x3ctd colspan\x3d"3"\x3e\n              \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" class\x3d"esriLeadingMargin1 longInput" data-dojo-props\x3d"required:true" data-dojo-attach-point\x3d"_outputLayerInput" value\x3d""\x3e\x3c/input\x3e\n            \x3c/td\x3e                \n          \x3c/tr\x3e\n          \x3ctr\x3e\n            \x3ctd colspan\x3d"3"\x3e\n               \x3cdiv class\x3d"esriLeadingMargin1" data-dojo-attach-point\x3d"_chooseFolderRow"\x3e\n                 \x3clabel style\x3d"width:9px;font-size:smaller;"\x3e${i18n.saveResultIn}\x3c/label\x3e\n                 \x3cinput class\x3d"longInput esriFolderSelect" data-dojo-attach-point\x3d"_webMapFolderSelect" dojotype\x3d"dijit/form/ComboBox" trim\x3d"true"\x3e\x3c/input\x3e\n               \x3c/div\x3e              \n            \x3c/td\x3e\n          \x3c/tr\x3e\n        \x3c/tbody\x3e         \n       \x3c/table\x3e\n     \x3c/div\x3e\n    \x3cdiv data-dojo-attach-point\x3d"_aggregateToolContentButtons" style\x3d"padding:5px;margin-top:5px;border-top:solid 1px #BBB;"\x3e\n      \x3cdiv style\x3d"width:100%;padding:0.5em 0 0.5em 0"\x3e\n        \x3ca class\x3d"esriFloatTrailing esriSmallFont"  href\x3d"#" data-dojo-attach-point\x3d"_showCreditsLink" data-dojo-attach-event\x3d"onclick:_handleShowCreditsClick" style\x3d"color:grey;cursor:default;"\x3e${i18n.showCredits}\x3c/a\x3e\n       \x3clabel data-dojo-attach-point\x3d"_chooseExtentDiv"class\x3d"esriSelectLabel" style\x3d"font-size:smaller;"\x3e\n         \x3cinput type\x3d"radio" data-dojo-attach-point\x3d"_useExtentCheck" data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-props\x3d"checked:true" name\x3d"extent" value\x3d"true"/\x3e\n           ${i18n.useMapExtent}\n       \x3c/label\x3e\n      \x3c/div\x3e\n      \x3cbutton data-dojo-type\x3d"dijit/form/Button" type\x3d"submit" data-dojo-attach-point\x3d"_saveBtn" class\x3d"esriLeadingMargin4 esriAnalysisSubmitButton" data-dojo-attach-event\x3d"onClick:_handleSaveBtnClick"\x3e\n          ${i18n.runAnalysis}\n      \x3c/button\x3e\n    \x3c/div\x3e\n    \x3cdiv data-dojo-type\x3d"dijit/Dialog" title\x3d"${i18n.creditTitle}" data-dojo-attach-point\x3d"_usageDialog" style\x3d"width:40em;"\x3e\n      \x3cdiv data-dojo-type\x3d"esri/dijit/analysis/CreditEstimator"  data-dojo-attach-point\x3d"_usageForm"\x3e\x3c/div\x3e\n    \x3c/div\x3e    \n  \x3c/div\x3e\n'}});
define("esri/dijit/analysis/FindExistingLocations","require dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/json dojo/has dojo/i18n dojo/json dojo/string dojo/dom-style dojo/dom-attr dojo/dom-construct dojo/query dojo/dom-class dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dijit/_OnDijitClickMixin dijit/_FocusMixin dijit/registry dijit/form/Button dijit/form/CheckBox dijit/form/Form dijit/form/Select dijit/form/TextBox dijit/form/ValidationTextBox dijit/layout/ContentPane dijit/form/ComboBox dijit/Dialog esri/kernel esri/lang esri/dijit/analysis/AnalysisBase esri/dijit/analysis/utils esri/dijit/analysis/CreditEstimator esri/dijit/analysis/ExpressionGrid dojo/text!esri/dijit/analysis/templates/FindExistingLocations.html".split(" "),
function(h,p,f,k,m,e,q,n,C,g,b,r,D,E,s,t,u,v,w,x,F,G,H,I,J,K,L,M,N,O,y,P,z,l,Q,A,B){h=p([t,u,v,w,x,z],{declaredClass:"esri.dijit.analysis.FindExistingLocations",templateString:B,basePath:h.toUrl("esri/dijit/analysis"),widgetsInTemplate:!0,showSelectFolder:!1,showChooseExtent:!0,showHelp:!0,showCredits:!0,returnFeatureCollection:!1,i18n:null,toolName:"FindExistingLocations",helpFileName:"FindExistingLocations",resultParameter:"resultLayer",analysisLayer:null,inputLayers:[],constructor:function(a){this._pbConnects=
[];a.containerNode&&(this.container=a.containerNode)},destroy:function(){this.inherited(arguments);k.forEach(this._pbConnects,m.disconnect);delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments);f.mixin(this.i18n,n.getLocalization("esri","jsapi").findExistingLocations);f.mixin(this.i18n,n.getLocalization("esri","jsapi").expressionGrid)},postCreate:function(){this.inherited(arguments);s.add(this._form.domNode,"esriSimpleForm");this._outputLayerInput.set("validator",f.hitch(this,
this.validateServiceName));this._buildUI()},startup:function(){},_onClose:function(a){a&&(this._save(),this.emit("save",{save:!0}));this.emit("close",{save:a})},_handleSaveBtnClick:function(){if(this._form.validate()&&this.expressionGrid.validate()){this._saveBtn.set("disabled",!0);var a={},c={},d,b;b=this.expressionGrid.get("expressionMap");a.expressions=e.toJson(b.expressions);d=[];d=k.map(b.inputLayers,function(a){return e.toJson(l.constructAnalysisInputLyrObj(a))},this);a.inputLayers=d;this.returnFeatureCollection||
(a.OutputName=e.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}}));this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=e.toJson({extent:this.map.extent._normalize(!0)}));this.returnFeatureCollection&&(d={outSR:this.map.spatialReference},this.showChooseExtent&&(d.extent=this.map.extent._normalize(!0)),a.context=e.toJson(d));console.log(a);c.jobParams=a;a=g.substitute(this.i18n.itemDescription,{analysisLayerName:this.analysisLayer.name});a+="\x3cdiv\x3e\x3ci\x3e\x3cu\x3e"+
this.i18n.expression+"\x3c/u\x3e "+b.expressionString+"\x3c/i\x3e\x3c/div\x3e";c.itemParams={description:a,tags:g.substitute(this.i18n.itemTags,{analysisLayerName:this.analysisLayer.name}),snippet:this.i18n.itemSnippet};this.showSelectFolder&&(c.itemParams.folder=this._webMapFolderSelect.item?this.folderStore.getValue(this._webMapFolderSelect.item,"id"):"");console.log(c);this.execute(c)}},_handleShowCreditsClick:function(a){a.preventDefault();a={};var c,d;!this._form.validate()||!this.expressionGrid.validate()?
(b.set(this._showCreditsLink,"color","grey"),b.set(this._showCreditsLink,"cursor","default")):(b.set(this._showCreditsLink,"color",""),b.set(this._showCreditsLink,"cursor",""),c=this.expressionGrid.get("expressionMap"),a.expressions=e.toJson(c.expressions),d=[],d=k.map(c.inputLayers,function(a){return l.constructAnalysisInputLyrObj(a)},this),a.inputLayers=e.toJson(d),this.returnFeatureCollection||(a.OutputName=e.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&
this._useExtentCheck.get("checked")&&(a.context=e.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(c={outSR:this.map.spatialReference},this.showChooseExtent&&(c.extent=this.map.extent._normalize(!0)),a.context=e.toJson(c)),console.log(a),this.getCreditsEstimate(this.toolName,a).then(f.hitch(this,function(a){this._usageForm.set("content",a);this._usageDialog.show()})))},_save:function(){},_buildUI:function(){this._loadConnections();l.initHelpLinks(this.domNode,this.showHelp);
this.outputLayerName?this._outputLayerInput.set("value",this.outputLayerName):this._outputLayerInput.set("value",g.substitute(this.i18n.outputLayerName,{analysisLayerName:this.analysisLayer.name}));b.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none");this.showSelectFolder&&this.getFolderStore().then(f.hitch(this,function(a){this.folderStore=a;this._webMapFolderSelect.set("store",a);this._webMapFolderSelect.set("value",this.portalUser.username)}));b.set(this._chooseExtentDiv,
"display",!0===this.showChooseExtent?"block":"none");b.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none");r.set(this._findExpLabel,"innerHTML",g.substitute(this.i18n.findExpLabel,{analysisLayerName:this.analysisLayer.name}));this.expressionGrid=new A({analysisLayer:this.analysisLayer,inputLayers:this.inputLayers,allowAllInputOperands:!1,primaryActionButttonClass:this.get("primaryActionButttonClass")},this.expressionGridCtr);this.expressionGrid.on("update-expressions",f.hitch(this,
this._handleUpdateExpressions))},_handleUpdateExpressions:function(a){1<a.length?(b.set(this._showCreditsLink,"color",""),b.set(this._showCreditsLink,"cursor","")):(b.set(this._showCreditsLink,"color","grey"),b.set(this._showCreditsLink,"cursor","default"))},_loadConnections:function(){this.on("start",f.hitch(this,"_onClose",!0));this._connect(this._closeBtn,"onclick",f.hitch(this,"_onClose",!1))},_setAnalysisGpServerAttr:function(a){a&&(this.analysisGpServer=a,this.set("toolServiceUrl",this.analysisGpServer+
"/"+this.toolName))},_setDisableRunAnalysisAttr:function(a){this._saveBtn.set("disabled",a)},_setShowSelectFolderAttr:function(a){this.showSelectFolder=a},_getShowSelectFolderAttr:function(){return this.showSelectFolder},_setInputLayersAttr:function(a){console.log(this.inputLayers);this.inputLayers=a},_getInputLayersAttr:function(){return this.inputLayers},_setAnalysisLayerAttr:function(a){console.log("analysis",a);this.analysisLayer=a},_getAnalysisLayerAttr:function(){return this.analysisLayer},
_setShowChooseExtentAttr:function(a){this.showChooseExtent=a},_getShowChooseExtentAttr:function(){return this.showChooseExtent},_setMapAttr:function(a){this.map=a},_getMapAttr:function(){return this.map},_setShowHelpAttr:function(a){this.showHelp=a},_getShowHelpAttr:function(){return this.showHelp},_setReturnFeatureCollectionAttr:function(a){this.returnFeatureCollection=a},_getReturnFeatureCollectionAttr:function(){return this.returnFeatureCollection},_setShowCreditsAttr:function(a){this.showCredits=
a},_getShowCreditsAttr:function(){return this.showCredits},validateServiceName:function(a){var b=/(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);return 0===a.length||0===g.trim(a).length?(this._outputLayerInput.set("invalidMessage",this.i18n.requiredValue),!1):b?(this._outputLayerInput.set("invalidMessage",this.i18n.invalidServiceName),!1):98<a.length?(this._outputLayerInput.set("invalidMessage",this.i18n.invalidServiceNameLength),!1):!0},_setPrimaryActionButttonClassAttr:function(a){this.primaryActionButttonClass=
a},_getPrimaryActionButttonClassAttr:function(){return this.primaryActionButttonClass},_connect:function(a,b,d){this._pbConnects.push(m.connect(a,b,d))}});q("extend-esri")&&f.setObject("dijit.analysis.FindExistingLocations",h,y);return h});