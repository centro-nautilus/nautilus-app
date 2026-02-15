import { z } from 'zod'

const validateRUT = (rut: string) => {
    const clean = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
    if (!/^\d{7,8}[0-9K]$/.test(clean)) return false;

    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);

    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * multiplier;
        multiplier = multiplier < 7 ? multiplier + 1 : 2;
    }

    const mod = 11 - (sum % 11);
    const dvExpected = mod === 11 ? "0" : mod === 10 ? "K" : mod.toString();

    return dv === dvExpected;
};

export const appointmentSchema = z.object({

    date: z
        .string()
        .min(1, "Debes seleccionar una fecha"),
    
    schedule: z
        .string()
        .min(1, "Debes seleccionar un horario"),

    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no puede exceder 50 caracteres")
        .regex(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras y espacios"),

    rut: z
        .string()
        .min(9, "El RUT debe tener al menos 9 caracteres")
        .max(12, "El RUT no puede exceder 12 caracteres")
        .refine(validateRUT, "RUT inválido"),

    email: z
        .string()
        .email("Correo electrónico inválido")
        .max(100, "El correo no puede exceder 100 caracteres"),

    phoneNumber: z
        .string()
        .min(8, "El teléfono debe tener al menos 8 dígitos")
        .max(15, "El teléfono no puede exceder 15 dígitos")
        .regex(/^[0-9]+$/, "El teléfono solo puede contener números"),

    address: z
        .string()
        .min(5, "La dirección debe tener al menos 5 caracteres")
        .max(100, "La dirección no puede exceder 100 caracteres"),

    comment: z
        .string()
        .max(200, "El comentario no puede exceder 200 caracteres")
        .optional(),
});

export type AppointmentSchemaType = z.infer<typeof appointmentSchema>