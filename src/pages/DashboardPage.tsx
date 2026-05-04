import { Header } from '../components/layout/Header'
import { KpiGrid } from '../components/dashboard/KpiGrid'
import { MaintenancePanel } from '../components/dashboard/MaintenancePanel'
import { FuelPanel } from '../components/dashboard/FuelPanel'
import { SyncBanner } from '../components/dashboard/SyncBanner'
import { useDashboard } from '../hooks/useDashboard'

export function DashboardPage() {
  const {
    maintenanceItems,
    fuelItems,
    forecast,
    loading,
    error,
    loadData,
    totalFuelCost,
    totalMaintenances,
    avgKm,
  } = useDashboard()

  return (
    <main className="w-full max-w-[1180px] mx-auto px-4 py-8 flex flex-col gap-8">
      <Header onReload={loadData} />

      <KpiGrid
        forecast={forecast}
        totalFuelCost={totalFuelCost}
        totalMaintenances={totalMaintenances}
        avgKm={avgKm}
      />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MaintenancePanel
          items={maintenanceItems}
          loading={loading}
          error={error}
          onReload={loadData}
        />
        <FuelPanel
          items={fuelItems}
          loading={loading}
          onReload={loadData}
        />
      </section>

      <SyncBanner />
    </main>
  )
}
