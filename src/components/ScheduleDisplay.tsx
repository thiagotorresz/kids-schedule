import React, { useState, useEffect } from 'react';
import { useScheduleStore } from '../store/scheduleStore';
import { Calendar, Trash2, Edit, ChevronDown, ChevronUp } from 'lucide-react';

export const ScheduleDisplay: React.FC = () => {
  const { activities, removeActivity, setEditingActivity } = useScheduleStore();
  const [expandedDays, setExpandedDays] = useState<{ [key: string]: boolean }>({});

  const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  useEffect(() => {
    if (activities.length > 0) {
      const lastAddedActivity = activities[activities.length - 1];
      setExpandedDays((prev) => ({ ...prev, [lastAddedActivity.dayOfWeek]: true }));
    }
  }, [activities]);

  const toggleDay = (day: string) => {
    setExpandedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {daysOfWeek.map((day) => {
          const dayActivities = activities.filter((activity) => activity.dayOfWeek === day);

          return (
            <div key={day} className="bg-white rounded-lg shadow-md">
              <button
                onClick={() => toggleDay(day)}
                className="w-full text-left p-4 flex justify-between items-center font-semibold text-lg"
              >
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {day}
                </div>
                {expandedDays[day] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {expandedDays[day] && (
                <div className="space-y-2 p-4">
                  {dayActivities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className={`flex items-center justify-between p-3 rounded-md ${
                        index % 2 === 0 ? 'bg-navy-50 text-navy-900' : 'bg-turquoise-50 text-turquoise-900'
                      }`}
                    >
                      <div>
                        <span className="font-medium">{activity.time}</span>
                        <span className="mx-2">-</span>
                        <span>{activity.name}</span>
                        <span className="mx-2">-</span>
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingActivity(activity)}
                          className="text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeActivity(activity.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
