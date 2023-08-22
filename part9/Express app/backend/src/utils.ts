
import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseOccupation = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error('Incorrect or missing occupation');
  }

  return comment;
};

const parseSsn = (comment: unknown): string => {
    if (!isString(comment)) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return comment;
  };

  const parseName = (comment: unknown): string => {
    if (!isString(comment)) {
      throw new Error('Incorrect or missing name');
    }
  
    return comment;
  };

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isGender= (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};




const toNewDiaryEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('occupation' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object && 'name' in object)  {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
  
    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

export default toNewDiaryEntry;