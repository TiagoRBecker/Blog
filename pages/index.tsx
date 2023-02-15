import Image from "next/image";
import About from "../components/About";
import LayoutWeb from "../components/LayoutWeb";
import api from "../utils/api";
import Posts from "../components/Posts";
import { LikePosts } from "../components/Posts/likePosts";
import { Adverts } from "../components/Adverts/index";
import Button from "../components/Button";



const Home = ({ data, like, categories }: any) => {



  const option = {
    year: "numeric",
    month: "long" || "long" || "long",
    weekday: "long" || "long",
    day: "numeric",
  };

  return (
  
   
    <LayoutWeb>
      <section className="w-full h-screen mx-auto py-10 overflow-auto">
        <h1 className="text-center text-white text-4xl">Blog News </h1>
        <div className="flex">
          <div className="w-3/4">
            <div className="bg">
              <div className=" text-white text-center px-3">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  dolorem eligendi autem magnam illo quaerat velit, laudantium
                  quo neque! Pariatur quis commodi repudiandae cum magni id,
                  vitae enim ab voluptatum.
                </p>
              </div>
              <span className="w-28 h-0.5 bg-slate-200 my-3"></span>
              <div className=" text-white pt-4">
                <button className="w-48 h-14 border-solid border-2 border-white text-white font-bold">
                  LER MAIS
                </button>
              </div>
            </div>
          </div>
          <About />
        </div>
        <div className="w-full h-72 flex my-4">
          <Adverts className="w-3/4 bg-blue-400 flex items-center justify-center" />
          <div className="flex-w-1/4 ">
            <aside>Pagina Facebook</aside>
          </div>
        </div>
        <h1 className="w-full text-center font-bold py-5 text-xl">Recents Posts</h1>
        <div className="flex   ">
          <div className="flex w-full flex-col h-full">
            {data.lastPost.map((posts: any, key: number) => (
               <div key={key}>
                <Posts
                 
                  title={posts.title}
                  content={posts.content}
                  url={posts.url}
                  creatdate={new Date(posts.creatdate).toLocaleString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                  })}
                  categorie={posts.categorie?.name as any}
                  
                  viewCount={posts.viewCount ? posts.viewCount : 0}
                  like={posts.like}
                  deslike={posts.deslike}
                />
              </div>
            ))}
          </div>
          <aside className="flex w-1/4 flex-col  justify-center h-full text-white bg-gray-900 ">
            <h1 className="text-center">Posts Populares</h1>
            <div className=" flex  flex-col items-center justify-center">
              {like.post.map((posts: any, key: number) => (
                <div key={key}>
                <LikePosts
                  key={key}
                  url={posts.url}
                  title={posts.title}
                  like={posts.like}
                  deslike={posts.deslike}
                  
            
                />
                </div>
              ))}
            </div>
          </aside>
        </div>
        <Adverts 
        className="bgFundo w-full h-screen bg-blue-400 flex items-center justify-center mx-auto text-4xl font-bold text-indigo-800"
        title={"Animes em alta!"} />

        {categories.get.map(
          (categorie:any, key: number) =>
            categorie.name === "Animes" && (
              <div key={key} className="">
                <div className="w-full py-10 text-center ">
                  <h1 className="text-xl text-sky-900 font-bold">
                    {categorie.name}
                  </h1>
                </div>
                <div className="grid w-full grid-cols-3  grid-rows-1 gap-2">
                  {categorie.posts?.map(
                    (posts: any, key: number) =>
                      (
                      
                          <div key={key} className="flex flex-col items-center justify-center w-full gap-2 py-3 px-3 shadow-md shadow-black border-2 border-solid border-stone-300 bg-gray-300 ">
                            <div className="w-full text-center font-bold py-5 text-xl ">
                              <h1>{posts.title}</h1>
                            </div>
                            <div className="w-ful ">
                              <Image
                                className="w-full h-64"
                                src={posts.url as string}
                                width={500}
                                height={500}
                                alt={posts.title as string}
                              />
                            </div>
                            <div className=" w-full h-auto text-justify">
                              <p className="whitespace-pre-line text-ellipsis overflow-hidden w-full h-12">
                                {posts.content}
                               
                              </p>
                            </div>
                            <div className="py-5">
                              <Button
                               className="bg-gray-900 text-white w-36 py-1 rounded-lg"
                               title="Ler mais"
                              />
                            </div>
                          </div>
                        
                      ) 
                  ) }
                </div>
              </div>
            ) 
        ) }
       
      </section>
                      
    </LayoutWeb>
  
  );
};
export default Home;

export const getStaticProps = async () => {
 

  
  const response = await api.getLastPost();
  const likePosts = await api.getLikePost();
  const getCategories = await api.getCategories();
   
  
  

  return {
    props: {
      data: response,
      like: likePosts,
      categories: getCategories,
    },
    revalidate: 102200,
  };
};
