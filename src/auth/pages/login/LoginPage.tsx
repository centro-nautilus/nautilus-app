import { HiOutlineMail } from "react-icons/hi"
import { Input } from "../../../nautilus/components/ui/Input"
import { TbLockPassword } from "react-icons/tb";
import { type FormEvent } from "react";
import { AuthStore } from "../../store/auth.store";


export const LoginPage = () => {

    const { login } = AuthStore()

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        await login(email, password);

    }



    return <div className="flex justify-center tp">
        <div className="bg-white p-4 pt-8 pb-8 md:p-10 flex flex-col gap-6 md:gap-8 border border-gray-100 shadow-lg rounded-xl max-w-200 self-center">
            <div className="flex flex-col gap-2 md:gap-4">
                <h1 className="md:text-5xl text-3xl font-medium">Bienvenido de nuevo</h1>
                <p className="text-xl text-gray-500">Accede a tu portal para gestionar citas y pacientes</p>
            </div>
            <form action="" className="flex flex-col gap-6" onSubmit={handleLogin}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-lg ">Correo electronico</label>
                    <Input id="email" name='email' type="email" error="" icon={HiOutlineMail} placeholder="test@nautiluscenter.com" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-lg ">Contraseña</label>
                    <Input id="password" name='password' type="password" error="" icon={TbLockPassword} placeholder="*****" />
                </div>
                <button type="submit" className="w-full bg-[#10ACDB] p-3 md:py-4 cursor-pointer hover:scale-105 transition-all rounded-xl text-white md:text-xl font-bold">Iniciar Sesión</button>
            </form>
        </div>
    </div>
}