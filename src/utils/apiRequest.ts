import { bodyInterface } from "../features/interfaces/interfaces";

import roomsData from '../data/roomsData.json';

let rooms = [...roomsData]; // Simula un estado mutable basado en el archivo JSON.

export const apiRequest = async (endpoint: string, method: string, body?: any) => {
  if (endpoint === 'rooms') {
    if (method === 'GET') {
      return rooms; // Devuelve todos los datos.
    } else if (method === 'POST' && body) {
      const newRoom = { id: `${rooms.length + 1}`, ...body };
      rooms.push(newRoom);
      return newRoom; // Devuelve el nuevo elemento.
    }
  }

  if (endpoint.startsWith('rooms/') && method === 'GET') {
    const id = endpoint.split('/')[1];
    return rooms.find((room) => room.id === id);
  }

  if (endpoint.startsWith('rooms/') && method === 'PUT' && body) {
    const id = endpoint.split('/')[1];
    rooms = rooms.map((room) => (room.id === id ? { ...room, ...body } : room));
    return rooms.find((room) => room.id === id);
  }

  if (endpoint.startsWith('rooms/') && method === 'DELETE') {
    const id = endpoint.split('/')[1];
    const roomToDelete = rooms.find((room) => room.id === id);
    rooms = rooms.filter((room) => room.id !== id);
    return roomToDelete ? 'The room was correctly deleted.' : 'Room not found.';
  }

  throw new Error('Invalid API Request');
};
