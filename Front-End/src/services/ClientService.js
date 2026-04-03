import api from './axios';

const clientService = {
    creerClient: async (data) => {
        const response = await api.post('/clients', data);
        return response.data;
    }
};

export default clientService;