module.exports = {
 apps: [
  {
   name: 'absensi-01', // Format JCWD-{batchcode}-{groupnumber}
   script: './projects/server/src/index.js',
   env: {
    NODE_ENV: 'production',
    PORT: 2000
   },
   time: true
  }
 ]
};
