import { nautilusApi } from "../../api/nautilus.api";

export const userInfoAction = async (token: string) => {

    try {
        const response = await nautilusApi.get('/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (err) {
        console.log(err)
        throw err
    }
}