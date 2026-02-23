export interface Schedule {
    id: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    doctor_id: string;
    created_at: Date;
    updated_at: null;
    is_activated: boolean;
}
export type GroupedSchedules = Record<string, Schedule[]>;