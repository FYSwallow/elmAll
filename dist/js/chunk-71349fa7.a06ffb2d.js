(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71349fa7"],{2841:function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"alert_container"},[r("section",{staticClass:"tip_text_container"},[t._m(0),r("p",{staticClass:"tip_text"},[t._v(t._s(t.alertText))]),r("button",{staticClass:"confrim",on:{click:t.closeTip}},[t._v("确认")])])])},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"tip_icon"},[r("span"),r("span")])}],a={data:function(){return{}},props:["alertText"],methods:{closeTip:function(){this.$emit("closeTip")}}},o=a,i=(r("4826"),r("2877")),c=Object(i["a"])(o,s,n,!1,null,"0d675f64",null);e["a"]=c.exports},"2e04":function(t,e,r){},4826:function(t,e,r){"use strict";var s=r("2e04"),n=r.n(s);n.a},"5e9b":function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("header",{staticClass:"head"},[t._t("logo"),t._t("search"),t.goBack?r("section",{on:{click:function(e){return t.$router.go(-1)}}},[r("span",{staticClass:"fa fa-angle-left"})]):t._e(),t.headTitle?r("section",{staticClass:"head_title"},[r("span",{staticClass:"ellipsis"},[t._v(t._s(t.headTitle))])]):t._e(),t._t("msite-title"),t.signinUp?r("router-link",{attrs:{to:t.userInfo?"/user":"/login",tag:"span"}},[t.userInfo?r("span",{staticClass:"fa fa-user-circle"}):r("span",[t._v("登录|注册")])]):t._e(),t._t("changecity"),t._t("edit")],2)},n=[],a=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),o=r("2f62");function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function c(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(r,!0).forEach((function(e){Object(a["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var u={props:["goBack","headTitle","signinUp"],computed:c({},Object(o["c"])(["userInfo"]))},l=u,p=(r("dcdb"),r("2877")),d=Object(p["a"])(l,s,n,!1,null,"48bbaa80",null);e["a"]=d.exports},7465:function(t,e,r){"use strict";var s=r("df4e"),n=r.n(s);n.a},"89d2":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("Header",{attrs:{headTitle:"密码登录",goBack:"true"}}),r("section",{staticClass:"login_detail"},[r("div",{staticClass:"login_form"},[r("div",{staticClass:"input_container"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneNumber,expression:"phoneNumber"}],attrs:{type:"text",placeholder:"账号",maxlength:"11"},domProps:{value:t.phoneNumber},on:{input:function(e){e.target.composing||(t.phoneNumber=e.target.value)}}})]),r("div",{staticClass:"input_container"},[t.showPassword?r("input",{directives:[{name:"model",rawName:"v-model",value:t.passWord,expression:"passWord"}],attrs:{type:"text",placeholder:"密码"},domProps:{value:t.passWord},on:{input:function(e){e.target.composing||(t.passWord=e.target.value)}}}):r("input",{directives:[{name:"model",rawName:"v-model",value:t.passWord,expression:"passWord"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:t.passWord},on:{input:function(e){e.target.composing||(t.passWord=e.target.value)}}}),r("div",{staticClass:"button_switch",class:{showPassword:t.showPassword}},[r("span",[t._v("abc...")]),r("div",{staticClass:"circle_switch",class:{choose_show:t.showPassword},on:{click:t.changePassWordType}})])]),r("div",{staticClass:"input_container captcha_code_container"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.codeNumber,expression:"codeNumber"}],attrs:{type:"text",placeholder:"验证码",maxlength:"4"},domProps:{value:t.codeNumber},on:{input:function(e){e.target.composing||(t.codeNumber=e.target.value)}}}),r("div",{staticClass:"img_change_img"},[r("img",{attrs:{src:t.captchaCodeImg}}),r("div",{staticClass:"change_img",on:{click:t.getCaptchaCode}},[r("p",[t._v("看不清")]),r("p",[t._v("换一张")])])])])])]),r("p",{staticClass:"login_tips"},[t._v("温馨提示: 为注册过的账号, 登录时将自动注册")]),r("p",{staticClass:"login_tips"},[t._v("注册过的用户可凭账号密码登陆")]),r("button",{staticClass:"login_button",on:{click:t.mobileLogin}},[t._v("登录")]),r("router-link",{staticClass:"to_forget",attrs:{to:"/forget"}},[t._v("重置密码?")]),t.showAlert?r("AlertTip",{attrs:{alertText:t.alertText},on:{closeTip:t.closeTip}}):t._e()],1)},n=[],a=(r("8e6e"),r("ac6a"),r("456d"),r("96cf"),r("3b8d")),o=r("bd86"),i=r("2f62"),c=r("5e9b"),u=r("2841"),l=r("365c");function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function d(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(r,!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var h={data:function(){return{phoneNumber:null,passWord:null,showPassword:!1,codeNumber:null,captchaCodeImg:null,showAlert:!1,alertText:null,userInfo:null}},mounted:function(){this.getCaptchaCode()},methods:d({},Object(i["b"])(["RECORD_USERINFO"]),{getCaptchaCode:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["g"])();case 2:e=t.sent,this.captchaCodeImg=e.data.code;case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),changePassWordType:function(){this.showPassword=!this.showPassword},mobileLogin:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.phoneNumber){t.next=6;break}return this.showAlert=!0,this.alertText="请输入手机号/邮箱/用户名",t.abrupt("return");case 6:if(this.passWord){t.next=12;break}return this.showAlert=!0,this.alertText="请输入密码",t.abrupt("return");case 12:if(this.codeNumber){t.next=16;break}return this.showAlert=!0,this.alertText="请输入验证码",t.abrupt("return");case 16:this.userInfo={phoneNumber:this.phoneNumber},this.RECORD_USERINFO(this.userInfo),this.$router.push("/user");case 19:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),closeTip:function(){this.showAlert=!1}}),components:{Header:c["a"],AlertTip:u["a"]}},f=h,m=(r("7465"),r("2877")),b=Object(m["a"])(f,s,n,!1,null,"d23a3122",null);e["default"]=b.exports},c9c9:function(t,e,r){},dcdb:function(t,e,r){"use strict";var s=r("c9c9"),n=r.n(s);n.a},df4e:function(t,e,r){}}]);
//# sourceMappingURL=chunk-71349fa7.a06ffb2d.js.map