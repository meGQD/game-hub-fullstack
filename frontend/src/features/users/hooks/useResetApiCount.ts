import { toaster } from "@/components/ui/toaster";
import apiClient from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useResetApiCount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () =>
            apiClient.patch("/accounts/profiles/me/", { api_request_count: 0 }).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", "me"]});
            toaster.create({
                title: "Payment Successful",
                description: "You paid your bill.",
                type: "success",
                duration: 5000,
            });
        },
    });
};

export default useResetApiCount;