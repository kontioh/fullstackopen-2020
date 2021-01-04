import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from 'formik';

import { useStateValue } from '../state';
import {
  TextField,
  DiagnosisSelection
} from "../AddPatientModal/FormField";
import {
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from '../types';


export type EntryFormValues =
    Omit<HospitalEntry, 'id' >;
  /*| Omit<OccupationalHealthcareEntry, 'id' >
  | Omit<HealthCheckEntry, 'id' >;*/

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

/*  for hospital entry */
const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
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
        if (!values.discharge.date) {
          errors = {
            ...errors,
            discharge: { date: 'Discharge date and/or criteria missing' }
          };
        if (!values.discharge.criteria) {
          errors = {
            ...errors,
            discharge: { criteria: 'Discharge date and/or criteria missing' }
          };
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
  );
};

export default AddEntryForm;