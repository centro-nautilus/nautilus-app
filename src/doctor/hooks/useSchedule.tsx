import { useMutation, useQuery } from "@tanstack/react-query";
import type { GroupedSchedules, Schedule } from "../interfaces/schedule.interface";
import { getSchedules } from "../actions/get-schedule.action";
import { getDayName } from "../../utils/getDayName";
import { deleteSchedule } from "../actions/delete-schedule.action";
import { queryClient } from "../../app/queryClient";
import { createSchedule } from "../actions/create-schedule";
import toast from "react-hot-toast";

export const useSchedule = () => {
    const { data: schedules, isLoading } = useQuery<
        Schedule[],
        Error,
        GroupedSchedules
    >({
        queryKey: ['schedules'],
        queryFn: getSchedules,
        select: (schedules) => {
            const grouped: Record<string, Schedule[]> = {}

            const sorted = [...schedules].sort((a, b) => {
                if (a.day_of_week !== b.day_of_week) {
                    return a.day_of_week - b.day_of_week
                }
                return a.start_time.localeCompare(b.start_time)
            })

            sorted.forEach(schedule => {
                const dayName = getDayName(schedule.day_of_week)

                if (!grouped[dayName]) grouped[dayName] = []
                grouped[dayName].push(schedule)
            })

            return grouped
        }
    })

    const { mutate: deleteMutate } = useMutation({
        mutationFn: deleteSchedule,
        onMutate: async (scheduleId) => {
            // 1. Cancelamos peticiones en vuelo
            await queryClient.cancelQueries({ queryKey: ['schedules'] });

            // 2. Guardamos el snapshot del estado anterior
            const previousSchedules = queryClient.getQueryData<Schedule[]>(['schedules']);

            // 3. Actualizamos el caché eliminando el item inmediatamente
            if (previousSchedules) {
                queryClient.setQueryData(['schedules'], (old: Schedule[]) =>
                    old.filter(s => s.id !== scheduleId) // Asumo que el campo es .id
                );
            }

            return { previousSchedules };
        },
        onError: (_error, _id, context) => {
            if (context?.previousSchedules) {
                queryClient.setQueryData(['schedules'], context.previousSchedules);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules'] });
        }
    });

    const { mutate: createMutate } = useMutation({
        mutationFn: createSchedule,
        onMutate: async (newSchedulePayload) => {
            await queryClient.cancelQueries({ queryKey: ['schedules'] });

            const previousSchedules = queryClient.getQueryData<Schedule[]>(['schedules']);

            if (previousSchedules) {
                queryClient.setQueryData(['schedules'], (old: Schedule[]) => {
                    // Creamos un objeto temporal para que la UI lo pinte ya mismo
                    const tempSchedule = {
                        ...newSchedulePayload,
                        id: Date.now().toString(), // ID temporal
                    };
                    return [...old, tempSchedule];
                });
            }

            return { previousSchedules };
        },
        onError: (_error, _newVal, context) => {
            if (context?.previousSchedules) {
                queryClient.setQueryData(['schedules'], context.previousSchedules);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules'] });
        }
    });

    const deleteScheduleId = (scheduleId: string) => {
        deleteMutate(scheduleId)
        toast.success('Se elimino el horario correctamente', {className: 'py-2', position: 'bottom-right'})
    }

    const newSchedule = (payload: { day_of_week: number, start_time: string, end_time: string }) => {
        createMutate(payload)
        toast.success('Se creo el horario correctamente', {className: 'py-2', position: 'bottom-right'})
    }

    return {
        schedules,
        isLoading,
        deleteScheduleId,
        newSchedule
    }
}