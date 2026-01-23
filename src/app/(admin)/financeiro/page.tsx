import { financialService } from '@/services/financialService'
import { FinanceDashboardClient } from './FinanceDashboardClient'
import { serializePrisma } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function FinanceiroPage() {
    const stats = await financialService.getGlobalStats()
    const courseRevenue = await financialService.getRevenueByCourse()

    return (
        <FinanceDashboardClient
            stats={serializePrisma(stats)}
            courseRevenue={serializePrisma(courseRevenue)}
        />
    )
}
