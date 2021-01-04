/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  Diagnosis,
  HealthCheckRating
} from './types';


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isEntry = (entry: any): entry is Entry => {
  return entry.type === "HealthCheck" || entry.type === "Hospital" || entry.type === "OccupationalHealthcare";
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Invalid or missing name: ' + name);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Invalid or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Invalid or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Invalid or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) return [];
  if (entries.find((e: any) => !isEntry(e))) {
    throw new Error('Invalid or missing entries: ' + entries);
  }
  return entries;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.occupation),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    entries: parseEntries(object.entries)
  };
};



const parseType = (type: any): 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare' => {
  if (!type || !isString(type) || !(type === 'Hospital' || type === 'OccupationalHealthcare' || type === 'HealthCheck')) {
    throw new Error('Invalid or missing type: ' + type);
  }
  return type;
};

const parseString = (str: any, label: string): string => {
  if (!str || !isString(str)) {
    throw new Error('Invalid or missing ' + label + ': ' + str);
  }
  return str;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (!diagnosisCodes) return diagnosisCodes;
  if (!Array.isArray(diagnosisCodes)) { throw new Error('Invalid diagnosis codes'); }
  
  if (diagnosisCodes.every((c: any) => isString(c))) {
    return diagnosisCodes;
  } else {
    throw new Error('Invalid diagnosis codes');
  }
};

const parseDischarge = (discharge: any): { date: string, criteria: string } => {
  if (!discharge
      || !discharge.date
      || !discharge.criteria
      || !isString(discharge.date)
      || !isDate(discharge.date)
      || !isString(discharge.criteria)) {
    throw new Error('Invalid or missing discharge date and/or criteria');
  }
  return {
    date: discharge.date,
    criteria: discharge.criteria
  };
};

const parseSickLeave = (sickLeave: any): { startDate: string, endDate: string } | undefined => {
  if (!sickLeave) return sickLeave;
  
  if (!sickLeave.startDate 
      || !sickLeave.endDate
      || !isString(sickLeave.startDate)
      || !isString(sickLeave.endDate)
      || !isDate(sickLeave.startDate)
      || !isDate(sickLeave.endDate)) {
    throw new Error('Invalid or missing sick leave dates');
  }
  return {
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate
  };
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Invalid or missing health check rating');
  }
  return healthCheckRating;
};


export const toNewEntry = (object: any): NewEntry => {
  if (!(isString(object.type) && (object.type === 'Hospital' || object.type === 'OccupationalHealthcare' || object.type === 'HealthCheck'))) {
    throw new Error('Invalid or missing type: ' + object.type);
  }

  const type = parseType(object.type);
  const description = parseString(object.description, 'description');
  const date = parseDate(object.date);
  const specialist = parseString(object.specialist, 'specialist');
  const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);

  switch (type) {
    case 'Hospital':
      return {
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        discharge: parseDischarge(object.discharge)
      };

    case 'OccupationalHealthcare':
      return {
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        employerName: parseString(object.employerName, 'employer name'),
        sickLeave: parseSickLeave(object.sickLeave)
      };

    case 'HealthCheck':
      return {
        type,
        description,
        date,
        specialist,
        diagnosisCodes,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
  }
};