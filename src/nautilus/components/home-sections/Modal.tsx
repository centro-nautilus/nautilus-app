import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

export interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    serviceName: string,
    description: string
}
export const Modal = ({ isOpen, onClose, serviceName, description }: ModalProps) => {
    if (!isOpen) return null;
    const navigate = useNavigate()
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
                    {/* Backdrop (Fondo oscuro) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Contenido del Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                        className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none"
                        >
                            &times;
                        </button>

                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#172A45] pr-8">
                                {serviceName}
                            </h2>
                            <hr className="border-gray-100" />
                            <p className="text-gray-600 text-lg">
                                {description}
                            </p>

                            <button
                                onClick={() => {
                                    onClose(),
                                    navigate('/agendar')
                                }}
                                className="cursor-pointer mt-6 w-full bg-[#08A8D2] text-white py-4 rounded-xl font-bold hover:bg-[#0797bd] transition-all shadow-md active:scale-95"
                            >
                                Agenda Ahora
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}