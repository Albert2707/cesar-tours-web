import{r as d,j as u}from"./index-CJpT4Mpi.js";import{B as F}from"./Button-CWgbnBvx.js";import{m as W}from"./proxy-BgVQIM8n.js";let _={data:""},G=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||_,H=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,R=/\/\*[^]*?\*\/|  +/g,D=/\n+/g,b=(e,t)=>{let r="",o="",s="";for(let a in e){let n=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+n+";":o+=a[1]=="f"?b(n,a):a+"{"+b(n,a[1]=="k"?"":t)+"}":typeof n=="object"?o+=b(n,t?t.replace(/([^,])+/g,i=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,i):i?i+" "+l:l)):a):n!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=b.p?b.p(a,n):a+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+o},y={},T=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+T(e[r]);return t}return e},U=(e,t,r,o,s)=>{let a=T(e),n=y[a]||(y[a]=(l=>{let c=0,p=11;for(;c<l.length;)p=101*p+l.charCodeAt(c++)>>>0;return"go"+p})(a));if(!y[n]){let l=a!==e?e:(c=>{let p,g,f=[{}];for(;p=H.exec(c.replace(R,""));)p[4]?f.shift():p[3]?(g=p[3].replace(D," ").trim(),f.unshift(f[0][g]=f[0][g]||{})):f[0][p[1]]=p[2].replace(D," ").trim();return f[0]})(e);y[n]=b(s?{["@keyframes "+n]:l}:l,r?"":"."+n)}let i=r&&y.g?y.g:null;return r&&(y.g=y[n]),((l,c,p,g)=>{g?c.data=c.data.replace(g,l):c.data.indexOf(l)===-1&&(c.data=p?l+c.data:c.data+l)})(y[n],t,o,i),n},X=(e,t,r)=>e.reduce((o,s,a)=>{let n=t[a];if(n&&n.call){let i=n(r),l=i&&i.props&&i.props.className||/^go/.test(i)&&i;n=l?"."+l:i&&typeof i=="object"?i.props?"":b(i,""):i===!1?"":i}return o+s+(n??"")},"");function O(e){let t=this||{},r=e.call?e(t.p):e;return U(r.unshift?r.raw?X(r,[].slice.call(arguments,1),t.p):r.reduce((o,s)=>Object.assign(o,s&&s.call?s(t.p):s),{}):r,G(t.target),t.g,t.o,t.k)}let S,I,L;O.bind({g:1});let x=O.bind({k:1});function Y(e,t,r,o){b.p=t,S=e,I=r,L=o}function v(e,t){let r=this||{};return function(){let o=arguments;function s(a,n){let i=Object.assign({},a),l=i.className||s.className;r.p=Object.assign({theme:I&&I()},i),r.o=/ *go\d+/.test(l),i.className=O.apply(r,o)+(l?" "+l:"");let c=e;return e[0]&&(c=i.as||e,delete i.as),L&&c[0]&&L(i),S(c,i)}return s}}var Z=e=>typeof e=="function",N=(e,t)=>Z(e)?e(t):e,q=(()=>{let e=0;return()=>(++e).toString()})(),B=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),J=20,E=new Map,Q=1e3,M=e=>{if(E.has(e))return;let t=setTimeout(()=>{E.delete(e),w({type:4,toastId:e})},Q);E.set(e,t)},V=e=>{let t=E.get(e);t&&clearTimeout(t)},z=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,J)};case 1:return t.toast.id&&V(t.toast.id),{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:r}=t;return e.toasts.find(a=>a.id===r.id)?z(e,{type:1,toast:r}):z(e,{type:0,toast:r});case 3:let{toastId:o}=t;return o?M(o):e.toasts.forEach(a=>{M(a.id)}),{...e,toasts:e.toasts.map(a=>a.id===o||o===void 0?{...a,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+s}))}}},$=[],C={toasts:[],pausedAt:void 0},w=e=>{C=z(C,e),$.forEach(t=>{t(C)})},K={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},ee=(e={})=>{let[t,r]=d.useState(C);d.useEffect(()=>($.push(r),()=>{let s=$.indexOf(r);s>-1&&$.splice(s,1)}),[t]);let o=t.toasts.map(s=>{var a,n;return{...e,...e[s.type],...s,duration:s.duration||((a=e[s.type])==null?void 0:a.duration)||(e==null?void 0:e.duration)||K[s.type],style:{...e.style,...(n=e[s.type])==null?void 0:n.style,...s.style}}});return{...t,toasts:o}},te=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||q()}),j=e=>(t,r)=>{let o=te(t,e,r);return w({type:2,toast:o}),o.id},m=(e,t)=>j("blank")(e,t);m.error=j("error");m.success=j("success");m.loading=j("loading");m.custom=j("custom");m.dismiss=e=>{w({type:3,toastId:e})};m.remove=e=>w({type:4,toastId:e});m.promise=(e,t,r)=>{let o=m.loading(t.loading,{...r,...r==null?void 0:r.loading});return e.then(s=>(m.success(N(t.success,s),{id:o,...r,...r==null?void 0:r.success}),s)).catch(s=>{m.error(N(t.error,s),{id:o,...r,...r==null?void 0:r.error})}),e};var re=(e,t)=>{w({type:1,toast:{id:e,height:t}})},ae=()=>{w({type:5,time:Date.now()})},se=e=>{let{toasts:t,pausedAt:r}=ee(e);d.useEffect(()=>{if(r)return;let a=Date.now(),n=t.map(i=>{if(i.duration===1/0)return;let l=(i.duration||0)+i.pauseDuration-(a-i.createdAt);if(l<0){i.visible&&m.dismiss(i.id);return}return setTimeout(()=>m.dismiss(i.id),l)});return()=>{n.forEach(i=>i&&clearTimeout(i))}},[t,r]);let o=d.useCallback(()=>{r&&w({type:6,time:Date.now()})},[r]),s=d.useCallback((a,n)=>{let{reverseOrder:i=!1,gutter:l=8,defaultPosition:c}=n||{},p=t.filter(h=>(h.position||c)===(a.position||c)&&h.height),g=p.findIndex(h=>h.id===a.id),f=p.filter((h,A)=>A<g&&h.visible).length;return p.filter(h=>h.visible).slice(...i?[f+1]:[0,f]).reduce((h,A)=>h+(A.height||0)+l,0)},[t]);return{toasts:t,handlers:{updateHeight:re,startPause:ae,endPause:o,calculateOffset:s}}},oe=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ie=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ne=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,le=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${oe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ie} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ne} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ce=x`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,de=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ce} 1s linear infinite;
`,pe=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ue=x`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,me=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ue} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,fe=v("div")`
  position: absolute;
`,ge=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,he=x`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ye=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${he} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,xe=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return t!==void 0?typeof t=="string"?d.createElement(ye,null,t):t:r==="blank"?null:d.createElement(ge,null,d.createElement(de,{...o}),r!=="loading"&&d.createElement(fe,null,r==="error"?d.createElement(le,{...o}):d.createElement(me,{...o})))},be=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ve=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,we="0%{opacity:0;} 100%{opacity:1;}",je="0%{opacity:1;} 100%{opacity:0;}",ke=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ee=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,$e=(e,t)=>{let r=e.includes("top")?1:-1,[o,s]=B()?[we,je]:[be(r),ve(r)];return{animation:t?`${x(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${x(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ce=d.memo(({toast:e,position:t,style:r,children:o})=>{let s=e.height?$e(e.position||t||"top-center",e.visible):{opacity:0},a=d.createElement(xe,{toast:e}),n=d.createElement(Ee,{...e.ariaProps},N(e.message,e));return d.createElement(ke,{className:e.className,style:{...s,...r,...e.style}},typeof o=="function"?o({icon:a,message:n}):d.createElement(d.Fragment,null,a,n))});Y(d.createElement);var Ne=({id:e,className:t,style:r,onHeightUpdate:o,children:s})=>{let a=d.useCallback(n=>{if(n){let i=()=>{let l=n.getBoundingClientRect().height;o(e,l)};i(),new MutationObserver(i).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return d.createElement("div",{ref:a,className:t,style:r},s)},Oe=(e,t)=>{let r=e.includes("top"),o=r?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:B()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...o,...s}},Ae=O`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,k=16,De=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:s,containerStyle:a,containerClassName:n})=>{let{toasts:i,handlers:l}=se(r);return d.createElement("div",{style:{position:"fixed",zIndex:9999,top:k,left:k,right:k,bottom:k,pointerEvents:"none",...a},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},i.map(c=>{let p=c.position||t,g=l.calculateOffset(c,{reverseOrder:e,gutter:o,defaultPosition:t}),f=Oe(p,g);return d.createElement(Ne,{id:c.id,key:c.id,onHeightUpdate:l.updateHeight,className:c.visible?Ae:"",style:f},c.type==="custom"?N(c.message,c):s?s(c):d.createElement(Ce,{toast:c,position:p}))}))},Me=m;const P={success:{svg:u.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"lucide lucide-circle-check-big",children:[u.jsx("path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}),u.jsx("path",{d:"m9 11 3 3L22 4"})]}),backGround:"#16a34a"},error:{svg:u.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"lucide lucide-circle-alert",children:[u.jsx("circle",{cx:"12",cy:"12",r:"10"}),u.jsx("line",{x1:"12",x2:"12",y1:"8",y2:"12"}),u.jsx("line",{x1:"12",x2:"12.01",y1:"16",y2:"16"})]}),backGround:"#e11d48"},warning:{svg:u.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"lucide lucide-triangle-alert",children:[u.jsx("path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}),u.jsx("path",{d:"M12 9v4"}),u.jsx("path",{d:"M12 17h.01"})]}),backGround:"#f59e0b"}},Pe=(e,t)=>{m.custom(r=>u.jsxs(W.div,{style:{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:P[e].backGround,color:"#f2f2f2",borderRadius:"10px",padding:"15px 20px",gap:"20px",fontWeight:"600",minWidth:"250px"},initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},children:[u.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",justifyContent:"center"},children:[P[e].svg,u.jsx("span",{children:t})]}),u.jsx(F,{properties:{type:"toast",onClickfn:()=>m.dismiss(r.id)},children:"X"})]}))};export{De as I,Me as _,Pe as c,m as n};
