'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AdminPage = () => {
    const [turnos, setTurnos] = useState<any[]>([]);

    useEffect(() => {
        const fetchTurnos = async () => {
            try {
                const response = await axios.get('/api/turnos');
                setTurnos(response.data.data);
            } catch (error) {
                console.error('Error fetching turnos:', error);
            }
        };

        fetchTurnos();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este turno?');
        if (confirmDelete) {
            try {
                await axios.delete(`/api/turnos/${id}`);
                setTurnos(prevTurnos => prevTurnos.filter(turno => turno._id !== id));
            } catch (error) {
                console.error('Error deleting turno:', error);
            }
        }
    };

    return (
        <div>
            <h1>Lista de Turnos</h1>
            <Link href="/admin/turnos/create">Crear Nuevo Turno</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Hora</th>
                        <th>Dia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {turnos.map(turno => (
                        <tr key={turno._id}>
                            <td>{turno.nombre}</td>
                            <td>{turno.apellido}</td>
                            <td>{turno.telefono}</td>
                            <td>{turno.email}</td>
                            <td>{new Date(turno.hora).toLocaleString()}</td>
                            <td>{new Date(turno.dia).toLocaleDateString()}</td>
                            <td>
                                <Link href={`/admin/turnos/edit/${turno._id}`}>Editar</Link>
                                <button onClick={() => handleDelete(turno._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
