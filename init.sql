CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  image TEXT
);

INSERT INTO products (name, price, image) VALUES
('Nike Air Max', 120.00, 'https://example.com/shoe1.jpg'),
('Adidas Ultraboost', 150.00, 'https://example.com/shoe2.jpg'),
('Puma Runner', 90.00, 'https://example.com/shoe3.jpg');

