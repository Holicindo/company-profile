const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3011';

export interface Client {
  id: number;
  name: string;
  logo: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface ContactSubject {
  id: number;
  label_id: string;
  label_en: string;
  displayOrder: number;
  isActive: boolean;
}

export const apiService = {
  async getClients(): Promise<Client[]> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/clients`);
      if (res.ok) {
        return await res.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  },

  async getContactSubjects(): Promise<ContactSubject[]> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact-subjects`);
      if (res.ok) {
        return await res.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching contact subjects:', error);
      return [];
    }
  },
};
