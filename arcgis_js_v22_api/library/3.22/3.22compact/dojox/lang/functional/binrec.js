//>>built
define("dojox/lang/functional/binrec",["dojo","dijit","dojox","dojo/require!dojox/lang/functional/lambda,dojox/lang/functional/util"],function(h,t,r){h.provide("dojox.lang.functional.binrec");h.require("dojox.lang.functional.lambda");h.require("dojox.lang.functional.util");(function(){var b=r.lang.functional,k=b.inlineLambda,h=["_z.r","_r","_z.a"];b.binrec=function(a,f,d,g){var m,l,n,p,q={},c={},e=function(a){q[a]=1};"string"==typeof a?a=k(a,"_x",e):(m=b.lambda(a),a="_c.apply(this, _x)",c["_c\x3d_t.c"]=
1);"string"==typeof f?f=k(f,"_x",e):(l=b.lambda(f),f="_t.apply(this, _x)");"string"==typeof d?d=k(d,"_x",e):(n=b.lambda(d),d="_b.apply(this, _x)",c["_b\x3d_t.b"]=1);"string"==typeof g?g=k(g,h,e):(p=b.lambda(g),g="_a.call(this, _z.r, _r, _z.a)",c["_a\x3d_t.a"]=1);e=b.keys(q);c=b.keys(c);a=new Function([],"var _x\x3darguments,_y,_z,_r".concat(e.length?","+e.join(","):"",c.length?",_t\x3d_x.callee,"+c.join(","):"",l?c.length?",_t\x3d_t.t":"_t\x3d_x.callee.t":"",";while(!",a,"){_r\x3d",d,";_y\x3d{p:_y,a:_r[1]};_z\x3d{p:_z,a:_x};_x\x3d_r[0]}for(;;){do{_r\x3d",
f,';if(!_z)return _r;while("r" in _z){_r\x3d',g,";if(!(_z\x3d_z.p))return _r}_z.r\x3d_r;_x\x3d_y.a;_y\x3d_y.p}while(",a,");do{_r\x3d",d,";_y\x3d{p:_y,a:_r[1]};_z\x3d{p:_z,a:_x};_x\x3d_r[0]}while(!",a,")}"));m&&(a.c=m);l&&(a.t=l);n&&(a.b=n);p&&(a.a=p);return a}})()});