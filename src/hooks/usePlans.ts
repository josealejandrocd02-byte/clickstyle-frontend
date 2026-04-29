import { useEffect, useState } from "react";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  Plan,
} from "@/services/adminPlan";

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const data = await getPlans();
      setPlans(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  return {
    plans,
    loading,
    refresh: loadPlans,

    create: async (plan: Plan) => {
      await createPlan(plan);
      await loadPlans();
    },

    update: async (id: string, plan: Plan) => {
      await updatePlan(id, plan);
      await loadPlans();
    },

    remove: async (id: string) => {
      await deletePlan(id);
      await loadPlans();
    },
  };
};