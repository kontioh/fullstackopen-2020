/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  Entry
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

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing date of birth: ' + date);
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

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.occupation),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    entries: parseEntries(object.entries)
  };
};

export default toNewPatient;