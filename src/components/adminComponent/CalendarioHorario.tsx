// CalendarioHorario.tsx
import React from 'react';

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

interface CalendarioHorarioProps {
    horarios: Horario[];
    onSelectDia: (horarioId: string, dia: number) => void;
}

const CalendarioHorario: React.FC<CalendarioHorarioProps> = ({ horarios, onSelectDia }) => {
    return (
        <div>
            {horarios.map((horario) => (
                <div key={horario._id} style={{ marginBottom: '20px' }}>
                    <h3>Horario del Mes {horario.mes} - Año {horario.año}</h3>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {horario.dias.map((dia) => (
                            <button 
                                key={dia.dia}
                                onClick={() => onSelectDia(horario._id, dia.dia)}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: '#0070f3',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Día {dia.dia}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalendarioHorario;
