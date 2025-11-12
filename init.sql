CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  image TEXT
);

INSERT INTO products (name, price, image) VALUES
('Nike Air Max', 120.00, 'http://13.232.215.222:5000/uploads/cat.jpg'),
