(this["webpackJsonpgogo-react"]=this["webpackJsonpgogo-react"]||[]).push([[56],{106:function(e,a,t){"use strict";var n=t(9),l=t(13),r=t(5),c=t.n(r),s=t(23),i=t.n(s),m=t(87),o=t.n(m),u=t(88),p={tag:u.tagPropType,listTag:u.tagPropType,className:i.a.string,listClassName:i.a.string,cssModule:i.a.object,children:i.a.node,"aria-label":i.a.string},g=function(e){var a=e.className,t=e.listClassName,r=e.cssModule,s=e.children,i=e.tag,m=e.listTag,p=e["aria-label"],g=Object(l.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),d=Object(u.mapToCssModules)(o()(a),r),b=Object(u.mapToCssModules)(o()("breadcrumb",t),r);return c.a.createElement(i,Object(n.a)({},g,{className:d,"aria-label":p}),c.a.createElement(m,{className:b},s))};g.propTypes=p,g.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=g},107:function(e,a,t){"use strict";var n=t(9),l=t(13),r=t(5),c=t.n(r),s=t(23),i=t.n(s),m=t(87),o=t.n(m),u=t(88),p={tag:u.tagPropType,active:i.a.bool,className:i.a.string,cssModule:i.a.object},g=function(e){var a=e.className,t=e.cssModule,r=e.active,s=e.tag,i=Object(l.a)(e,["className","cssModule","active","tag"]),m=Object(u.mapToCssModules)(o()(a,!!r&&"active","breadcrumb-item"),t);return c.a.createElement(s,Object(n.a)({},i,{className:m,"aria-current":r?"page":void 0}))};g.propTypes=p,g.defaultProps={tag:"li"},a.a=g},1097:function(e,a,t){"use strict";t.r(a);var n=t(5),l=t.n(n),r=t(255),c=t(90),s=t(91),i=t(94);a.default=function(e){var a=e.match;return l.a.createElement(l.a.Fragment,null,l.a.createElement(r.a,null,l.a.createElement(s.a,{xxs:"12"},l.a.createElement(i.a,{heading:"menu.third-level-1",match:a}),l.a.createElement(s.b,{className:"mb-5"}))),l.a.createElement(r.a,null,l.a.createElement(s.a,{xxs:"12",className:"mb-4"},l.a.createElement("p",null,l.a.createElement(c.a,{id:"menu.third-level-1"})))))}},94:function(e,a,t){"use strict";var n=t(5),l=t.n(n),r=t(106),c=t(107),s=t(66),i=t(90),m=(t(7),function(e,a,t){return e.split(a)[0]+a});var o=function(e){var a=e.match.path.substr(1),t=a.split("/");return t[t.length-1].indexOf(":")>-1&&(t=t.filter((function(e){return-1===e.indexOf(":")}))),l.a.createElement(l.a.Fragment,null,l.a.createElement(r.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},t.map((function(e,n){return function(e,a){for(var t=[],n=-1;-1!=(n=e.indexOf(a,n+1));)t.push(n);return t}(e="app"===e?"Home":e,"-").map((function(a){e=e.slice(0,a+1)+e.charAt(a+1).toUpperCase()+e.slice(a+2)})),e=e.replace(/-/g," "),l.a.createElement(c.a,{key:n,active:t.length===n+1},t.length!==n+1?l.a.createElement(s.c,{to:"/".concat(m(a,e))},e.charAt(0).toUpperCase()+e.slice(1)):e.charAt(0).toUpperCase()+e.slice(1))}))))};a.a=function(e){var a=e.heading,t=e.match;return l.a.createElement(l.a.Fragment,null,a&&l.a.createElement("h1",null,l.a.createElement(i.a,{id:a})),l.a.createElement(o,{match:t}))}}}]);