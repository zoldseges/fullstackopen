(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,n,t){e.exports=t(39)},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(15),u=t.n(o),c=t(2),l=function(e){var n=e.value,t=e.onChange;return r.a.createElement("div",null,"filter:",r.a.createElement("input",{onChange:t,value:n}))},i=function(e){var n=e.nameOnChange,t=e.nameValue,a=e.numberOnChange,o=e.numberValue,u=e.handleSubmit;return r.a.createElement("div",null,r.a.createElement("h1",null,"add a new"),r.a.createElement("form",{onSubmit:u},r.a.createElement("div",null,"name:",r.a.createElement("input",{onChange:n,value:t})),r.a.createElement("div",null,"number:",r.a.createElement("input",{onChange:a,value:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},m=function(e){var n=e.persons,t=e.filterString,a=e.deleteHandler,o=n.filter(function(e){return e.name.toLowerCase().match(t.toLowerCase())});return r.a.createElement("div",null,r.a.createElement("h2",null,"Numbers"),r.a.createElement("table",null,r.a.createElement("tbody",null,o.map(function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,e.name,":"),r.a.createElement("td",null,e.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:function(){return a(n,e.id)}},"delete")))}))))},d=function(e){var n=e.notification,t=e.setNotification;if(null===n)return null;var a="error"===n.type?{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return setTimeout(function(){t(null)},3e3),r.a.createElement("div",{style:a},n.message)},s=t(3),f=t.n(s),b="/api/persons",g={getAll:function(){return f.a.get(b).then(function(e){return e.data})},create:function(e){return f.a.post(b,e).then(function(e){return e.data})},update:function(e,n){return f.a.put("".concat(b,"/").concat(e),n).then(function(e){return e.data})},remove:function(e){return f.a.delete("".concat(b,"/").concat(e))}},h=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),s=Object(c.a)(u,2),f=s[0],b=s[1],h=Object(a.useState)(""),p=Object(c.a)(h,2),v=p[0],E=p[1],w=Object(a.useState)(""),y=Object(c.a)(w,2),O=y[0],C=y[1],S=Object(a.useState)(null),j=Object(c.a)(S,2),k=j[0],A=j[1];Object(a.useEffect)(function(){g.getAll().then(function(e){return o(e)})},[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(d,{notification:k,setNotification:A}),r.a.createElement(l,{value:O,onChange:function(e){return C(e.target.value)}}),r.a.createElement(i,{nameValue:f,nameOnChange:function(e){return b(e.target.value)},numberValue:v,numberOnChange:function(e){return E(e.target.value)},handleSubmit:function(e){e.preventDefault(),C("");var n={name:f,number:v},a=t.find(function(e){return e.name.toLowerCase()===n.name.toLowerCase()}),r=t.find(function(e){return e.number===n.number});a?window.confirm("Do you want to overwrite ".concat(a.name,"'s number from\n")+"".concat(a.number," to ").concat(n.number))&&g.update(a.id,n).then(function(){g.getAll().then(function(e){return o(e)}),A({message:"".concat(n.name,"'s number is overwritten to ").concat(n.number),type:"notification"}),b(""),E("")}):r?A({message:"".concat(r.number," is already assigned to ").concat(r.name),type:"error"}):g.create(n).then(function(e){o(t.concat(e)),A({message:"".concat(n.name," added with number ").concat(n.number),type:"notification"}),b(""),E("")}).catch(function(e){console.log(e.response.data.message),A({message:e.response.data.message,type:"error"}),b(""),E("")})}}),r.a.createElement(m,{persons:t,filterString:O,deleteHandler:function(e,n){var t=e.find(function(e){return e.id===n});window.confirm("Do you really want to delete ".concat(t.name))&&g.remove(n).then(function(){g.getAll().then(function(e){return o(e)}),A({message:"".concat(t.name," is deleted"),type:"notification"})}).catch(function(e){A({message:"".concat(t.name," was already deleted"),type:"error"}),g.getAll().then(function(e){return o(e)})})}}))};u.a.render(r.a.createElement(h,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.f49cebc3.chunk.js.map