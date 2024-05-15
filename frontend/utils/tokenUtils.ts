import axios from 'axios';

const refreshApiToken = async (refreshToken : string | null): Promise<any> => {
    try {
      const response = await axios.get('https://actiwizcpe.galapfa.ro/users/auth/refresh/api_token', {
        headers: {
          'Refresh': refreshToken
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};
  
const refreshGraphToken = async (refreshToken : string | null): Promise<any> => {
    try {
      const response = await axios.get('https://actiwizcpe.galapfa.ro/users/auth/refresh/graph_token', {
        headers: {
          'Refresh': refreshToken
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};