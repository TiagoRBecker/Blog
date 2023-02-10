 
import { NextResponse } from "next/server";
import { parseCookies } from "nookies";
 export default function middleware (req:NextResponse){
    
     const token  = req.cookies.get("blogCookie")

    if(!token && req.url.includes("/Admin")){
        return NextResponse.redirect("http://localhost:3000/signin")
    }
    if(token && req.url === "http://localhost:3000/signin"){
         return NextResponse.redirect("http://localhost:3000/Admin")
    }
   

  
    
}
     
 
