import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Icon,
  Container,
  Segment,
  Grid,
  List,
  Button
} from 'semantic-ui-react';

import { useStateValue, extendPatient, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import {
  Gender,
  Patient,
  Entry,
  Diagnosis,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating
} from '../types';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal'; 


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry; diagnoses: { [code: string]: Diagnosis} }> = ({ entry, diagnoses }) => {
  return (
      <Segment>
        <h3>{entry.date} <Icon name='hospital outline' size='large' /></h3>
        <i style={{ color: 'gray' }}>
          <div>{entry.description}</div>
          <div>Discharge: {entry.discharge?.date} {entry.discharge?.criteria}</div>
          
          <List>
            {entry.diagnosisCodes?.map(c => <List.Item key={c}>{c} {diagnoses[c].name}</List.Item>)}
          </List>
        </i>
      </Segment>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry; diagnoses: { [code: string]: Diagnosis} }> = ({ entry, diagnoses }) => {
  return (
    <Segment>
        <h3>{entry.date} <Icon name='stethoscope' size='large' /> {entry.employerName}</h3>
        <i style={{ color: 'gray' }}>
          <div>{entry.description}</div>
          
          <List>
            {entry.diagnosisCodes?.map(c => <List.Item key={c}>{c} {diagnoses[c].name}</List.Item>)}
          </List>
        </i>
      </Segment>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry; diagnoses: { [code: string]: Diagnosis} }> = ({ entry, diagnoses }) => {
  const heartColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case 0: return 'green';
      case 1: return 'yellow';
      case 2: return 'orange';
      case 3: return 'red';
    }
  };
  
  return (
    <Segment>
        <h3>{entry.date} <Icon name='doctor' size='large' /></h3>
        <i style={{ color: 'gray' }}>
          <div>{entry.description}</div>
          <List>
            {entry.diagnosisCodes?.map(c => <List.Item key={c}>{c} {diagnoses[c].name}</List.Item>)}
          </List>
          <Icon name='heart' color={heartColor(entry.healthCheckRating)}/>
        </i>
      </Segment>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }, ] = useStateValue();
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      assertNever(entry);
      return <div>Something went wrong...</div>;
  }
};


const SinglePatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const addNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);

      setTimeout(() => {
        setError('');
      }, 10000);
    }
  };

  return (
    <div>
      <h2>{patient.name} {genderIcon(patient.gender)}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <h3>entries</h3>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={addNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>

      <Container>
        <Grid stackable>
          <Grid.Column>
            {patient.entries?.map((entry, i) => <EntryDetails key={i} entry={entry} />)}
          </Grid.Column>
        </Grid>
      </Container>
      
    </div>
  );
};

export default SinglePatientPage;