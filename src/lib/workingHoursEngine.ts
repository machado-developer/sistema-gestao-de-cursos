/**
 * Engine de Cálculo de Horas de Trabalho e Horas Extras (LGT 12/23 Angola)
 * 
 * Regras:
 * 1. Dia Normal:
 *    - Horas Trabalhadas > Horas Normais Diárias (ex: 8h) => Diferença é HE EXTRA (50% ou conforme tabela)
 *    - HE DS/Fer = 0
 * 
 * 2. Dia de Descanso (Semanal/Complementar) ou Feriado:
 *    - Todas as horas trabalhadas são HE DS/Fer (100% ou conforme tabela)
 *    - HE EXTRA = 0
 * 
 * 3. Tolerâncias e Intervalos não são tratados aqui (motor puro de cálculo de tempos).
 */

export type DayType = 'NORMAL' | 'WEEKLY_REST' | 'HOLIDAY';

interface CalculationInput {
    entryTime: string | null;     // 'HH:mm'
    exitTime: string | null;      // 'HH:mm'
    dayType: DayType;
    normalDailyHours?: number;    // Padrão: 8
}

interface CalculationResult {
    totalWorkedMinutes: number;
    totalWorkedHuman: string;     // 'HH:mm'
    normalHours: number;
    extraHoursNormal: number;     // HE 50% / EXTRA
    extraHoursRest: number;       // HE 100% / DS/Fer
}

/**
 * Converte string 'HH:mm' para total de minutos desde 00:00
 */
function timeToMinutes(time: string): number {
    if (!time) return 0;
    const [h, m] = time.split(':').map(Number);
    return (h * 60) + m;
}

/**
 * Converte minutos para string 'HH:mm' (ex: 90 -> '01:30')
 */
export function minutesToHuman(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = Math.floor(minutes % 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function calculateDailyWorkHours(input: CalculationInput): CalculationResult {
    const {
        entryTime,
        exitTime,
        dayType,
        normalDailyHours = 8
    } = input;

    if (!entryTime || !exitTime) {
        return {
            totalWorkedMinutes: 0,
            totalWorkedHuman: '00:00',
            normalHours: 0,
            extraHoursNormal: 0,
            extraHoursRest: 0
        };
    }

    const start = timeToMinutes(entryTime);
    const end = timeToMinutes(exitTime);

    // Se saída for antes da entrada, assume que cruzou a meia-noite (adiciona 24h)
    // Embora para LGT simples diaria geralmente seja mesmo dia.
    // Vamos assumir turno que fecha no mesmo dia ou dia seguinte simples.
    let duration = end - start;
    if (duration < 0) {
        duration += 24 * 60;
    }

    const totalWorked = duration; // Em minutos
    const totalHours = totalWorked / 60; // Em horas decimais
    const normalMinutes = normalDailyHours * 60;

    let extraNormal = 0;
    let extraRest = 0;
    let consideredNormal = 0;

    if (dayType === 'NORMAL') {
        if (totalWorked > normalMinutes) {
            extraNormal = totalHours - normalDailyHours;
            consideredNormal = normalDailyHours;
        } else {
            consideredNormal = totalHours;
        }
    } else {
        // 'WEEKLY_REST' | 'HOLIDAY'
        // Todo o tempo é considerado HE Especial (100%)
        extraRest = totalHours;
        consideredNormal = 0;
    }

    return {
        totalWorkedMinutes: totalWorked,
        totalWorkedHuman: minutesToHuman(totalWorked),
        normalHours: Number(consideredNormal.toFixed(2)),
        extraHoursNormal: Number(Math.max(0, extraNormal).toFixed(2)),
        extraHoursRest: Number(Math.max(0, extraRest).toFixed(2))
    };
}
