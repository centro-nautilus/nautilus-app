import { FormPatient } from "../../components/form-sections/FormPatient"
import { FormSchedule } from "../../components/form-sections/FormSchedule"
import { FormDate } from "../../components/form-sections/FormDate"
import { FormResume } from "../../components/form-sections/FormResume"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { appointmentSchema } from "../../schemas/appointment.schemas"
import { getDoctors } from "../../actions/get-doctors"
import { useQuery } from '@tanstack/react-query'
import { Spinner } from "../../components/ui/Spinner"
import { useFormSubmit } from "../../hooks/useFormSubmit"

export const BookAppointmentPage = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(appointmentSchema),
        mode: 'onTouched'
    });

    const { isLoading, data: doctors = [] } = useQuery({
        queryKey: ['doctor'],
        queryFn: async () => await getDoctors()
    })

    const { onSubmit, isSubmitting } = useFormSubmit(doctors[0]?.id)

    return <div className="flex flex-col gap-8 md:gap-20 p-4 md:p-20 mt-4">
        {isLoading && <Spinner />}
        {!isLoading && doctors.length === 0 && <p>No hay doctores en el sistema</p>}
        {!isLoading && doctors.length > 0 && <>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl text-center font-bold md:text-6xl">Agenda tu <span className="text-[#16B3DE]">cita</span></h1>
                <p className="text-center text-gray-500 text-xl md:text-3xl">Selecciona fecha, horario y completa tus datos</p>
            </div>

            <form action="" className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr] gap-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-8">
                    <section><FormDate setValue={setValue} watch={watch} /></section>
                    <section><FormSchedule setValue={setValue} watch={watch} doctorId={doctors[0].id} /></section>
                    <section><FormPatient register={register} errors={errors} /></section>
                </div>
                <section className="md:sticky md:top-32 md:self-start"><FormResume watch={watch} isValid={isValid} isSubmitting={isSubmitting} /></section>
            </form>
        </>}

    </div>
}

