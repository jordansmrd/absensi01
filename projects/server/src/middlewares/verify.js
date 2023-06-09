const key = process.env['secret-key'];

const verifyAPI = (req, res, next) => {
 const secret = req.headers['x-secret-key'];
 console.log(secret, key);
 if (secret != key) {
  return res.send('invalid key');
 }
 next();
};

module.exports = verifyAPI;
