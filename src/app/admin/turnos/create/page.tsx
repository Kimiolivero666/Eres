'use client'; 

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; 

const CreateTurnoPage = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            await axios.post('/api/turnos', data);
            router.push('/admin/turnos');
        } catch (error) {
            console.error('Error saving turno:', error);
        }
    };

    return (
        <div>
            <h1>Crear Turno</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('nombre')} placeholder="Nombre" required />
                <input {...register('apellido')} placeholder="Apellido" required />
                <input type="number" {...register('telefono')} placeholder="Teléfono" required />
                <input type="email" {...register('email')} placeholder="Email" required />
                <input type="datetime-local" {...register('hora')} required />
                <input type="date" {...register('dia')} required />
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CreateTurnoPage;
