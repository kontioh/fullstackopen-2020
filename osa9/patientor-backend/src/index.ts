import express from 'express';
import cors from 'cors';
import diagnosisService from './routes/diagnoses';
import patientService from './routes/patients';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('ping pong');
});

app.use('/api/diagnoses', diagnosisService);
app.use('/api/patients', patientService);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});