import { Outlet } from "react-router"
import { FiCalendar, FiHome } from "react-icons/fi"
import { SideBar } from "../../components/ui/SideBar"
import { AiOutlineMenu } from "react-icons/ai"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { MdOutlineSchedule } from "react-icons/md"
import { FaRegClipboard } from "react-icons/fa";


export const DoctorLayout = () => {


    const menuList = [
        {
            icon: FiHome,
            label: 'Home',
            path: '/dashboard'
        },
        {
            icon: FiCalendar,
            label: 'Mi Agenda',
            path: '/dashboard/agenda'
        },
        {
            icon: FaRegClipboard,
            label: 'Historial',
            path: '/dashboard/history'
        },
        {
            icon: MdOutlineSchedule,
            label: 'Mi Horario',
            path: '/dashboard/schedule'
        }
    ]

    const [isMenuActivate, setMenuIsActivate] = useState(false)

    return <div className="flex h-dvh">


        <SideBar menuList={menuList} isMenuActivate={isMenuActivate} />

        <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="md:hidden flex justify-end p-4 py-6 bg-white border-b border-gray-200 sticky top-0">
                {
                    isMenuActivate
                        ? <IoMdClose className="flex md:hidden z-1000 self-end" size={28} onClick={() => setMenuIsActivate(false)} />
                        : <AiOutlineMenu className="flex md:hidden z-1000 self-end" size={28} onClick={() => setMenuIsActivate(true)} />
                }
            </div>

            <div className="px-4 py-8 md:py-16 md:px-80 bg-[#F5F8FA] h-screen">
                <Outlet />
            </div>
        </div>
    </div>
}