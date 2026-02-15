import { nautilusApi } from "../../api/nautilus.api";


interface CreateScheduleInterface {
    data: {
        day_of_week: number,
        start_time: string,
        end_time: string,
    }
    token: string
}

export const createSchedule = async ({ data, token }: CreateScheduleInterface) => {
    
    try {
        const response = await nautilusApi.post(`schedules`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return response.data;
    } catch (err) {
        console.log(err)
        throw err
    }
};