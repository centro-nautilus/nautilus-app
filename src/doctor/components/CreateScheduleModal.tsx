import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchedule } from "../actions/create-schedule.action";
import { AuthStore } from "../../auth/store/auth.store";
import { useState } from "react";

export const CreateScheduleModal = ({ setIsOpen, days }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, days: { name: string, index: number }[] }) => {
    const queryClient = useQueryClient();
    const { token } = AuthStore()

    const mutation = useMutation({
        mutationFn: createSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments', token] });
            setIsOpen(false);
        }
    });

    const [formValue, setFormValue] = useState<{ day_of_week: number | null, init_time: string | null, end_time: string | null }>({
        day_of_week: 1,
        init_time: null,
        end_time: null
    })
    return <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-100 relative">

            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500"
            >
                ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Agregar horario</h2>

            <div className="flex flex-col gap-3">
                <select name="" id="" className="p-2 border rounded-lg" onChange={(e) => setFormValue({ ...formValue, day_of_week: +e.target.value })}>
                    {
                        days.map(day => <option value={day.index}>{day.name}</option>)
                    }
                </select>
                <label htmlFor="">Inicio del bloque</label>
                <input
                    type="time"
                    className="border p-2 rounded-lg"
                    onChange={(e) => setFormValue({ ...formValue, init_time: e.target.value })}
                />
                <label htmlFor="">Fin del bloque</label>
                <input
                    type="time"
                    className="border p-2 rounded-lg"
                    onChange={(e) => setFormValue({ ...formValue, end_time: e.target.value })}
                />
                <button className="bg-[#03AAC8] text-white py-2 rounded-lg" onClick={() => mutation.mutate({
                    data: {
                        day_of_week: formValue.day_of_week!,
                        start_time: (formValue.init_time)!,
                        end_time: (formValue.end_time)!
                    },
                    token: (token)!
                })}>
                    Guardar
                </button>
            </div>

        </div>
    </div>
}