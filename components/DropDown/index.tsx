import Link from 'next/link'
import { Fragment , useContext } from 'react'
import { AuthContext } from '../../context/Auth/AuthContex'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { MdOutlineSettings,MdOutlineLogout,MdPersonPin } from "react-icons/md";

export type DropdownProps ={
    nameDrop?:string
    nameCreate?:string
    nameEdit?:string
    nameDelete?:string
    ancor_1?:string
    ancor_2?:string,
    ancor_3?:string,
    
    

}
function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }
  
  export  const DropDown =({ancor_1,ancor_2,ancor_3,nameCreate,nameDelete,nameDrop,nameEdit }:DropdownProps) => {
   const {signOut}  =  useContext(AuthContext)
    const Logout = () => {
  
      signOut();
    };
    return (
      <Menu as="div" className="relative inline-block text-left">
        
         
        <div>
          <Menu.Button className="inline-flex w-40 justify-center rounded-md   bg-opacity-95 px-4 py-2 my-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none ">
            {nameDrop}
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>
  
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="bg-white absolute -left-2 z-10 mt-0 w-44 origin-top-right divide-y divide-gray-100 rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/Admin/user/perfil"}
                    className={classNames(
                      active ? 'bg-white text-black' : 'text-gray-700',
                      'block px-4 py-1 text-md'
                    )}
                  >
                {<div className='flex items-center mt-0.5 gap-2'>
                  <MdPersonPin size={17} /> {nameCreate}
                </div>
                
                }
                 </Link>
                )}
              </Menu.Item>
              </div>
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={"/Admin/user/update-user"}
                    className={classNames(
                      active ? 'bg-white text-black' : 'text-gray-700',
                      'block px-4 py-1 text-md'
                    )}
                  >
                  {
                    <div className='flex items-center  gap-2  ' >
                     
                     <MdOutlineSettings size={15} className="mt-0.5"/> {nameEdit}
                    </div>
                  }
                 </Link>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                
                  
              <div className='flex items-center gap-2 px-4 cursor-pointer' onClick={Logout}>
                       <MdOutlineLogout size={15} color={"red"}/>  { nameDelete}
                </div>
                    
                   
                   
                
                
              </Menu.Item>
             
            </div>
            
          
           
          </Menu.Items>
        </Transition>
        
        
      </Menu>
    )
 }