"use client";  

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditTurnoPage = ({ params }: { params: { id: string } }) => {
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
        const fetchTurno = async () => {
            try {
                const response = await axios.get(`/api/turnos/${id}`);
                const turno = response.data.data;
                setValue('nombre', turno.nombre);
                setValue('apellido', turno.apellido);
                setValue('telefono', turno.telefono);
                setValue('email', turno.email);
                setValue('hora', new Date(turno.hora).toISOString().substring(0, 16));
                setValue('dia', new Date(turno.dia).toISOString().substring(0, 10));
            } catch (error) {
                console.error('Error fetching turno:', error);
            }
        };

        fetchTurno();
    }, [id, setValue]);

    const onSubmit = async (data: any) => {
        try {
            await axios.put(`/api/turnos/${id}`, data);
            router.push('/admin/turnos');
        } catch (error) {
            console.error('Error updating turno:', error);
        }
    };

    return (
        <div>
            <h1>Editar Turno</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('nombre')} placeholder="Nombre" required />
                <input {...register('apellido')} placeholder="Apellido" required />
                <input type="number" {...register('telefono')} placeholder="Teléfono" required />
                <input type="email" {...register('email')} placeholder="Email" required />
                <input type="datetime-local" {...register('hora')} required />
                <input type="date" {...register('dia')} required />
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditTurnoPage;
