
export type Modal ={
    title:string
    slug_one:string
    slug_two:string
    openModal:string
    icons: any
    close:any
    clickIcon:()=> void
    clickClose:()=> void
}

export const Modal = ({title,slug_one,slug_two,clickIcon,clickClose,openModal,icons, close}:Modal) => {
    return (
        <div className={openModal}>
        <div className="w-2/4 py-2 px-1 text-black bg-[#C0C0C0] h-36 flex items-center justify-center flex-col rounded-md relative">
           <h1>{slug_one} <span className="text-blueC font-bold uppercase px-2"> {title} </span> {slug_two}</h1>
         <div className="flex items-center justify-center"> 
           <button className="mt-5" onClick={clickIcon}>
           {icons}
           </button>
           <button 
           onClick={clickClose}
           className="absolute top-1 right-3"> 
           {close}
           </button>
           </div>
        </div>
        </div>
    )
}