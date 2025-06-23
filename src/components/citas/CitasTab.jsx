import React, { useEffect, useState } from 'react';
import { CitaForm } from './CitaForm';
import { getCitas, createCita, updateCita, deleteCita, getBarberos, getClientes } from '@/api';

export const CitasTab = () => {
  const [citas, setCitas] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [editData, setEditData] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchCitas = async () => {
    try {
      const response = await getCitas();
      const data = response.data || response;
      setCitas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  const fetchBarberos = async () => {
    try {
      const response = await getBarberos();
      const data = response.data || response;
      setBarberos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener barberos:", error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await getClientes();
      const data = response.data || response;
      setClientes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  useEffect(() => {
    fetchCitas();
    fetchBarberos();
    fetchClientes();
  }, [refreshFlag]);

  const handleSuccess = () => {
    setEditData(null);
    setRefreshFlag(prev => !prev);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCita(id);
      setRefreshFlag(prev => !prev);
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Citas</h2>
      <CitaForm
        barberos={barberos}
        clientes={clientes}
        onSuccess={handleSuccess}
        createCita={createCita}
        updateCita={updateCita}
        initialData={editData}
      />
      <ul className="mt-4 space-y-2">
        {(Array.isArray(citas) ? citas : []).map((cita) => (
          <li key={cita.id_cita || `${cita.fecha}-${cita.hora}`} className="border p-2 rounded shadow-sm">
            <strong>{cita.fecha}</strong> - {cita.hora} - {cita.servicio} - {cita.nombre_cliente} - {cita.nombre_barbero}
            <button
              onClick={() => setEditData(cita)}
              className="ml-4 text-blue-600 underline"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(cita.id_cita)}
              className="ml-2 text-red-600 underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
