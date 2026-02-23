import { useState } from "react"
import { Spinner } from "../../../nautilus/components/ui/Spinner"
import { MdOutlineSchedule } from "react-icons/md"
import { ScheduleForm } from "../../components/ScheduleForm"
import { FiTrash } from "react-icons/fi"
import { useSchedule } from "../../hooks/useSchedule"

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

export const SchedulePage = () => {
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false)
    const { schedules, isLoading, deleteScheduleId, newSchedule } = useSchedule()
    const schedulesByDay = Object.keys(schedules || [])
    
    return <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap">
                <h1 className="text-2xl font-bold">Horario</h1>
                <p className="font-md text-gray-600">Gestiona tu disponibilidad semanal</p>
            </div>
            <button className="bg-[#21B1C4] text-white py-2 rounded-md font-semibold cursor-pointer" onClick={() => setIsFormVisible(true)}>+ Agregar horario</button>
        </div>

        {isFormVisible && <ScheduleForm closeForm={() => setIsFormVisible(false)} newSchedule={newSchedule} />}
        {isLoading && <Spinner />}

        {!isLoading && schedulesByDay.length === 0 && <div className="bg-white border-2 border-[#E4EEFA] rounded-md p-4 flex flex-col gap-2 items-center ">
            <MdOutlineSchedule className="size-12 text-[#21B1C4]" />
            <p className="text-center text-lg font-semibold">No tienes horarios configurados</p>
            <p className="text-sm text-center text-gray-600">Agrega horarios para que los pacientes sepan cuándo estás disponible</p>
        </div>}
        {!isLoading && schedules && <div className="flex flex-col gap-4">
            {
                schedulesByDay.map(day => {
                    return <div key={day} className="flex flex-col rounded-md border border-gray-200">
                        <h1 className="bg-[#d7ebee] px-4 py-2 capitalize font-semibold rounded-t-md text-md">{day}</h1>
                        {
                            schedules[day].map(schedule => <div key={schedule.id} className="px-4 py-2 flex justify-between items-center">
                                <p>{schedule.start_time} - {schedule.end_time}</p>
                                <FiTrash className={`cursor-pointer text-red-500`} onClick={() => deleteScheduleId(schedule.id)} />
                            </div>)
                        }
                    </div>
                })
            }
        </div>}
    </div>
}


