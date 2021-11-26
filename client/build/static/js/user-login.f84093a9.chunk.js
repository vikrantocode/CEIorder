(this["webpackJsonpgogo-react"]=this["webpackJsonpgogo-react"]||[]).push([[85],{1132:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t(92),l=t(5),o=t.n(l),s=t(255),c=t(105),i=t(117),m=t(677),u=t(678),d=t(230),g=t(66),f=t(36),E=t(227),p=t(98),b=t(1),h=t(91),v=t(90),N=t(850),y=t(97),w=t.n(y),S={divStyle:{margin:"1rem"}};function x(e){return e.value.length<8?e.setCustomValidity("Password should be minimum 8 characters"):e.setCustomValidity(""),!0}var I=function(e){var a;return e?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)||(a="Invalid email address"):a="Please enter your email address",a};a.default=Object(f.b)((function(e){var a=e.authUser;return{loading:a.loading,error:a.error}}),{loginUserAction:b.ib})((function(e){var a=e.history,t=e.loading,f=e.error,b=(e.loginUserAction,Object(l.useState)({})),y=Object(r.a)(b,2),j=y[0],k=y[1];Object(l.useEffect)((function(){f&&p.b.warning(f,"Login Error",3e3,null,null,"")}),[f]);return o.a.createElement(s.a,{className:"h-100"},o.a.createElement(h.a,{xxs:"12",md:"10",className:"mx-auto my-auto"},o.a.createElement(c.a,{className:"auth-card"},o.a.createElement("div",{className:"position-relative image-side "},o.a.createElement("p",{className:"text-white h2"},"MAGIC IS IN THE DETAILS"),o.a.createElement("p",{className:"white mb-0"},"Please use your credentials to login.",o.a.createElement("br",null),"If you are not a member, please"," ",o.a.createElement(g.c,{to:"/user/register",className:"white"},"register"),".")),o.a.createElement("div",{className:"form-side"},o.a.createElement("div",{style:{fontSize:"2.5rem"}},"BUY SUPPLY APP"),o.a.createElement(i.a,{className:"mb-4"},o.a.createElement(v.a,{id:"user.login-title"})),o.a.createElement(E.c,null,o.a.createElement(E.b,{className:"av-tooltip tooltip-label-bottom"},o.a.createElement(m.a,{className:"form-group has-float-label"},o.a.createElement(u.a,null,o.a.createElement(v.a,{id:"user.email"})),o.a.createElement(E.a,{className:"form-control",name:"email",validate:I,onChange:function(e){k(Object(n.a)(Object(n.a)({},j),{},{email:e.target.value}))}})),o.a.createElement(m.a,{className:"form-group has-float-label"},o.a.createElement(u.a,null,o.a.createElement(v.a,{id:"user.password"})),o.a.createElement(E.a,{onChange:function(e){k(Object(n.a)(Object(n.a)({},j),{},{password:e.target.value}))},className:"form-control",type:"password",name:"password",oninput:function(){return x(void 0)},onvalid:function(){return x(void 0)}})),o.a.createElement("div",{style:S.divStyle,className:"d-flex justify-content-center align-items-center"},"OR"),o.a.createElement("div",{style:S.divStyle,className:"d-flex justify-content-center align-items-center"},o.a.createElement(N.GoogleLogin,{clientId:"501516992284-icth2bhte5iu6fpskcd97hcia62f9qdd.apps.googleusercontent.com",buttonText:"Login with Google",onSuccess:function(e){console.log(e),w.a.post("/api/googleLogin",{tokenId:e.tokenId}).then((function(e){e.data.token?(localStorage.setItem("user",JSON.stringify(e.data)),localStorage.setItem("auth-token",e.data.token),a.push("/app")):e.data.error&&console.log(e.data.error)}))},onFailure:function(e){console.log(e)},cookiePolicy:"single_host_origin"})),o.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},o.a.createElement(g.c,{to:"/user/forgot-password"},o.a.createElement(v.a,{id:"user.forgot-password-question"})),o.a.createElement(g.c,{to:"/user/register"},o.a.createElement(v.a,{id:"Create an Account"}))),o.a.createElement("div",{className:"d-flex justify-content-center align-items-center"},o.a.createElement(d.a,{onClick:function(e){e.preventDefault();var t=j;w.a.post("/api/login",t).then((function(e){console.log(e.data),e.data.token?(localStorage.setItem("user",JSON.stringify(e.data)),localStorage.setItem("userId",e.data.user.id),localStorage.setItem("auth-token",e.data.token),a.push("/app")):e.data.error&&p.b.warning(e.data.error,"Login Error",3e3,null,null,"")}))},color:"primary",className:"btn-shadow btn-multiple-state ".concat(t?"show-spinner":""),size:"lg"},o.a.createElement("span",{className:"spinner d-inline-block"},o.a.createElement("span",{className:"bounce1"}),o.a.createElement("span",{className:"bounce2"}),o.a.createElement("span",{className:"bounce3"})),o.a.createElement("span",{className:"label"},o.a.createElement(v.a,{id:"user.login-button"}))))))))))}))},90:function(e,a,t){"use strict";var n=t(5),r=t.n(n),l=t(333),o=t(249);a.a=Object(o.c)((function(e){return r.a.createElement(l.a,e)}),{withRef:!1})},91:function(e,a,t){"use strict";t.d(a,"a",(function(){return o})),t.d(a,"b",(function(){return s}));var n=t(5),r=t.n(n),l=t(254),o=function(e){return r.a.createElement(l.a,Object.assign({},e,{widths:["xxs","xs","sm","md","lg","xl","xxl"]}))},s=function(e){var a=e.className;return r.a.createElement("div",{className:"separator ".concat(a)})}}}]);