// @/components/adminComponent/DatePicker.tsx

import React, { useState } from 'react';

interface DatePickerProps {
    selectedDias: number[];
    setSelectedDias: (dias: number[]) => void;
    year: number;
    month: number;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDias, setSelectedDias, year, month }) => {
    const [currentYear, setCurrentYear] = useState<number>(year);
    const [currentMonth, setCurrentMonth] = useState<number>(month);

    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    // Obtener el número de días en el mes actual
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month, 0).getDate();
    };

    // Obtener el día de la semana del primer día del mes
    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month - 1, 1).getDay();
    };

    // Manejar la navegación a meses anteriores
    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    // Manejar la navegación a meses siguientes
    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    // Manejar la selección de días
    const toggleDia = (dia: number) => {
        if (selectedDias.includes(dia)) {
            setSelectedDias(selectedDias.filter(d => d !== dia));
        } else {
            setSelectedDias([...selectedDias, dia]);
        }
    };

    // Generar la matriz de días para el calendario
    const generateCalendar = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
        const weeks: JSX.Element[] = [];
        let days: JSX.Element[] = [];

        // Rellenar los días vacíos antes del primer día del mes
        for (let i = 0; i < firstDay; i++) {
            days.push(<td key={`empty-start-${i}`}></td>);
        }

        // Rellenar los días del mes
        for (let dia = 1; dia <= daysInMonth; dia++) {
            const isSelected = selectedDias.includes(dia);
            days.push(
                <td key={dia}>
                    <button
                        type="button"
                        onClick={() => toggleDia(dia)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            backgroundColor: isSelected ? '#28a745' : 'transparent',
                            color: isSelected ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {dia}
                    </button>
                </td>
            );

            // Si es el último día de la semana, añadir la fila a las semanas
            if ((dia + firstDay) % 7 === 0) {
                weeks.push(<tr key={`week-${dia}`}>{days}</tr>);
                days = [];
            }
        }

        // Rellenar los días vacíos después del último día del mes
        if (days.length > 0) {
            const emptyDays = 7 - days.length;
            for (let i = 0; i < emptyDays; i++) {
                days.push(<td key={`empty-end-${i}`}></td>);
            }
            weeks.push(<tr key={`week-final`}>{days}</tr>);
        }

        return weeks;
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <button onClick={handlePrevMonth}>&lt;</button>
                <span>
                    {new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} {currentYear}
                </span>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {daysOfWeek.map((day) => (
                            <th key={day} style={{ padding: '5px', textAlign: 'center' }}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{generateCalendar()}</tbody>
            </table>
        </div>
    );
};

export default DatePicker;
