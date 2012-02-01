jQuery.webshims.register("form-extend",function(b,c,e,i,r,k){var f=e.Modernizr,e=f.inputtypes;if(f.formvalidation){var o=c.inputTypes,p={};c.addInputType=function(b,a){o[b]=a};c.addValidityRule=function(b,a){p[b]=a};c.addValidityRule("typeMismatch",function(b,a,h,d){if(""===a)return!1;d=d.typeMismatch;if(!("type"in h))h.type=(b[0].getAttribute("type")||"").toLowerCase();o[h.type]&&o[h.type].mismatch&&(d=o[h.type].mismatch(a,b));return d});var n=k.overrideMessages,s=!f.requiredSelect||!e.number||!e.time||
!e.range||n,a="customError,typeMismatch,rangeUnderflow,rangeOverflow,stepMismatch,tooLong,patternMismatch,valueMissing,valid".split(","),k=n?["value","checked"]:["value"],d=n?["textarea"]:[],g=function(a,h){if(a){var d=(a.getAttribute&&a.getAttribute("type")||a.type||"").toLowerCase();if(n||!(f.requiredSelect||"select-one"!=d)||o[d])n&&!h&&"radio"==d&&a.name?b(i.getElementsByName(a.name)).each(function(){b.prop(this,"validity")}):b.prop(a,"validity")}},j={};["input","textarea","select"].forEach(function(a){var h=
c.defineNodeNameProperty(a,"setCustomValidity",{prop:{value:function(d){var d=d+"",l="input"==a?b(this).getNativeElement()[0]:this;h.prop._supvalue.call(l,d);c.bugs.validationMessage&&c.data(l,"customvalidationMessage",d);s&&(c.data(l,"hasCustomError",!!d),g(l))}}});j[a]=h.prop._supvalue});if(s||n)k.push("min"),k.push("max"),k.push("step"),d.push("input");if(!f.requiredSelect||n)k.push("required"),d.push("select");if(s){var m;d.forEach(function(h){var d=c.defineNodeNameProperty(h,"validity",{prop:{get:function(){if(!m){var l=
"input"==h?b(this).getNativeElement()[0]:this,g=d.prop._supget.call(l);if(!g)return g;var q={};a.forEach(function(b){q[b]=g[b]});if(!b.prop(l,"willValidate"))return q;m=!0;var e=b(l),f={type:(l.getAttribute&&l.getAttribute("type")||"").toLowerCase(),nodeName:(l.nodeName||"").toLowerCase()},i=e.val(),s=!!c.data(l,"hasCustomError"),k;m=!1;q.customError=s;if(q.valid&&q.customError)q.valid=!1;else if(!q.valid){var o=!0;b.each(q,function(b,a){if(a)return o=!1});if(o)q.valid=!0}b.each(p,function(b,a){q[b]=
a(e,i,f,q);if(q[b]&&(q.valid||!k))j[h].call(l,c.createValidationMessage(l,b)),q.valid=!1,k=!0});q.valid?(j[h].call(l,""),c.data(l,"hasCustomError",!1)):n&&!k&&!s&&b.each(q,function(b,a){if("valid"!==b&&a)return j[h].call(l,c.createValidationMessage(l,b)),!1});return q}},writeable:!1}})});k.forEach(function(b){c.onNodeNamesPropertyModify(d,b,function(){g(this)})});if(i.addEventListener){var h;i.addEventListener("change",function(b){clearTimeout(h);g(b.target)},!0);i.addEventListener("input",function(b){clearTimeout(h);
h=setTimeout(function(){g(b.target)},290)},!0)}var l=d.join(",");c.addReady(function(a,h){b(l,a).add(h.filter(l)).each(function(){b.prop(this,"validity")})});n&&c.ready("DOM form-message",function(){c.activeLang({register:"form-core",callback:function(){b("input, select, textarea").getNativeElement().each(function(){if(!c.data(this,"hasCustomError")){var a=this,h=b.prop(a,"validity")||{valid:!0},d;h.valid||(d=(a.nodeName||"").toLowerCase(),b.each(h,function(b,h){if("valid"!==b&&h)return j[d].call(a,
c.createValidationMessage(a,b)),!1}))}})}})})}c.defineNodeNameProperty("input","type",{prop:{get:function(){var b=(this.getAttribute("type")||"").toLowerCase();return c.inputTypes[b]?b:this.type}}});f.input.list&&!(b("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&c.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var a=this.options||[];if(!a.length){var h=b("select",this);if(h[0]&&h[0].options&&h[0].options.length)a=h[0].options}return a}}})}});
jQuery.webshims.gcEval=function(b,c){with(c&&c.form||window)with(c||window)return function(b){eval(b)}.call(c||window,b)};
(function(b){var c=window.Modernizr,e=b.webshims;e.capturingEventPrevented=function(c){if(!c._isPolyfilled){var f=c.isDefaultPrevented,e=c.preventDefault;c.preventDefault=function(){clearTimeout(b.data(c.target,c.type+"DefaultPrevented"));b.data(c.target,c.type+"DefaultPrevented",setTimeout(function(){b.removeData(c.target,c.type+"DefaultPrevented")},30));return e.apply(this,arguments)};c.isDefaultPrevented=function(){return!(!f.apply(this,arguments)&&!b.data(c.target,c.type+"DefaultPrevented"))};
c._isPolyfilled=!0}};if(c.formvalidation){var i=b('<form action="#" style="width: 1px; height: 1px; overflow: hidden;"><select /><input type="date" required name="a" /><input type="submit" /></form>');c.bugfreeformvalidation=c.requiredSelect=!!("required"in b("select",i)[0]);if(window.opera||b.browser.webkit||window.testGoodWithFix){var r=b("input",i).eq(0),k,f=function(f){var n=["form-extend","form-native-fix"];f&&(f.preventDefault(),f.stopImmediatePropagation());clearTimeout(k);setTimeout(function(){i&&
(i.remove(),i=r=null)},9);if(!c.bugfreeformvalidation||!c.requiredSelect)e.addPolyfill("form-native-fix",{f:"forms",d:["form-extend"]}),e.modules["form-extend"].test=b.noop;e.isReady("form-number-date-api")&&n.push("form-number-date-api");e.bugs.validationMessage&&n.push("form-message");e.reTest(n);if(b.browser.opera||window.testGoodWithFix)e.loader.loadList(["dom-extend"]),e.ready("dom-extend",function(){var f=function(b){b.preventDefault()};["form","input","textarea","select"].forEach(function(a){var d=
e.defineNodeNameProperty(a,"checkValidity",{prop:{value:function(){e.fromSubmit||b(this).bind("invalid.checkvalidity",f);e.fromCheckValidity=!0;var a=d.prop._supvalue.apply(this,arguments);e.fromSubmit||b(this).unbind("invalid.checkvalidity",f);e.fromCheckValidity=!1;return a}}})});c.input.list&&!(b("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&e.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var a=this.options||[];if(!a.length){var d=
b("select",this);if(d[0]&&d[0].options&&d[0].options.length)a=d[0].options}return a}}})})};i.appendTo("head");if(window.opera||window.testGoodWithFix){e.bugs.validationMessage=!r.prop("validationMessage");if((c.inputtypes||{}).date){try{r.prop("valueAsNumber",0)}catch(o){}e.bugs.valueAsNumberSet="1970-01-01"!=r.prop("value")}r.prop("value","")}i.bind("submit",function(b){c.bugfreeformvalidation=!1;f(b)});k=setTimeout(function(){i&&i.triggerHandler("submit")},9);e.capturingEvents(["input"]);e.capturingEvents(["invalid"],
!0);b("input, select",i).bind("invalid",f).filter('[type="submit"]').bind("click",function(b){b.stopImmediatePropagation()}).trigger("click")}else e.capturingEvents(["input"]),e.capturingEvents(["invalid"],!0)}})(jQuery);
jQuery.webshims.register("form-core",function(b,c,e,i,r,k){var f={radio:1},o={checkbox:1,radio:1},p=b([]),n=function(a){var a=b(a),d=a[0].name;return f[a[0].type]&&d?b(a[0].form&&a[0].form[d]||i.getElementsByName(d)).not(a[0]):p},s=c.getContentValidationMessage=function(a,d){var g=a.getAttribute("x-moz-errormessage")||a.getAttribute("data-errormessage")||"";if(g&&-1!=g.indexOf("{")){try{g=jQuery.parseJSON(g)}catch(m){return g}"object"==typeof g&&(d=d||b.prop(a,"validity")||{valid:1},d.valid||b.each(d,
function(b,a){if(a&&"valid"!=b&&g[b])return g=g[b],!1}));c.data(a,"contentErrorMessage",g);if("object"==typeof g)g=g.defaultMessage}return g||""},a={number:1,range:1,date:1,time:1,"datetime-local":1,datetime:1,month:1,week:1};b.extend(b.expr.filters,{"valid-element":function(a){return!(!b.prop(a,"willValidate")||!(b.prop(a,"validity")||{valid:1}).valid)},"invalid-element":function(a){return!(!b.prop(a,"willValidate")||(b.prop(a,"validity")||{valid:1}).valid)},"required-element":function(a){return!(!b.prop(a,
"willValidate")||!b.prop(a,"required"))},"optional-element":function(a){return!!(b.prop(a,"willValidate")&&!1===b.prop(a,"required"))},"in-range":function(h){if(!a[b.prop(h,"type")]||!b.prop(h,"willValidate"))return!1;h=b.prop(h,"validity");return!(!h||h.rangeOverflow||h.rangeUnderflow)},"out-of-range":function(h){if(!a[b.prop(h,"type")]||!b.prop(h,"willValidate"))return!1;h=b.prop(h,"validity");return!(!h||!h.rangeOverflow&&!h.rangeUnderflow)}});["valid","invalid","required","optional"].forEach(function(a){b.expr.filters[a]=
b.expr.filters[a+"-element"]});var d=b.event.customEvent||{},g=b.prop,j={selectedIndex:1,value:1,checked:1,disabled:1,readonly:1};b.prop=function(a,d,c){var m=g.apply(this,arguments);if(a&&"form"in a&&j[d]&&c!==r&&b(a).hasClass("form-ui-invalid")&&(b.prop(a,"validity")||{valid:1}).valid)b(a).getShadowElement().removeClass("form-ui-invalid"),"checked"==d&&c&&n(a).removeClass("form-ui-invalid").removeAttr("aria-invalid");return m};var m=function(a,d){var c;b.each(a,function(a,h){if(h)return c="customError"==
a?b.prop(d,"validationMessage"):a,!1});return c};b(i).bind("focusout change refreshvalidityui",function(a){if(a.target&&"submit"!=a.target.type&&b.prop(a.target,"willValidate")){var d=b.data(a.target,"webshimsswitchvalidityclass");d&&clearTimeout(d);b.data(a.target,"webshimsswitchvalidityclass",setTimeout(function(){var d=b(a.target).getNativeElement()[0],c=b.prop(d,"validity"),g=b(d).getShadowElement(),l,j,f,e;c.valid?g.hasClass("form-ui-valid")||(l="form-ui-valid",j="form-ui-invalid",e="changedvaliditystate",
f="changedvalid",o[d.type]&&d.checked&&n(d).removeClass(j).addClass(l).removeAttr("aria-invalid"),b.removeData(d,"webshimsinvalidcause")):(c=m(c,d),b.data(d,"webshimsinvalidcause")!=c&&(b.data(d,"webshimsinvalidcause",c),e="changedvaliditystate"),g.hasClass("form-ui-invalid")||(l="form-ui-invalid",j="form-ui-valid",o[d.type]&&!d.checked&&n(d).removeClass(j).addClass(l),f="changedinvalid"));l&&(g.addClass(l).removeClass(j),setTimeout(function(){b(d).trigger(f)},0));e&&setTimeout(function(){b(d).trigger(e)},
0);b.removeData(a.target,"webshimsswitchvalidityclass")},9))}});d.changedvaliditystate=!0;d.changedvalid=!0;d.changedinvalid=!0;d.refreshvalidityui=!0;c.triggerInlineForm=function(a,d){a.jquery&&(a=a[0]);var g="on"+d,m=a[g]||a.getAttribute(g)||"",j,f,d=b.Event({type:d,target:a,currentTarget:a});m&&(c.warn(g+" used. we will drop inline event handler support, with next release. use event binding: $.bind instead"),"string"==typeof m&&(f=c.gcEval(m,a),a[g]&&(j=!0,a[g]=!1)));!1===f&&(d.stopPropagation(),
d.preventDefault());b(a).trigger(d);j&&(a[g]=m);return f};d=function(){c.scrollRoot=b.browser.webkit||"BackCompat"==i.compatMode?b(i.body):b(i.documentElement)};d();c.ready("DOM",d);c.getRelOffset=function(a,d){var a=b(a),c=b(d).offset(),g;b.swap(b(a)[0],{visibility:"hidden",display:"inline-block",left:0,top:0},function(){g=a.offset()});c.top-=g.top;c.left-=g.left;return c};c.validityAlert=function(){var a=!b.browser.msie||7<parseInt(b.browser.version,10)?"span":"label",d,g=!1,m=!1,j,f={hideDelay:5E3,
showFor:function(a,c,h,i){f._create();var a=b(a),p=b(a).getShadowElement(),k=f.getOffsetFromBody(p);f.clear();i?this.hide():(this.getMessage(a,c),this.position(p,k),d.css({fontSize:a.css("fontSize"),fontFamily:a.css("fontFamily")}),this.show(),this.hideDelay&&(g=setTimeout(j,this.hideDelay)),b(e).bind("resize.validityalert orientationchange.validityalert emchange.validityalert",function(){clearTimeout(m);m=setTimeout(function(){f.position(p)},9)}));h||this.setFocus(p,k)},getOffsetFromBody:function(a){return c.getRelOffset(d,
a)},setFocus:function(g,m){var f=b(g).getShadowFocusElement(),e=c.scrollRoot.scrollTop(),p=(m||f.offset()).top-30,k;c.getID&&"label"==a&&d.attr("for",c.getID(f));e>p&&(c.scrollRoot.animate({scrollTop:p-5},{queue:!1,duration:Math.max(Math.min(600,1.5*(e-p)),80)}),k=!0);try{f[0].focus()}catch(n){}k&&(c.scrollRoot.scrollTop(e),setTimeout(function(){c.scrollRoot.scrollTop(e)},0));setTimeout(function(){b(i).bind("focusout.validityalert",j)},10)},getMessage:function(a,c){b("span.va-box",d).text(c||s(a[0])||
a.prop("validationMessage"))},position:function(a,c){c=c?b.extend({},c):f.getOffsetFromBody(a);c.top+=a.outerHeight();d.css(c)},show:function(){"none"===d.css("display")&&d.css({opacity:0}).show();d.addClass("va-visible").fadeTo(400,1)},hide:function(){d.removeClass("va-visible").fadeOut()},clear:function(){clearTimeout(!1);clearTimeout(g);b(i).unbind(".validityalert");b(e).unbind(".validityalert");d.stop().removeAttr("for")},_create:function(){if(!d)d=f.errorBubble=b("<"+a+' class="validity-alert-wrapper" role="alert"><span  class="validity-alert"><span class="va-arrow"><span class="va-arrow-box"></span></span><span class="va-box"></span></span></'+
a+">").css({position:"absolute",display:"none"}),c.ready("DOM",function(){d.appendTo("body");b.fn.bgIframe&&b.browser.msie&&7>parseInt(b.browser.version,10)&&d.bgIframe()})}};j=b.proxy(f,"hide");return f}();(function(){var a,d=[],c;b(i).bind("invalid",function(g){if(!g.wrongWebkitInvalid){var m=b(g.target),f=m.getShadowElement();f.hasClass("form-ui-invalid")||(f.addClass("form-ui-invalid").removeClass("form-ui-valid"),setTimeout(function(){b(g.target).trigger("changedinvalid").trigger("changedvaliditystate")},
0));if(!a)a=b.Event("firstinvalid"),a.isInvalidUIPrevented=g.isDefaultPrevented,f=b.Event("firstinvalidsystem"),b(i).triggerHandler(f,{element:g.target,form:g.target.form,isInvalidUIPrevented:g.isDefaultPrevented}),m.trigger(a);a&&a.isDefaultPrevented()&&g.preventDefault();d.push(g.target);g.extraData="fix";clearTimeout(c);c=setTimeout(function(){var c={type:"lastinvalid",cancelable:!1,invalidlist:b(d)};a=!1;d=[];b(g.target).trigger(c,c)},9);f=m=null}})})();k.replaceValidationUI&&c.ready("DOM",function(){b(i).bind("firstinvalid",
function(a){a.isInvalidUIPrevented()||(a.preventDefault(),b.webshims.validityAlert.showFor(a.target,b(a.target).prop("customValidationMessage")))})})});
jQuery.webshims.register("form-message",function(b,c,e,i,r,k){var f=c.validityMessages,e=k.overrideMessages||k.customMessages?["customValidationMessage"]:[];f.en=f.en||f["en-US"]||{typeMismatch:{email:"Please enter an email address.",url:"Please enter a URL.",number:"Please enter a number.",date:"Please enter a date.",time:"Please enter a time.",range:"Invalid input.","datetime-local":"Please enter a datetime."},rangeUnderflow:{defaultMessage:"Value must be greater than or equal to {%min}."},rangeOverflow:{defaultMessage:"Value must be less than or equal to {%max}."},
stepMismatch:"Invalid input.",tooLong:"Please enter at most {%maxlength} character(s). You entered {%valueLen}.",patternMismatch:"Invalid input. {%title}",valueMissing:{defaultMessage:"Please fill out this field.",checkbox:"Please check this box if you want to proceed."}};["select","radio"].forEach(function(b){f.en.valueMissing[b]="Please select an option."});["date","time","datetime-local"].forEach(function(b){f.en.rangeUnderflow[b]="Value must be at or after {%min}."});["date","time","datetime-local"].forEach(function(b){f.en.rangeOverflow[b]=
"Value must be at or before {%max}."});f["en-US"]=f["en-US"]||f.en;f[""]=f[""]||f["en-US"];f.de=f.de||{typeMismatch:{email:"{%value} ist keine zul\u00e4ssige E-Mail-Adresse",url:"{%value} ist keine zul\u00e4ssige Webadresse",number:"{%value} ist keine Nummer!",date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:{defaultMessage:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen."},
rangeOverflow:{defaultMessage:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen."},stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}",tooLong:"Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.",patternMismatch:"{%value} hat f\u00fcr dieses Eingabefeld ein falsches Format! {%title}",valueMissing:{defaultMessage:"Bitte geben Sie einen Wert ein",
checkbox:"Bitte aktivieren Sie das K\u00e4stchen"}};["select","radio"].forEach(function(b){f.de.valueMissing[b]="Bitte w\u00e4hlen Sie eine Option aus"});["date","time","datetime-local"].forEach(function(b){f.de.rangeUnderflow[b]="{%value} ist zu fr\u00fch. {%min} ist die fr\u00fcheste Zeit, die Sie benutzen k\u00f6nnen."});["date","time","datetime-local"].forEach(function(b){f.de.rangeOverflow[b]="{%value} ist zu sp\u00e4t. {%max} ist die sp\u00e4teste Zeit, die Sie benutzen k\u00f6nnen."});var o=
f[""];c.createValidationMessage=function(c,f){var e=o[f];e&&"string"!==typeof e&&(e=e[b.prop(c,"type")]||e[(c.nodeName||"").toLowerCase()]||e.defaultMessage);e&&"value,min,max,title,maxlength,label".split(",").forEach(function(a){if(-1!==e.indexOf("{%"+a)){var d=("label"==a?b.trim(b('label[for="'+c.id+'"]',c.form).text()).replace(/\*$|:$/,""):b.attr(c,a))||"";e=e.replace("{%"+a+"}",d);"value"==a&&(e=e.replace("{%valueLen}",d.length))}});return e||""};(c.bugs.validationMessage||!Modernizr.formvalidation)&&
e.push("validationMessage");c.activeLang({langObj:f,module:"form-core",callback:function(b){o=b}});Modernizr.input.list&&!(b("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&c.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var c=this.options||[];if(!c.length){var f=b("select",this);if(f[0]&&f[0].options&&f[0].options.length)c=f[0].options}return c}}});e.forEach(function(f){c.defineNodeNamesProperty(["fieldset","output","button"],
f,{prop:{value:"",writeable:!1}});["input","select","textarea"].forEach(function(e){var i=c.defineNodeNameProperty(e,f,{prop:{get:function(){var a=this,d="";if(!b.prop(a,"willValidate"))return d;var g=b.prop(a,"validity")||{valid:1};if(g.valid||(d=c.getContentValidationMessage(a,g)))return d;if(g.customError&&a.nodeName&&(d=Modernizr.formvalidation&&i.prop._supget?i.prop._supget.call(a):c.data(a,"customvalidationMessage")))return d;b.each(g,function(b,g){if("valid"!=b&&g&&(d=c.createValidationMessage(a,
b)))return!1});return d||""},writeable:!1}})})})});
jQuery.webshims.register("form-datalist",function(b,c,e,i,r){c.propTypes.element=function(e){c.createPropDefault(e,"attr");if(!e.prop)e.prop={get:function(){var c=e.attr.get.call(this);c&&(c=b("#"+c)[0])&&e.propNodeName&&!b.nodeName(c,e.propNodeName)&&(c=null);return c||null},writeable:!1}};(function(){if(!Modernizr.input.list){var k=0,f={submit:1,button:1,reset:1,hidden:1,range:1,date:1},o=b.browser.msie&&7>parseInt(b.browser.version,10),p={},n=function(a){if(!a)return[];if(p[a])return p[a];var b;
try{b=JSON.parse(localStorage.getItem("storedDatalistOptions"+a))}catch(c){}p[a]=b||[];return b||[]},s={_create:function(a){if(!f[b.prop(a.input,"type")]){var d=a.datalist,c=b.data(a.input,"datalistWidget");if(d&&c&&c.datalist!==d)c.datalist=d,c.id=a.id,c._resetListCached();else if(d){if(!(c&&c.datalist===d)){k++;var j=this;this.hideList=b.proxy(j,"hideList");this.timedHide=function(){clearTimeout(j.hideTimer);j.hideTimer=setTimeout(j.hideList,9)};this.datalist=d;this.id=a.id;this.hasViewableData=
!0;this._autocomplete=b.attr(a.input,"autocomplete");b.data(a.input,"datalistWidget",this);this.shadowList=b('<div class="datalist-polyfill" />').appendTo("body");this.index=-1;this.input=a.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget",function(a){var d=b("li:not(.hidden-item)",j.shadowList),c="mousedown"==a.type||"click"==a.type;j.markItem(d.index(a.currentTarget),c,d);"click"==a.type&&j.hideList();return"mousedown"!=
a.type}).bind("focusout",this.timedHide);a.input.setAttribute("autocomplete","off");b(a.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",function(){if(!j.triggeredByDatalist)j.changedValue=!1,j.showHideOptions()}).bind("keydown.datalistWidget",function(a){var d=a.keyCode;if(40==d&&!j.showList())return j.markItem(j.index+1,!0),!1;if(j.isListVisible){if(38==d)return j.markItem(j.index-1,!0),!1;if(!a.shiftKey&&(33==d||36==d))return j.markItem(0,!0),!1;if(!a.shiftKey&&(34==d||35==d))return a=
b("li:not(.hidden-item)",j.shadowList),j.markItem(a.length-1,!0,a),!1;if(13==d||27==d)return 13==d&&j.changeValue(b("li.active-item:not(.hidden-item)",j.shadowList)),j.hideList(),!1}}).bind("focus.datalistWidget",function(){b(this).hasClass("list-focus")&&j.showList()}).bind("mousedown.datalistWidget",function(){(this==i.activeElement||b(this).is(":focus"))&&j.showList()}).bind("blur.datalistWidget",this.timedHide);b(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",
b.proxy(this,"_resetListCached"));this._resetListCached();a.input.form&&a.input.id&&b(a.input.form).bind("submit.datalistWidget"+a.input.id,function(){var d=b.prop(a.input,"value"),c=(a.input.name||a.input.id)+b.prop(a.input,"type");if(!j.storedOptions)j.storedOptions=n(c);if(d&&-1==j.storedOptions.indexOf(d)&&(j.storedOptions.push(d),d=j.storedOptions,c)){d=d||[];try{localStorage.setItem("storedDatalistOptions"+c,JSON.stringify(d))}catch(g){}}});b(e).bind("unload",function(){j.destroy()})}}else c&&
c.destroy()}},destroy:function(){var a=b.attr(this.input,"autocomplete");b(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();b(i).unbind(".datalist"+this.id);this.input.form&&this.input.id&&b(this.input.form).unbind("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");a===r?this.input.removeAttribute("autocomplete"):b(this.input).attr("autocomplete",a)},_resetListCached:function(a){var b=this,g;this.needsUpdate=!0;this.lastUpdatedValue=
!1;this.lastUnfoundValue="";this.updateTimer||(e.QUnit||(g=a&&i.activeElement==b.input)?b.updateListOptions(g):c.ready("WINDOWLOAD",function(){b.updateTimer=setTimeout(function(){b.updateListOptions();b=null;k=1},200+100*k)}))},updateListOptions:function(a){this.needsUpdate=!1;clearTimeout(this.updateTimer);this.updateTimer=!1;this.shadowList.css({fontSize:b.curCSS(this.input,"fontSize"),fontFamily:b.curCSS(this.input,"fontFamily")});var d=[],c=[],f=[],e,h,i,k;for(h=b.prop(this.datalist,"options"),
i=0,k=h.length;i<k;i++){e=h[i];if(e.disabled)return;e={value:b(e).val()||"",text:b.trim(b.attr(e,"label")||e.textContent||e.innerText||b.text([e])||""),className:e.className||"",style:b.attr(e,"style")||""};e.text?e.text!=e.value&&(e.className+=" different-label-value"):e.text=e.value;c[i]=e.value;f[i]=e}if(!this.storedOptions)this.storedOptions=n((this.input.name||this.input.id)+b.prop(this.input,"type"));this.storedOptions.forEach(function(a){-1==c.indexOf(a)&&f.push({value:a,text:a,className:"stored-suggest",
style:""})});for(i=0,k=f.length;i<k;i++)h=f[i],d[i]='<li class="'+h.className+'" style="'+h.style+'" tabindex="-1" role="listitem"><span class="option-label">'+h.text+'</span> <span class="option-value">'+h.value+"</span></li>";this.arrayOptions=f;this.shadowList.html('<ul role="list" class="'+(this.datalist.className||"")+" "+this.datalist.id+'-shadowdom">'+d.join("\n")+"</ul>");b.fn.bgIframe&&o&&this.shadowList.bgIframe();(a||this.isListVisible)&&this.showHideOptions()},showHideOptions:function(a){var d=
b.prop(this.input,"value").toLowerCase();if(!(d===this.lastUpdatedValue||this.lastUnfoundValue&&0===d.indexOf(this.lastUnfoundValue))){this.lastUpdatedValue=d;var c=!1,e=b("li",this.shadowList);d?this.arrayOptions.forEach(function(a,f){if(!("lowerText"in a))a.lowerText=a.text!=a.value?a.text.toLowerCase()+a.value.toLowerCase():a.text.toLowerCase();-1!==a.lowerText.indexOf(d)?(b(e[f]).removeClass("hidden-item"),c=!0):b(e[f]).addClass("hidden-item")}):e.length&&(e.removeClass("hidden-item"),c=!0);this.hasViewableData=
c;!a&&c&&this.showList();if(!c)this.lastUnfoundValue=d,this.hideList()}},setPos:function(){var a=c.getRelOffset(this.shadowList,this.input);a.top+=b(this.input).outerHeight();a.width=b(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);this.shadowList.css(a);return a},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions();this.showHideOptions(!0);if(!this.hasViewableData)return!1;
this.isListVisible=!0;var a=this,d;a.setPos();o&&(a.shadowList.css("height","auto"),250<a.shadowList.height()&&a.shadowList.css("height",220));a.shadowList.addClass("datalist-visible");b(i).unbind(".datalist"+a.id).bind("mousedown.datalist"+a.id+" focusin.datalist"+a.id,function(d){d.target===a.input||a.shadowList[0]===d.target||b.contains(a.shadowList[0],d.target)?(clearTimeout(a.hideTimer),setTimeout(function(){clearTimeout(a.hideTimer)},9)):a.timedHide()});b(e).unbind(".datalist"+a.id).bind("resize.datalist"+
a.id+"orientationchange.datalist "+a.id+" emchange.datalist"+a.id,function(){clearTimeout(d);d=setTimeout(function(){a.setPos()},9)});clearTimeout(d);return!0},hideList:function(){if(!this.isListVisible)return!1;var a=this,d=function(){a.changedValue&&b(a.input).trigger("change");a.changedValue=!1};a.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");a.index=-1;a.isListVisible=!1;if(a.changedValue){a.triggeredByDatalist=!0;c.triggerInlineForm&&
c.triggerInlineForm(a.input,"input");if(a.input==i.activeElement||b(a.input).is(":focus"))b(a.input).one("blur",d);else d();a.triggeredByDatalist=!1}b(i).unbind(".datalist"+a.id);b(e).unbind(".datalist"+a.id);return!0},scrollIntoView:function(a){var d=b("> ul",this.shadowList),c=a.position();c.top-=(parseInt(d.css("paddingTop"),10)||0)+(parseInt(d.css("marginTop"),10)||0)+(parseInt(d.css("borderTopWidth"),10)||0);0>c.top?this.shadowList.scrollTop(this.shadowList.scrollTop()+c.top-2):(c.top+=a.outerHeight(),
a=this.shadowList.height(),c.top>a&&this.shadowList.scrollTop(this.shadowList.scrollTop()+(c.top-a)+2))},changeValue:function(a){if(a[0]){var a=b("span.option-value",a).text(),c=b.prop(this.input,"value");if(a!=c)b(this.input).prop("value",a).triggerHandler("updateInput"),this.changedValue=!0}},markItem:function(a,c,e){e=e||b("li:not(.hidden-item)",this.shadowList);if(e.length)0>a?a=e.length-1:a>=e.length&&(a=0),e.removeClass("active-item"),this.shadowList.addClass("list-item-active"),e=e.filter(":eq("+
a+")").addClass("active-item"),c&&(this.changeValue(e),this.scrollIntoView(e)),this.index=a}};(function(){c.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var a=b("select",this);a[0]?a=a[0].options:(a=b("option",this).get(),a.length&&c.warn("you should wrap you option-elements for a datalist in a select element to support IE and other old browsers."));return a}}});c.defineNodeNameProperties("input",{selectedOption:{prop:{writeable:!1,get:function(){var a=b.prop(this,
"list"),c=null,e;if(!a)return c;e=b.attr(this,"value");if(!e)return c;a=b.prop(a,"options");if(!a.length)return c;b.each(a,function(a,f){if(e==b.prop(f,"value"))return c=f,!1});return c}}},autocomplete:{attr:{get:function(){var a=b.data(this,"datalistWidget");return a?a._autocomplete:"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(a){var c=b.data(this,"datalistWidget");c?(c._autocomplete=a,"off"==a&&c.hideList()):"autocomplete"in this?this.autocomplete=a:this.setAttribute("autocomplete",
a)}}},list:{attr:{get:function(){var a=c.contentAttr(this,"list");return null==a?r:a},set:function(a){c.contentAttr(this,"list",a);c.objectCreate(s,r,{input:this,id:a,datalist:b.prop(this,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"}});if(b.event.customEvent)b.event.customEvent.updateDatalist=!0,b.event.customEvent.updateInput=!0;c.addReady(function(a,b){b.filter("datalist > select, datalist").closest("datalist").triggerHandler("updateDatalist")})})()}})()});