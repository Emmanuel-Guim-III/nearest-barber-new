import { Worker } from '../components/SignUpForm';
import { Worker as WorkerData } from '../components/Worker/WorkerView';
import { fetchWorkers, insertWorker } from '../services/workers';

export const getWorkers = async () => {
  try {
    const response = await fetchWorkers();

    const convertToArray = (data: Record<string, WorkerData>): WorkerData[] => {
      return Object.values(data);
    };

    return convertToArray(response.data);
  } catch (error) {
    console.error('Error fetching workers:', error);
    throw error;
  }
};

export const addWorker = async (worker: Worker) => {
  const workers = await getWorkers();

  if (!workers) return;

  const id = Object.keys(workers).length + 1;
  const newWorker = {
    [`${id}`]: {
      id: String(id),
      firstName: worker.firstName,
      lastName: worker.lastName,
      contactNumber: worker.contactNumber,
      coordinates: worker.location,
      rating: 0,
      jobsAccomplished: 0,
      image: `https://mighty.tools/mockmind-api/content/human/${id}.jpg`,
    } as WorkerData,
  };

  try {
    const response = await insertWorker(newWorker);
    return response.data;
  } catch (error) {
    console.error('Error creating a new worker:', error);
    throw error;
  }
};
