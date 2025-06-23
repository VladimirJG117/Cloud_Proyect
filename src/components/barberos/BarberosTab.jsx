import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://0p8mbxgj1e.execute-api.us-east-1.amazonaws.com/prod/barberos";

export const BarberosTab = () => {
  const [barberos, setBarberos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const data = response.data?.active_barbers;
        setBarberos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error al obtener barberos activos:", err);
        setError("No se pudieron cargar los barberos.");
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Barberos Activos</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3">
        {barberos.length === 0 ? (
          <p>No hay barberos activos registrados.</p>
        ) : (
          barberos.map((barbero) => (
            <li key={barbero.id_barbero} className="border rounded p-4 shadow-sm">
              <p><strong>ID:</strong> {barbero.id_barbero}</p>
              <p><strong>Nombre:</strong> {barbero.nombre_barbero}</p>
              <p><strong>Correo:</strong> {barbero.correo || 'N/A'}</p>
              <p><strong>Teléfono:</strong> {barbero.telefono || 'N/A'}</p>
              <p><strong>Estado:</strong> {barbero.estado}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
