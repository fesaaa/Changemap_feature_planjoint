// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/symbols/Symbol","dojo/_base/declare dojo/_base/lang dojo/has ../kernel ../lang ../Color".split(" "),function(b,c,e,f,g,d){b=b(null,{declaredClass:"esri.symbol.Symbol",color:new d([0,0,0,1]),type:null,constructor:function(a){a&&c.isObject(a)&&(c.mixin(this,a),this.color&&g.isDefined(this.color[0])&&(this.color=d.toDojoColor(this.color)),(a=this.type)&&0===a.indexOf("esri")&&(this.type={esriSMS:"simplemarkersymbol",esriPMS:"picturemarkersymbol",esriSLS:"simplelinesymbol",esriCLS:"cartographiclinesymbol",
esriSFS:"simplefillsymbol",esriPFS:"picturefillsymbol",esriTS:"textsymbol",esriSHD:"shieldlabelsymbol"}[a]))},setColor:function(a){this.color=a;return this},toJson:function(){return{color:d.toJsonColor(this.color)}}});e("extend-esri")&&c.setObject("symbol.Symbol",b,f);return b});