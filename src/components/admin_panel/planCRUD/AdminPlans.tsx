import { useState } from "react";
import { usePlans } from "@/hooks/usePlans";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import PlanForm from "./PlanForm";
import DeletePlanModal from "./DeletePlanModal";


const AdminPlans = () => {
  const { plans, loading, create, update, remove } = usePlans();

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="space-y-4">

      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Planes</h2>
        <Button onClick={() => {
          setSelected(null);
          setOpenModal(true);
        }}>
          + Crear
        </Button>
      </div>

      <div className="space-y-2">
        {plans.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded-xl flex justify-between"
          >
            <div>
              <p className="font-bold">{p.name}</p>
              <p className="text-sm text-muted-foreground">
                {p.productLimit} productos • {p.price} Bs • {p.durationDays} días
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  setSelected(p);
                  setOpenModal(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => setDeleteId(p.id!)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL ADD / EDIT */}
      <PlanForm
        open={openModal}
        onClose={() => setOpenModal(false)}
        initialData={selected}
        onSave={async (data) => {
          if (selected) {
            await update(selected.id, data);
          } else {
            await create(data);
          }
        }}
      />

      {/* DELETE */}
      <DeletePlanModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          if (deleteId) await remove(deleteId);
          setDeleteId(null);
        }}
      />
    </div>
  );
};

export default AdminPlans;