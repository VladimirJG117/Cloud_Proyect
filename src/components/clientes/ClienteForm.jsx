import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCliente } from "../../api";

export const ClienteForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre_cliente: '',
    correo: '',
    telefono_cliente: '',
    notas: '',
    frecuente: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Armamos el payload como lo requiere la API externa
      const payload = {
        nombre_cliente: formData.nombre_cliente,
        telefono_cliente: formData.telefono_cliente,
        correo: formData.correo,
        notas: formData.notas,
      };

      await createCliente(payload);
      onSuccess();

      // Limpiar el formulario
      setFormData({
        nombre_cliente: '',
        correo: '',
        telefono_cliente: '',
        notas: '',
        frecuente: false
      });
    } catch (error) {
      console.error("Error creando cliente:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>nombre_cliente</Label>
          <Input
            value={formData.nombre_cliente}
            onChange={(e) => setFormData({ ...formData, nombre_cliente: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Correo</Label>
          <Input
            type="email"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Teléfono</Label>
          <Input
            type="tel"
            value={formData.telefono_cliente}
            onChange={(e) => setFormData({ ...formData, telefono_cliente: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Notas</Label>
          <Input
            type="text"
            value={formData.notas}
            onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
            placeholder="Comentarios opcionales"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="frecuente"
            checked={formData.frecuente}
            onChange={(e) => setFormData({ ...formData, frecuente: e.target.checked })}
            className="h-4 w-4"
          />
          <Label htmlFor="frecuente">Cliente frecuente</Label>
        </div>
      </div>

      <Button type="submit">Crear Cliente</Button>
    </form>
  );
};
