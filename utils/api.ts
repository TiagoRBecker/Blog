
import axios from "axios"
//const baseUrl = "http://localhost:8080" //dev
const baseUrl = "https://apiblog-production.up.railway.app" //produ
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default {
    getCategories:async () => {
       
 
            const response = await axios.get(`${baseUrl}/categories`)
            return response.data
          
      
        
    },
    
    getCategoriesId:async (id:string) => {
        const response = await axios.get(`${baseUrl}/categories/${id}`)
          
        return response.data
    },
    getOnePost: async  (id:string) =>{
        const  response = await axios.get(`${baseUrl}/posts/${id}`)
        return response.data
    },
    getAllPost: async  () =>{
        const  response = await axios.get(`${baseUrl}/posts`)
        return response.data
    },
    getLastPost: async  () =>{
        const  response = await axios.get(`${baseUrl}/lastposts`)
        return response.data
    },
    getLikePost: async  () =>{
        const  response = await axios.get(`${baseUrl}/likeposts`)
        return response.data
    },
    getViews:async ()=>{
        const response = await axios.get(`${baseUrl}/views`)
        return response.data
    },
    
    getUser: async (token:string)=>{
        const response = await axios.get(`${baseUrl}/user/me`, 
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    },
    checkingServer: async ()=>{
        return await axios.get(baseUrl)
    },
    authenticadet: async (email:string,password:string)=>{
         const auth = await axios.post(`${baseUrl}/user/signin`,{
            email,
            password
         })
         return auth.data
    },
    signup:async(name:string,email:string,password:string)=>{
        const createAccount = await axios.post(`${baseUrl}/user/signup`,{
            name,
            email,
            password
         })
         return createAccount.data

    },
    updateProfile:async(name:string,email:string,perfil:string,token:string)=>{
        const formData = new FormData();
        
        formData.append("file", perfil);
        formData.append("name", name);
        formData.append("email", email);
        

            const updateProfile = await  axios.post(`${baseUrl}/user/profile`,
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
            
            )
            return updateProfile.data
    },
    createPost: async(title:String, content:string,authorId:number,authorName:string, perfil:string,selectValue:number)=>{
        const formData = new FormData();
        formData.append("title", title as any);
        formData.append("content", content);
        formData.append("authorId", authorId as any);
        formData.append("authorName", authorName as any);
        formData.append("categoriesId", selectValue as any);
        formData.append("file", perfil as any);
       
        const createPost = await axios.post(`${baseUrl}/posts`,formData)
        return createPost.data
    },
    updatePost: async( id:number,title:string, content:string ,perfil:string)=>{
        const formData = new FormData();
        formData.append("title", title as any);
        formData.append("content", content);
        formData.append("file", perfil as any);
        const updatePost = await axios.put(`${baseUrl}/posts/${id}`,formData)
        return updatePost.data
    }
     
    
}