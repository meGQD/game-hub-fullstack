import useAppStore from "@/store";
import axios from "axios";
const axiosInstance =  axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = useAppStore.getState().auth.accessToken
    if(accessToken){
        config.headers.Authorization = `JWT ${accessToken}`
    }
    return config;
})


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = useAppStore.getState().auth.refreshToken
            if(!refreshToken){
                useAppStore.getState().auth.logout();
                return Promise.reject(error);
            }
            console.log("invalid access token, trying to get a new one using refreshToken")
            const baseURL = import.meta.env.VITE_BASE_URL;
            return axiosInstance
                        .post(`${baseURL}/auth/jwt/refresh/`, { refresh: refreshToken })
                        .then(res =>{
                            const newAccessToken = res.data.access;
                            useAppStore.getState().auth.setAccessToken(newAccessToken);
                            originalRequest.request.headers = `JWT ${newAccessToken}`;
                            return axiosInstance(originalRequest);
                        })
                        .catch(refreshError =>{
                            useAppStore.getState().auth.logout()
                            return Promise.reject(refreshError)
                        })
        }
    return Promise.reject(error)
    }
)

export default axiosInstance;