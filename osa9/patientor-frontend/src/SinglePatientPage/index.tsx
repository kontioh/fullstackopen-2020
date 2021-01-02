import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

import { useStateValue, extendPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Gender, Patient } from '../types';

const SinglePatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case 'female':
        return <Icon name='venus'/>;
      case 'male':
        return <Icon name='mars' />;
      default:
        return <Icon name='genderless' />;
    }
  };

  const fetchPatient = async (id: string) => {
    try {
      const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(extendPatient(patient));
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = useParams<{ id: string}>();

  if (!patients[id]) {
    return <div>Patient was not found...</div>;
  }

  if (!patients[id].ssn) {
    fetchPatient(id);
  }

  const patient = patients[id];

  return (
    <div>
      <h2>{patient.name} {genderIcon(patient.gender)}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default SinglePatientPage;