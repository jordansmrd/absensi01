import axios from 'axios';

export const api = axios.create({
 baseURL: 'http://api.absensi-01.project-kelas.pw',
 headers: {
  ['x-secret-key']: 'rahasia'
 }
});
