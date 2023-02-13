import Image from "next/image"
import { useContext} from "react"
import { BsFacebook,BsInstagram,BsTwitter,BsYoutube } from "react-icons/bs";
import { AuthContext } from "../../context/Auth/AuthContex";

const About = ()=>{
    const { user } = useContext(AuthContext)
    console.log(user)
    return(
        
        <aside className="w-1/4 text-white flex items-center justify-items-center flex-col bg-white">
        <h1> About me</h1>

        <div className="w-44 h-44 bg-white rounded-full flex items-center justify-items-center py-5">
          <Image
            src={"/perfil.jpg"}
            width={250}
            height={250}
            alt="Perfil-usuario"
          />
        </div>
        <div className="text-red-600 flex items-center justify-items-center py-3 px-5">
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
            autem ipsam facilis aperiam laborum. Numquam aut nulla possimus
            consectetur, provident dicta minima unde fugiat quos eveniet
            eligendi. Rem, veritatis labore.
          </p>
        </div>
        <div className="text-black w-full flex-col">
            <h1 className="text-center"> Siga nos!</h1>
          
        
         <div className="flex py-2">
            <div className="w-1/3  flex items-center justify-center">
                <BsFacebook size={20} color={"black"}/>
            </div>
            <div className="w-1/3 flex items-center justify-center">
                <span>Facebook</span>
            </div>
            <div className="w-1/3 flex items-center justify-center">
                @cliente
            </div>
         </div>
         <div className="flex py-2">
            <div className="w-1/3 flex items-center justify-center">
                <BsInstagram size={20} color={"black"}/>
            </div>
            <div className="w-1/3 flex items-center justify-center">
                <span>Instagram</span>
            </div>
            <div className="w-1/3 flex items-center justify-center">
                @cliente
            </div>
         </div>
         <div className="flex py-2">
            <div className="w-1/3 flex items-center justify-center">
                <BsTwitter size={20} color={"black"}/>
            </div>
            <div className="w-1/3 flex items-center justify-center">
                <span>Twitter</span>
            </div>
            <div className="w-1/3 flex items-center justify-center">
                @cliente
            </div>
         </div>
         <div className="flex py-2">
            <div className="w-1/3 flex items-center justify-center">
                <BsYoutube size={20} color={"black"}/>
            </div>
            <div className="w-1/3 flex items-center justify-center">
                <span>YouTube</span>
            </div>
            <div className="w-1/3 flex items-center justify-center">
                @cliente
            </div>
         </div>

           
            
        
          
        </div>
      </aside>
    )
}
export default About