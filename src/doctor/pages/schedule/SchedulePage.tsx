import { useQuery, } from "@tanstack/react-query";
import { getSchedules } from "../../actions/get-schedules";
import { AuthStore } from "../../../auth/store/auth.store";
import { useState } from "react";
import { CreateScheduleModal } from "../../components/CreateScheduleModal";

export const SchedulePage = () => {

    const { token } = AuthStore()

    const { data: schedules } = useQuery({
        queryKey: ['appointments', token],
        queryFn: () => getSchedules(token!),
        enabled: !!token,
        staleTime: 1000 * 60 * 1,
    });
   

    const days = [
        { name: 'Lunes', index: 1 },
        { name: 'Martes', index: 2 },
        { name: 'Miercoles', index: 3 },
        { name: 'Jueves', index: 4 },
        { name: 'Viernes', index: 5 },
        { name: 'Sabado', index: 6 },
        { name: 'Domingo', index: 0 }
    ]
    const [isOpen, setIsOpen] = useState(false);

    return <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Mi Horario</h1>
        <button className="self-end px-6 py-2 rounded-xl bg-[#03AAC8] text-white" onClick={() => setIsOpen(true)}>Agregar</button>
        <div className="flex flex-col gap-4">
            {
                days.map(day => <div className="flex flex-col gap-2">
                    <h2>{day.name}</h2>
                    {
                        schedules?.filter(schedule => schedule.day_of_week === day.index).map(schedule => {
                            return <div className="border border-gray-200 p-2 rounded-xl flex justify-between">
                                <span>{schedule.start_time} - {schedule.end_time}</span>
                                <button className="text-white bg-red-400 px-4 py rounded-xl" onClick={() => console.log(schedule.id)}>delete</button>
                            </div>
                        })
                    }
                </div>)
            }
        </div>

        {
            isOpen && (
                <CreateScheduleModal setIsOpen={setIsOpen} days={days} />
            )
        }

    </div>
}