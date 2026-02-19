import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getSchedules } from "../../actions/get-schedule.action"
import { Spinner } from "../../../nautilus/components/ui/Spinner"
import { MdOutlineSchedule } from "react-icons/md"
import { ScheduleForm } from "../../components/ScheduleForm"
import { getDayName } from "../../../utils/getDayName"
import { FiTrash } from "react-icons/fi"
import { queryClient } from "../../../app/queryClient"
import { deleteSchedule } from "../../actions/delete-schedule.action"


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
    const { data: schedules, isLoading } = useQuery<
        Schedule[],
        Error,
        GroupedSchedules
    >({
        queryKey: ['schedules'],
        queryFn: getSchedules,
        select: (data) => {
            return data.reduce((acc: any, current: any) => {
                const dayName = getDayName(current.day_of_week)
                if (!acc[dayName]) {
                    acc[dayName] = [];
                }
                acc[dayName].push(current);
                return acc;
            }, {} as Record<number, typeof data>);
        }
    })

    const { mutate, isPending, variables } = useMutation({
        mutationFn: deleteSchedule,
        onSuccess: () => {
            // Refresca la lista de horarios automáticamente
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
        },
        onError: (error) => {
            console.error("Error al eliminar horario:", error);
            alert("No se pudo eliminar el horario.");
        }
    })
    return <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap">
                <h1 className="text-2xl font-bold">Horario</h1>
                <p className="font-md text-gray-600">Gestiona tu disponibilidad semanal</p>
            </div>
            <button className="bg-[#21B1C4] text-white py-2 rounded-md font-semibold" onClick={() => setIsFormVisible(true)}>+ Agregar horario</button>
        </div>

        {isFormVisible && <ScheduleForm closeForm={() => setIsFormVisible(false)} />}
        {isLoading && <Spinner />}

        {!isLoading && !schedules && <div className="bg-white border-2 border-[#E4EEFA] rounded-md p-4 flex flex-col gap-2 items-center ">
            <MdOutlineSchedule className="size-12 text-[#21B1C4]" />
            <p className="text-center text-lg font-semibold">No tienes horarios configurados</p>
            <p className="text-sm text-center text-gray-600">Agrega horarios para que los pacientes sepan cuándo estás disponible</p>
        </div>}
        {!isLoading && schedules && <div className="flex flex-col gap-4">
            {
                Object.keys(schedules).map(day => {
                    return <div key={day} className="flex flex-col rounded-md border border-gray-200">
                        <h1 className="bg-[#d7ebee] px-4 py-2 capitalize font-semibold rounded-t-md text-md">{day}</h1>
                        {
                            schedules[day].map(schedule => <div key={schedule.id} className="px-4 py-2 flex justify-between items-center">
                                <p>{schedule.start_time} - {schedule.end_time}</p>
                                <FiTrash className={`cursor-pointer ${isPending && variables === schedule.id ? 'text-gray-500' : 'text-red-600'}`} onClick={() => mutate(schedule.id)} />
                            </div>)
                        }
                    </div>
                })
            }
        </div>}
    </div>
}


