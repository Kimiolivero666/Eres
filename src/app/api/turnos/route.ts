import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';
import Turno from '@/lib/models/Turno';

// Obtener turnos

export async function GET(request: NextRequest) {
    try {
        await ConnectDB();
        const turnos = await Turno.find({});
        const formattedTurnos = turnos.map(turno => ({
            ...turno.toObject(),
            hora: turno.hora.toISOString(),
            dia: turno.dia.toISOString(),
        }));
        return NextResponse.json({ success: true, message: 'API funcionando', data: formattedTurnos });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error al obtener los turnos' }, { status: 500 });
    }
}


// Crear un turno
export async function POST(request: NextRequest) {
    try {
        await ConnectDB();
        const data = await request.json();
        const turno = await Turno.create(data);
        return NextResponse.json({ success: true, data: turno }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error al crear el turno' }, { status: 400 });
    }
}


// Actualizar o eliminar un turno
export async function PATCH(request: NextRequest) {
    try {
        await ConnectDB();
        const data = await request.json();
        const { id, ...updateData } = data;
        const updatedTurno = await Turno.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json({ success: true, data: updatedTurno });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error al actualizar el turno' }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await ConnectDB();
        const url = new URL(request.url);
        const id = url.searchParams.get('id'); // Obtener el ID de los parámetros de búsqueda
        if (id) {
            await Turno.findByIdAndDelete(id);
            return NextResponse.json({ success: true, message: 'Turno eliminado' });
        } else {
            return NextResponse.json({ success: false, message: 'ID no proporcionado' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error al eliminar el turno' }, { status: 400 });
    }
}
