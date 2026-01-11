import { NextResponse } from 'next/server'
import { instrutorService } from '@/services/instrutorService'

export async function GET() {
    const instrutores = await instrutorService.findAll()
    return NextResponse.json(instrutores)
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const instrutor = await instrutorService.create(data)
        return NextResponse.json(instrutor)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create instrutor' }, { status: 500 })
    }
}
