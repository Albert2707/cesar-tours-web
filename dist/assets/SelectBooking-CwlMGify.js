import{c as d}from"./react-DzjR_lZ5.js";import{j as p}from"./index-CJpT4Mpi.js";import{S as l}from"./react-select.esm-CJJuCj-l.js";import{u as c}from"./Translate-Bz6qGM8U.js";const g={passengerNo:1,paymentMethod:"Cash",bagsNo:0,trip_type:1,total:0,departureDate:new Date},h=d()(r=>({...g,setTripType:e=>r(()=>({trip_type:e})),setDepartureDate:e=>r(()=>({departureDate:e})),setReturnDate:e=>r(()=>({returnDate:e})),setOrigin:e=>r(()=>({origin:e})),setDestination:e=>r(()=>({destination:e})),setDistance:e=>r(()=>({distance:e})),setDuration:e=>r(()=>({duration:e})),setTotal:e=>r(()=>({total:e})),setDepartureHour:e=>r(()=>({departureHour:e})),setReturnHour:e=>r(()=>({returnHours:e})),setNoPassenger:e=>r(()=>({passengerNo:e})),setBagsNo:e=>r(()=>({bagsNo:e})),setVehicle:e=>r(()=>({vehicle:e})),setPaymentMethod:e=>r(()=>({paymentMethod:e}))})),y=({options:r,value:e,onChange:n,placeholder:a,isSearchable:i,customStyles:s})=>{const{translate:u}=c();return p.jsx(l,{options:r,value:e,className:"invalid",styles:{control:t=>({...t,borderColor:"rgba(51, 55, 64, 0.3)",...s,backgroundColor:"transparent",borderRadius:"10px",display:"flex",height:"47px",justifyContent:"center",alignItems:"center",fontSize:"12px",boxShadow:"none","&:hover":{borderColor:"none"}}),menu:t=>({...t,borderRadius:"10px",fontSize:"14px",backgroundColor:"#f2f2f2",fontWeight:600}),option:(t,o)=>({...t,backgroundColor:o.isFocused?"rgba(242, 75, 15, 0.1);":"transparent",color:o.isFocused?"orange":"inherit","&:active":{backgroundColor:"rgba(242, 75, 15, 0.1)"}}),indicatorSeparator:t=>({...t,display:"none"}),dropdownIndicator:t=>({...t,display:"none"}),valueContainer:t=>({...t,padding:"0",margin:"0 8px"}),singleValue:t=>({...t,margin:"0",fontSize:"14px",paddingLeft:"0"})},placeholder:u(a),onChange:n,menuPortalTarget:document.body,menuPlacement:"auto",menuPosition:"fixed",isSearchable:i})};export{y as S,h as u};
