(this["webpackJsonpgogo-react"]=this["webpackJsonpgogo-react"]||[]).push([[65],{105:function(e,a,t){"use strict";var l=t(9),r=t(13),c=t(5),s=t.n(c),m=t(23),n=t.n(m),i=t(87),o=t.n(i),p=t(88),d={tag:p.tagPropType,inverse:n.a.bool,color:n.a.string,body:n.a.bool,outline:n.a.bool,className:n.a.string,cssModule:n.a.object,innerRef:n.a.oneOfType([n.a.object,n.a.string,n.a.func])},x=function(e){var a=e.className,t=e.cssModule,c=e.color,m=e.body,n=e.inverse,i=e.outline,d=e.tag,x=e.innerRef,f=Object(r.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),E=Object(p.mapToCssModules)(o()(a,"card",!!n&&"text-white",!!m&&"card-body",!!c&&(i?"border":"bg")+"-"+c),t);return s.a.createElement(d,Object(l.a)({},f,{className:E,ref:x}))};x.propTypes=d,x.defaultProps={tag:"div"},a.a=x},106:function(e,a,t){"use strict";var l=t(9),r=t(13),c=t(5),s=t.n(c),m=t(23),n=t.n(m),i=t(87),o=t.n(i),p=t(88),d={tag:p.tagPropType,listTag:p.tagPropType,className:n.a.string,listClassName:n.a.string,cssModule:n.a.object,children:n.a.node,"aria-label":n.a.string},x=function(e){var a=e.className,t=e.listClassName,c=e.cssModule,m=e.children,n=e.tag,i=e.listTag,d=e["aria-label"],x=Object(r.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),f=Object(p.mapToCssModules)(o()(a),c),E=Object(p.mapToCssModules)(o()("breadcrumb",t),c);return s.a.createElement(n,Object(l.a)({},x,{className:f,"aria-label":d}),s.a.createElement(i,{className:E},m))};x.propTypes=d,x.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=x},107:function(e,a,t){"use strict";var l=t(9),r=t(13),c=t(5),s=t.n(c),m=t(23),n=t.n(m),i=t(87),o=t.n(i),p=t(88),d={tag:p.tagPropType,active:n.a.bool,className:n.a.string,cssModule:n.a.object},x=function(e){var a=e.className,t=e.cssModule,c=e.active,m=e.tag,n=Object(r.a)(e,["className","cssModule","active","tag"]),i=Object(p.mapToCssModules)(o()(a,!!c&&"active","breadcrumb-item"),t);return s.a.createElement(m,Object(l.a)({},n,{className:i,"aria-current":c?"page":void 0}))};x.propTypes=d,x.defaultProps={tag:"li"},a.a=x},108:function(e,a,t){"use strict";var l=t(9),r=t(13),c=t(5),s=t.n(c),m=t(23),n=t.n(m),i=t(87),o=t.n(i),p=t(88),d={tag:p.tagPropType,className:n.a.string,cssModule:n.a.object,innerRef:n.a.oneOfType([n.a.object,n.a.string,n.a.func])},x=function(e){var a=e.className,t=e.cssModule,c=e.innerRef,m=e.tag,n=Object(r.a)(e,["className","cssModule","innerRef","tag"]),i=Object(p.mapToCssModules)(o()(a,"card-body"),t);return s.a.createElement(m,Object(l.a)({},n,{className:i,ref:c}))};x.propTypes=d,x.defaultProps={tag:"div"},a.a=x},1107:function(e,a,t){"use strict";t.r(a);var l=t(5),r=t.n(l),c=t(255),s=t(117),m=t(94),n=t(91),i={en:[{icon:"iconsminds-male",title:"DEVELOPER",price:"$11",detail:"User/Month",link:"#",features:["Number of end products 1","Free updates","Forum support"]},{icon:"iconsminds-male-female",title:"TEAM",price:"$17",detail:"User/Month Up to 10 Users",link:"#",features:["24/5 support","Number of end products 1","Two factor authentication","Free updates","Forum support"]},{icon:"iconsminds-mens",title:"ENTERPRISE",price:"$19",detail:"User/Month 10+ Users",link:"#",features:["24/7 support","Number of end products 1","Two factor authentication","Free updates","Forum support"]}],es:[{icon:"iconsminds-male",title:"REVELADOR",price:"$11",detail:"Usuario/Mes",link:"#",features:["Numero de productos finales 1","Actualizaciones gratuitas","Soporte del foro"]},{icon:"iconsminds-male-female",title:"EQUIPO",price:"$17",detail:"Usuario/Mes Hasta 10 Usuarios",link:"#",features:["24/5 soporte","Numero de productos finales 1","Autenticaci\xf3n de dos factores","Actualizaciones gratuitas","Soporte del foro"]},{icon:"iconsminds-mens",title:"EMPRESA",price:"$19",detail:"Usuario/Mes 10+ Usuarios",link:"#",features:["24/7 soporte","Numero de productos finales 1","Autenticaci\xf3n de dos factores","Actualizaciones gratuitas","Soporte del foro"]}],enrtl:[{icon:"iconsminds-male",title:"DEVELOPER",price:"$11",detail:"User/Month",link:"#",features:["Number of end products 1","Free updates","Forum support"]},{icon:"iconsminds-male-female",title:"TEAM",price:"$17",detail:"User/Month Up to 10 Users",link:"#",features:["24/5 support","Number of end products 1","Two factor authentication","Free updates","Forum support"]},{icon:"iconsminds-mens",title:"ENTERPRISE",price:"$19",detail:"User/Month 10+ Users",link:"#",features:["24/7 support","Number of end products 1","Two factor authentication","Free updates","Forum support"]}]},o=t(66),p=t(105),d=t(108),x=t(90),f=r.a.memo((function(e){var a=e.data;return r.a.createElement(p.a,null,r.a.createElement(d.a,{className:"pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column"},r.a.createElement("div",{className:"price-top-part"},r.a.createElement("i",{className:"large-icon ".concat(a.icon)}),r.a.createElement("h5",{className:"mb-0 font-weight-semibold color-theme-1 mb-4"},a.title),r.a.createElement("p",{className:"text-large mb-2 text-default"},a.price),r.a.createElement("p",{className:"text-muted text-small"},a.detail)),r.a.createElement("div",{className:"pl-3 pr-3 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1"},r.a.createElement("ul",{className:"list-unstyled"},a.features.map((function(e,a){return r.a.createElement("li",{key:a},r.a.createElement("p",{className:"mb-0"},e))}))),r.a.createElement("div",{className:"text-center"},r.a.createElement(o.c,{to:a.link,className:"btn btn-link btn-empty btn-lg"},r.a.createElement(x.a,{id:"pages.purchase"})," ",r.a.createElement("i",{className:"simple-icon-arrow-right"}))))))})),E=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(n.a,{xxs:"12",className:"d-none d-md-block"},r.a.createElement(p.a,{className:"mb-3 table-heading"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-40 w-xs-100"}),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement(x.a,{id:"pages.price.developer"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement(x.a,{id:"pages.price.team"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement(x.a,{id:"pages.price.enterprise"}))))),r.a.createElement(p.a,{className:"flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-40 w-xs-100"},r.a.createElement(x.a,{id:"pages.price.twofactorauthentication"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement("i",{className:"simple-icon-check"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement("i",{className:"simple-icon-check"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement("i",{className:"simple-icon-check"}))))),r.a.createElement(p.a,{className:"flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-40 w-xs-100"},r.a.createElement(x.a,{id:"pages.price.teampermissions"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"}),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement("i",{className:"simple-icon-check"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement("i",{className:"simple-icon-check"}))))),r.a.createElement(p.a,{className:"flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-40 w-xs-100"},r.a.createElement(x.a,{id:"pages.price.245Support"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"}),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement("i",{className:"simple-icon-check"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"})))),r.a.createElement(p.a,{className:"flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-40 w-xs-100"},r.a.createElement(x.a,{id:"pages.price.247Support"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"}),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"}),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement("i",{className:"simple-icon-check"}))))),r.a.createElement(p.a,{className:"flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-40 w-xs-100"},r.a.createElement(x.a,{id:"pages.price.useractionsauditlog"})),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"}),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"}),r.a.createElement("p",{className:"mb-0 text-primary w-20 w-xs-100 text-center"},r.a.createElement("i",{className:"simple-icon-check"})))))),r.a.createElement(n.a,{xxs:"12",className:"d-block d-md-none"},r.a.createElement(p.a,{className:"d-flex flex-row mb-3 table-heading"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"pl-0 pb-0"},r.a.createElement("p",{className:"list-item-heading mb-0 text-primary"},r.a.createElement(x.a,{id:"pages.price.twofactorauthentication"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.developer"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"},r.a.createElement("i",{className:"simple-icon-check"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.team"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"},r.a.createElement("i",{className:"simple-icon-check"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.enterprise"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"},r.a.createElement("i",{className:"simple-icon-check"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3 table-heading"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"pl-0 pb-0"},r.a.createElement("p",{className:"list-item-heading mb-0 text-primary"},r.a.createElement(x.a,{id:"pages.price.teampermissions"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.developer"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"})))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.team"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"},r.a.createElement("i",{className:"simple-icon-check"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.enterprise"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"},r.a.createElement("i",{className:"simple-icon-check"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3 table-heading"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"pl-0 pb-0"},r.a.createElement("p",{className:"list-item-heading mb-0 text-primary"},r.a.createElement(x.a,{id:"pages.price.245Support"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.developer"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"})))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.team"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"},r.a.createElement("i",{className:"simple-icon-check"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.enterprise"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"})))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3 table-heading"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"pl-0 pb-0"},r.a.createElement("p",{className:"list-item-heading mb-0 text-primary"},r.a.createElement(x.a,{id:"pages.price.247Support"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.developer"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"})))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.team"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"})))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.enterprise"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"},r.a.createElement("i",{className:"simple-icon-check"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3 table-heading"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"pl-0 pb-0"},r.a.createElement("p",{className:"list-item-heading mb-0 text-primary"},r.a.createElement(x.a,{id:"pages.price.useractionsauditlog"}))))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.developer"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"})))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.team"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"})))),r.a.createElement(p.a,{className:"d-flex flex-row mb-3"},r.a.createElement("div",{className:"d-flex flex-grow-1 min-width-zero"},r.a.createElement(d.a,{className:"align-self-center d-flex flex-row"},r.a.createElement("p",{className:"list-item-heading mb-0 truncate w-70"},r.a.createElement(x.a,{id:"pages.price.enterprise"})),r.a.createElement("p",{className:"text-primary text-right mb-0 w-30 text-one"},r.a.createElement("i",{className:"simple-icon-check"})))))))},u=t(10),N=Object(u.b)();a.default=function(e){var a=e.match;return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,null,r.a.createElement(n.a,{xxs:"12"},r.a.createElement(m.a,{heading:"menu.prices",match:a}),r.a.createElement(n.b,{className:"mb-5"}))),r.a.createElement(c.a,{className:"equal-height-container mb-5"},r.a.createElement(n.a,{xxs:"12"},r.a.createElement(s.a,null,r.a.createElement(x.a,{id:"pages.prices.pricecomparison"}))),i[N].map((function(e,a){return r.a.createElement(n.a,{md:"12",lg:"4",className:"col-item mb-4",key:"priceCard_".concat(a)},r.a.createElement(f,{data:e}))}))),r.a.createElement(c.a,null,r.a.createElement(n.a,{xxs:"12"},r.a.createElement(s.a,null,r.a.createElement(x.a,{id:"pages.prices.featurecomparison"}))),r.a.createElement(E,null)))}},117:function(e,a,t){"use strict";var l=t(9),r=t(13),c=t(5),s=t.n(c),m=t(23),n=t.n(m),i=t(87),o=t.n(i),p=t(88),d={tag:p.tagPropType,className:n.a.string,cssModule:n.a.object},x=function(e){var a=e.className,t=e.cssModule,c=e.tag,m=Object(r.a)(e,["className","cssModule","tag"]),n=Object(p.mapToCssModules)(o()(a,"card-title"),t);return s.a.createElement(c,Object(l.a)({},m,{className:n}))};x.propTypes=d,x.defaultProps={tag:"div"},a.a=x},94:function(e,a,t){"use strict";var l=t(5),r=t.n(l),c=t(106),s=t(107),m=t(66),n=t(90),i=(t(7),function(e,a,t){return e.split(a)[0]+a});var o=function(e){var a=e.match.path.substr(1),t=a.split("/");return t[t.length-1].indexOf(":")>-1&&(t=t.filter((function(e){return-1===e.indexOf(":")}))),r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{className:"pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block"},t.map((function(e,l){return function(e,a){for(var t=[],l=-1;-1!=(l=e.indexOf(a,l+1));)t.push(l);return t}(e="app"===e?"Home":e,"-").map((function(a){e=e.slice(0,a+1)+e.charAt(a+1).toUpperCase()+e.slice(a+2)})),e=e.replace(/-/g," "),r.a.createElement(s.a,{key:l,active:t.length===l+1},t.length!==l+1?r.a.createElement(m.c,{to:"/".concat(i(a,e))},e.charAt(0).toUpperCase()+e.slice(1)):e.charAt(0).toUpperCase()+e.slice(1))}))))};a.a=function(e){var a=e.heading,t=e.match;return r.a.createElement(r.a.Fragment,null,a&&r.a.createElement("h1",null,r.a.createElement(n.a,{id:a})),r.a.createElement(o,{match:t}))}}}]);