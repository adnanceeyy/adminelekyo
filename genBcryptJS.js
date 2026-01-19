import bcrypt from 'bcryptjs';

const password = 'admin@123';
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('BCRYPTJS_HASH:', hash);
    });
});
