import type { UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Spinner } from "../ui/Spinner"
import { Alert } from "../ui/Alert"
import { FormSectionTitle } from "./FormSectionTitle"
import type { AppointmentSchemaType } from "../../schemas/appointment.schemas"
import { ScheduleList } from "./ScheduleList"
import { useQuery } from "@tanstack/react-query"
import { getSchedulesAvalaible } from "../../actions/get-schedules-avalaible"


interface FormScheduleProps {
    setValue: UseFormSetValue<AppointmentSchemaType>,
    watch: UseFormWatch<AppointmentSchemaType>,
    doctorId: string
}

export const FormSchedule = ({ setValue, watch, doctorId }: FormScheduleProps) => {
    const currentSchedule = watch('schedule');
    const date = watch('date')
    const hasDate = !!date;

    const { isLoading, data: schedules = [] } = useQuery({
        queryKey: ['schedules', doctorId, date],
        queryFn: async () => {
            if (!hasDate) return []
            return await getSchedulesAvalaible(doctorId, watch('date'))
        }
    })
 
    return (
        <div className="bg-white p-4 py-8 md:p-10 rounded-xl flex flex-col gap-6 md:gap-10 border border-gray-100 shadow-lg">
            <FormSectionTitle title='Selecciona un horario' description='Horarios disponibles para tu cita' step={2} />
            {!hasDate && <Alert message="Seleccione una fecha" variant="warning" />}
            {hasDate && isLoading && <Spinner />}
            {hasDate && !isLoading && schedules.length === 0 && <Alert message="No hay horarios disponibles" variant="error" />}
            {hasDate && !isLoading && schedules.length > 0 && <ScheduleList schedules={schedules} setValue={setValue} currentSchedule={currentSchedule} />}

        </div>
    );
};


