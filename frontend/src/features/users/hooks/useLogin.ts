import apiClient from "@/services/api-client";
import useAppStore from "@/store";
import { useMutation } from "@tanstack/react-query";
import type { User } from "./useRegister";

interface LoginData {
    username: string,
    password: string,
}

interface AuthResponse{
    access: string,
    refresh: string,
}

const useLogin = () => {
    const loginAction = useAppStore(s => s.auth.login)
    const setAccessToken = useAppStore(s => s.auth.setAccessToken)

    return useMutation<AuthResponse, Error, LoginData>({
        mutationFn: (loginData: LoginData) => {
            return apiClient
                        .post<AuthResponse>("/auth/jwt/create/", loginData)
                        .then(res => res.data)
        },
        onSuccess: (data: AuthResponse) => {
            setAccessToken(data.access)
            return apiClient
                        .get<User>("/auth/users/me/")
                        .then(res => {
                            loginAction({
                                user: res.data,
                                access: data.access,
                                refresh: data.refresh
                            })
                            console.log(`Access Token: ${data.access}`)
                        })
        }
    })
}

export default useLogin;