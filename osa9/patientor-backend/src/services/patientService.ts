import patients from '../../data/patients';
import { NewPatient, Patient, NonSensitivePatient } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = { 
    id: (patients.length + 1).toString(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default { 
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};