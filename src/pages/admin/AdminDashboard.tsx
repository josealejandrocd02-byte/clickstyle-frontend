import Header from "@/components/Header";


const AdminDashboard = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-6 space-y-6">

        <h1 className="text-2xl font-bold">
          Panel Admin
        </h1>

        {/* 📊 STATS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded">Tiendas: 10</div>
          <div className="p-4 border rounded">Pendientes: 3</div>
          <div className="p-4 border rounded">Usuarios: 20</div>
        </div>

        {/* 🏪 STORES */}
        <div className="space-y-2">
          <h2 className="font-semibold">Tiendas registradas</h2>

          {/* CARD */}
          <div className="border p-4 rounded flex justify-between">
            <div>
              <p className="font-bold">Tienda X</p>
              <p className="text-sm text-muted">dueño@email.com</p>
              <span className="text-yellow-500">PENDING</span>
            </div>

            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-3 rounded">
                Aprobar
              </button>
              <button className="bg-red-500 text-white px-3 rounded">
                Rechazar
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
export default AdminDashboard; 