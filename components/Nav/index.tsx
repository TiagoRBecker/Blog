import Link from "next/link"
import { nav } from "../../utils/navlink"
const NavLink = ()=>{
    return(
       <header className="flex w-full h-full justify-around items-center bg-gray-900">
        <nav className="  w-2/6 h-28 flex justify-items-start items-center">
            { nav.map((item,indice)=>(
            <ul  key={indice}>
               <li className="p-4">
                <Link href={item.path} className="text-white">
                    {item.label}
                </Link>
               </li>
            </ul>
            ))
             
            }
           
        </nav>
        <div className="w-2/5 flex justify-end item-center">
            <input className="outline-none rounded-lg py-4 pl-3 h-6 w-full"
            type="text" 
            placeholder="Buscar artigos" />
        </div>
        <div className="flex justify-center item-center w-1/8">
            <h3 className="text-white">Logo</h3>
        </div>
       </header>
    )
}
export default NavLink