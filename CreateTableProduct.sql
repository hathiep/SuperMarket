CREATE TABLE `product` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255),
  `image` VARCHAR(255),
  `category` VARCHAR(255),
  `des` TEXT,
  `price` INT,
  `quantity` INT,
  `status` VARCHAR(255)
);
