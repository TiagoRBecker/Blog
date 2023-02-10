import Footer from "../Footer"
import  Nav from "../Nav/index"
export type Children ={
    children: React.ReactNode
}
const LayoutWeb = ({children}:Children)=>{
return(
    <>
    <Nav/>
   <main className="w-full min-h-screen">
    {children}
   </main>
   <Footer/>
   </>
)
}
export default LayoutWeb




