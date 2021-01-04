import React, { useState } from 'react';
import { Grid, Button, Select } from "semantic-ui-react";
import { Field, Formik, Form } from 'formik';

import { useStateValue } from '../state';
import {
  TextField,
  DiagnosisSelection,
  NumberField
} from "../AddPatientModal/FormField";
import {
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from '../types';


export type EntryFormValues =
    Omit<HospitalEntry, 'id' >
  | Omit<OccupationalHealthcareEntry, 'id' >
  | Omit<HealthCheckEntry, 'id' >;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const [entryType, setEntryType] = useState("Hospital");                                              
  
  const entryTypeOptions = [
    { key: 'Hospital', value: 'Hospital', text: 'Hospital' },
    { key: 'OccupationalHealthcare', value: 'OccupationalHealthcare', text: 'Occupational Health Care' },
    { key: 'HealthCheck', value: 'HealthCheck', text: 'Health Check' }
  ];

  return (
    <div>
      <div><strong>Select entry type</strong></div>
      <Select
        value={entryType}
        placeholder="Select country"
        options={entryTypeOptions}
        onChange={(_event, { value }) => { value ? setEntryType(value.toString()) : console.log('Something went wrong...'); }}
      />

      {entryType === 'Hospital' &&
      <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        specialist: "",
        description: "",
        discharge: { date: "", criteria: "" }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
          let errors: { [field: string]: string } | { [field: string]: { [field: string]: string } } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }

          if (values.type === 'Hospital') {
            if (!values.discharge.date) {
              errors = {
                ...errors,
                discharge: { date: 'Discharge date and/or criteria missing' }
              };
            }
            if (!values.discharge.criteria) {
              errors = {
                ...errors,
                discharge: { criteria: 'Discharge date and/or criteria missing' }
              };
            }
          }

          if (values.type === 'OccupationalHealthcare') {
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (values.sickLeave && values.sickLeave.startDate && !values.sickLeave.endDate) {
              errors = {
                ...errors,
                sickLeave: { endDate: 'End date must be specified' }
              };
            }
            if (values.sickLeave && !values.sickLeave.startDate && values.sickLeave.endDate) {
              errors = {
                ...errors,
                sickLeave: { startDate: 'Start date must be specified' }
              };
            }
          }

          if (values.type === 'HealthCheck') {
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
          }
          
          return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <div>
              <h3>Discharge</h3>
              <Grid columns={2} stackable>
                <Grid.Column>
                  <Field 
                    label="Date of discharge"
                    placeholder="YYYY-MM-DD"
                    name="discharge.date"
                    component={TextField}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field 
                    label="Discharge criteria"
                    placeholder="Criteria"
                    name="discharge.criteria"
                    component={TextField}
                  />
                </Grid.Column>
              </Grid>
            </div>

            <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>

          </Form>
        );
      }}
    </Formik>
      }


      {entryType === 'OccupationalHealthcare' &&
      <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        date: "",
        specialist: "",
        description: "",
        sickLeave: { startDate: "", endDate: "" },
        employerName: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
          let errors: { [field: string]: string } | { [field: string]: { [field: string]: string } } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }

          if (values.type === 'Hospital') {
            if (!values.discharge.date) {
              errors = {
                ...errors,
                discharge: { date: 'Discharge date and/or criteria missing' }
              };
            }
            if (!values.discharge.criteria) {
              errors = {
                ...errors,
                discharge: { criteria: 'Discharge date and/or criteria missing' }
              };
            }
          }

          if (values.type === 'OccupationalHealthcare') {
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (values.sickLeave && values.sickLeave.startDate && !values.sickLeave.endDate) {
              errors = {
                ...errors,
                sickLeave: { endDate: 'End date must be specified' }
              };
            }
            if (values.sickLeave && !values.sickLeave.startDate && values.sickLeave.endDate) {
              errors = {
                ...errors,
                sickLeave: { startDate: 'Start date must be specified' }
              };
            }
          }

          if (values.type === 'HealthCheck') {
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
          }
          
          return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <div>
              <Field
                label="Employer name"
                placeholder="Employer name"
                name="employerName"
                component={TextField} 
              />
              
              <h3>Sick leave</h3>
              <Grid columns={2} stackable>
                <Grid.Column>
                  <Field 
                    label="Start date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.startDate"
                    component={TextField}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Field 
                    label="End date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    component={TextField}
                  />
                </Grid.Column>
              </Grid>
            </div>

            <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>

            </Form>
          );
        }}
      </Formik>
      }

      {entryType === 'HealthCheck' &&
      <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        specialist: "",
        description: "",
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
          let errors: { [field: string]: string } | { [field: string]: { [field: string]: string } } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }

          if (values.type === 'Hospital') {
            if (!values.discharge.date) {
              errors = {
                ...errors,
                discharge: { date: 'Discharge date and/or criteria missing' }
              };
            }
            if (!values.discharge.criteria) {
              errors = {
                ...errors,
                discharge: { criteria: 'Discharge date and/or criteria missing' }
              };
            }
          }

          if (values.type === 'OccupationalHealthcare') {
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (values.sickLeave && values.sickLeave.startDate && !values.sickLeave.endDate) {
              errors = {
                ...errors,
                sickLeave: { endDate: 'End date must be specified' }
              };
            }
            if (values.sickLeave && !values.sickLeave.startDate && values.sickLeave.endDate) {
              errors = {
                ...errors,
                sickLeave: { startDate: 'Start date must be specified' }
              };
            }
          }

          if (values.type === 'HealthCheck') {
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
          }
          
          return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <div>
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            </div>

            <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>

            </Form>
          );
        }}
      </Formik>
      }

  </div>
  );
};

export default AddEntryForm;