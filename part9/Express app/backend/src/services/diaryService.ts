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

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary
};