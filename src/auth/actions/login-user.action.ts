import { nautilusApi } from "../../api/nautilus.api"

interface AuthResponse {
    sub: string
    role: string
    token: string
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        console.time("login")
        const response = await nautilusApi.post('/auth/login', { email, password }, { withCredentials: true })
        console.timeEnd("login")
        return response.data;
    } catch (err) {
        console.log(err)
        throw err
    }
}