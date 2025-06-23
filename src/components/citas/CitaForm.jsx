import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const serviciosDisponibles = [
  "Corte de cabello",
  "Afeitado",
  "Corte + Afeitado",
  "Coloración",
  "Tratamiento capilar",
];

export const CitaForm = ({ barberos, clientes, onSuccess, initialData = null, createCita, updateCita }) => {
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    servicio: '',
    nombre_cliente: '',
    nombre_barbero: ''
  });

  const [servicioInput, setServicioInput] = useState('');
  const [mostrarSugerenciasServicio, setMostrarSugerenciasServicio] = useState(false);
  const sugerenciasServicioRef = useRef(null);

  const [clienteInput, setClienteInput] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  const [barberoInput, setBarberoInput] = useState('');
  const [barberosFiltrados, setBarberosFiltrados] = useState([]);
  const [mostrarSugerenciasBarbero, setMostrarSugerenciasBarbero] = useState(false);
  const sugerenciasBarberoRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        fecha: initialData.fecha || '',
        hora: initialData.hora || '',
        servicio: initialData.servicio || '',
        nombre_cliente: initialData.nombre_cliente || '',
        nombre_barbero: initialData.nombre_barbero || ''
      });
      setServicioInput(initialData.servicio || '');
      setClienteInput(initialData.nombre_cliente || '');
      setBarberoInput(initialData.nombre_barbero || '');
    }
  }, [initialData]);

  const handleClienteChange = (e) => {
    const input = e.target.value;
    setFormData({ ...formData, nombre_cliente: input });
    setClienteInput(input);

    if (input.length > 0 && Array.isArray(clientes)) {
      const filtrados = clientes.filter(c =>
        c && typeof c.nombre_cliente === "string" &&
        c.nombre_cliente.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredClientes(filtrados);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (cliente) => {
    setFormData({ ...formData, nombre_cliente: cliente.nombre_cliente });
    setClienteInput(cliente.nombre_cliente);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBarberoChange = (e) => {
    const valor = e.target.value;
    setBarberoInput(valor);
    setFormData({ ...formData, nombre_barbero: valor });

    if (Array.isArray(barberos)) {
      const filtrados = barberos.filter(b =>
        (b.activo === true || b.activo === 1) &&
        typeof b.nombre_barbero === 'string' &&
        b.nombre_barbero.toLowerCase().includes(valor.toLowerCase())
      );
      setBarberosFiltrados(filtrados);
      setMostrarSugerenciasBarbero(true);
    }
  };

  const handleBarberoClick = (barbero) => {
    setBarberoInput(barbero.nombre_barbero);
    setFormData({ ...formData, nombre_barbero: barbero.nombre_barbero });
    setMostrarSugerenciasBarbero(false);
  };

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (sugerenciasBarberoRef.current && !sugerenciasBarberoRef.current.contains(e.target)) {
        setMostrarSugerenciasBarbero(false);
      }
    };
    document.addEventListener('mousedown', handleClickFuera);
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, []);

  const handleServicioFocus = () => {
    setMostrarSugerenciasServicio(true);
  };

  const handleServicioChange = (e) => {
    setServicioInput(e.target.value);
    setFormData({ ...formData, servicio: e.target.value });
  };

  const handleServicioClick = (servicio) => {
    setServicioInput(servicio);
    setFormData({ ...formData, servicio });
    setMostrarSugerenciasServicio(false);
  };

  useEffect(() => {
    const handleClickFueraServicio = (e) => {
      if (sugerenciasServicioRef.current && !sugerenciasServicioRef.current.contains(e.target)) {
        setMostrarSugerenciasServicio(false);
      }
    };
    document.addEventListener('mousedown', handleClickFueraServicio);
    return () => document.removeEventListener('mousedown', handleClickFueraServicio);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const cliente = formData.nombre_cliente;
      //const barbero = formData.nombre_barbero;



      const citaPayload = {
        fecha: new Date(formData.fecha).toISOString().split('T')[0],
        hora: formData.hora,
        servicio: formData.servicio,
        nombre_cliente: formData.nombre_cliente,
        nombre_barbero: formData.nombre_barbero,
        //id_cliente: cliente.id_cliente,
        //id_barbero: barbero.id_barbero
      };

      if (initialData?.id_cita) {
        await updateCita(initialData.id_cita, citaPayload);
      } else {
        await createCita(citaPayload);
      }

      onSuccess();
      setFormData({ fecha: '', hora: '', servicio: '', nombre_cliente: '', nombre_barbero: '' });
      setServicioInput('');
      setClienteInput('');
      setBarberoInput('');
    } catch (error) {
      console.error("Error al guardar la cita:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><Label>Fecha</Label><Input type="date" value={formData.fecha} onChange={e => setFormData({ ...formData, fecha: e.target.value })} required /></div>
        <div><Label>Hora</Label><Input type="time" value={formData.hora} onChange={e => setFormData({ ...formData, hora: e.target.value })} required /></div>
        <div className="relative" ref={sugerenciasServicioRef}>
          <Label>Servicio</Label>
          <Input type="text" value={servicioInput} onChange={handleServicioChange} onFocus={handleServicioFocus} autoComplete="off" placeholder="Escribe o selecciona un servicio" required />
          {mostrarSugerenciasServicio && <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full max-h-48 overflow-auto">{serviciosDisponibles.map((servicio, i) => <li key={i} onClick={() => handleServicioClick(servicio)} className="cursor-pointer px-2 py-1 hover:bg-blue-100">{servicio}</li>)}</ul>}
        </div>
        <div className="relative">
          <Label>Cliente</Label>
          <Input type="text" value={clienteInput} onChange={handleClienteChange} autoComplete="off" required />
          {showSuggestions && filteredClientes.length > 0 && <ul ref={suggestionsRef} className="absolute z-10 bg-white border border-gray-300 rounded-md w-full max-h-48 overflow-auto">{filteredClientes.map(cliente => <li key={cliente.nombre_cliente} onClick={() => handleSuggestionClick(cliente)} className="cursor-pointer px-2 py-1 hover:bg-blue-100">{cliente.nombre_cliente}</li>)}</ul>}
        </div>
        <div className="relative" ref={sugerenciasBarberoRef}>
          <Label>Barbero</Label>
          <Input type="text" value={barberoInput} onChange={handleBarberoChange} autoComplete="off" required />
          {mostrarSugerenciasBarbero && barberosFiltrados.length > 0 && <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full max-h-48 overflow-auto">{barberosFiltrados.map(barbero => <li key={barbero.nombre_barbero} onClick={() => handleBarberoClick(barbero)} className="cursor-pointer px-2 py-1 hover:bg-blue-100">{barbero.nombre_barbero}</li>)}</ul>}
        </div>
      </div>
      <Button type="submit">
        {initialData?.id_cita ? 'Actualizar Cita' : 'Crear Cita'}
      </Button>
    </form>
  );
};
