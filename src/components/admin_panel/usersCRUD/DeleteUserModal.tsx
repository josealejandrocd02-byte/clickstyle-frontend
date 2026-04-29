import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteUserModal = ({ open, onClose, onConfirm }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <Card className="p-6 space-y-4">
        <CardContent className="space-y-4">
          <p>¿Eliminar este usuario?</p>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Eliminar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteUserModal;