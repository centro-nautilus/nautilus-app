import { Link, useNavigate } from "react-router"
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { RxEnter } from "react-icons/rx";
import { SideMenu } from "./SideMenu";
import { MdOutlineEmail, MdWorkOutline } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

interface HeaderProps {
    menuIsOpen: boolean,
    setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setScrollTarget: React.Dispatch<React.SetStateAction<string>>,
    sectionActive: string
}

export const navRoutes = [
    { id: 'home', name: 'Inicio', icon: IoHomeOutline },
    { id: 'services', name: 'Servicios', icon: MdWorkOutline },
    { id: 'contacts', name: 'Contacto', icon: MdOutlineEmail }
]

export const Header = ({ menuIsOpen, setMenuIsOpen, setScrollTarget, sectionActive }: HeaderProps) => {
    const navigate = useNavigate()

    return (
        <div className="w-full fixed z-1000">
            <div className="border-b bg-[#FAFBFC] border-b-gray-200 flex justify-between items-center p-4 md:px-32">
                <img
                    src={"/images/nautilus_logo.png"}
                    alt="Nautilus Logo"
                    className="w-52 cursor-pointer"
                    onClick={() => navigate('/')}
                />

                <nav className="hidden lg:flex md:gap-12 items-center">
                    {navRoutes.map(route => (
                        <Link
                            key={route.id}
                            to={'/'}
                            className={`font-medium text-xl hover:text-[#03AAC8] hover:bg-gray-100 px-4 py-2 rounded-xl transition-all ${sectionActive === route.id ? 'text-[#03AAC8]' : ''}`}
                            onClick={() => {
                                setScrollTarget("")
                                setTimeout(() => setScrollTarget(route.id), 0)
                            }}
                        >
                            {route.name}
                        </Link>
                    ))}
                </nav>

                <Link
                    to={'/auth'}
                    className="hidden lg:flex border border-[#03AAC8] text-[#03AAC8] transition-all  hover:border-[#10ACDB] hover:text-white hover:bg-[#10ACDB] font-medium py-2 items-center gap-2 px-4 rounded-md"
                >
                    <RxEnter size={24} />
                    <span className="text-xl">Iniciar Sesión</span>
                </Link>
                

                {menuIsOpen
                    ? <IoMdClose className="flex lg:hidden z-999" size={28} onClick={() => setMenuIsOpen(false)} />
                    : <AiOutlineMenu className="flex lg:hidden z-999" size={28} onClick={() => setMenuIsOpen(true)} />
                }
            </div>

            <SideMenu menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} setScrollTarget={setScrollTarget} sectionActive={sectionActive} />
        </div>
    )
}
