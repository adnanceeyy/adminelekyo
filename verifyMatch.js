import bcrypt from 'bcryptjs';

const password = 'admin@123';
const hash = '$2a$10$YDvihZiN635iqYhzDL8v5.ICe752MhVIUqcDXbH53KD24SgNQfR0C';

bcrypt.compare(password, hash, (err, result) => {
    console.log('Match result:', result);
    if (err) console.error('Error:', err);
});
