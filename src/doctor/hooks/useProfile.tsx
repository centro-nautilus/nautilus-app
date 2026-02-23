import { useQuery } from "@tanstack/react-query"
import type { Profile } from "../interfaces/profile.interface"
import { getProfile } from "../actions/get-profile.action"
import { AuthStore } from "../../auth/store/auth.store"


export const useProfile = () => {
    const { token } = AuthStore()
    const { data: profile, isLoading } = useQuery<Profile>({
        queryKey: ['profile', token],
        queryFn: getProfile,
        enabled: !!token,
        retry: false
    })

    return {
        profile,
        isLoading
    }
}