import axios from "axios";

const instance = axios.create({
    baseURL:"https://socialize-social-media.vercel.app"
})
axios.interceptors.request.use(
    function(config){
        return config;
    },
    function (error){
        return Promise.reject(error)
    }
)

export default  {
    get:instance.get,
    post:instance.post,
    delete:instance.delete,
    patch:instance.patch,
}