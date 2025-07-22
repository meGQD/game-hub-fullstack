import apiClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";

interface ProfileData{
    first_name: string;
    phone: string;
    birth_date: string;
    last_name?: string | undefined;
}

interface UpdateProfileData{
    first_name: string;
    phone: string;
    birth_date: string;
    last_name?: string | undefined;
}

const useUpdateProfile = () => {
    return useMutation<ProfileData, Error, UpdateProfileData>({
        mutationFn: (profileData: UpdateProfileData) => {
            return apiClient
                        .put<ProfileData>("/accounts/profiles/me/", profileData)
                        .then(res => res.data)
        }
    })
}

export default useUpdateProfile;