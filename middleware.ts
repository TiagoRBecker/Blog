 //https://blog-uuxg.vercel.app/signin
 //https://blog-uuxg.vercel.app/Admin
import { NextResponse } from "next/server";
 export default function middleware (req:NextResponse){
    
     const token  = req.cookies.get("blogCookie")

    if(!token && req.url.includes("/Admin")){
        return NextResponse.redirect("http://localhost:3000/signin")
    }
    if(token && req.url === "https://blog-uuxg.vercel.app/signin"){
         return NextResponse.redirect("https://blog-uuxg.vercel.app/Admin")
    }
    
   

  
    
}

     
 
