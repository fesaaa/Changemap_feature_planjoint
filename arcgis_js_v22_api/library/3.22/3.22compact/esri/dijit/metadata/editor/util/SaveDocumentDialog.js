// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/editor/util/SaveDocumentDialog","dojo/_base/declare dojo/_base/lang dojo/dom-class dojo/dom-construct dojo/has dijit/_WidgetBase dojo/i18n!../../nls/i18nBase dijit/Dialog ./SaveDocumentPane ../../../../kernel".split(" "),function(a,b,f,e,d,g,h,k,l,m){a=a([g],{dialog:null,dialogTitle:h.editor.save.dialogTitle,editor:null,gxeDocument:null,postCreate:function(){this.inherited(arguments)},hide:function(){this.dialog&&this.dialog.hide()},onSave:function(b,a,c){},show:function(){var a=
e.create("div",{}),d=new l({dialogBroker:this,editor:this.editor,gxeDocument:this.gxeDocument,onCancel:b.hitch(this,function(){this.dialog&&this.dialog.hide()}),onSave:b.hitch(this,function(a,b){if(this.dialog)this.onSave(this.dialog,a,b)})},e.create("div",{},a)),c=this.dialog=new k({"class":"gxeDialog  gxePopupDialog",title:this.dialogTitle,content:a,autofocus:!1});this.isLeftToRight()||f.add(c.domNode,"gxeRtl");this.own(c.on("hide",b.hitch(this,function(){setTimeout(b.hitch(this,function(){d.destroyRecursive(!1);
c.destroyRecursive(!1);this.destroyRecursive(!1)}),300)})));c.show()}});d("extend-esri")&&b.setObject("dijit.metadata.editor.util.SaveDocumentDialog",a,m);return a});