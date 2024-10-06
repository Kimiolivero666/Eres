'use client';

import CalendarioHorario from '@/components/adminComponent/CalendarioHorario';
import HorarioDiaModal from '@/components/adminComponent/HorarioDiaModal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert, Table } from 'react-bootstrap';

interface Horario {
    _id: string;
    mes: number;
    año: number;
    dias: {
        dia: number;
        horarios: {
            inicio: string;
            fin: string;
        }[];
    }[];
}

const AdminHorariosPage = () => {
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingHorario, setEditingHorario] = useState<Horario | null>(null);
    const [newHorario, setNewHorario] = useState<{ mes: number; año: number }>({ mes: new Date().getMonth() + 1, año: new Date().getFullYear() });
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
    const [selectedDia, setSelectedDia] = useState<{ horarioId: string; dia: number } | null>(null);
    const [entrada, setEntrada] = useState<string>(''); // Nuevo estado para hora de entrada
    const [salida, setSalida] = useState<string>(''); // Nuevo estado para hora de salida

    useEffect(() => {
        fetchHorarios();
    }, []);

    const fetchHorarios = async () => {
        try {
            const response = await axios.get('/api/horarios');
            if (response.data.success) {
                setHorarios(response.data.data);
            } else {
                setAlert({ type: 'danger', message: response.data.message });
            }
        } catch (error) {
            console.error('Error fetching horarios:', error);
            setAlert({ type: 'danger', message: 'Error al obtener los horarios' });
        }
    };

    const handleShowModal = (horario?: Horario, dia?: number) => {
        if (horario) {
            setEditingHorario(horario);
            setNewHorario({ mes: horario.mes, año: horario.año });
        } else {
            setEditingHorario(null);
            setNewHorario({ mes: new Date().getMonth() + 1, año: new Date().getFullYear() });
        }
        
        // Si hay un día seleccionado, establecer el día y horarios
        if (dia !== undefined) {
            setSelectedDia({ horarioId: horario ? horario._id : '', dia });
            const existingHorarios = horario?.dias.find(d => d.dia === dia)?.horarios || [];
            setEntrada(existingHorarios[0]?.inicio || ''); // Cargar hora de entrada si existe
            setSalida(existingHorarios[0]?.fin || ''); // Cargar hora de salida si existe
        } else {
            setSelectedDia(null);
            setEntrada('');
            setSalida('');
        }

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingHorario(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const horarioId = selectedDia?.horarioId;
            const dia = selectedDia?.dia;

            if (editingHorario) {
                // Actualizar horario existente
                const response = await axios.patch(`/api/horarios/${editingHorario._id}`, { ...newHorario, entrada, salida });
                if (response.data.success) {
                    setAlert({ type: 'success', message: 'Horario actualizado exitosamente' });
                } else {
                    setAlert({ type: 'danger', message: response.data.message });
                }
            } else {
                // Crear nuevo horario
                const response = await axios.post('/api/horarios', { ...newHorario, entrada, salida });
                if (response.data.success) {
                    setAlert({ type: 'success', message: 'Horario creado exitosamente' });
                } else {
                    setAlert({ type: 'danger', message: response.data.message });
                }
            }

            // Si se está editando un día específico, actualizar el horario de ese día
            if (horarioId && dia !== undefined) {
                const responseDia = await axios.post(`/api/horarios/${horarioId}/dias/${dia}`, { entrada, salida });
                if (responseDia.data.success) {
                    setAlert({ type: 'success', message: 'Horarios del día actualizados exitosamente' });
                } else {
                    setAlert({ type: 'danger', message: responseDia.data.message });
                }
            }

            fetchHorarios();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving horario:', error);
            setAlert({ type: 'danger', message: 'Error al guardar el horario' });
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
            try {
                const response = await axios.delete(`/api/horarios/${id}`);
                if (response.data.success) {
                    setAlert({ type: 'success', message: 'Horario eliminado exitosamente' });
                } else {
                    setAlert({ type: 'danger', message: response.data.message });
                }
                fetchHorarios();
            } catch (error) {
                console.error('Error deleting horario:', error);
                setAlert({ type: 'danger', message: 'Error al eliminar el horario' });
            }
        }
    };

    const handleEditDia = (horarioId: string, dia: number) => {
        handleShowModal(horarioId ? horarios.find(h => h._id === horarioId) : undefined, dia);
    };

    const handleCloseDiaModal = () => {
        setSelectedDia(null);
    };

    return (
        <div className="container">
            <h1>Gestión de Horarios</h1>
            {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
            <Button variant="primary" onClick={() => handleShowModal()}>
                Crear Nuevo Horario
            </Button>
            <div className="mt-4">
                <CalendarioHorario
                    horarios={horarios}
                    onSelectDia={(horarioId, dia) => handleEditDia(horarioId, dia)}
                />
            </div>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Mes</th>
                        <th>Año</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {horarios.map(horario => (
                        <tr key={horario._id}>
                            <td>{new Date(horario.año, horario.mes - 1).toLocaleString('default', { month: 'long' })}</td>
                            <td>{horario.año}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleShowModal(horario)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(horario._id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para Crear/Editar Horario */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingHorario ? 'Editar Horario' : 'Crear Horario'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="mes" className="mb-3">
                            <Form.Label>Mes</Form.Label>
                            <Form.Select
                                value={newHorario.mes}
                                onChange={(e) => setNewHorario({ ...newHorario, mes: parseInt(e.target.value, 10) })}
                                required
                            >
                                {[...Array(12)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {new Date(0, index).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="año" className="mb-3">
                            <Form.Label>Año</Form.Label>
                            <Form.Control
                                type="number"
                                value={newHorario.año}
                                onChange={(e) => setNewHorario({ mes: newHorario.mes, año: parseInt(e.target.value, 10) })}
                                required
                                min={2000}
                                max={2100}
                            />
                        </Form.Group>
                        <Form.Group controlId="entrada" className="mb-3">
                            <Form.Label>Hora de Entrada</Form.Label>
                            <Form.Control
                                type="time"
                                value={entrada}
                                onChange={(e) => setEntrada(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="salida" className="mb-3">
                            <Form.Label>Hora de Salida</Form.Label>
                            <Form.Control
                                type="time"
                                value={salida}
                                onChange={(e) => setSalida(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {editingHorario ? 'Actualizar' : 'Crear'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal para Gestionar Horarios de un Día */}
            {selectedDia && (
                <HorarioDiaModal
                    show={true}
                    handleClose={handleCloseDiaModal}
                    horarioId={selectedDia.horarioId}
                    dia={selectedDia.dia}
                    existingHorarios={
                        horarios.find(h => h._id === selectedDia.horarioId)?.dias.find(d => d.dia === selectedDia.dia)?.horarios || []
                    }
                    refreshHorarios={fetchHorarios}
                />
            )}
        </div>
    );
};

export default AdminHorariosPage;
