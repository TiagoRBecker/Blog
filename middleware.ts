 
import { NextResponse } from "next/server";
 export default function middleware (req:NextResponse){
    
     const token  = req.cookies.get("blogCookie")

    if(!token && req.url.includes("/Admin")){
        return NextResponse.redirect("https://blog-uuxg.vercel.app/signin")
    }
    if(token && req.url === "https://apiblog-production.up.railway.app/signin"){
         return NextResponse.redirect("https://blog-uuxg.vercel.app/Admin")
    }
   

  
    
}
     
 
