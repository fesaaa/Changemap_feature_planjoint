//>>built
(function(b,a){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?a(require("../moment")):"function"===typeof define&&define.amd?define("moment/locale/tr",["../moment"],a):a(b.moment)})(this,function(b){var a={1:"'inci",5:"'inci",8:"'inci",70:"'inci",80:"'inci",2:"'nci",7:"'nci",20:"'nci",50:"'nci",3:"'\u00fcnc\u00fc",4:"'\u00fcnc\u00fc",100:"'\u00fcnc\u00fc",6:"'nc\u0131",9:"'uncu",10:"'uncu",30:"'uncu",60:"'\u0131nc\u0131",90:"'\u0131nc\u0131"};return b.defineLocale("tr",
{months:"Ocak \u015eubat Mart Nisan May\u0131s Haziran Temmuz A\u011fustos Eyl\u00fcl Ekim Kas\u0131m Aral\u0131k".split(" "),monthsShort:"Oca \u015eub Mar Nis May Haz Tem A\u011fu Eyl Eki Kas Ara".split(" "),weekdays:"Pazar Pazartesi Sal\u0131 \u00c7ar\u015famba Per\u015fembe Cuma Cumartesi".split(" "),weekdaysShort:"Paz Pts Sal \u00c7ar Per Cum Cts".split(" "),weekdaysMin:"Pz Pt Sa \u00c7a Pe Cu Ct".split(" "),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",
LLLL:"dddd, D MMMM YYYY HH:mm"},calendar:{sameDay:"[bug\u00fcn saat] LT",nextDay:"[yar\u0131n saat] LT",nextWeek:"[haftaya] dddd [saat] LT",lastDay:"[d\u00fcn] LT",lastWeek:"[ge\u00e7en hafta] dddd [saat] LT",sameElse:"L"},relativeTime:{future:"%s sonra",past:"%s \u00f6nce",s:"birka\u00e7 saniye",m:"bir dakika",mm:"%d dakika",h:"bir saat",hh:"%d saat",d:"bir g\u00fcn",dd:"%d g\u00fcn",M:"bir ay",MM:"%d ay",y:"bir y\u0131l",yy:"%d y\u0131l"},dayOfMonthOrdinalParse:/\d{1,2}'(inci|nci|\u00fcnc\u00fc|nc\u0131|uncu|\u0131nc\u0131)/,
ordinal:function(c){if(0===c)return c+"'\u0131nc\u0131";var b=c%10;return c+(a[b]||a[c%100-b]||a[100<=c?100:null])},week:{dow:1,doy:7}})});