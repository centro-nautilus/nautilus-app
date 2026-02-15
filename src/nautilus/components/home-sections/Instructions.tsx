import { SectionTitle } from "./SectionTitle"


export const Instructions = () => {

    const instructions = [
        { step: '01', title: 'Seleccione fecha y hora', description: 'Escoge el momento que mejor te convenga' },
        { step: '02', title: 'Ingresa tus datos de contacto', description: 'Indica informacion personal para ponernos en contacto' },
        { step: '03', title: 'Recibe la visita', description: 'El profesional llegará a tu domicilio en la hora seleccionada.' },
    ]
    return <div className="flex flex-col gap-8 md:gap-16">
        <SectionTitle title='¿Como funciona?' description='Agendar tu cita médica a domicilio es muy sencillo' />
        <div className="flex flex-col gap-8 md:gap-2 text-center lg:flex-row">
            {
                instructions.map(instruction => {
                    return <div key={instruction.step} className="flex flex-col md:flex-1 gap md:gap-2">
                        <div className="flex flex-col gap-2 md:gap-6">
                            <span className="text-4xl md:text-6xl font-bold text-[#1eb3ce]">{instruction.step}</span>
                            <h3 className="text-xl font-semibold md:text-2xl text-[#172A45]">{instruction.title}</h3>
                        </div>
                        <p className=" text-gray-600 text-lg leading-relaxed md:text-xl">{instruction.description}</p>
                    </div>
                })
            }
        </div>
    </div>
}