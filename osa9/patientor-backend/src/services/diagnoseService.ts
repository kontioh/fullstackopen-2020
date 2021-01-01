import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

export default { getEntries };