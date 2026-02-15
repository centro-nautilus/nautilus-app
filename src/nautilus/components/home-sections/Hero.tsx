
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router";

export const Hero = () => {
    return (
        <div className="relative">
            {/* Sección Superior */}
            <div className="
                    bg-linear-to-b from-[#EEF5F8] to-[#D1EAF1] 
                    pt-8 pb-0 md:pt-28 md:pb-4 
            ">
                <div className="
                    flex flex-col md:items-center gap-8 md:text-center md:gap-10
                    px-6 md:px-20 

                ">
                    <div className="flex flex-col gap-4  md:gap-8" data-aos="fade-up">
                        <h1 className="text-[#172A45] text-4xl font-bold md:text-8xl max-w-7xl mx-auto leading-tight">
                            Tu bienestar es nuestra prioridad
                        </h1>
                        <p className="text-xl text-slate-600 font-semibold md:text-3xl max-w-6xl mx-auto leading-relaxed">
                            En Nautilus realizamos prestaciones de otorrinolaringología a domicilio, enfocadas en el área auditiva y vestibular
                        </p>
                    </div>

                    <Link
                        to={'/agendar'}
                        data-aos="fade-up"
                        className="
                        flex gap-2 items-center
                        bg-[#03AAC8] text-white hover:bg-[#0bb9d8] md:transition-all
                        px-8 py-3 mb-4 rounded-xl md:px-10 md:py-4 md:mb-0
                        font-semibold text-lg md:text-xl 
                        "
                    >
                        <MdOutlineDateRange className="size-8" />
                        Agendar Cita a Domicilio
                    </Link>
                </div>
            </div>


            <div className="w-full overflow-hidden leading-0 -mt-px">
                <svg
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    className="w-full h-10 md:h-62"
                >
                    <path
                        fill="#D1EAF1"
                        fillOpacity="1"
                        d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,213.3C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>
            </div>
        </div>
    );
};