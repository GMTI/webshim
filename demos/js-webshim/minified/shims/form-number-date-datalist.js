jQuery.webshims.register("forms-ext",function(c,d){(function(){var a=d.validityMessages,b=function(a,f){c.each(f,function(c,i){a[c]?typeof i=="object"&&b(a[c],i):a[c]=i})},f={typeMismatch:{number:"Please enter a number.",date:"Please enter a date.",time:"Please enter a time.",range:"Invalid input.","datetime-local":"Please enter a datetime."},rangeUnderflow:{defaultMessage:"Value must be greater than or equal to {%min}."},rangeOverflow:{defaultMessage:"Value must be less than or equal to {%max}."},
stepMismatch:"Invalid input."},e={typeMismatch:{number:"{%value} ist keine Nummer!",date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:{defaultMessage:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen."},rangeOverflow:{defaultMessage:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen."},stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}"};
["date","time","datetime-local"].forEach(function(a){f.rangeUnderflow[a]="Value must be at or after {%min}."});["date","time","datetime-local"].forEach(function(a){f.rangeOverflow[a]="Value must be at or before {%max}."});["date","time","datetime-local"].forEach(function(a){e.rangeUnderflow[a]="{%value} ist zu fr\u00fch. {%min} ist die fr\u00fcheste Zeit, die Sie benutzen k\u00f6nnen."});["date","time","datetime-local"].forEach(function(a){e.rangeOverflow[a]="{%value} ist zu sp\u00e4t. {%max} ist die sp\u00e4teste Zeit, die Sie benutzen k\u00f6nnen."});
b(a.en,f);b(a.de,e)})();d.getStep=function(a,k){var f=c.attr(a,"step");if(f==="any")return f;k=k||o(a);if(!h[k]||!h[k].step)return f;f=b.number.asNumber(f);return(!isNaN(f)&&f>0?f:h[k].step)*h[k].stepScaleFactor};d.addMinMaxNumberToCache=function(a,c,b){a+"AsNumber"in b||(b[a+"AsNumber"]=h[b.type].asNumber(c.attr(a)),isNaN(b[a+"AsNumber"])&&a+"Default"in h[b.type]&&(b[a+"AsNumber"]=h[b.type][a+"Default"]))};var m=parseInt("NaN",10),h=d.inputTypes,j=function(a){return typeof a=="number"||a&&a==a*1},
n=function(a){return Modernizr.input.valueAsNumber&&c('<input type="'+a+'" />').prop("type")===a},o=function(a){return(a.getAttribute("type")||"").toLowerCase()},l=d.addMinMaxNumberToCache,p=function(a,c){a=""+a;c-=a.length;for(var b=0;b<c;b++)a="0"+a;return a};d.addValidityRule("stepMismatch",function(a,c,b,e){if(c==="")return!1;if(!("type"in b))b.type=o(a[0]);if(b.type=="date")return!1;e=(e||{}).stepMismatch;if(h[b.type]&&h[b.type].step){if(!("step"in b))b.step=d.getStep(a[0],b.type);if(b.step==
"any")return!1;if(!("valueAsNumber"in b))b.valueAsNumber=h[b.type].asNumber(c);if(isNaN(b.valueAsNumber))return!1;l("min",a,b);a=b.minAsNumber;isNaN(a)&&(a=h[b.type].stepBase||0);e=Math.abs((b.valueAsNumber-a)%b.step);e=!(e<=1.0E-7||Math.abs(e-b.step)<=1.0E-7)}return e});[{name:"rangeOverflow",attr:"max",factor:1},{name:"rangeUnderflow",attr:"min",factor:-1}].forEach(function(a){d.addValidityRule(a.name,function(c,b,e,d){d=(d||{})[a.name]||!1;if(b==="")return d;if(!("type"in e))e.type=o(c[0]);if(h[e.type]&&
h[e.type].asNumber){if(!("valueAsNumber"in e))e.valueAsNumber=h[e.type].asNumber(b);if(isNaN(e.valueAsNumber))return!1;l(a.attr,c,e);if(isNaN(e[a.attr+"AsNumber"]))return d;d=e[a.attr+"AsNumber"]*a.factor<e.valueAsNumber*a.factor-1.0E-7}return d})});d.reflectProperties(["input"],["max","min","step"]);var t=d.defineNodeNameProperty("input","valueAsNumber",{prop:{get:function(){var a=o(this),a=h[a]&&h[a].asNumber?h[a].asNumber(c.prop(this,"value")):t.prop._supget&&t.prop._supget.apply(this,arguments);
a==null&&(a=m);return a},set:function(a){var b=o(this);h[b]&&h[b].numberToString?isNaN(a)?c.prop(this,"value",""):(b=h[b].numberToString(a),b!==!1?c.prop(this,"value",b):d.warn("INVALID_STATE_ERR: DOM Exception 11")):t.prop._supset&&t.prop._supset.apply(this,arguments)}}}),q=d.defineNodeNameProperty("input","valueAsDate",{prop:{get:function(){var a=o(this);return h[a]&&h[a].asDate&&!h[a].noAsDate?h[a].asDate(c.prop(this,"value")):q.prop._supget&&q.prop._supget.call(this)||null},set:function(a){var b=
o(this);if(h[b]&&h[b].dateToString&&!h[b].noAsDate){if(a===null)return c.prop(this,"value",""),"";b=h[b].dateToString(a);if(b!==!1)return c.prop(this,"value",b),b;else d.warn("INVALID_STATE_ERR: DOM Exception 11")}else return q.prop._supset&&q.prop._supset.apply(this,arguments)||null}}}),b={number:{mismatch:function(a){return!j(a)},step:1,stepScaleFactor:1,asNumber:function(a){return j(a)?a*1:m},numberToString:function(a){return j(a)?a:!1}},range:{minDefault:0,maxDefault:100},date:{mismatch:function(a){if(!a||
!a.split||!/\d$/.test(a))return!0;var b=a.split(/\u002D/);if(b.length!==3)return!0;var f=!1;c.each(b,function(a,c){if(!(j(c)||c&&c=="0"+c*1))return f=!0,!1});if(f)return f;if(b[0].length!==4||b[1].length!=2||b[1]>12||b[2].length!=2||b[2]>33)f=!0;return a!==this.dateToString(this.asDate(a,!0))},step:1,stepScaleFactor:864E5,asDate:function(a,c){return!c&&this.mismatch(a)?null:new Date(this.asNumber(a,!0))},asNumber:function(a,c){var b=m;if(c||!this.mismatch(a))a=a.split(/\u002D/),b=Date.UTC(a[0],a[1]-
1,a[2]);return b},numberToString:function(a){return j(a)?this.dateToString(new Date(a*1)):!1},dateToString:function(a){return a&&a.getFullYear?a.getUTCFullYear()+"-"+p(a.getUTCMonth()+1,2)+"-"+p(a.getUTCDate(),2):!1}},time:{mismatch:function(a,b){if(!a||!a.split||!/\d$/.test(a))return!0;a=a.split(/\u003A/);if(a.length<2||a.length>3)return!0;var f=!1,e;a[2]&&(a[2]=a[2].split(/\u002E/),e=parseInt(a[2][1],10),a[2]=a[2][0]);c.each(a,function(a,c){if(!(j(c)||c&&c=="0"+c*1)||c.length!==2)return f=!0,!1});
if(f)return!0;if(a[0]>23||a[0]<0||a[1]>59||a[1]<0)return!0;if(a[2]&&(a[2]>59||a[2]<0))return!0;if(e&&isNaN(e))return!0;e&&(e<100?e*=100:e<10&&(e*=10));return b===!0?[a,e]:!1},step:60,stepBase:0,stepScaleFactor:1E3,asDate:function(a){a=new Date(this.asNumber(a));return isNaN(a)?null:a},asNumber:function(a){var c=m,a=this.mismatch(a,!0);a!==!0&&(c=Date.UTC("1970",0,1,a[0][0],a[0][1],a[0][2]||0),a[1]&&(c+=a[1]));return c},dateToString:function(a){if(a&&a.getUTCHours){var c=p(a.getUTCHours(),2)+":"+p(a.getUTCMinutes(),
2),b=a.getSeconds();b!="0"&&(c+=":"+p(b,2));b=a.getUTCMilliseconds();b!="0"&&(c+="."+p(b,3));return c}else return!1}},"datetime-local":{mismatch:function(c,b){if(!c||!c.split||(c+"special").split(/\u0054/).length!==2)return!0;c=c.split(/\u0054/);return h.date.mismatch(c[0])||h.time.mismatch(c[1],b)},noAsDate:!0,asDate:function(c){c=new Date(this.asNumber(c));return isNaN(c)?null:c},asNumber:function(c){var b=m,f=this.mismatch(c,!0);f!==!0&&(c=c.split(/\u0054/)[0].split(/\u002D/),b=Date.UTC(c[0],c[1]-
1,c[2],f[0][0],f[0][1],f[0][2]||0),f[1]&&(b+=f[1]));return b},dateToString:function(c,b){return h.date.dateToString(c)+"T"+h.time.dateToString(c,b)}}};(!Modernizr.input.valueAsNumberSet||!n("number"))&&d.addInputType("number",b.number);(!Modernizr.input.valueAsNumberSet||!n("range"))&&d.addInputType("range",c.extend({},b.number,b.range));(!Modernizr.input.valueAsNumberSet||!n("date"))&&d.addInputType("date",b.date);(!Modernizr.input.valueAsNumberSet||!n("time"))&&d.addInputType("time",c.extend({},
b.date,b.time));(!Modernizr.input.valueAsNumberSet||!n("datetime-local"))&&d.addInputType("datetime-local",c.extend({},b.date,b.time,b["datetime-local"]))});
jQuery.webshims.ready("forms-ext dom-support",function(c,d,m,h){var j=d.triggerInlineForm,n=Modernizr.inputtypes,o=function(){var c={"padding-box":"innerWidth","border-box":"outerWidth","content-box":"width"},a=Modernizr.prefixed&&Modernizr.prefixed("boxSizing");return function(b,e){var f,d,k;d="width";a&&(d=c[b.css(a)]||d);f=b[d]();d=d=="width";if(f){var r=parseInt(e.css("marginLeft"),10)||0,h=e.outerWidth();(k=parseInt(b.css("marginRight"),10)||0)&&b.css("marginRight",0);r<=h*-1?(e.css("marginRight",
Math.floor(Math.abs(h+r)+k)),b.css("paddingRight",(parseInt(b.css("paddingRight"),10)||0)+Math.abs(r)),d&&b.css("width",Math.floor(f+r))):(e.css("marginRight",k),b.css("width",Math.floor(f-r-h)))}}}(),l=c.webshims.cfg["forms-ext"],p={dateFormat:"yy-mm-dd"},t=c([]),q,b=function(a,i){c("input",a).add(i.filter("input")).each(function(){var a=c.prop(this,"type");if(b[a]&&!d.data(this,"shadowData"))b[a](c(this))})},a=function(a,b){if(l.lazyDate){var g=c.data(a[0],"setDateLazyTimer");g&&clearTimeout(g);
c.data(a[0],"setDateLazyTimer",setTimeout(function(){a.datepicker("setDate",b);c.removeData(a[0],"setDateLazyTimer");a=null},0))}else a.datepicker("setDate",b)};if(l.lazyDate===void 0)try{l.lazyDate=c.browser.msie&&d.browserVersion<9||c(m).width()<500&&c(m).height()<500}catch(k){}b.common=function(a,b,g){Modernizr.formvalidation&&a.bind("firstinvalid",function(c){(d.fromSubmit||!q)&&a.unbind("invalid.replacedwidgetbubble").bind("invalid.replacedwidgetbubble",function(b){!c.isInvalidUIPrevented()&&
!b.isDefaultPrevented()&&(d.validityAlert.showFor(c.target),c.preventDefault(),b.preventDefault());a.unbind("invalid.replacedwidgetbubble")})});var e=a.attr("id"),e={css:{marginRight:a.css("marginRight"),marginLeft:a.css("marginLeft")},outerWidth:a.outerWidth(),label:e?c('label[for="'+e+'"]',a[0].form):t},f=d.getID(e.label);b.addClass(a[0].className);d.addShadowDom(a,b,{data:g||{},shadowFocusElement:c("input.input-datetime-local-date, span.ui-slider-handle",b)[0],shadowChilds:c("input, span.ui-slider-handle",
b)});a.after(b).hide();a[0].form&&c(a[0].form).bind("reset",function(c){c.originalEvent&&!c.isDefaultPrevented()&&setTimeout(function(){a.prop("value",a.prop("value"))},0)});b.length==1&&!c("*",b)[0]&&(b.attr("aria-labeledby",f),e.label.bind("click",function(){b.focus();return!1}));return e};Modernizr.formvalidation&&["input","form"].forEach(function(c){var a=d.defineNodeNameProperty(c,"checkValidity",{prop:{value:function(){q=!0;var c=a.prop._supvalue.apply(this,arguments);q=!1;return c}}})});if(!n["datetime-local"]||
l.replaceUI){var f=[0.595,0.395],e=[0.565,0.425],s=!c.browser.msie||d.browserVersion>6?0:0.45,u=function(a,b,g,e){var f,k,j=function(){r.dpDiv.unbind("mousedown.webshimsmousedownhandler");k=f=!1},r=b.bind("focusin",function(){j();r.dpDiv.unbind("mousedown.webshimsmousedownhandler").bind("mousedown.webshimsmousedownhandler",function(){f=!0})}).bind("focusout blur",function(c){f&&(k=!0,c.stopImmediatePropagation())}).datepicker(c.extend({onClose:function(){k&&h.activeElement!==b[0]?(j(),b.trigger("focusout"),
b.triggerHandler("blur")):j()}},p,l.datepicker,a.data("datepicker"))).bind("change",g).data("datepicker");r.dpDiv.addClass("input-date-datepicker-control");e&&d.triggerDomUpdate(e[0]);["disabled","min","max","value","step"].forEach(function(c){var b=a.prop(c);b!==""&&(c!="disabled"||!b)&&a.prop(c,b)});return r};b["datetime-local"]=function(a){if(c.fn.datepicker){var i=c('<span role="group" class="input-datetime-local"><input type="text" class="input-datetime-local-date" /><input type="time" class="input-datetime-local-time" /></span>'),
g=this.common(a,i,b["datetime-local"].attrs),d=c("input.input-datetime-local-date",i),k=u(a,d,function(g){var e=d.prop("value")||"",f="";if(l.lazyDate){var k=c.data(d[0],"setDateLazyTimer");k&&(clearTimeout(k),c.removeData(d[0],"setDateLazyTimer"))}if(e){f=c("input.input-datetime-local-time",i).prop("value")||"00:00";try{e=(e=c.datepicker.parseDate(d.datepicker("option","dateFormat"),e))?c.datepicker.formatDate("yy-mm-dd",e):d.prop("value")}catch(h){e=d.prop("value")}}b["datetime-local"].blockAttr=
!0;a.prop("value",!e&&!f?"":e+"T"+f);b["datetime-local"].blockAttr=!1;g.stopImmediatePropagation();j(a[0],"input");j(a[0],"change")},i);c("input.input-datetime-local-time",i).bind("change",function(g){var e=c.prop(this,"value"),i=["",""];if(e){i=a.prop("value").split("T");if(i.length<2||!i[0])i[0]=c.datepicker.formatDate("yy-mm-dd",new Date);if(i[1]=e)try{d.prop("value",c.datepicker.formatDate(d.datepicker("option","dateFormat"),c.datepicker.parseDate("yy-mm-dd",i[0])))}catch(f){}}i=!i[0]&&!i[1]?
"":i.join("T");b["datetime-local"].blockAttr=!0;a.prop("value",i);b["datetime-local"].blockAttr=!1;g.stopImmediatePropagation();j(a[0],"input");j(a[0],"change")});i.attr("aria-labeledby",g.label.attr("id"));g.label.bind("click",function(){d.focus();return!1});if(g.css&&(i.css(g.css),g.outerWidth)){i.outerWidth(g.outerWidth);var g=i.width(),h=k.trigger[0]?f:e;d.outerWidth(Math.floor(g*h[0]-s),!0);c("input.input-datetime-local-time",i).outerWidth(Math.floor(g*h[1]-s),!0);k.trigger[0]&&o(d,k.trigger)}}};
b["datetime-local"].attrs={disabled:function(a,b,g){c("input.input-datetime-local-date",b).prop("disabled",!!g);c("input.input-datetime-local-time",b).prop("disabled",!!g)},step:function(a,b,g){c("input.input-datetime-local-time",b).attr("step",g)},min:function(a,b,g){if(g){g=g.split?g.split("T"):[];try{g=c.datepicker.parseDate("yy-mm-dd",g[0])}catch(e){g=!1}}g||(g=null);c("input.input-datetime-local-date",b).datepicker("option","minDate",g)},max:function(a,b,g){if(g){g=g.split?g.split("T"):[];try{g=
c.datepicker.parseDate("yy-mm-dd",g[0])}catch(e){g=!1}}g||(g=null);c("input.input-datetime-local-date",b).datepicker("option","maxDate",g)},value:function(e,i,g){var d;if(g){g=g.split?g.split("T"):[];try{d=c.datepicker.parseDate("yy-mm-dd",g[0])}catch(f){d=!1}}d?(b["datetime-local"].blockAttr||a(c("input.input-datetime-local-date",i),d),c("input.input-datetime-local-time",i).prop("value",g[1]||"00:00")):(c("input.input-datetime-local-date",i).prop("value",g[0]||""),c("input.input-datetime-local-time",
i).prop("value",g[1]||""))}};b.date=function(a){if(c.fn.datepicker){var e=c('<input class="input-date" type="text" />'),g=this.common(a,e,b.date.attrs),d=u(a,e,function(g){b.date.blockAttr=!0;var d;if(l.lazyDate){var f=c.data(e[0],"setDateLazyTimer");f&&(clearTimeout(f),c.removeData(e[0],"setDateLazyTimer"))}try{d=(d=c.datepicker.parseDate(e.datepicker("option","dateFormat"),e.prop("value")))?c.datepicker.formatDate("yy-mm-dd",d):e.prop("value")}catch(k){d=e.prop("value")}a.prop("value",d);b.date.blockAttr=
!1;g.stopImmediatePropagation();j(a[0],"input");j(a[0],"change")});g.css&&(e.css(g.css),g.outerWidth&&e.outerWidth(g.outerWidth),d.trigger[0]&&o(e,d.trigger))}};b.date.attrs={disabled:function(a,b,g){c.prop(b,"disabled",!!g)},min:function(a,b,g){try{g=c.datepicker.parseDate("yy-mm-dd",g)}catch(e){g=!1}g&&c(b).datepicker("option","minDate",g)},max:function(a,b,g){try{g=c.datepicker.parseDate("yy-mm-dd",g)}catch(e){g=!1}g&&c(b).datepicker("option","maxDate",g)},value:function(e,d,g){if(!b.date.blockAttr){try{var f=
c.datepicker.parseDate("yy-mm-dd",g)}catch(k){f=!1}f?a(c(d),f):c.prop(d,"value",g)}}}}if(!n.range||l.replaceUI)b.range=function(a){if(c.fn.slider){var e=c('<span class="input-range"><span class="ui-slider-handle" role="slider" tabindex="0" /></span>'),g=this.common(a,e,b.range.attrs);c("span",e).attr("aria-labeledby",g.label.attr("id"));g.label.bind("click",function(){c("span",e).focus();return!1});g.css&&(e.css(g.css),g.outerWidth&&e.outerWidth(g.outerWidth));e.slider(c.extend({},l.slider,a.data("slider"),
{slide:function(c,e){if(c.originalEvent)b.range.blockAttr=!0,a.prop("value",e.value),b.range.blockAttr=!1,j(a[0],"input"),j(a[0],"change")}}));["disabled","min","max","step","value"].forEach(function(b){var e=a.attr(b),g;b=="value"&&!e&&(g=a.getShadowElement())&&(e=(c(g).slider("option","max")-c(g).slider("option","min"))/2);e!=null&&a.attr(b,e)})}},b.range.attrs={disabled:function(a,b,e){e=!!e;c(b).slider("option","disabled",e);c("span",b).attr({"aria-disabled":e+"",tabindex:e?"-1":"0"})},min:function(a,
b,e){e=e?e*1||0:0;c(b).slider("option","min",e);c("span",b).attr({"aria-valuemin":e})},max:function(a,b,e){e=e||e===0?e*1||100:100;c(b).slider("option","max",e);c("span",b).attr({"aria-valuemax":e})},value:function(a,e,g){g=c(a).prop("valueAsNumber");isNaN(g)||(b.range.blockAttr||c(e).slider("option","value",g),c("span",e).attr({"aria-valuenow":g,"aria-valuetext":g}))},step:function(a,b,e){e=e&&c.trim(e)?e*1||1:1;c(b).slider("option","step",e)}};if(Modernizr.input.valueAsNumberSet&&Modernizr.input.valueAsDate&&
(l.replaceUI||!Modernizr.inputtypes["datetime-local"]||!Modernizr.inputtypes.range))m=function(){d.data(this,"hasShadow")&&c.prop(this,"value",c.prop(this,"value"))},d.onNodeNamesPropertyModify("input","valueAsNumber",m),d.onNodeNamesPropertyModify("input","valueAsDate",m);c.each(["disabled","min","max","value","step"],function(a,c){d.onNodeNamesPropertyModify("input",c,function(a){var b=d.data(this,"shadowData");if(b&&b.data&&b.data[c]&&b.nativeElement===this)b.data[c](this,b.shadowElement,a)})});
if(!l.availabeLangs)l.availabeLangs="af ar ar-DZ az bg bs ca cs da de el en-AU en-GB en-NZ eo es et eu fa fi fo fr fr-CH gl he hr hu hy id is it ja ko kz lt lv ml ms nl no pl pt-BR rm ro ru sk sl sq sr sr-SR sv ta th tr uk vi zh-CN zh-HK zh-TW".split(" ");m=function(){c.datepicker&&(d.activeLang({langObj:c.datepicker.regional,module:"forms-ext",callback:function(a){c("input.hasDatepicker").filter(".input-date, .input-datetime-local-date").datepicker("option",c.extend(p,a,l.datepicker))}}),c(h).unbind("jquery-uiReady.langchange input-widgetsReady.langchange"))};
c(h).bind("jquery-uiReady.langchange input-widgetsReady.langchange",m);m();(function(){var a=function(){var a={};return function(b){return b in a?a[b]:a[b]=c('<input type="'+b+'" />')[0].type===b}}();if(!Modernizr.input.valueAsNumber||!a("number")||!a("time")){var b=d.modules["forms-ext"].options,e=d.inputTypes,f=function(a,b,f){f=f||{};if(!("type"in f))f.type=c.prop(a,"type");if(!("step"in f))f.step=d.getStep(a,f.type);if(!("valueAsNumber"in f))f.valueAsNumber=e[f.type].asNumber(c.prop(a,"value"));
var k=f.step=="any"?e[f.type].step*e[f.type].stepScaleFactor:f.step;d.addMinMaxNumberToCache("min",c(a),f);d.addMinMaxNumberToCache("max",c(a),f);if(isNaN(f.valueAsNumber))f.valueAsNumber=e[f.type].stepBase||0;f.step!=="any"&&(a=Math.round((f.valueAsNumber-(f.minAsnumber||0))%f.step*1E7)/1E7)&&Math.abs(a)!=f.step&&(f.valueAsNumber-=a);a=f.valueAsNumber+k*b;!isNaN(f.minAsNumber)&&a<f.minAsNumber?a=f.valueAsNumber*b<f.minAsNumber?f.minAsNumber:isNaN(f.maxAsNumber)?Number.MAX_VALUE:f.maxAsNumber:!isNaN(f.maxAsNumber)&&
a>f.maxAsNumber&&(a=f.valueAsNumber*b>f.maxAsNumber?f.maxAsNumber:isNaN(f.minAsNumber)?Number.MIN_VALUE:f.minAsNumber);return Math.round(a*1E7)/1E7};d.modules["forms-ext"].getNextStep=f;var k=function(a,b,d){if(!a.disabled&&!a.readOnly&&!c(d).hasClass("step-controls")&&(c.prop(a,"value",e[b].numberToString(f(a,c(d).hasClass("step-up")?1:-1,{type:b}))),c(a).unbind("blur.stepeventshim"),j(a,"input"),h.activeElement)){if(h.activeElement!==a)try{a.focus()}catch(k){}setTimeout(function(){if(h.activeElement!==
a)try{a.focus()}catch(b){}c(a).one("blur.stepeventshim",function(){j(a,"change")})},0)}};if(b.stepArrows){var s={set:function(){var a=d.data(this,"step-controls");if(a)a[this.disabled||this.readonly?"addClass":"removeClass"]("disabled-step-control")}};d.onNodeNamesPropertyModify("input","disabled",s);d.onNodeNamesPropertyModify("input","readonly",c.extend({},s))}var l={38:1,40:-1};d.addReady(function(h,s){b.stepArrows&&c("input",h).add(s.filter("input")).each(function(){var h=c.prop(this,"type");
if(e[h]&&e[h].asNumber&&b.stepArrows&&!(b.stepArrows!==!0&&!b.stepArrows[h]||a(h)||c(this).hasClass("has-step-controls"))){var s=this,n=c('<span class="step-controls" unselectable="on"><span class="step-up" /><span class="step-down" /></span>').insertAfter(this).bind("selectstart dragstart",function(){return!1}).bind("mousedown mousepress",function(a){k(s,h,a.target);return!1}).bind("mousepressstart mousepressend",function(a){c(a.target)[a.type=="mousepressstart"?"addClass":"removeClass"]("mousepress-ui")}),
m=c(this).addClass("has-step-controls").attr({readonly:this.readOnly,disabled:this.disabled,autocomplete:"off",role:"spinbutton"}).bind(c.browser.msie?"keydown":"keypress",function(a){if(!this.disabled&&!this.readOnly&&l[a.keyCode])return c.prop(this,"value",e[h].numberToString(f(this,l[a.keyCode],{type:h}))),j(this,"input"),!1});d.data(this,"step-controls",n);b.calculateWidth&&(o(m,n),n.css("marginTop",(m.outerHeight()-n.outerHeight())/2))}})})}})();d.addReady(function(a,e){c(h).bind("jquery-uiReady.initinputui input-widgetsReady.initinputui",
function(){(c.datepicker||c.fn.slider)&&b(a,e);c.datepicker&&c.fn.slider?c(h).unbind(".initinputui"):d.modules["input-widgets"].src||d.warn('jQuery UI Widget factory is already included, but not datepicker or slider. configure src of $.webshims.modules["input-widgets"].src')})})});
jQuery.webshims.ready("dom-support forms",function(c,d,m,h,j){d.propTypes.element=function(h){d.createPropDefault(h,"attr");if(!h.prop)h.prop={get:function(){var d=h.attr.get.call(this);d&&(d=c("#"+d)[0])&&h.propNodeName&&!c.nodeName(d,h.propNodeName)&&(d=null);return d||null},writeable:!1}};(function(){if(!Modernizr.datalist){var n=0,o={submit:1,button:1,reset:1,hidden:1,range:1,date:1},l=c.browser.msie&&parseInt(c.browser.version,10)<7,p={},t=function(b){if(!b)return[];if(p[b])return p[b];var a;
d.ready("json-storage",function(){try{a=JSON.parse(localStorage.getItem("storedDatalistOptions"+b))}catch(c){}p[b]=a||[]});return a||[]},q={_create:function(b){if(!o[(b.input.getAttribute("type")||"").toLowerCase()||b.input.type]){var a=b.datalist,d=c.data(b.input,"datalistWidget");if(a&&d&&d.datalist!==a)d.datalist=a,d.id=b.id,d._resetListCached();else if(a){if(!(d&&d.datalist===a)){n++;var f=this;this.timedHide=function(){clearTimeout(f.hideTimer);f.hideTimer=setTimeout(c.proxy(f,"hideList"),9)};
this.datalist=a;this.id=b.id;this.hasViewableData=!0;this._autocomplete=c.attr(b.input,"autocomplete");c.data(b.input,"datalistWidget",this);this.shadowList=c('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=b.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseover.datalistWidget mousedown.datalistWidget click.datalistWidget",function(a){var b=c("li:not(.hidden-item)",f.shadowList),d=a.type=="mousedown"||a.type=="click";f.markItem(b.index(a.target),d,b);a.type==
"click"&&f.hideList();return a.type!="mousedown"}).bind("focusout",this.timedHide);b.input.setAttribute("autocomplete","off");c(b.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",c.proxy(this,"showHideOptions")).bind("keydown.datalistWidget",function(a){var b=a.keyCode;if(b==40&&!f.showList())return f.markItem(f.index+1,!0),!1;if(f.isListVisible){if(b==38)return f.markItem(f.index-1,!0),!1;if(!a.shiftKey&&(b==33||b==36))return f.markItem(0,!0),!1;if(!a.shiftKey&&(b==34||b==35))return a=
c("li:not(.hidden-item)",f.shadowList),f.markItem(a.length-1,!0,a),!1;if(b==13||b==27)return b==13&&(a=c("li.active-item:not(.hidden-item)",f.shadowList),a[0]&&(c.prop(f.input,"value",a.attr("data-value")),c(f.input).triggerHandler("updateInput"))),f.hideList(),!1}}).bind("focus.datalistWidget",function(){c(this).hasClass("list-focus")&&f.showList()}).bind("blur.datalistWidget",this.timedHide);c(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",c.proxy(this,
"_resetListCached"));this._resetListCached();b.input.form&&b.input.id&&c(b.input.form).bind("submit.datalistWidget"+b.input.id,function(){var a=c.prop(b.input,"value");f.storedOptions=t(b.input.name||b.input.id);if(a&&f.storedOptions.indexOf(a)==-1){f.storedOptions.push(a);var a=b.input.name||b.input.id,d=f.storedOptions;if(a){d=d||[];try{localStorage.setItem("storedDatalistOptions"+a,JSON.stringify(d))}catch(k){}}}});c(m).bind("unload",function(){f.destroy()})}}else d&&d.destroy()}},destroy:function(){var b=
c.attr(this.input,"autocomplete");c(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();c(h).unbind(".datalist"+this.id);this.input.form&&this.input.id&&c(this.input.form).unbind("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");b===j?this.input.removeAttribute("autocomplete"):c(this.input).attr("autocomplete",b)},_resetListCached:function(b){var a=this;this.needsUpdate=!0;this.lastUpdatedValue=!1;this.lastUnfoundValue="";if(!this.updateTimer)this.updateTimer=
setTimeout(function(){a.updateListOptions(b&&h.activeElement==a.input);a=null},0)},updateListOptions:function(b){this.needsUpdate=!1;clearTimeout(this.updateTimer);this.updateTimer=!1;this.shadowList.css({fontSize:c.curCSS(this.input,"fontSize"),fontFamily:c.curCSS(this.input,"fontFamily")});for(var a=[],d=[],f=[],e,h=c("option",this.datalist),j=0,m=c("option",this.datalist).length;j<m;j++){e=h[j];if(e.disabled)return;e={value:c(e).val()||"",text:c.trim(c.attr(e,"label")||e.textContent||e.innerText||
c.text([e])||""),className:e.className||"",style:c.attr(e,"style")||""};if(!e.text)e.text=e.value;d[j]=e.value;f[j]=e}this.storedOptions=t(this.input.name||this.input.id);this.storedOptions.forEach(function(a){d.indexOf(a)==-1&&f.push({value:a,text:a,className:"",style:""})});f.forEach(function(b,c){var e=b.value.indexOf('"')!=-1?"'"+b.value+"'":'"'+b.value+'"';a[c]="<li data-value="+e+' class="'+b.className+'" style="'+b.style+'" tabindex="-1" role="listitem">'+b.text+"</li>"});this.arrayOptions=
f;this.shadowList.html('<ul role="list" class="'+(this.datalist.className||"")+" "+this.datalist.id+'-shadowdom">'+a.join("\n")+"</ul>");c.fn.bgIframe&&l&&this.shadowList.bgIframe();(b||this.isListVisible)&&this.showHideOptions()},showHideOptions:function(){var b=c.prop(this.input,"value").toLowerCase();if(!(b===this.lastUpdatedValue||this.lastUnfoundValue&&b.indexOf(this.lastUnfoundValue)===0)){this.lastUpdatedValue=b;var a=!1,d=c("li",this.shadowList);b?this.arrayOptions.forEach(function(f,e){if(!("lowerText"in
f))f.lowerText=f.text.toLowerCase(),f.lowerValue=f.value.toLowerCase();f.lowerText.indexOf(b)!==-1||f.lowerValue.indexOf(b)!==-1?(c(d[e]).removeClass("hidden-item"),a=!0):c(d[e]).addClass("hidden-item")}):(d.removeClass("hidden-item"),a=!0);(this.hasViewableData=a)?this.showList():(this.lastUnfoundValue=b,this.hideList())}},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions();this.showHideOptions();if(!this.hasViewableData)return!1;var b=this,a=c(this.input).offset();
a.top+=c(this.input).outerHeight();a.width=c(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);l&&(this.shadowList.css("height","auto"),this.shadowList.height()>250&&this.shadowList.css("height",220));this.shadowList.css(a).addClass("datalist-visible");this.isListVisible=!0;c(h).bind("mousedown.datalist"+this.id+" focusin.datalist"+this.id,function(a){a.target===b.input||b.shadowList[0]===a.target||c.contains(b.shadowList[0],
a.target)?(clearTimeout(b.hideTimer),setTimeout(function(){clearTimeout(b.hideTimer)},0)):b.timedHide()});return!0},hideList:function(){if(!this.isListVisible)return!1;this.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");this.index=-1;this.isListVisible=!1;c(this.input).removeAttr("aria-activedescendant");c(h).unbind(".datalist"+this.id);return!0},scrollIntoView:function(b){var a=c("> ul",this.shadowList),d=b.position();d.top-=
(parseInt(a.css("paddingTop"),10)||0)+(parseInt(a.css("marginTop"),10)||0)+(parseInt(a.css("borderTopWidth"),10)||0);d.top<0?this.shadowList.scrollTop(this.shadowList.scrollTop()+d.top-2):(d.top+=b.outerHeight(),b=this.shadowList.height(),d.top>b&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(d.top-b)+2))},markItem:function(b,a,d){d=d||c("li:not(.hidden-item)",this.shadowList);if(d.length)b<0?b=d.length-1:b>=d.length&&(b=0),d.removeClass("active-item"),this.shadowList.addClass("list-item-active"),
d=d.filter(":eq("+b+")").addClass("active-item"),a&&(c.prop(this.input,"value",d.attr("data-value")),c.attr(this.input,"aria-activedescendant",c.webshims.getID(d)),c(this.input).triggerHandler("updateInput"),this.scrollIntoView(d)),this.index=b}};(function(){d.defineNodeNameProperties("input",{list:{attr:{get:function(){var b=d.contentAttr(this,"list");return b==null?j:b},set:function(b){d.contentAttr(this,"list",b);d.objectCreate(q,j,{input:this,id:b,datalist:c.prop(this,"list")})}},initAttr:!0,
reflect:!0,propType:"element",propNodeName:"datalist"},selectedOption:{prop:{writeable:!1,get:function(){var b=c.prop(this,"list"),a=null,d;if(!b)return a;d=c.attr(this,"value");if(!d)return a;b=c.prop(b,"options");if(!b.length)return a;c.each(b,function(b,e){if(d==c.prop(e,"value"))return a=e,!1});return a}}},autocomplete:{attr:{get:function(){var b=c.data(this,"datalistWidget");return b?b._autocomplete:"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(b){var a=
c.data(this,"datalistWidget");a?(a._autocomplete=b,b=="off"&&a.hideList()):"autocomplete"in this?this.autocomplete=b:this.setAttribute("autocomplete",b)}}}});d.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var b=c("select",this);return b[0]?b[0].options:[]}}});d.addReady(function(b,a){a.filter("select, option").each(function(){var a=this.parentNode,b=c.nodeName(a,"datalist");if(a&&!b)a=a.parentNode,b=c.nodeName(a,"datalist");a&&b&&c(a).triggerHandler("updateDatalist")})})})()}})();
d.modules["forms-ext"].src=="form-datalist"?d.isReady("forms-ext",!0):setTimeout(function(){d.isReady("forms-ext")||(d.warn("setting forms-ext ready from datalist"),d.isReady("forms-ext",!0))},9999)});
