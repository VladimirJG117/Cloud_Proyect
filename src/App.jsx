
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function App() {
  const [clientes, setClientes] = useState([]);
  const [citas, setCitas] = useState([]);
  const [barberos, setBarberos] = useState([]);

  useEffect(() => {
    axios.get('/api/clientes').then(res => setClientes(res.data));
    axios.get('/api/citas').then(res => setCitas(res.data));
    axios.get('/api/barberos').then(res => setBarberos(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-4xl font-bold text-center text-[#093F6C] mb-8">Barbería Pro - Gestión</h1>

      <Tabs defaultValue="clientes" className="max-w-7xl mx-auto">
        <TabsList className="flex justify-center gap-4 mb-6">
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="citas">Citas</TabsTrigger>
          <TabsTrigger value="barberos">Barberos</TabsTrigger>
        </TabsList>

        <TabsContent value="clientes">
          <Card>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Frecuente</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientes.map(cliente => (
                    <TableRow key={cliente.id_cliente}>
                      <TableCell>{cliente.id_cliente}</TableCell>
                      <TableCell>{cliente.nombre}</TableCell>
                      <TableCell>{cliente.correo}</TableCell>
                      <TableCell>{cliente.telefono}</TableCell>
                      <TableCell>{cliente.frecuente ? 'Sí' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="citas">
          <Card>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Cita</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>ID Cliente</TableHead>
                    <TableHead>Nombre Cliente</TableHead>
                    <TableHead>ID Barbero</TableHead>
                    <TableHead>Nombre Barbero</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {citas.map(cita => (
                    <TableRow key={cita.id_cita}>
                      <TableCell>{cita.id_cita}</TableCell>
                      <TableCell>{cita.fecha}</TableCell>
                      <TableCell>{cita.hora}</TableCell>
                      <TableCell>{cita.servicio}</TableCell>
                      <TableCell>{cita.id_cliente}</TableCell>
                      <TableCell>{cita.nombre_cliente}</TableCell>
                      <TableCell>{cita.id_barbero}</TableCell>
                      <TableCell>{cita.nombre_barbero}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="barberos">
          <Card>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Turno</TableHead>
                    <TableHead>Activo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barberos.map(barbero => (
                    <TableRow key={barbero.id_barbero}>
                      <TableCell>{barbero.id_barbero}</TableCell>
                      <TableCell>{barbero.nombre}</TableCell>
                      <TableCell>{barbero.telefono}</TableCell>
                      <TableCell>{barbero.especialidad}</TableCell>
                      <TableCell>{barbero.turno}</TableCell>
                      <TableCell>{barbero.activo ? 'Sí' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
