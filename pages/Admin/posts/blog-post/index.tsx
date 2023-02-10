import Image from "next/image";
import Link from "next/link";
import Button from "../../../../components/Button";
import { LayoutAdmin } from "../../../../components/LayoutAdmin";
import api from "../../../../utils/api";

export type Posts = {
  posts: [];
};

const PostList = ({ posts }: Posts) => {
  const formateDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-br");
  };

  return (
    <LayoutAdmin>
      <div className="w-full h-full  overflow-auto cel:h-full">
       
          <h1 className="px-5 py-5 text-2xl text-gray-600">Blog Posts</h1>
       
     <div className="w-full pb-12 grid grid-cols-3 justify-items-center gap-1   tablet:grid-cols-2 cel:block py-5 px-5">
        {
            posts.map((category:any , indice:number)=>(
            <>
                {
                    category.posts.map((posts:any, inidce:number)=>(
                  
               
                     <div className="w-full pb-10 gap-2">
                        <div className="relative">
                            <div className="w-full h-48 cel:flex items-center justify-center h ">
                                <img 
                                
                                className="rounded-md w-full  h-48 cel:w-9/12 flex items-center justify-center h "
                                src={posts.url} alt="teste"/>
                            </div>
                            <div className="absolute top-3 right-2">
                                <span className={category.name==="Animes"?"bg-blueC py-1 px-5 rounded-full ":"bg-greenC rounded-full py-1 px-5"}>{category.name}</span>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="abosulte -mt-5 ml-5 cel:ml-20 ">
                                <Image 
                                className="border-2 border-gray-200 rounded-full"
                                src={"/perfil.jpg"} height={35} width={35} alt="perfil"/>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <h1 className="w-full text-xl text-gray-500 cel:text-center">{posts.title}</h1>
                        </div>
                        <div className=" w-full h-full max-h-16 overflow-y-hidden  flex mt-5 justify-center px-1">
                          <p className=" text-gray-500 text-sm cel:w-full ">{posts.content}</p>
                          
                        </div>
                        
                        <div className="py-5">
                            <p className="px-1">Publicado:{formateDate(posts.creatdate)}</p>
                        </div>
                        <Link href={`/Admin/posts/blog-post/${posts.id}`}>
                        <div className="w-full flex items-center justify-center">
                            <Button className={category.name==="Animes"?"bg-blueC py-1 px-5 rounded-full hover:bg-greenC ":"bg-greenC rounded-full py-1 px-5 hover:bg-blueC"} title="ler mais.."/>
                        </div>
                        </Link>
                    </div>
                   
                    

                        ))
                }
           
            </>
            ))
           
        }
        
        
     </div>

      </div>
    </LayoutAdmin>
  );
};
export default PostList;

export async function getServerSideProps(ctx: any) {
  const category = await api.getCategories();

  return {
    props: {
      posts: category.get,
    },
  };
}
