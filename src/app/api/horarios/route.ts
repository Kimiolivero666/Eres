import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import Horario from '@/lib/models/Horario';

// Obtener todos los horarios o crear un nuevo horario
export async function GET(request: NextRequest) {
    try {
        await ConnectDB();
        const horarios = await Horario.find({});
        return NextResponse.json({ success: true, data: horarios });
    } catch (error: any) {
        console.error("Error al obtener los horarios:", error);
        return NextResponse.json({ success: false, message: 'Error al obtener los horarios' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await ConnectDB();
        const data = await request.json();

        // Buscar si ya existe un horario para el mismo mes y año
        const existingHorario = await Horario.findOne({ mes: data.mes, año: data.año });

        if (existingHorario) {
            // Si el horario existe, agregar los días nuevos sin duplicados
            data.dias.forEach((newDia: any) => {
                const diaExistente = existingHorario.dias.find((d: any) => d.dia === newDia.dia);
                
                if (diaExistente) {
                    // Si el día ya existe, actualizar los horarios
                    diaExistente.horarios = newDia.horarios;
                } else {
                    // Si el día no existe, agregarlo al arreglo de días
                    existingHorario.dias.push(newDia);
                }
            });

            // Guardar el horario actualizado
            await existingHorario.save();
            return NextResponse.json({ success: true, data: existingHorario }, { status: 200 });
        } else {
            // Si no existe un horario para el mes y año, crearlo como uno nuevo
            const horario = await Horario.create(data);
            return NextResponse.json({ success: true, data: horario }, { status: 201 });
        }
    } catch (error: any) {
        console.error("Error al crear el horario:", error);
        return NextResponse.json({ success: false, message: 'Error al crear el horario' }, { status: 400 });
    }
}
















