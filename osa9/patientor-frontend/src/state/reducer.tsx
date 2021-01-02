import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "EXTEND_PATIENT";
      payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "EXTEND_PATIENT":
      const extendedPatients = state.patients;
      for (const key in extendedPatients) {
        if (extendedPatients[key].id === action.payload.id) {
          extendedPatients[key] = action.payload;
        }
      }
      return {
        ...state,
        patients: extendedPatients
      };
    
    default:
      return state;
  }
};


export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const extendPatient = (patient: Patient): Action => {
  return {
    type: "EXTEND_PATIENT",
    payload: patient
  };
};