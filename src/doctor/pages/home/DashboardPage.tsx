
import { getAppointments } from "../../actions/get-appointment-action"
import { AuthStore } from "../../../auth/store/auth.store";
import { Spinner } from "../../../nautilus/components/ui/Spinner";
import { useQuery } from '@tanstack/react-query';
import { TodayAppointment } from "../../components/TodayAppointment";
import { Alert } from "../../../nautilus/components/ui/Alert";


export const DashboardPage = () => {
    const { token, doctor_id } = AuthStore();
    const { data: appointments = [], isLoading } = useQuery({
        queryKey: ['todayAppointments', doctor_id],
        queryFn: () => getAppointments(doctor_id!),
        enabled: !!token && !!doctor_id,
        staleTime: 1000 * 60 * 1,
        select: (allAppointments) => {
            const today = new Date().toLocaleString('sv-SE', {
                timeZone: 'America/Santiago'
            }).split(' ')[0]
            const appointmentsOnDay = allAppointments.filter(appointment => today === String(appointment.appointment_date).split('T')[0] && appointment.appointment_status === 'confirmed')
            return appointmentsOnDay.sort((a,b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime())
        }
    });
    return <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Citas de hoy</h1>
        {isLoading && <Spinner />}
        {!isLoading && appointments.length === 0 && <Alert variant="warning" message="No hay citas para hoy"/>}
        {!isLoading && appointments.length > 0 && <TodayAppointment appointments={appointments} />}
    </div>
}