const e=t=>{if(!t)return"";const[r,o]=t.split(":").map(Number),n=r>=12?"PM":"AM";return`${r%12||12}:${o.toString().padStart(2,"0")} ${n}`};export{e as f};
