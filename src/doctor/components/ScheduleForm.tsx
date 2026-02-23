import type { FormEvent } from "react"

interface ScheduleFormProps {
    closeForm: () => void
    newSchedule: (payload: { day_of_week: number, start_time: string, end_time: string }) => void
}
export const dayOfWeek = {
    'domingo': 0,
    'lunes': 1,
    'martes': 2,
    'miercoles': 3,
    'jueves': 4,
    'viernes': 5,
    'sabado': 6
}
export type DayKey = keyof typeof dayOfWeek;
export const ScheduleForm = ({ closeForm, newSchedule }: ScheduleFormProps) => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const dayName = formData.get('day') as DayKey
        const payload = {
            day_of_week: dayOfWeek[dayName],
            start_time: formData.get('init_time') as string,
            end_time: formData.get('end_time') as string
        }
        newSchedule(payload)
        closeForm()
    }

    return <form onSubmit={handleSubmit} className="border-2 bg-white border-[#21B1C4] p-4 rounded-md flex flex-col gap-3">
        <h2 className="font-semibold">Nuevo horario</h2>
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <label htmlFor="day">Dia de la semana</label>
                <select name="day" id="day" className="py-2 indent-2 shadow-sm border rounded-md border-[#E4EEFA] ">
                    <option value="lunes">Lunes</option>
                    <option value="martes">Martes</option>
                    <option value="miercoles">Miercoles</option>
                    <option value="jueves">Jueves</option>
                    <option value="viernes">Viernes</option>
                    <option value="sabado">Sabado</option>
                    <option value="domingo">Domingo</option>
                </select>
            </div>
            <div className="flex gap-2 justify-between">
                <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="">Hora inicio</label>
                    <input name="init_time" type="time" className="py-2 indent-2 shadow-sm border rounded-md border-[#E4EEFA]" />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="">Hora fin</label>
                    <input name="end_time" type="time" className="py-2 indent-2 shadow-sm border rounded-md border-[#E4EEFA]" />
                </div>
            </div>
            <div className="flex justify-between gap-2 mt-1 ">
                <button className="flex-1 py-2 bg-[#21B1C4] text-white font-semibold rounded-md cursor-pointer" type="submit" >Agregar</button>
                <button type="button" className="flex-1 py-2 bg-[#F5F8FA] font-semibold rounded-md cursor-pointer" onClick={() => closeForm()}>Cancelar</button>
            </div>
        </div>
    </form>
}