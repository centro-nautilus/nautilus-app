import type { Dispatch, SetStateAction } from "react"

interface ModalProps {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
    cancelAppointment: (id: string) => void
    appointmentIdSelected: string
}

export const Modal = ({setIsModalVisible, cancelAppointment, appointmentIdSelected}: ModalProps) => {
    return <div className="fixed inset-0 z-50 flex items-center justify-center">

        <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalVisible(false)}
        />

        <div
            className="relative bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-lg font-semibold mb-4">
                Confirmar cancelación
            </h2>

            <p className="text-gray-600 mb-6">
                ¿Estás seguro que deseas cancelar esta cita?
            </p>

            <div className="flex justify-end gap-3">
                <button
                    className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsModalVisible(false)}
                >
                    Volver
                </button>

                <button
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    onClick={() => {
                        cancelAppointment(appointmentIdSelected)
                        setIsModalVisible(false)
                    }}
                >
                    Cancelar cita
                </button>
            </div>
        </div>
    </div>
}