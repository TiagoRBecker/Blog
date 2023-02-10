import styles from "../../styles/Home.module.css"
import Button from "../Button"


export const Contact = ()=>{
    const handleEnv = ()=>{
        console.log("ok")
    }
    return(
        <div className={styles.bgContact}>
            <h1>Entre em contato!</h1>
            <div className="flex">
                <div className="w-96 h-full bg-slate-50">
                   <div className="w-96">
                       Icons 
                   </div>
                </div>
                <div className="w-2/4">
                    <form  className={styles.form}>
                        <div className={styles.input}>
                            <input type={"text"} placeholder="Nome"/>
                        </div>
                        <div className={styles.input}>
                            <input type={"email"} placeholder="E-mail"/>
                        </div>
                        <div className={styles.input}>
                            <textarea placeholder="Digite sua mensagem"></textarea>
                        </div>
                        <Button 
                        className=""
                        title="Enviar" 
                        click={handleEnv}/>
                    </form>
                </div>
            </div>
        </div>
    )
}