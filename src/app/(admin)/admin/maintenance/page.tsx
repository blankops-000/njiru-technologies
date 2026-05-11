export default function AdminMaintenancePage() {
  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance Plans</h1>
        </div>
      </div>
      <div className="py-12 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
        Active maintenance subscriptions will appear here.
      </div>
    </div>
  );
}
