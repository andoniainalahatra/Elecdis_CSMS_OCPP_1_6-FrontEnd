const userData = [];

const statuses = ["active", "inactive", "maintenance"];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomName = () => `Name${Math.floor(Math.random() * 1000)}`;
const getRandomFname = () => `firstName${Math.floor(Math.random() * 1000)}`;
const getRandomEmail = (name) => `${name.toLowerCase()}@example.com`;
const getRandomPhoneNumber = () => `+33${Math.floor(Math.random() * 1000000000)}`;

for (let i = 0; i <= 100; i++) {
    const id = `${i}`;
    const status = getRandomElement(statuses);
    const nom = getRandomName();
    const prenom = getRandomFname();
    const email = getRandomEmail(nom);
    const telephone = getRandomPhoneNumber();
    const role = getRandomElement(["Admin", "User", "Guest"]);

    userData.push({
        id,
        nom,
        prenom,
        email,
        telephone,
        role,
        status,
    });
} 

export default userData;



