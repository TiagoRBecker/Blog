

import axios from "axios"
const baseUrl = "https://apiblog-production.up.railway.app"

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
    }
      
}