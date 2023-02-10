import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import LayoutWeb from "../../../components/LayoutWeb"
import api from "../../../utils/api"
export type Categories ={
    id:number,
    name:string,
    posts:[],
   
}
const News = ({article}:any)=>{
   
useEffect(()=>{

},[article])

    
      
 

  
    return(
     <LayoutWeb>
        <section className="container mx-auto bg-gray-900 md:bg-green-700  ">

        <div className="text-white container mx-auto  grid grid-cols-2 gap-4">

         {
            article.map((item:any,indice:any)=>(
                <div key={indice} className="flex items-center justify-center flex-col">
                    <Link href={`categories/${item.id}`}>
                 <div>
                    <h1>{item.name}</h1>
                 </div>
                 <div>
                       <Image src={item.url}width={250} height={250} alt="teste"/>
                 </div>
                 <div>
                    <span>Numero de artigos publicados ( {item.posts.length} )</span>
                </div>
                </Link>

                </div>
            ))
         }
            
            
            
        </div>


        </section>
     </LayoutWeb>
    )
}
export default News


export async function getServerSideProps(){
    const response = await  api.getCategories()
    const data = await response.get
   
  

    return {
        props:{
           article:data
        }
    }
}