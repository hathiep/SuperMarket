CREATE TABLE `Order` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `customer_id` INT,
  `date` DATE,
  `total_cost` INT,
  `shipment` VARCHAR(255),
  `payment` VARCHAR(255),
  `status` VARCHAR(255)
);
