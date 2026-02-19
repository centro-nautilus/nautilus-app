import { nautilusApi } from "../../api/nautilus.api"
import { AuthStore } from "../store/auth.store";

export const refreshToken = async (): Promise<string> => {
    
    const response = await nautilusApi.post('/auth/refresh', null, { withCredentials: true }); // endpoint de refresh
    const newToken = response.data.token;

    AuthStore.setState({ token: newToken });
    return newToken;
}