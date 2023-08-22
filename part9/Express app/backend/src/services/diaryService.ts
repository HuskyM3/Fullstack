import patientsData from '../data/entries';

import { v1 as uuid } from 'uuid';

import { NonSensitivePatnientEntry, PatientEntry, NewPatientEntry } from '../types';


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

const addDiary = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
  id: id,
  ...entry
};
patients.push(newPatientEntry);
return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById,
};