const key = process.env['x-secret-key'];

const verifyAPI = (req, res, next) => {
 const secret = req.headers['x-secret-key'];
 if (secret != key) {
  return res.send('invalid key');
 }
 next();
};

module.exports = verifyAPI;
