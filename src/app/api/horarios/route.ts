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

        // Validar que no exista un horario para el mismo mes y año
        const existingHorario = await Horario.findOne({ mes: data.mes, año: data.año });
        if (existingHorario) {
            return NextResponse.json({ success: false, message: 'Ya existe un horario para este mes y año' }, { status: 400 });
        }

        const horario = await Horario.create(data);
        return NextResponse.json({ success: true, data: horario }, { status: 201 });
    } catch (error: any) {
        console.error("Error al crear el horario:", error);
        return NextResponse.json({ success: false, message: 'Error al crear el horario' }, { status: 400 });
    }
}  
