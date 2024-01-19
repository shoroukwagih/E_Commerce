import axios from "axios";

export const axiosInstance = axios.create({
      baseURL:'https://dummyjson.com/products'
});

axiosInstance.interceptors.request.use(function(config){
console.log(config)
config.headers['Authorization']='ACCESS_TOKEN 12364asd4a5sd3a2sd'
config.headers['Accept-language']='ar'
return config;
},function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    return Promise.reject(error);
});