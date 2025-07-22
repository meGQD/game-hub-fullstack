import apiClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";

interface ProfileData{
    first_name: string;
    phone: string;
    birth_date: string;
    last_name?: string | undefined;
}

const useUpdateProfile = () => {
    return useMutation<ProfileData, Error, ProfileData>({
        mutationFn: (profileData: ProfileData) => {
            return apiClient
                        .put<ProfileData>("/accounts/profiles/me/", profileData)
                        .then(res => res.data)
        }
    })
}

export default useUpdateProfile;