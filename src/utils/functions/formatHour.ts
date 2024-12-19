export const formatHour =(hours?:string):string =>{
    if(!hours) return "";
    const [hour, minute]  =hours.split(":").map(Number)
    const period = hour >= 12 ?"PM":"AM"
    const hour12 = hour % 12 || 12;
    // padStart(2, "0") adds a leading zero if the number is single-digit
    // 1 -> 01
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  }