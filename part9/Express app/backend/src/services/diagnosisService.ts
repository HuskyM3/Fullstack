import diagnosisData from '../data/diagnosis';

import { DiagnosisEntry } from '../types';


const patients: DiagnosisEntry[] = diagnosisData;

const getEntries = () : DiagnosisEntry[] => {
  return patients;
};

/*
const getNonSensitiveEntries = (): NonSensitivePatnientEntry[] => {
  return patients.map(({ name, id, dateOfBirth, gender, occupation }) => ({
    name,
    id,
    dateOfBirth,
    gender,
    occupation,
  }));
};
*/
const addDiary = () => {
  return null;
};

export default {
  getEntries,
  //getNonSensitiveEntries,
  addDiary
};