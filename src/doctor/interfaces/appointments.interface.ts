export interface Appointments {
    id: string;
    appointment_date: string;
    appointment_status: string;
    address_snapshot: string;
    email_snapshot: string;
    phone_number_snapshot: string;
    comment: string;
    doctor_id: string;
    patient_id: string;
    created_at: Date;
    updated_at: null;
    deleted_at: null;
    patient: Patient;
}

export interface Patient {
    name: string;
    rut: string;
}