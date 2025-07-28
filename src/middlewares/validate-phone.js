module.exports = (req, res, next) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }


  
  const regex = /^9\d{9}$/;
  if (!regex.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  
  next();
};
