const bcrypt = require('bcryptjs');
const password = 'admin123';
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('HASH_FOR_ADMIN123:', hash);
  });
});
