import{b as x,r as o,c as T,j as e}from"./index-CJpT4Mpi.js";import{u as $}from"./useMutation-C7nlVA5o.js";import{u as B}from"./useQuery-BWJx_JCY.js";import{B as u}from"./Button-CWgbnBvx.js";import{u as D}from"./Translate-Bz6qGM8U.js";import{u as L,P as q,T as I}from"./Pagination-4_R8EG9X.js";import{C as Q}from"./ConfirmPopup-D7lvN5wv.js";import{I as F,c as h}from"./customToast-DW0GGLWY.js";import"./es-D9rJmWfh.js";import"./react-DzjR_lZ5.js";import"./proxy-BgVQIM8n.js";class K{static async getOrders(n,d,m,l){try{return(await x.get("order/getOrders",{params:{status:n,skip:d,limit:m,reservation_num:l}})).data}catch(i){throw console.error("Error getting orders:",i),i}}}const M=()=>{const[t,n]=o.useState("all"),d=T(),{confirm:m,setConfirm:l,orderId:i}=L(),[g,j]=o.useState(0),{translate:s}=D(),[p,a]=o.useState(1),[f,y]=o.useState(""),[C,v]=o.useState(!0),k=5,b=$({mutationFn:async r=>{await x.delete("order/deleteOrder/"+r)},onSuccess:()=>{h("success",s("order_deleted_successfully")),d.invalidateQueries({queryKey:["orders"]}),l(!1)},onError:()=>{h("error",s("error_deleting_vehicle")),l(!1)}}),{data:S,isLoading:w,error:_,refetch:c}=B("orders",async()=>{const r=await K.getOrders(t,p,k,f);return v(r.hasNextPage),j(r.totalPages),r.order}),N=o.useMemo(()=>[{column:"order_number",key:"order_num"},{column:"date",key:"departureDate"},{column:"status",key:"status"},{column:"customer",key:"customer.name"},{column:"vehicle",key:"vehicle.brand"},{column:"total",key:"total"},{column:"",key:"button"}],[]),O=()=>_?"Something went wrong":w?e.jsx("h1",{children:"Loading..."}):e.jsx(I,{data:S,headers:N,isOrder:!0}),P=()=>{b.mutate(i)};o.useEffect(()=>{c()},[t,p,c]),o.useEffect(()=>{f===""&&c()},[f,c]);const E=r=>{r.preventDefault(),c()};return e.jsxs("div",{className:"orders",children:[e.jsx(F,{}),e.jsxs("div",{className:"filter",children:[e.jsxs("div",{className:"button_filter",children:[e.jsx(u,{properties:{type:"filter",btnClass:`${t=="all"?"selected":""}`,onClickfn:()=>{n("all"),a(1)}},children:s("all")}),e.jsx(u,{properties:{type:"filter",btnClass:`${t=="0"?"selected":""}`,onClickfn:()=>{n("0"),a(1)}},children:s("scheduled")}),e.jsx(u,{properties:{type:"filter",btnClass:`${t=="1"?"selected":""}`,onClickfn:()=>{n("1"),a(1)}},children:s("in_progress")}),e.jsx(u,{properties:{type:"filter",btnClass:`${t=="2"?"selected":""}`,onClickfn:()=>{n("2"),a(1)}},children:s("completed")}),e.jsx(u,{properties:{type:"filter",btnClass:`${t=="3"?"selected":""}`,onClickfn:()=>{n("3"),a(1)}},children:s("canceled")})]}),e.jsxs("form",{className:"order_search",onSubmit:E,children:[e.jsx("input",{type:"text",placeholder:s("reservationNumber"),onChange:r=>{y(r.target.value)}}),e.jsx("button",{children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"lucide lucide-search",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.3-4.3"})]})})]})]}),O(),e.jsx(q,{pageCount:g,skip:p,setSkip:a,hasNextPage:C}),m&&e.jsx(Q,{title:"Borrar esta reserva",subTitle:"Esta reserva sera eliminada completamente ¿Seguro que deseas continuar? ",onConfirm:P,onCancel:()=>{l(!1)}})]})},Z=()=>e.jsx("div",{className:"container",children:e.jsx(M,{})});export{Z as default};
