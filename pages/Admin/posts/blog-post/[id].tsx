import Image from "next/image"
import {GetStaticProps} from "next"
import { useContext,useState } from "react"
import { ParsedUrlQuery } from "querystring"
import { AuthContext } from "../../../../context/Auth/AuthContex"
import { LayoutAdmin } from "../../../../components/LayoutAdmin"
import {MdDelete,MdCreate,MdSave,MdClose} from "react-icons/md";
import { Modal } from "../../../../components/Modal"
import api from "../../../../utils/api"
import Router from "next/router"



const Id = ({posts}:any)=>{

    
    

const [ showModalDel ,setShowModalDel] = useState(false)
const [ showModalSave ,setShowModalSave] = useState(false)

const formatDate = (data:Date)=>{
    return new Date(data).toLocaleDateString('pt-br')
}
const handleDelete = (id:number)=>{
   alert(`Post ${posts.title} deletado com sucesso`)
   setShowModalDel(false)
   Router.push("/Admin/posts/blog-post")
} 
const handleSave = ()=>{
   alert("Post aqruivado com sucesso")
   setShowModalSave(false)
}

const openModalDelete = ()=>{
    setShowModalDel(true)
}
const openModalSave =() =>{
  setShowModalSave(true)
}

const handleCloseModal = ()=>{
    setShowModalDel(false)
    setShowModalSave(false)
}
const { user } = useContext(AuthContext)
    return (
        <LayoutAdmin>
             
           
             <section className="w-full h-screen overflow-auto pb-14 relative ">
                <Modal
                 openModal={showModalDel?"modal":"hidden"}
                 slug_one="Deseja Apagar o post"
                 title={posts.title}
                 slug_two="permanente ?"
                 icons={<MdDelete size={25} color={"red"}/>}
                 close={<MdClose size={25} color={"red"}/>}
                 clickIcon={()=>{handleDelete(posts.id)}}
                 clickClose={handleCloseModal}
                />
                  <Modal
                 openModal={showModalSave?"modal":"hidden"}
                 slug_one="Deseja Arquivar o post"
                 title={posts.title}
                 slug_two=" ?"
                 icons={<MdSave size={35} color={"#3CB371"}/>}
                 close={<MdClose size={25} color={"#696969"}/>}
                 clickIcon={()=>{handleSave()}}
                 clickClose={handleCloseModal}
                />
                <h1 className="px-5 py-5 text-2xl text-gray-600">{posts.title}</h1>
                <div className="flex flex-col">
                    <div className=" w-full flex items-center justify-center mb-4">
                        <Image src={posts.url} alt={posts.title} width={900} height={500}  className="rounded-md"/>
                    </div>
                    <div className=" w-full">
                        <h1 className="py-5 text-2xl text-gray-600">Sinopse</h1>
                        <p className="text-lg text-gray-600">{posts.content}</p>
                    </div>
                    <div className="py-5">
                        <h1 className="text-lg text-gray-400 mb-2">Autor {user?.name}</h1>
                        <span>Publicado {formatDate(posts.creatdate)}</span>
                    </div>
                    <div className="w-full mb-10">
                        <button className="px-1">
                            <MdCreate size={35} color={"#1E90FF"}/>
                        </button>
                        <button className="px-1" onClick={openModalDelete}>
                           
                            <MdDelete size={35} color={"red"}/>
                        </button>
                        <button className=" px-1">
                            <MdSave size={35} color={"#40E0D0"} onClick={openModalSave}/>
                        </button>
                    </div>
                </div>
                
             </section>
        </LayoutAdmin>
        
    )
}
export default Id
export const getStaticPaths = async () => {
    const response = await api.getAllPost()
    const data =  await response.post

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
    
    const { id } = context.params as IParams
    const response = await api.getOnePost(id)
    
    
    return {
        props: {
            posts:response.getOne
    }
}
}