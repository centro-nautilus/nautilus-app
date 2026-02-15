import type { UseFormWatch } from "react-hook-form"
import { AiFillCheckCircle } from "react-icons/ai"
import type { AppointmentSchemaType } from "../../schemas/appointment.schemas"
import { MdOutlineDateRange, MdOutlineSchedule } from "react-icons/md"
import { FiUser } from "react-icons/fi"
import { FormResumeCard } from "./FormResumeCard"


interface FormResumeProps {
    watch: UseFormWatch<AppointmentSchemaType>,
    isValid: boolean,
    isSubmitting: boolean,
}


export const FormResume = ({ watch, isValid, isSubmitting }: FormResumeProps) => {

    const date = watch('date')
    const schedule = watch('schedule')
    const name = watch('name')
    const phoneNumber = watch('phoneNumber')
    const address = watch('address')
    const rut = watch('rut')
    const email = watch('email')

    return <div className="bg-white p-4 pt-8 pb-8 md:p-10 rounded-xl flex flex-col gap-6 border border-gray-100 shadow-lg ">
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 md:gap-4 items-center">
                <AiFillCheckCircle className="mt-0.5 size-10 md:size-13 text-[#16B3DE]" />
                <h2 className="text-xl md:text-3xl font-semibold">Resumen de tu cita</h2>
            </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
            <FormResumeCard icon={MdOutlineDateRange} title="Fecha">
                <span className="text-[#697E8A] font-semibold text-[18px] md:text-2xl">
                    {date || 'Selecciona una fecha'}
                </span>
            </FormResumeCard>
            <FormResumeCard icon={MdOutlineSchedule} title="Horario">
                <span className="text-[#697E8A] font-semibold text-[18px] md:text-2xl">
                    {schedule && `${schedule} hrs` || 'Selecciona un horario'}
                </span>
            </FormResumeCard>
            <FormResumeCard icon={FiUser} title="Paciente">
                <span className="text-[#697E8A] font-semibold text-[18px] md:text-2xl">{name || 'Ingrese sus datos'}</span>
                <span className="text-[#697E8A] font-semibold text-[14px] md:text-xl">{rut || ''}</span>
                <span className="text-[#697E8A] font-semibold text-[14px] md:text-xl">{email || ''}</span>
                <span className="text-[#697E8A] font-semibold text-[14px] md:text-xl">{phoneNumber || ''}</span>
                <span className="text-[#697E8A] font-semibold text-[14px] md:text-xl">{address || ''}</span>
            </FormResumeCard>

            <button
                className={
                    `p-3 md:p-5 md:text-2xl bg-[#16B3DE] text-white font-semibold text-[18px] rounded-xl 
                    ${(!isValid || isSubmitting) ? 'opacity-40' : 'hover:scale-101 transition-all cursor-pointer'}
                `}
                type="submit"
                disabled={isSubmitting}
            >
                Confirmar cita
            </button>
        </div>
    </div>
}