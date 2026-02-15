import { LuActivity, LuEar } from "react-icons/lu"
import { SectionTitle } from "./SectionTitle"
import { IoIosSearch } from "react-icons/io"
import { FiRefreshCw } from "react-icons/fi"
import { useState } from "react"
import { Modal } from "./Modal"

export const Services = () => {

    const services = [
        { name: "Revisión con video-otoscopía", description: 'Examen que permite observar el interior del oído mediante una cámara de alta definición', required: false, icon: IoIosSearch },
        { name: "Limpieza de oído", description: "Procedimiento destinado a eliminar tapones de cerumen acumulado en el conducto auditivo, ayudando a mejorar la audición y aliviar molestias como sensación de oído tapado", required: false, icon: LuEar },
        { name: "Rehabilitación vestibular", description: "Terapia basada en ejercicios específicos que ayudan a disminuir el mareo y el vértigo, mejorando el equilibrio y la estabilidad en las actividades diarias, Requieren indicación médica previa", required: true, icon: LuActivity },
        { name: "Maniobras de reposicionamiento de partículas (VPPB)", description: "Procedimientos específicos utilizados para tratar el vértigo posicional, mediante movimientos guiados de la cabeza que permiten recolocar las partículas del oído interno en su posición correcta. Requieren indicación médica previa", required: true, icon: FiRefreshCw },
    ]

    const [isOpen, setIsOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<{
        name: string;
        description: string;
        required: boolean;
    } | null>(null);

    const handleOpenModal = (service: any) => {
        setSelectedService(service);
        setIsOpen(true);
    };

    return <div className="flex flex-col gap-8 md:gap-12">
        <SectionTitle title='Nuestros Servicio' description='Ofrecemos una amplia gama de prestaciones a domicilio para cuidar tu salud auditiva y vestibular.' />
        <div className="flex flex-col md:grid gap-8 md:grid-cols-1 xl:grid-cols-2">
            {services.map(({ icon: Icon, ...service }) => (
                <div
                    key={service.name}
                    className="cursor-pointer flex flex-1 flex-col justify-center items-center rounded-xl shadow-lg hover:scale-105 transition-all p-4 md:p-10 bg-[#F7FDFF] border border-gray-100 gap-4 md:gap-6"
                    onClick={() => handleOpenModal(service)} // Cambiado aquí
                >
                    <Icon className="bg-[#08A8D2] p-2 size-12 md:p-4 rounded-xl md:size-20 self-center text-white" />
                    <h3 className="text-xl font-semibold md:text-2xl text-[#172A45] text-center">{service.name}</h3>
                    <p className={`md:text-xl text-lg leading-relaxed text-center self-center px-4 py-1 rounded-xl ${service.required ? 'bg-[#E0F2FE] text-[#075985]' : 'bg-[#F1F5F9] text-[#334155]'}`}>
                        {service.required ? 'Requiere orden médica' : 'No requiere orden médica'}
                    </p>
                </div>
            ))}
        </div>
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            serviceName={selectedService?.name || ''}
            description={selectedService?.description || ''}
        />

    </div>
}