import {GetStaticProps} from "next"
import { ParsedUrlQuery } from "querystring"
import LayoutWeb from "../../../components/LayoutWeb"
import api from "../../../utils/api"
const CatId = ({data}:any) =>{
   
    return(
        <LayoutWeb>
         {
            data.map((item:any,indice:any)=>(
                <h1 key={indice}>{item.name}</h1>
            ))
         }
         <div>
           
         </div>
        </LayoutWeb>
        
    )
}
export default CatId

export const getStaticPaths = async () => {
    const response = await api.getCategories()
    const data =  await response.get

    const paths = data.map((item:any) =>({
        
        params:{
            id:item.id.toString()
        }
    }))
           
        
    return{ paths, fallback:false}
}
export interface IParams extends ParsedUrlQuery{
    id:string
}
export const getStaticProps:GetStaticProps = async (context)=>{
    
    const { id} = context.params as IParams
    const response = await api.getCategoriesId(id)
    const data =  await response.get
    console.log(data)
    return {
        props: {
            data:data
    }
}
}