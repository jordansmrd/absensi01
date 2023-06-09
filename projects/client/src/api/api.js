import axios from 'axios';

export const api = axios.create({
 baseURL: 'https://absensi-01.project-kelas.pw/api',
 headers: {
  ['x-secret-key']: 'rahasia'
 }
});
