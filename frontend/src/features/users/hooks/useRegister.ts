import {useMutation} from '@tanstack/react-query'
import apiClient from '@/services/api-client'

export interface User{
    id: number,
    username: string,
    email: string,
    first_name: string,
    last_name:string,
}

interface RegisterData{
    username: string;
    password: string;
    first_name: string;
    email: string;
    last_name?: string | undefined;
}

const useRegister = () =>{
    return useMutation<User, Error, RegisterData>({
        mutationFn: (userData: RegisterData) => {
             return apiClient
                        .post<User>("/auth/users/", userData)
                        .then(res => res.data)
        }
    })
} 

export default useRegister;