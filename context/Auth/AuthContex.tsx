import { createContext } from "react";
export type User ={
    id:number,
    name:string
    avatar:string
}
export type AuthenticatedType = {
   loading:boolean
   user:User | null
   errors:string
   setErros:any
   signIn: (email:string, password:string) => void
   signOut: ()=> any
   signUp: (email:string,name:string,password:string)=>Promise<void>
}

 export const AuthContext = createContext<AuthenticatedType>(null!)
