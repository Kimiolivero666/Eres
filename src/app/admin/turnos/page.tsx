'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const AdminPage = () => {
    const [turnos, setTurnos] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [turnosPerPage] = useState(10); // Esto es una constante, pero debería estar en la lista de dependencias

    useEffect(() => {
        const fetchTurnos = async (page: number) => {
            try {
                const response = await axios.get(`/api/turnos?page=${page}&limit=${turnosPerPage}`);
                setTurnos(response.data.data);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.currentPage);
            } catch (error) {
                console.error('Error fetching turnos:', error);
            }
        };

        fetchTurnos(currentPage);
    }, [currentPage, turnosPerPage]); // Agrega turnosPerPage aquí

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container">
            <h1>Lista de Turnos</h1>
            <Link href="/admin/turnos/create" className="btn btn-primary mb-3">Crear Nuevo Turno</Link>
            <table className="table">
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
                                <Link href={`/admin/turnos/edit/${turno._id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                                <button onClick={() => handleDelete(turno._id)} className="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination>
                <Pagination.Prev onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} />
            </Pagination>
        </div>
    );
};

export default AdminPage;
