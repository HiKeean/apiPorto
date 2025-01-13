// services/apiService.js

const API_URL = 'https://localhost:2357/api/'; // Ganti dengan URL API yang sesuai

export const fetchData = async () => {
  try {
    const response = await fetch((`${API_URL}text`));
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
