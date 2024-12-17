import axios from 'axios';
import { Worker } from '../components/Worker/WorkerView';

const PANTRY_ID = import.meta.env.VITE_PANTRY_ID;
const API_BASE_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}`;

export const fetchWorkers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/basket/Workers`);
    return response;
  } catch (error) {
    console.error('Error fetching worker:', error);
    throw error;
  }
};

export const insertWorker = async (worker: { [x: string]: Worker }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/basket/Workers`, worker);
    return response;
  } catch (error) {
    console.error('Error creating worker:', error);
    throw error;
  }
};
