// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/reportContainers/containerGridUtils/QueryUtil",[],function(){return{getLayoutCells:function(a,c){var b=[];a.grids.forEach(function(c){(c=c.getFieldCells())&&(b=b.concat(c))});return c?b.filter(function(b){return!c||b&&b.content&&b.content[c]}):b},canInsertElementInCell:function(a){return!!this.getCellWithSelectedTableCells(a)},canCreateChartFromSelected:function(a){return!!this.getCellWithSelectedTableCells(a,!0)},getCellWithSelectedTableCells:function(a,
c){var b;this.getLayoutCells(a,"hasSelectedCells").some(function(a){if(a.content.hasSelectedCells(c))return b=a,!0});return b},findFirstEmptyLayoutCell:function(a,c){function b(){var b;d.getLayoutCells(a,"isEmpty").some(function(c){if(c.content.isEmpty())return b=c,!0});return b}var d=this,e=b(),f;!e&&c&&(a.addEmptyPageGrid(),e=b(),f=!0);return{cell:e,pageAdded:f}},getFocusedLayoutCell:function(a){var c=[];a.grids.forEach(function(b){(b=b.getFocusedCells())&&(c=c.concat(b))});return c[0]},hasFocusedChild:function(a){return a.grids.some(function(c){return(c=
c&&c.getFocusedCells())&&!!c.length})},collectFieldInfos:function(a,c){var b=[];this.getLayoutCells(a,"collectFieldInfos").some(function(a){(a=a.content.collectFieldInfos(c))&&(b=b.concat(a))});return b},getSectionIndex:function(a,c){var b=0,d;a.grids.some(function(a){return a.getFieldCells().some(function(a){if(a===c)return d=!0;b++})});return d&&b},getLayoutCellBySectionIndex:function(a,c){var b=0,d;a.grids.some(function(a){return a.getFieldCells().some(function(a){if(b==c)return d=a,!0;b++})});
return d}}});