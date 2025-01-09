import contactData from '../data/conctactData.json';

let contacts = [...contactData]; // Simula un estado mutable basado en el archivo JSON.

export const apiRequest = async (endpoint: string, method: string, body?: any) => {
  if (endpoint === 'contacts') {
    if (method === 'GET') {
      return contacts; // Devuelve todas las reseñas
    } else if (method === 'POST' && body) {
      const newContact = { id: `${contacts.length + 1}`, ...body };
      contacts.push(newContact);
      return newContact; // Crea una nueva reseña
    }
  }

  if (endpoint.startsWith('contacts/') && method === 'GET') {
    const id = endpoint.split('/')[1];
    return contacts.find((contact) => contact.id === id); // Devuelve una reseña por ID
  }

  if (endpoint.startsWith('contacts/') && method === 'PUT' && body) {
    const id = endpoint.split('/')[1];
    contacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, ...body } : contact
    );
    return contacts.find((contact) => contact.id === id); // Actualiza una reseña
  }

  if (endpoint.startsWith('contacts/') && method === 'DELETE') {
    const id = endpoint.split('/')[1];
    const contactToDelete = contacts.find((contact) => contact.id === id);
    contacts = contacts.filter((contact) => contact.id !== id);
    return contactToDelete
      ? 'The contact was correctly deleted.'
      : 'Contact not found.'; // Elimina una reseña por ID
  }

  throw new Error('Invalid API Request');
};
