import Image from "next/image"
import {Categoreis } from "../../utils/Types/data"

export const ListCategories = ({
 name,url, posts
}:Categoreis)=>{
    return(
        <section className="">
            <div className="">
                <div className="">
                    {name}
                </div>
                <div className="">
                    grid 
                    <div className="">
                        <div className="">
                            {posts?.title}
                        </div>
                        <div className="">
                            <Image src={posts?.url as string} width={500} height={500} alt={posts?.title as string}/>
                        </div>
                        <div className="">
                            texto
                        </div>
                        <div className="">
                            ler mais
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}