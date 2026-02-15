import { FiCalendar, FiShield } from "react-icons/fi"
import { GrLocation } from "react-icons/gr"
import { MdOutlineSchedule } from "react-icons/md"
import { SectionTitle } from "./SectionTitle"

export const Benefits = () => {

    const benefits = [
        { id: 1, title: 'Agenda Fácil', description: 'Reserva tu cita de forma rápida y sencilla.', icon: FiCalendar },
        { id: 2, title: 'Atención a Domicilio', description: 'Recibe atención especializada sin salir de casa.', icon: GrLocation },
        { id: 3, title: 'Profesionales Certificados', description: 'Especialistas altamente calificados y comprometidos con tu bienestar.', icon: FiShield },
        { id: 4, title: 'Horarios Flexibles', description: 'Disponibilidad de lunes a sábado en múltiples horarios', icon: MdOutlineSchedule },
    ]

    return <div className="flex flex-col gap-8 md:gap-16 ">
        <SectionTitle
            title='¿Qué ofrece Nautilus?'
            description={`Porque entendemos lo incapacitante que puede ser no escuchar bien o vivir con vértigo. En Nautilus llevamos atención especializada en salud auditiva y del equilibrio directamente a tu hogar, entregando un trato cercano y profesional.`}
        />
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 xl:grid-cols-4">
            {
                benefits.map((benefit) => {
                    return <div key={benefit.id} className="
                       flex flex-col gap-3 md:gap-4 
                     bg-[#f7fdff] rounded-xl shadow-lg 
                       p-4 md:p-10
                    ">
                        <div className="flex flex-col gap-4 md:gap-6">
                            <benefit.icon className="bg-[#08A8D2] p-2 size-12 md:p-4 rounded-xl md:size-20 self-center" color="#FFFFFF" />
                            <h3 className="md:text-2xl font-semibold text-xl text-[#172A45] self-center text-center">{benefit.title}</h3>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed text-center">{benefit.description}</p>
                    </div>
                })
            }
        </div>
    </div>
}