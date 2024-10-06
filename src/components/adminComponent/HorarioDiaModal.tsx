'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

interface HorarioDiaModalProps {
    show: boolean;
    handleClose: () => void;
    horarioId: string;
    dia: number;
    existingHorarios?: { inicio: string; fin: string }[];
    refreshHorarios: () => void;
}

const HorarioDiaModal = ({ show, handleClose, horarioId, dia, existingHorarios = [], refreshHorarios }: HorarioDiaModalProps) => {
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            horarios: existingHorarios,
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'horarios'
    });

    const onSubmit = async (data: any) => {
        try {
            console.log('Horario ID:', horarioId);
            console.log('Datos a enviar:', {
                dia: dia,
                horarios: data.horarios
            });

            // Actualizar el horario en la base de datos con dia y horarios
            const response = await axios.patch(`/api/horarios/${horarioId}`, {
                dia: dia,                // Enviar el dia
                horarios: data.horarios  // Enviar los horarios
            });

            console.log('Respuesta del servidor:', response.data);

            // Actualiza el estado local
            refreshHorarios();
            handleClose();
        } catch (error: any) {
            console.error('Error actualizando horarios del día:', error);
        }
    };

    const handleAddHorario = () => {
        append({ inicio: '', fin: '' });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Gestionar Horarios para el Día {dia}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    {fields.map((field, index) => (
                        <Row key={field.id} className="mb-3">
                            <Col>
                                <Form.Control
                                    type="time"
                                    {...register(`horarios.${index}.inicio`, { required: true })}
                                    placeholder="Hora de Inicio"
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="time"
                                    {...register(`horarios.${index}.fin`, { required: true })}
                                    placeholder="Hora de Fin"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button variant="danger" onClick={() => remove(index)}>
                                    Eliminar
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <Button variant="secondary" onClick={handleAddHorario}>
                        Agregar Horario
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default HorarioDiaModal;
