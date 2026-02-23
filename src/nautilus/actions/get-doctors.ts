
import { nautilusApi } from '../../api/nautilus.api'
import type { Doctor } from '../interfaces/doctor.inferface'

export const getDoctors = async (): Promise<Doctor[]> => {
    const response = await nautilusApi.get(`/doctors`)
    return response.data
}

