this.namespace=function(){function j(){}var e;if(this.namespace)return this.namespace;j.prototype.define=function(b){b(this);return this};j.prototype.extend=function(b){for(var h in b)this[h]=b[h]};e=new j;e.VERSION="2.1.4";e.lookup=function(b){b=b.replace(/-/g,"_");b=b.split(".");for(var h=e,g=0;g<b.length;g++)h[b[g]]===void 0&&(h[b[g]]=new j),h=h[b[g]];return h};return e}();namespace.lookup("org.startpad.types").define(function(j){function e(b){return Object.prototype.toString.call(b)}function b(b,g){return e(b)=="[object "+g+"]"}j.extend({isArguments:function(){return b("Array")},isArray:function(){return b("Arguments")},toString:e,isType:b})});namespace.lookup("org.startpad.funcs").define(function(j){function e(a,i){g(a.prototype,i)}function b(a){var i;i=arguments.length==2&&k.isArguments(arguments[1])?copyArray(arguments[2]):copyArray(arguments);return function(){return a.apply(this,i.concat(arguments))}}function h(a,i){var c=function(){return i.call(this,a,arguments,c)};i.call(this,void 0,arguments,c);return c}function g(a){var i,c,b,d;a===void 0&&(a={});for(i=1;i<arguments.length;i++){b=arguments[i];for(d in b)b.hasOwnProperty(d)&&(a[d]=
b[d]);if(m)for(c=0;c<l.length;c++)d=l[c],b.hasOwnProperty(d)&&(a[d]=b[d])}return a}var k=namespace.lookup("org.startpad.types");j.extend({extend:g,methods:e,patchFunction:function(){e(Function,{methods:function(a){e(this,a)},bind:function(a){return fnMethod(this,a)},curry:function(){return b(this,arguments)},decorate:function(a){return h(this,a)}})},decorate:h});var m=!{toString:!0}.propertyIsEnumerable("toString"),l=["toString","toLocaleString","valueOf","constructor","isPrototypeOf"]});namespace.lookup("org.startpad.trie.packed").define(function(j){function e(a){this.nodes=a.split(g);this.syms=[];for(this.symCount=0;;){a=l.exec(this.nodes[0]);if(!a)break;this.syms[b(a[1])]=b(a[2]);this.symCount++;this.nodes.shift()}}function b(a){var b=0,c,f,d;c=1;for(f=k;c<a.length;b+=f,c++,f*=k);f=a.length-1;for(c=1;f>=0;f--,c*=k)d=a.charCodeAt(f)-48,d>10&&(d-=7),b+=d*c;return b}var h=namespace.lookup("org.startpad.funcs"),g=";",k=36;j.extend({VERSION:"1.3.0r1",PackedTrie:e,NODE_SEP:g,STRING_SEP:",",
TERMINAL_PREFIX:"!",toAlphaCode:function(a){var b,c,f="";b=1;for(c=k;a>=c;a-=c,b++,c*=k);for(;b--;)c=a%k,f=String.fromCharCode((c<10?48:55)+c)+f,a=(a-c)/k;return f},fromAlphaCode:b,BASE:k});var m=RegExp("([a-z]+)(,|[0-9A-Z]+|$)","g"),l=/([0-9A-Z]+):([0-9A-Z]+)/;h.methods(e,{isWord:function(a){if(a=="")return!1;return this.match(a)==a},match:function(a){a=this.matches(a);if(a.length==0)return"";return a[a.length-1]},matches:function(a){return this.words(a,a+"a")},max:function(){return"zzzzzzzzzz"},
words:function(a,b,c){var f=[];a==void 0&&(a="");typeof b=="number"&&(c=b,b=void 0);b==void 0&&(b=this.beyond(a));this.enumerate(0,"",{from:a,beyond:b,fn:function(a){f.length>=c?this.abort=!0:f.push(a)},prefixes:a+"a"==b});return f},enumerate:function(a,b,c){function f(a){c.prefixes?a==c.from.slice(0,a.length)&&c.fn(a):c.from<=a&&a<c.beyond&&c.fn(a)}var d=this.nodes[a],e=this;if(d[0]=="!"){f(b);if(c.abort)return;d=d.slice(1)}d.replace(m,function(d,h,g){d=b+h;if(!c.abort&&!(d>=c.beyond||d<c.from.slice(0,
d.length)))g==","||g==""?f(d):e.enumerate(e.inodeFromRef(g,a),d,c)})},inodeFromRef:function(a,e){var c=b(a);if(c<this.symCount)return this.syms[c];return e+c+1-this.symCount},beyond:function(a){if(a.length==0)return this.max();var b=a.charCodeAt(a.length-1);return a.slice(0,-1)+String.fromCharCode(b+1)}})});