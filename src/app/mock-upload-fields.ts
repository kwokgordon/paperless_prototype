import { LOB } from './line-of-business';
import { Status } from './status';

export const LOBS: LOB[] = [
  { id: 1, name: 'P&C'},
  { id: 2, name: 'Auto'},
  { id: 3, name: 'Specialty - Tech'},
  { id: 4, name: 'Specialty - PL'},
  { id: 5, name: 'Specialty - CP'},
  { id: 6, name: 'Specialty - EB'},
  { id: 7, name: 'Surety'},
  { id: 8, name: 'Bordereau'}
];


export const Statuses: Status[] = [
  { id: 1, name: 'New'},
  { id: 2, name: 'Existing'}
];
