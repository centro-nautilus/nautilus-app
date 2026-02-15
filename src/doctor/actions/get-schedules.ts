import { nautilusApi } from "../../api/nautilus.api";



export interface ScheduleInterface {
    id:           string;
    day_of_week:  number;
    start_time:   string;
    end_time:     string;
    doctor_id:    string;
    created_at:   Date;
    updated_at:   Date | null;
    is_activated: boolean;
}


export const getSchedules = async (token: string): Promise<ScheduleInterface[]> => {
    try {
        const response = await nautilusApi.get(`schedules`, {
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