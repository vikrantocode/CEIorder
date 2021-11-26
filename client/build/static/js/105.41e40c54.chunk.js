(this["webpackJsonpgogo-react"]=this["webpackJsonpgogo-react"]||[]).push([[105],{105:function(e,t,n){"use strict";var o=n(9),r=n(13),a=n(5),i=n.n(a),c=n(23),s=n.n(c),l=n(87),u=n.n(l),f=n(88),d={tag:f.tagPropType,inverse:s.a.bool,color:s.a.string,body:s.a.bool,outline:s.a.bool,className:s.a.string,cssModule:s.a.object,innerRef:s.a.oneOfType([s.a.object,s.a.string,s.a.func])},p=function(e){var t=e.className,n=e.cssModule,a=e.color,c=e.body,s=e.inverse,l=e.outline,d=e.tag,p=e.innerRef,g=Object(r.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),y=Object(f.mapToCssModules)(u()(t,"card",!!s&&"text-white",!!c&&"card-body",!!a&&(l?"border":"bg")+"-"+a),n);return i.a.createElement(d,Object(o.a)({},g,{className:y,ref:p}))};p.propTypes=d,p.defaultProps={tag:"div"},t.a=p},117:function(e,t,n){"use strict";var o=n(9),r=n(13),a=n(5),i=n.n(a),c=n(23),s=n.n(c),l=n(87),u=n.n(l),f=n(88),d={tag:f.tagPropType,className:s.a.string,cssModule:s.a.object},p=function(e){var t=e.className,n=e.cssModule,a=e.tag,c=Object(r.a)(e,["className","cssModule","tag"]),s=Object(f.mapToCssModules)(u()(t,"card-title"),n);return i.a.createElement(a,Object(o.a)({},c,{className:s}))};p.propTypes=d,p.defaultProps={tag:"div"},t.a=p},230:function(e,t,n){"use strict";var o=n(9),r=n(13),a=n(100),i=n(15),c=n(5),s=n.n(c),l=n(23),u=n.n(l),f=n(87),d=n.n(f),p=n(88),g={active:u.a.bool,"aria-label":u.a.string,block:u.a.bool,color:u.a.string,disabled:u.a.bool,outline:u.a.bool,tag:p.tagPropType,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),onClick:u.a.func,size:u.a.string,children:u.a.node,className:u.a.string,cssModule:u.a.object,close:u.a.bool},y=function(e){function t(t){var n;return(n=e.call(this,t)||this).onClick=n.onClick.bind(Object(a.a)(n)),n}Object(i.a)(t,e);var n=t.prototype;return n.onClick=function(e){this.props.disabled?e.preventDefault():this.props.onClick&&this.props.onClick(e)},n.render=function(){var e=this.props,t=e.active,n=e["aria-label"],a=e.block,i=e.className,c=e.close,l=e.cssModule,u=e.color,f=e.outline,g=e.size,y=e.tag,b=e.innerRef,m=Object(r.a)(e,["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"]);c&&"undefined"===typeof m.children&&(m.children=s.a.createElement("span",{"aria-hidden":!0},"\xd7"));var h="btn"+(f?"-outline":"")+"-"+u,v=Object(p.mapToCssModules)(d()(i,{close:c},c||"btn",c||h,!!g&&"btn-"+g,!!a&&"btn-block",{active:t,disabled:this.props.disabled}),l);m.href&&"button"===y&&(y="a");var j=c?"Close":null;return s.a.createElement(y,Object(o.a)({type:"button"===y&&m.onClick?"button":void 0},m,{className:v,ref:b,onClick:this.onClick,"aria-label":n||j}))},t}(s.a.Component);y.propTypes=g,y.defaultProps={color:"secondary",tag:"button"},t.a=y},254:function(e,t,n){"use strict";var o=n(9),r=n(13),a=n(5),i=n.n(a),c=n(23),s=n.n(c),l=n(87),u=n.n(l),f=n(88),d=s.a.oneOfType([s.a.number,s.a.string]),p=s.a.oneOfType([s.a.bool,s.a.number,s.a.string,s.a.shape({size:s.a.oneOfType([s.a.bool,s.a.number,s.a.string]),order:d,offset:d})]),g={tag:f.tagPropType,xs:p,sm:p,md:p,lg:p,xl:p,className:s.a.string,cssModule:s.a.object,widths:s.a.array},y={tag:"div",widths:["xs","sm","md","lg","xl"]},b=function(e,t,n){return!0===n||""===n?e?"col":"col-"+t:"auto"===n?e?"col-auto":"col-"+t+"-auto":e?"col-"+n:"col-"+t+"-"+n},m=function(e){var t=e.className,n=e.cssModule,a=e.widths,c=e.tag,s=Object(r.a)(e,["className","cssModule","widths","tag"]),l=[];a.forEach((function(t,o){var r=e[t];if(delete s[t],r||""===r){var a=!o;if(Object(f.isObject)(r)){var i,c=a?"-":"-"+t+"-",d=b(a,t,r.size);l.push(Object(f.mapToCssModules)(u()(((i={})[d]=r.size||""===r.size,i["order"+c+r.order]=r.order||0===r.order,i["offset"+c+r.offset]=r.offset||0===r.offset,i)),n))}else{var p=b(a,t,r);l.push(p)}}})),l.length||l.push("col");var d=Object(f.mapToCssModules)(u()(t,l),n);return i.a.createElement(c,Object(o.a)({},s,{className:d}))};m.propTypes=g,m.defaultProps=y,t.a=m},255:function(e,t,n){"use strict";var o=n(9),r=n(13),a=n(5),i=n.n(a),c=n(23),s=n.n(c),l=n(87),u=n.n(l),f=n(88),d=s.a.oneOfType([s.a.number,s.a.string]),p={tag:f.tagPropType,noGutters:s.a.bool,className:s.a.string,cssModule:s.a.object,form:s.a.bool,xs:d,sm:d,md:d,lg:d,xl:d},g={tag:"div",widths:["xs","sm","md","lg","xl"]},y=function(e){var t=e.className,n=e.cssModule,a=e.noGutters,c=e.tag,s=e.form,l=e.widths,d=Object(r.a)(e,["className","cssModule","noGutters","tag","form","widths"]),p=[];l.forEach((function(t,n){var o=e[t];if(delete d[t],o){var r=!n;p.push(r?"row-cols-"+o:"row-cols-"+t+"-"+o)}}));var g=Object(f.mapToCssModules)(u()(t,a?"no-gutters":null,s?"form-row":"row",p),n);return i.a.createElement(c,Object(o.a)({},d,{className:g}))};y.propTypes=p,y.defaultProps=g,t.a=y},333:function(e,t,n){"use strict";var o=n(5),r=n(249),a=n(145),i=n(248),c=n.n(i),s=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),l=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]])}return n},u=function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var o=Array(e),r=0;for(t=0;t<n;t++)for(var a=arguments[t],i=0,c=a.length;i<c;i++,r++)o[r]=a[i];return o},f=c.a||i,d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s(t,e),t.prototype.shouldComponentUpdate=function(e){var t=this.props,n=t.values,o=l(t,["values"]),r=e.values,a=l(e,["values"]);return!f(r,n)||!f(o,a)},t.prototype.render=function(){var e=this;return o.createElement(r.a.Consumer,null,(function(t){Object(a.g)(t);var n=t.formatMessage,r=t.textComponent,i=void 0===r?o.Fragment:r,c=e.props,s=c.id,l=c.description,f=c.defaultMessage,d=c.values,p=c.children,g=c.tagName,y=void 0===g?i:g,b=n({id:s,description:l,defaultMessage:f},d);return Array.isArray(b)||(b=[b]),"function"===typeof p?p(b):y?o.createElement.apply(o,u([y,null],b)):b}))},t.displayName="FormattedMessage",t}(o.Component);t.a=d},850:function(e,t,n){"undefined"!=typeof self&&self,e.exports=function(e){return o={},t.m=n=[function(t){t.exports=e},function(e,t,n){e.exports=n(2)()},function(e,t,n){"use strict";function o(){}function r(){}var a=n(3);r.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,r,i){if(i!==a){var c=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}var n={array:e.isRequired=e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:r,resetWarningCache:o};return n.PropTypes=n}},function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(o=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw a}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(o=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw a}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(o=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw a}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],o=!0,r=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(o=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw a}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){null!=t&&t<=e.length||(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function f(e,t,n,o,r,a){var i=e.getElementsByTagName(t)[0],c=i,s=i;(s=e.createElement(t)).id=n,s.src=o,c&&c.parentNode?c.parentNode.insertBefore(s,c):e.head.appendChild(s),s.onerror=a,s.onload=r}function d(e,t){var n=e.getElementById(t);n&&n.parentNode.removeChild(n)}function p(e){return m.a.createElement("span",{style:{paddingRight:10,fontWeight:500,paddingLeft:e.icon?0:10,paddingTop:10,paddingBottom:10}},e.children)}function g(e){return m.a.createElement("div",{style:{marginRight:10,background:e.active?"#eee":"#fff",padding:10,borderRadius:2}},m.a.createElement("svg",{width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg"},m.a.createElement("g",{fill:"#000",fillRule:"evenodd"},m.a.createElement("path",{d:"M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z",fill:"#EA4335"}),m.a.createElement("path",{d:"M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z",fill:"#4285F4"}),m.a.createElement("path",{d:"M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z",fill:"#FBBC05"}),m.a.createElement("path",{d:"M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z",fill:"#34A853"}),m.a.createElement("path",{fill:"none",d:"M0 0h18v18H0z"}))))}function y(e){var t=a(Object(b.useState)(!1),2),n=t[0],o=t[1],r=a(Object(b.useState)(!1),2),i=r[0],c=r[1],s=e.tag,l=e.type,u=e.className,f=e.disabledStyle,d=e.buttonText,y=e.children,v=e.render,j=e.theme,O=e.icon,S=e.disabled,w=h({onSuccess:e.onSuccess,onAutoLoadFinished:e.onAutoLoadFinished,onRequest:e.onRequest,onFailure:e.onFailure,clientId:e.clientId,cookiePolicy:e.cookiePolicy,loginHint:e.loginHint,hostedDomain:e.hostedDomain,autoLoad:e.autoLoad,isSignedIn:e.isSignedIn,fetchBasicProfile:e.fetchBasicProfile,redirectUri:e.redirectUri,discoveryDocs:e.discoveryDocs,uxMode:e.uxMode,scope:e.scope,accessType:e.accessType,responseType:e.responseType,jsSrc:e.jsSrc,prompt:e.prompt}),k=w.signIn,T=S||!w.loaded;if(v)return v({onClick:k,disabled:T});var x={backgroundColor:"dark"===j?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===j?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},M={cursor:"pointer",backgroundColor:"dark"===j?"#3367D6":"#eee",color:"dark"===j?"#fff":"rgba(0, 0, 0, .54)",opacity:1},_=T?Object.assign({},x,f):i?Object.assign({},x,M):n?Object.assign({},x,{cursor:"pointer",opacity:.9}):x;return m.a.createElement(s,{onMouseEnter:function(){return o(!0)},onMouseLeave:function(){o(!1),c(!1)},onMouseDown:function(){return c(!0)},onMouseUp:function(){return c(!1)},onClick:k,style:_,type:l,disabled:T,className:u},[O&&m.a.createElement(g,{key:1,active:i}),m.a.createElement(p,{icon:O,key:2},y||d)])}n.r(t),n.d(t,"default",(function(){return j})),n.d(t,"GoogleLogin",(function(){return j})),n.d(t,"GoogleLogout",(function(){return S})),n.d(t,"useGoogleLogin",(function(){return h})),n.d(t,"useGoogleLogout",(function(){return O}));var b=n(0),m=n.n(b),h=(n(1),function(e){function t(e){var t=e.getBasicProfile(),n=e.getAuthResponse(!0);e.googleId=t.getId(),e.tokenObj=n,e.tokenId=n.id_token,e.accessToken=n.access_token,e.profileObj={googleId:t.getId(),imageUrl:t.getImageUrl(),email:t.getEmail(),name:t.getName(),givenName:t.getGivenName(),familyName:t.getFamilyName()},a(e)}function n(e){if(e&&e.preventDefault(),P){var n=window.gapi.auth2.getAuthInstance(),o={prompt:I};p(),"code"===M?n.grantOfflineAccess(o).then((function(e){return a(e)}),(function(e){return l(e)})):n.signIn(o).then((function(e){return t(e)}),(function(e){return l(e)}))}}var r=e.onSuccess,a=void 0===r?function(){}:r,i=e.onAutoLoadFinished,c=void 0===i?function(){}:i,s=e.onFailure,l=void 0===s?function(){}:s,u=e.onRequest,p=void 0===u?function(){}:u,g=e.clientId,y=e.cookiePolicy,m=e.loginHint,h=e.hostedDomain,v=e.autoLoad,j=e.isSignedIn,O=e.fetchBasicProfile,S=e.redirectUri,w=e.discoveryDocs,k=e.uxMode,T=e.scope,x=e.accessType,M=e.responseType,_=e.jsSrc,E=void 0===_?"https://apis.google.com/js/api.js":_,I=e.prompt,C=o(Object(b.useState)(!1),2),P=C[0],A=C[1];return Object(b.useEffect)((function(){var e=!1;return f(document,"script","google-login",E,(function(){var n={client_id:g,cookie_policy:y,login_hint:m,hosted_domain:h,fetch_basic_profile:O,discoveryDocs:w,ux_mode:k,redirect_uri:S,scope:T,access_type:x};"code"===M&&(n.access_type="offline"),window.gapi.load("auth2",(function(){var o=window.gapi.auth2.getAuthInstance();o?o.then((function(){e||(j&&o.isSignedIn.get()?(A(!0),c(!0),t(o.currentUser.get())):(A(!0),c(!1)))}),(function(e){l(e)})):window.gapi.auth2.init(n).then((function(n){if(!e){A(!0);var o=j&&n.isSignedIn.get();c(o),o&&t(n.currentUser.get())}}),(function(e){A(!0),c(!1),l(e)}))}))}),(function(e){l(e)})),function(){e=!0,d(document,"google-login")}}),[]),Object(b.useEffect)((function(){v&&n()}),[P]),{signIn:n,loaded:P}});function v(e){var t=l(Object(b.useState)(!1),2),n=t[0],o=t[1],r=l(Object(b.useState)(!1),2),a=r[0],i=r[1],c=e.tag,s=e.type,u=e.className,f=e.disabledStyle,d=e.buttonText,y=e.children,h=e.render,v=e.theme,j=e.icon,S=e.disabled,w=O({jsSrc:e.jsSrc,onFailure:e.onFailure,clientId:e.clientId,cookiePolicy:e.cookiePolicy,loginHint:e.loginHint,hostedDomain:e.hostedDomain,fetchBasicProfile:e.fetchBasicProfile,discoveryDocs:e.discoveryDocs,uxMode:e.uxMode,redirectUri:e.redirectUri,scope:e.scope,accessType:e.accessType,onLogoutSuccess:e.onLogoutSuccess}),k=w.signOut,T=S||!w.loaded;if(h)return h({onClick:k,disabled:T});var x={backgroundColor:"dark"===v?"rgb(66, 133, 244)":"#fff",display:"inline-flex",alignItems:"center",color:"dark"===v?"#fff":"rgba(0, 0, 0, .54)",boxShadow:"0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",padding:0,borderRadius:2,border:"1px solid transparent",fontSize:14,fontWeight:"500",fontFamily:"Roboto, sans-serif"},M={cursor:"pointer",backgroundColor:"dark"===v?"#3367D6":"#eee",color:"dark"===v?"#fff":"rgba(0, 0, 0, .54)",opacity:1},_=T?Object.assign({},x,f):a?Object.assign({},x,M):n?Object.assign({},x,{cursor:"pointer",opacity:.9}):x;return m.a.createElement(c,{onMouseEnter:function(){return o(!0)},onMouseLeave:function(){o(!1),i(!1)},onMouseDown:function(){return i(!0)},onMouseUp:function(){return i(!1)},onClick:k,style:_,type:s,disabled:T,className:u},[j&&m.a.createElement(g,{key:1,active:a}),m.a.createElement(p,{icon:j,key:2},y||d)])}y.defaultProps={type:"button",tag:"button",buttonText:"Sign in with Google",scope:"profile email",accessType:"online",prompt:"",cookiePolicy:"single_host_origin",fetchBasicProfile:!0,isSignedIn:!1,uxMode:"popup",disabledStyle:{opacity:.6},icon:!0,theme:"light",onRequest:function(){}};var j=y,O=function(e){var t=e.jsSrc,n=void 0===t?"https://apis.google.com/js/api.js":t,o=e.onFailure,r=e.clientId,a=e.cookiePolicy,i=e.loginHint,s=e.hostedDomain,l=e.fetchBasicProfile,u=e.discoveryDocs,p=e.uxMode,g=e.redirectUri,y=e.scope,m=e.accessType,h=e.onLogoutSuccess,v=c(Object(b.useState)(!1),2),j=v[0],O=v[1],S=Object(b.useCallback)((function(){if(window.gapi){var e=window.gapi.auth2.getAuthInstance();null!=e&&e.then((function(){e.signOut().then((function(){e.disconnect(),h()}))}),(function(e){return o(e)}))}}),[h]);return Object(b.useEffect)((function(){return f(document,"script","google-login",n,(function(){var e={client_id:r,cookie_policy:a,login_hint:i,hosted_domain:s,fetch_basic_profile:l,discoveryDocs:u,ux_mode:p,redirect_uri:g,scope:y,access_type:m};window.gapi.load("auth2",(function(){window.gapi.auth2.getAuthInstance()?O(!0):window.gapi.auth2.init(e).then((function(){return O(!0)}),(function(e){return o(e)}))}))}),(function(e){o(e)})),function(){d(document,"google-login")}}),[]),{signOut:S,loaded:j}};v.defaultProps={type:"button",tag:"button",buttonText:"Logout of Google",disabledStyle:{opacity:.6},icon:!0,theme:"light",jsSrc:"https://apis.google.com/js/api.js"};var S=v}],t.c=o,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(t){return e[t]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4);function t(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return n[e].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n,o}(n(5))}}]);