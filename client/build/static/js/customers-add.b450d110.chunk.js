(this["webpackJsonpgogo-react"]=this["webpackJsonpgogo-react"]||[]).push([[43],{194:function(e,a,t){"use strict";var n=t(9),l=t(13),r=t(100),c=t(15),s=t(5),m=t.n(s),u=t(23),o=t.n(u),i=t(87),d=t.n(i),E=t(88),b={children:o.a.node,inline:o.a.bool,tag:E.tagPropType,innerRef:o.a.oneOfType([o.a.object,o.a.func,o.a.string]),className:o.a.string,cssModule:o.a.object},f=function(e){function a(a){var t;return(t=e.call(this,a)||this).getRef=t.getRef.bind(Object(r.a)(t)),t.submit=t.submit.bind(Object(r.a)(t)),t}Object(c.a)(a,e);var t=a.prototype;return t.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},t.submit=function(){this.ref&&this.ref.submit()},t.render=function(){var e=this.props,a=e.className,t=e.cssModule,r=e.inline,c=e.tag,s=e.innerRef,u=Object(l.a)(e,["className","cssModule","inline","tag","innerRef"]),o=Object(E.mapToCssModules)(d()(a,!!r&&"form-inline"),t);return m.a.createElement(c,Object(n.a)({},u,{ref:s,className:o}))},a}(s.Component);f.propTypes=b,f.defaultProps={tag:"form"},a.a=f},233:function(e,a,t){"use strict";var n=t(9),l=t(13),r=t(5),c=t.n(r),s=t(23),m=t.n(s),u=t(87),o=t.n(u),i=t(88),d={className:m.a.string,cssModule:m.a.object,size:m.a.string,bordered:m.a.bool,borderless:m.a.bool,striped:m.a.bool,dark:m.a.bool,hover:m.a.bool,responsive:m.a.oneOfType([m.a.bool,m.a.string]),tag:i.tagPropType,responsiveTag:i.tagPropType,innerRef:m.a.oneOfType([m.a.func,m.a.string,m.a.object])},E=function(e){var a=e.className,t=e.cssModule,r=e.size,s=e.bordered,m=e.borderless,u=e.striped,d=e.dark,E=e.hover,b=e.responsive,f=e.tag,p=e.responsiveTag,g=e.innerRef,h=Object(l.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),O=Object(i.mapToCssModules)(o()(a,"table",!!r&&"table-"+r,!!s&&"table-bordered",!!m&&"table-borderless",!!u&&"table-striped",!!d&&"table-dark",!!E&&"table-hover"),t),C=c.a.createElement(f,Object(n.a)({},h,{ref:g,className:O}));if(b){var j=Object(i.mapToCssModules)(!0===b?"table-responsive":"table-responsive-"+b,t);return c.a.createElement(p,{className:j},C)}return C};E.propTypes=d,E.defaultProps={tag:"table",responsiveTag:"div"},a.a=E},885:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t(3),r=t.n(l),c=t(11),s=t(92),m=t(5),u=t.n(m),o=t(255),i=t(230),d=t(105),E=t(108),b=t(194),f=t(677),p=t(254),g=t(678),h=t(476),O=t(400),C=t(341),j=t(342),v=t(343),N=t(97),y=t.n(N),T=t(28),S=t(91),x=t(94),V=t(90),P=t(98);a.default=function(e){var a=e.match,t=Object(m.useState)({}),l=Object(s.a)(t,2),N=l[0],k=l[1],w=Object(m.useState)(!1),U=Object(s.a)(w,2),M=U[0],z=U[1],A=Object(m.useState)(!0),L=Object(s.a)(A,2),R=L[0],F=L[1],W=Object(m.useState)({}),D=Object(s.a)(W,2),J=D[0],B=D[1],$=Object(m.useState)(!1),Z=Object(s.a)($,2),G=Z[0],_=(Z[1],Object(m.useState)(0)),q=Object(s.a)(_,2),H=q[0],I=q[1],K=Object(T.g)(),Q=function(e){return/\S+@\S+\.\S+/.test(e)},X=function(e){return e.username?(a=e.username,/^(?=.*[!@#$%_^&*]).{8,64}$/.test(a)?e.firstName?e.firstName.length<3?P.b.warning("FirstName must be At least 3 Characters Long","Validation Error",3e3):e.email?Q(e.email)?!(e.emailCC&&!Q(e.emailCC))||P.b.warning("Please Enter a Valid Email CC","Validation Error",3e3):P.b.warning("Please Enter a Valid Email","Validation Error",3e3):P.b.warning("Email is Mandatory","Validation Error",3e3):P.b.warning("FirstName is Mandatory","Validation Error",3e3):P.b.warning("Valid Username Must have Special Character in it and 8 letters Long.","Validation Error",6e3)):P.b.warning("Username is Mandatory","Validation Error",3e3);var a},Y=function(){var e=Object(c.a)(r.a.mark((function e(a){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),!H){e.next=20;break}if(void 0===N.username&&(N.username=J.username),void 0===N.email&&(N.email=J.email),void 0===N.firstName&&(N.firstName=J.firstName),X(N)){e.next=7;break}return e.abrupt("return");case 7:return e.prev=7,e.next=10,y.a.post("/api/customers/update/".concat(H),N);case 10:P.b.success("Customer Updated Successfully.","Success",3e3),K.push("/app/customers"),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(7),console.log(JSON.stringify(e.t0.response,null,4)),e.t0.response.status<500?P.b.error("".concat(e.t0.response.data.field[0].toUpperCase()+e.t0.response.data.field.slice(1)," is Already Taken."),"Error",3e3):P.b.error("Something Went Wrong!!!","Error",3e3);case 18:e.next=33;break;case 20:if(X(N)){e.next=22;break}return e.abrupt("return");case 22:return e.prev=22,e.next=25,y.a.post("/api/customers/",N);case 25:P.b.success("Customer Created Successfully.","Success",3e3),K.push("/app/customers"),e.next=33;break;case 29:e.prev=29,e.t1=e.catch(22),console.log(JSON.stringify(e.t1.response,null,4)),e.t1.response.status<500?P.b.error("".concat(e.t1.response.data.field[0].toUpperCase()+e.t1.response.data.field.slice(1)," is Already Taken."),"Error",3e3):P.b.error("Something Went Wrong!!!","Error",3e3);case 33:case"end":return e.stop()}}),e,null,[[7,14],[22,29]])})));return function(a){return e.apply(this,arguments)}}();return Object(m.useEffect)((function(){a.params.id&&(F(!1),I(a.params.id),y.a.get("/api/customers/details/".concat(a.params.id)).then((function(e){console.log(e.data),B(e.data.customer),F(!0)})).catch((function(e){return console.log(e.response),P.b.error("Something Went Wrong!!!","Error",3e3)})))}),[G]),R?u.a.createElement(u.a.Fragment,null,u.a.createElement(o.a,null,u.a.createElement(S.a,{xxs:"12"},u.a.createElement(x.a,{heading:H?"Edit Customer":"Add Customer",match:a}),u.a.createElement("div",{className:"text-zero top-right-button-container"},u.a.createElement(i.a,{color:"danger",size:"lg",outline:!0,className:"top-right-button",onClick:function(){K.push("/app/customers")}},u.a.createElement(V.a,{id:"Cancel"})),"  "),u.a.createElement(S.b,{className:"mb-5"}))),u.a.createElement("div",{className:"d-flex flex-column"},u.a.createElement(o.a,{className:"mb-4"},u.a.createElement(S.a,{xxs:"12"},u.a.createElement(d.a,null,u.a.createElement(E.a,null,u.a.createElement(S.a,{xxs:"12",className:"mb-5"},u.a.createElement("h3",{className:"mb-4"},H?"Edit Customer Form":"Create Customer Form"),u.a.createElement(b.a,null,u.a.createElement(f.a,null,u.a.createElement(o.a,{className:"mt-3"},u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Username"})),u.a.createElement(h.a,{defaultValue:J.username,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{username:e.target.value}))}})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"First Name"})),u.a.createElement(h.a,{defaultValue:J.firstName,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{firstName:e.target.value}))}})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Last Name"})),u.a.createElement(h.a,{defaultValue:J.lastName,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{lastName:e.target.value}))}}))),u.a.createElement(o.a,{className:"mt-3"},u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Email"})),u.a.createElement(h.a,{defaultValue:J.email,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{email:e.target.value}))}})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Email CC"})),u.a.createElement(h.a,{defaultValue:J.emailCC,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{emailCC:e.target.value}))}})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Phone"})),u.a.createElement(h.a,{defaultValue:J.phone,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{phone:e.target.value}))}}))),u.a.createElement(o.a,{className:"mt-3"},u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Business Name"})),u.a.createElement(h.a,{defaultValue:J.businessName,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{businessName:e.target.value}))}})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Credit Term"})),u.a.createElement(h.a,{defaultValue:J.creditTerm,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{creditTerm:e.target.value}))}})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Credit Limit"})),u.a.createElement(h.a,{defaultValue:J.creditLimit,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{creditLimit:e.target.value}))}}))),u.a.createElement(o.a,{className:"mt-3"},u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"User Phone 1"})),u.a.createElement(h.a,{defaultValue:J.userPhone1,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{userPhone1:e.target.value}))}})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"User Phone 2"})),u.a.createElement(h.a,{defaultValue:J.userPhone2,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{userPhone2:e.target.value}))}})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"User Phone 3"})),u.a.createElement(h.a,{defaultValue:J.userPhone3,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{userPhone3:e.target.value}))}}))),u.a.createElement(o.a,{className:"mt-3"},u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Address 1"})),u.a.createElement(h.a,{defaultValue:J.address1,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{address1:e.target.value}))},type:"textarea"})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Address 2"})),u.a.createElement(h.a,{defaultValue:J.address2,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{address2:e.target.value}))},type:"textarea"}))),u.a.createElement(o.a,{className:"mt-3"},u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"City"})),u.a.createElement(h.a,{defaultValue:J.city,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{city:e.target.value}))}})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"State"})),u.a.createElement(h.a,{defaultValue:J.state,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{state:e.target.value}))}}))),u.a.createElement(o.a,{className:"mt-3"},u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Country"})),u.a.createElement(h.a,{defaultValue:J.country,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{country:e.target.value}))}})),u.a.createElement(p.a,null,u.a.createElement(g.a,null,u.a.createElement(V.a,{id:"Zip Code"})),u.a.createElement(h.a,{defaultValue:J.zipCode,onChange:function(e){k(Object(n.a)(Object(n.a)({},N),{},{zipCode:e.target.value}))}})))),u.a.createElement("div",{className:"mt-3"},u.a.createElement(i.a,{className:"mr-2",color:"secondary",outline:!0,onClick:function(){K.push("/app/customers")}},u.a.createElement(V.a,{id:"Cancel"})),u.a.createElement(i.a,{color:"primary",onClick:Y},u.a.createElement(V.a,{id:H?"Update Customer":"Create Customer"})))))))))),u.a.createElement(O.a,{isOpen:M},u.a.createElement(C.a,null,"Add New Customer"),u.a.createElement(j.a,null,"Body"),u.a.createElement(v.a,null,u.a.createElement(i.a,{className:"mr-2",color:"secondary",outline:!0,onClick:function(){z(!1)}},u.a.createElement(V.a,{id:"Cancel"})),u.a.createElement(i.a,{color:"primary"},u.a.createElement(V.a,{id:"Create Customer"}))))):u.a.createElement("div",{className:"loading"})}},886:function(e,a,t){"use strict";t.r(a);var n=t(92),l=t(5),r=t.n(l),c=t(255),s=t(230),m=t(105),u=t(108),o=t(254),i=t(233),d=t(97),E=t.n(d),b=t(28),f=t(91),p=t(94),g=t(90),h=t(98);a.default=function(e){var a=e.match,t=Object(l.useState)({}),d=Object(n.a)(t,2),O=d[0],C=d[1],j=Object(l.useState)(!1),v=Object(n.a)(j,2),N=v[0],y=v[1],T=Object(l.useState)(0),S=Object(n.a)(T,2),x=(S[0],S[1]),V=Object(l.useState)(!1),P=Object(n.a)(V,2),k=P[0],w=(P[1],Object(l.useState)([])),U=Object(n.a)(w,2),M=U[0],z=U[1],A=Object(b.g)();Object(l.useEffect)((function(){x(a.params.id),E.a.get("/api/customers/details/".concat(a.params.id)).then((function(e){C(e.data.customer),z(e.data.orders),y(!0)})).catch((function(e){return console.log(e.response),h.b.error("Something Went Wrong!!!","Error",3e3)}))}),[k]);var L=(new Date).toString().slice(4,15).replace(/-/g,"/");return N?r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,null,r.a.createElement(f.a,{xxs:"12"},r.a.createElement(p.a,{heading:"".concat(O.username),match:a}),r.a.createElement("div",{className:"text-zero top-right-button-container"},r.a.createElement(s.a,{color:"danger",size:"lg",outline:!0,className:"top-right-button",onClick:function(){A.push("/app/customers")}},r.a.createElement(g.a,{id:"Back"})),"  "),r.a.createElement(f.b,{className:"mb-5"}))),r.a.createElement("div",{className:"d-flex flex-column"},r.a.createElement(c.a,{className:"mb-4"},r.a.createElement(f.a,{xxs:"12"},r.a.createElement(m.a,null,r.a.createElement(u.a,null,r.a.createElement(c.a,null,r.a.createElement(o.a,null,r.a.createElement(i.a,null,r.a.createElement("tbody",null,O.firstName&&r.a.createElement("tr",null,r.a.createElement("th",null,"First Name"),r.a.createElement("td",null,O.firstName)),O.email&&r.a.createElement("tr",null,r.a.createElement("th",null,"Email"),r.a.createElement("td",null,O.email)),O.address1&&r.a.createElement("tr",null,r.a.createElement("th",null,"Address 1"),r.a.createElement("td",null,O.address1)),O.city&&r.a.createElement("tr",null,r.a.createElement("th",null,"City"),r.a.createElement("td",null,O.city)),O.country&&r.a.createElement("tr",null,r.a.createElement("th",null,"Country"),r.a.createElement("td",null,O.country)),O.phone&&r.a.createElement("tr",null,r.a.createElement("th",null,"Phone"),r.a.createElement("td",null,O.phone)),O.creditTerm&&r.a.createElement("tr",null,r.a.createElement("th",null,"Credit Term"),r.a.createElement("td",null,O.creditTerm)),O.userPhone1&&r.a.createElement("tr",null,r.a.createElement("th",null,"User Phone 1"),r.a.createElement("td",null,O.userPhone1)),O.userPhone3&&r.a.createElement("tr",null,r.a.createElement("th",null,"User Phone 3"),r.a.createElement("td",null,O.userPhone3))))),r.a.createElement(o.a,null,r.a.createElement(i.a,null,r.a.createElement("tbody",null,O.lastName&&r.a.createElement("tr",null,r.a.createElement("th",null,"Last Name"),r.a.createElement("td",null,O.lastName)),O.emailCC&&r.a.createElement("tr",null,r.a.createElement("th",null,"Email CC"),r.a.createElement("td",null,O.emailCC)),O.address2&&r.a.createElement("tr",null,r.a.createElement("th",null,"Address 2"),r.a.createElement("td",null,O.address2)),O.state&&r.a.createElement("tr",null,r.a.createElement("th",null,"State"),r.a.createElement("td",null,O.state)),O.zipCode&&r.a.createElement("tr",null,r.a.createElement("th",null,"Zip Code"),r.a.createElement("td",null,O.zipCode)),O.businessName?r.a.createElement("tr",null,r.a.createElement("th",null,"Business Name"),r.a.createElement("td",null,O.businessName)):"",O.creditLimit?r.a.createElement("tr",null,r.a.createElement("th",null,"Credit Limit"),r.a.createElement("td",null,O.creditLimit)):"",O.userPhone2?r.a.createElement("tr",null,r.a.createElement("th",null,"User Phone 2"),r.a.createElement("td",null,O.userPhone2)):"")))),r.a.createElement(c.a,{className:"mt-3"},r.a.createElement(o.a,null),r.a.createElement(o.a,null,O.createdAt&&r.a.createElement("div",null,r.a.createElement("span",{className:"font-weight-bold mr-3 mt-2"},"Joined Us On :")," ",new Date(O.createdAt).toString()),r.a.createElement("div",null,r.a.createElement("span",{className:"font-weight-bold mr-3 mt-2"},"Last Order Total :"," ")," ","$ ",function(){var e=0;return M.forEach((function(a){var t=a.paymentDetail;t.grandTotal>e&&(e=t.grandTotal)})),e}()),r.a.createElement("div",null,r.a.createElement("span",{className:"font-weight-bold mr-3 mt-2"},"Total No. Of Orders :")," ",M.length),r.a.createElement("div",null,r.a.createElement("span",{className:"font-weight-bold mr-3 mt-2"},"Order Grand Total ( Till ",L," ) :"," ")," ","$ ",function(){var e=0;return M.forEach((function(a){return e+=a.paymentDetail.grandTotal})),e.toFixed(2)}()))))))))):r.a.createElement("div",{className:"loading"})}}}]);