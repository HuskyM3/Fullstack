//export type Gender = 'male' | 'female' | 'other' ;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
  }


  export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string
  }



  export type NonSensitivePatnientEntry = Omit<PatientEntry, 'ssn'>;
  export type NewPatientEntry = Omit<PatientEntry, 'id'>;
  //export type NonSensitiveDiagnosisEntry = Omit<DiagnosisEntry, 'comment'>;