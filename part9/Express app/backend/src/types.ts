export type Gender = 'male' | 'female' | 'other' ;



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



  export type NonSensitivePatnientEntry = Omit<PatientEntry, 'comment'>;
  export type NonSensitiveDiagnosisEntry = Omit<DiagnosisEntry, 'comment'>;