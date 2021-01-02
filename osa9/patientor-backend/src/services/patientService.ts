import patients from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getPublicEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getEntryById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
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
  getPublicEntries,
  addPatient,
  getEntryById
};