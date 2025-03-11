import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Activity } from '../types';

interface ScheduleState {
  activities: Activity[];
  editingActivity: Activity | null;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  removeActivity: (id: string) => void;
  setEditingActivity: (activity: Activity | null) => void;
  updateActivity: (activity: Activity) => void;
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set) => ({
      activities: [],
      editingActivity: null,
      addActivity: (activity) =>
        set((state) => ({
          activities: [
            ...state.activities,
            { ...activity, id: Math.random().toString(36).substring(7) },
          ],
        })),
      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id),
        })),
      setEditingActivity: (activity) =>
        set(() => ({
          editingActivity: activity,
        })),
      updateActivity: (updatedActivity) =>
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === updatedActivity.id ? updatedActivity : activity
          ),
          editingActivity: null,
        })),
    }),
    {
      name: 'schedule-storage',
    }
  )
);