import React, { useState, useEffect } from 'react';
import { useScheduleStore } from '../store/scheduleStore';
import { X } from 'lucide-react';

const daysOfWeek = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
];

export const ActivityForm: React.FC = () => {
  const { addActivity, editingActivity, updateActivity, setEditingActivity } = useScheduleStore();
  const [formData, setFormData] = useState({
    dayOfWeek: '',
    time: '',
    name: '',
    location: '',
  });

  useEffect(() => {
    if (editingActivity) {
      setFormData({
        dayOfWeek: editingActivity.dayOfWeek,
        time: editingActivity.time,
        name: editingActivity.name,
        location: editingActivity.location,
      });
    }
  }, [editingActivity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingActivity) {
      updateActivity({ ...formData, id: editingActivity.id });
    } else {
      addActivity(formData);
    }
    setFormData({
      dayOfWeek: '',
      time: '',
      name: '',
      location: '',
    });
  };

  const handleCancel = () => {
    setEditingActivity(null);
    setFormData({
      dayOfWeek: '',
      time: '',
      name: '',
      location: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      {editingActivity && (
        <div className="flex items-center justify-between bg-yellow-50 p-4 rounded-md mb-4">
          <span className="text-yellow-800">Editando atividade</span>
          <button
            type="button"
            onClick={handleCancel}
            className="text-yellow-800 hover:text-yellow-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-lg ms-2 font-medium text-gray-700">
            Dia da Semana
          </label>
          <select
            value={formData.dayOfWeek}
            onChange={(e) =>
              setFormData({ ...formData, dayOfWeek: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          >
            <option value="">Selecione um dia</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg ms-2 font-medium text-gray-700">
            Horário
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-lg ms-2 font-medium text-gray-700">
            Nome da Atividade
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg p-2"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-lg ms-2 font-medium text-gray-700">
            Local da Atividade
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg p-2"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        {editingActivity && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className={`${
            editingActivity ? 'flex-1' : 'w-full'
          } bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors`}
        >
          {editingActivity ? 'Salvar Alterações' : 'Adicionar Atividade'}
        </button>
      </div>
    </form>
  );
};