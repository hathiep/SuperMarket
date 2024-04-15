CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    dob DATE,
    gender VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    password VARCHAR(255),
    role INT
);
