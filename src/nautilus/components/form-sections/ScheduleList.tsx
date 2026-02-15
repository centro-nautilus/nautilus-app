import type { UseFormSetValue } from "react-hook-form";
import type { Schedule } from "../../interfaces/schedule.interface";
import type { AppointmentSchemaType } from "../../schemas/appointment.schemas";



export interface SchedulesListProps {
    schedules: Schedule[],
    setValue: UseFormSetValue<AppointmentSchemaType>,
    currentSchedule: string
}

export const ScheduleList = ({schedules, setValue, currentSchedule}: SchedulesListProps) => {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
        {
            schedules.map((schedule) => {
                return (
                    <div
                        key={schedule.id}
                        className={`p-4 md:p-6 md:border-3 border-2 border-gray-200 rounded-xl text-center cursor-pointer transition-all hover:scale-105
                                        ${schedule.start_time === currentSchedule ? 'bg-[#16B3DE] text-white border-[#16B3DE]' : ''}`}
                        onClick={() => setValue('schedule', schedule.start_time, { shouldValidate: true, shouldTouch: true })}
                    >
                        <span className="md:text-xl ">{schedule.start_time} - {schedule.end_time}</span>
                    </div>
                );
            })
        }
    </div>
}