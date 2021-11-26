(this["webpackJsonpgogo-react"]=this["webpackJsonpgogo-react"]||[]).push([[66],{105:function(e,a,t){"use strict";var n=t(9),c=t(13),s=t(5),r=t.n(s),l=t(23),o=t.n(l),i=t(87),m=t.n(i),u=t(88),p={tag:u.tagPropType,inverse:o.a.bool,color:o.a.string,body:o.a.bool,outline:o.a.bool,className:o.a.string,cssModule:o.a.object,innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},g=function(e){var a=e.className,t=e.cssModule,s=e.color,l=e.body,o=e.inverse,i=e.outline,p=e.tag,g=e.innerRef,b=Object(c.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),d=Object(u.mapToCssModules)(m()(a,"card",!!o&&"text-white",!!l&&"card-body",!!s&&(i?"border":"bg")+"-"+s),t);return r.a.createElement(p,Object(n.a)({},b,{className:d,ref:g}))};g.propTypes=p,g.defaultProps={tag:"div"},a.a=g},106:function(e,a,t){"use strict";var n=t(9),c=t(13),s=t(5),r=t.n(s),l=t(23),o=t.n(l),i=t(87),m=t.n(i),u=t(88),p={tag:u.tagPropType,listTag:u.tagPropType,className:o.a.string,listClassName:o.a.string,cssModule:o.a.object,children:o.a.node,"aria-label":o.a.string},g=function(e){var a=e.className,t=e.listClassName,s=e.cssModule,l=e.children,o=e.tag,i=e.listTag,p=e["aria-label"],g=Object(c.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),b=Object(u.mapToCssModules)(m()(a),s),d=Object(u.mapToCssModules)(m()("breadcrumb",t),s);return r.a.createElement(o,Object(n.a)({},g,{className:b,"aria-label":p}),r.a.createElement(i,{className:d},l))};g.propTypes=p,g.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=g},107:function(e,a,t){"use strict";var n=t(9),c=t(13),s=t(5),r=t.n(s),l=t(23),o=t.n(l),i=t(87),m=t.n(i),u=t(88),p={tag:u.tagPropType,active:o.a.bool,className:o.a.string,cssModule:o.a.object},g=function(e){var a=e.className,t=e.cssModule,s=e.active,l=e.tag,o=Object(c.a)(e,["className","cssModule","active","tag"]),i=Object(u.mapToCssModules)(m()(a,!!s&&"active","breadcrumb-item"),t);return r.a.createElement(l,Object(n.a)({},o,{className:i,"aria-current":s?"page":void 0}))};g.propTypes=p,g.defaultProps={tag:"li"},a.a=g},108:function(e,a,t){"use strict";var n=t(9),c=t(13),s=t(5),r=t.n(s),l=t(23),o=t.n(l),i=t(87),m=t.n(i),u=t(88),p={tag:u.tagPropType,className:o.a.string,cssModule:o.a.object,innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},g=function(e){var a=e.className,t=e.cssModule,s=e.innerRef,l=e.tag,o=Object(c.a)(e,["className","cssModule","innerRef","tag"]),i=Object(u.mapToCssModules)(m()(a,"card-body"),t);return r.a.createElement(l,Object(n.a)({},o,{className:i,ref:s}))};g.propTypes=p,g.defaultProps={tag:"div"},a.a=g},120:function(e,a,t){"use strict";var n=t(5),c=t.n(n),s=t(470),r=t(471),l=t(707),o=t(91);a.a=function(e){var a=e.totalPage,t=void 0===a?0:a,n=e.currentPage,i=void 0===n?1:n,m=e.numberLimit,u=void 0===m?5:m,p=e.lastIsActive,g=void 0===p||p,b=e.firstIsActive,d=void 0===b||b,f=e.onChangePage,E=1,N=u;u>t?(E=1,N=t):i<=parseInt(u/2,10)?(E=1,N=u):i+parseInt(u/2,10)<=t?(E=i-parseInt(u/2,10),N=i+parseInt(u/2,10)):(E=t-(u-1),N=t);for(var v=[],h=E=0===E?1:E;h<=N;h+=1)v.push(h);var j=i<=1?"disabled":"",O=i>=t?"disabled":"",y=i<=1?"disabled":"",k=i>=t?"disabled":"";return t>1?c.a.createElement(o.a,{xxs:"12",className:"mt-3 mb-3"},c.a.createElement(s.a,{className:"pagination justify-content-center"},d&&c.a.createElement(r.a,{className:"page-item ".concat(j)},c.a.createElement(l.a,{className:"page-link first c-pointer",onClick:function(){return f(1)}},c.a.createElement("i",{className:"simple-icon-control-start"}))),c.a.createElement(r.a,{className:"page-item ".concat(y)},c.a.createElement(l.a,{className:"page-link prev c-pointer",onClick:function(){return f(i-1)}},c.a.createElement("i",{className:"simple-icon-arrow-left"}))),v.map((function(e){return c.a.createElement(r.a,{key:e,className:"page-item ".concat(i===e&&"active")},c.a.createElement(l.a,{className:"page-link c-pointer",onClick:function(){return f(e)}},e))})),c.a.createElement(r.a,{className:"page-item ".concat(k)},c.a.createElement(l.a,{className:"page-link next c-pointer",onClick:function(){return f(i+1)}},c.a.createElement("i",{className:"simple-icon-arrow-right"}))),g&&c.a.createElement(r.a,{className:"page-item ".concat(O)},c.a.createElement(l.a,{className:"page-link last c-pointer",onClick:function(){return f(t)}},c.a.createElement("i",{className:"simple-icon-control-end"}))))):c.a.createElement(o.a,{xxs:"12",className:"mt-2"})}},931:function(e,a,t){"use strict";t.r(a);var n=t(3),c=t.n(n),s=t(11),r=t(92),l=t(5),o=t.n(l),i=t(255),m=t(105),u=t(108),p=t(66),g=t(97),b=t.n(g),d=t(120),f=t(7),E=t(94),N=t(91),v="".concat(f.o,"/cakes/paging");a.default=function(e){var a=e.match,t=Object(l.useState)(!0),n=Object(r.a)(t,2),g=n[0],f=n[1],h=Object(l.useState)([]),j=Object(r.a)(h,2),O=j[0],y=j[1],k=Object(l.useState)(1),T=Object(r.a)(k,2),C=T[0],P=T[1],x=Object(l.useState)("Cake"),M=Object(r.a)(x,1)[0],w=Object(l.useState)(10),S=Object(r.a)(w,1)[0],I=Object(l.useState)(0),R=Object(r.a)(I,2),A=R[0],F=R[1];return Object(l.useEffect)((function(){function e(){return(e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:b.a.get("".concat(v,"?pageSize=").concat(S,"&currentPage=").concat(C,"&search=").concat(M)).then((function(e){return e.data})).then((function(e){y(e.data),F(e.totalPage),f(!1)}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[S,C,M]),o.a.createElement(o.a.Fragment,null,o.a.createElement(i.a,null,o.a.createElement(N.a,{xxs:"12"},o.a.createElement(E.a,{heading:"menu.search",match:a}),o.a.createElement(N.b,{className:"mb-5"}))),o.a.createElement(i.a,null,o.a.createElement(N.a,{xxs:"12",className:"mb-4"},o.a.createElement(m.a,null,o.a.createElement(u.a,null,g?o.a.createElement("div",{className:"loading"}):O.map((function(e,a){return o.a.createElement("div",{key:"item_".concat(a),className:"".concat(O.length!==a+1?"mb-3":"")},o.a.createElement(p.c,{to:"#".concat(e.id),className:"w-40 w-sm-100"},o.a.createElement("p",{className:"list-item-heading mb-1 color-theme-1"},e.title),o.a.createElement("p",{className:"mb-1 text-muted text-small"},"Products | ",e.category),o.a.createElement("p",{className:"mb-4 text-small"},e.description)),O.length!==a+1&&o.a.createElement(N.b,null))}))))),o.a.createElement(d.a,{currentPage:C,totalPage:A,onChangePage:function(e){return P(e)}})))}},94:function(e,a,t){"use strict";var n=t(5),c=t.n(n),s=t(106),r=t(107),l=t(66),o=t(90),i=(t(7),function(e,a,t){return e.split(a)[0]+a});var m=function(e){var a=e.match.path.substr(1),t=a.split("/");return t[t.length-1].indexOf(":")>-1&&(t=t.filter((function(e){return-1===e.indexOf(":")}))),c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},t.map((function(e,n){return function(e,a){for(var t=[],n=-1;-1!=(n=e.indexOf(a,n+1));)t.push(n);return t}(e="app"===e?"Home":e,"-").map((function(a){e=e.slice(0,a+1)+e.charAt(a+1).toUpperCase()+e.slice(a+2)})),e=e.replace(/-/g," "),c.a.createElement(r.a,{key:n,active:t.length===n+1},t.length!==n+1?c.a.createElement(l.c,{to:"/".concat(i(a,e))},e.charAt(0).toUpperCase()+e.slice(1)):e.charAt(0).toUpperCase()+e.slice(1))}))))};a.a=function(e){var a=e.heading,t=e.match;return c.a.createElement(c.a.Fragment,null,a&&c.a.createElement("h1",null,c.a.createElement(o.a,{id:a})),c.a.createElement(m,{match:t}))}}}]);