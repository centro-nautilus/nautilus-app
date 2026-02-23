import { nautilusApi } from "../../api/nautilus.api";

export const userInfoAction = async () => {

    try {
        const response = await nautilusApi.get('/auth/profile')
        return response.data;
    } catch (err) {
        console.log(err)
        throw err
    }
}