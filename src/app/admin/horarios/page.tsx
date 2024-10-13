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
    const [newHorario, setNewHorario] = useState<Horario>({
        _id: '',
        mes: new Date().getMonth() + 1,
        año: new Date().getFullYear(),
        dias: [],
    });
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
    const [selectedDia, setSelectedDia] = useState<{ horarioId: string; dia: number } | null>(null);
    const [entrada, setEntrada] = useState<string>(''); // Nuevo estado para hora de entrada
    const [salida, setSalida] = useState<string>(''); // Nuevo estado para hora de salida
    const [selectedDias, setSelectedDias] = useState<number[]>([]); // Para días seleccionados

    useEffect(() => {
        fetchHorarios();
    }, []);

    const fetchHorarios = async () => {
        try {
            const response = await axios.get('/api/horarios');
            if (response.data.success) {
                // Ordenar los días dentro de cada horario
                const sortedHorarios = response.data.data.map((horario: Horario) => ({
                    ...horario,
                    dias: horario.dias.sort((a, b) => a.dia - b.dia),
                }));
    
                setHorarios(sortedHorarios);
                console.log('Horarios fetched:', sortedHorarios); // Depuración
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
            setNewHorario({
                _id: horario._id,
                mes: horario.mes,
                año: horario.año,
                dias: horario.dias,
            });
        } else {
            setEditingHorario(null);
            setNewHorario({
                _id: '',
                mes: new Date().getMonth() + 1,
                año: new Date().getFullYear(),
                dias: [],
            });
            setSelectedDias([]); // Resetear días seleccionados al crear un nuevo horario
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
        setSelectedDias([]); // Resetear días seleccionados al cerrar el modal
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingHorario) {
                // Actualizar horario existente (solo mes y año)
                const response = await axios.patch(`/api/horarios/${editingHorario._id}`, {
                    mes: newHorario.mes,
                    año: newHorario.año,
                });
                if (response.data.success) {
                    setAlert({ type: 'success', message: 'Horario actualizado exitosamente' });
                } else {
                    setAlert({ type: 'danger', message: response.data.message });
                }
            } else {
                // Crear nuevo horario (mes, año y días seleccionados)
                const response = await axios.post('/api/horarios', {
                    mes: newHorario.mes,
                    año: newHorario.año,
                    dias: selectedDias.map(dia => ({ dia, horarios: [] })), // Inicializar días sin horarios
                });
                if (response.data.success) {
                    setAlert({ type: 'success', message: 'Horario creado exitosamente' });
                } else {
                    setAlert({ type: 'danger', message: response.data.message });
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
        const horario = horarios.find(h => h._id === horarioId);
        if (horario) {
            handleShowModal(horario, dia);
        }
    };

    const handleCloseDiaModal = () => {
        setSelectedDia(null);
    };

    // Función para calcular el número de días en el mes seleccionado
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month, 0).getDate();
    };

    // Función para manejar la selección de un día
    const toggleDiaSeleccionado = (dia: number) => {
        setSelectedDias(prev => {
            if (prev.includes(dia)) {
                return prev.filter(d => d !== dia);
            } else {
                return [...prev, dia];
            }
        });
    };

    // Función para renderizar los días como botones
    const renderDias = () => {
        const days = getDaysInMonth(newHorario.año, newHorario.mes);
        const dayButtons = [];
        for (let dia = 1; dia <= days; dia++) {
            const isSelected = selectedDias.includes(dia);
            dayButtons.push(
                <button
                    key={dia}
                    type="button"
                    onClick={() => toggleDiaSeleccionado(dia)}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: isSelected ? '#28a745' : '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        margin: '2px',
                    }}
                >
                    {dia}
                </button>
            );
        }
        return <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>{dayButtons}</div>;
    };

    return (
        <div className="container">
            <h1>Gestión de Horarios</h1>
            {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
            <Button variant="primary" onClick={() => handleShowModal()}>
                Crear Nuevo Horario
            </Button>
            <div className="mt-4">
                {horarios.length > 0 ? (
                    <CalendarioHorario
                        horarios={horarios}
                        onSelectDia={(horarioId, dia) => handleEditDia(horarioId, dia)}
                    />
                ) : (
                    <p>No hay horarios disponibles. Crea uno nuevo.</p>
                )}
            </div>

            {/* Tabla de horarios existentes */}
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Mes</th>
                        <th>Año</th>
                    </tr>
                </thead>
                <tbody>
                    {horarios.map(horario => (
                        <tr key={horario._id}>
                            <td>{new Date(horario.año, horario.mes - 1).toLocaleString('default', { month: 'long' })}</td>
                            <td>{horario.año}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(horario._id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para Crear/Editar Horario */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editingHorario ? 'Editar Horario' : 'Crear Horario'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {/* Año */}
                        <Form.Group controlId="año" className="mb-3">
                            <Form.Label>Año</Form.Label>
                            <Form.Control
                                type="number"
                                value={newHorario.año}
                                onChange={(e) =>
                                    setNewHorario({ ...newHorario, año: parseInt(e.target.value, 10) })
                                }
                                required
                                min={2000}
                                max={2100}
                            />
                        </Form.Group>
                        {/* Mes */}
                        <Form.Group controlId="mes" className="mb-3">
                            <Form.Label>Mes</Form.Label>
                            <Form.Select
                                value={newHorario.mes}
                                onChange={(e) =>
                                    setNewHorario({ ...newHorario, mes: parseInt(e.target.value, 10) })
                                }
                                required
                            >
                                {[...Array(12)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {new Date(0, index).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {/* Selección de Días */}
                        <Form.Group controlId="dias" className="mb-3">
                            <Form.Label>Días</Form.Label>
                            {renderDias()}
                            {selectedDias.length > 0 && (
                                <p style={{ marginTop: '10px' }}>
                                    Día seleccionado: {selectedDias.join(', ')}
                                </p>
                            )}
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
