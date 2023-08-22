import patientsData from '../data/entries';

import { NonSensitivePatnientEntry, PatientEntry } from '../types';


const patients: PatientEntry[] = patientsData;

const getEntries = () : PatientEntry[] => {
  return patients;
};


const getNonSensitiveEntries = (): NonSensitivePatnientEntry[] => {
  return patients.map(({ name, id, dateOfBirth, gender, occupation }) => ({
    name,
    id,
    dateOfBirth,
    gender,
    occupation,
  }));
};


const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById,
};