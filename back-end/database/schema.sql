-- Create database
CREATE DATABASE IF NOT EXISTS ticket_booking;
USE ticket_booking;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index on email for faster lookup
CREATE INDEX idx_users_email ON users(email);

-- Create films table
CREATE TABLE IF NOT EXISTS films (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    show_time VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    genre VARCHAR(100),
    duration VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample films
INSERT INTO films (title, description, image_url, show_time, price, genre, duration) VALUES
('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.', 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500', '7:00 PM', 12.99, 'Action', '2h 32m'),
('Inception', 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500', '9:30 PM', 11.99, 'Sci-Fi', '2h 28m'),
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500', '6:00 PM', 10.99, 'Drama', '2h 22m'),
('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.', 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=500', '8:00 PM', 11.50, 'Crime', '2h 34m'),
('Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.', 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500', '10:00 PM', 13.99, 'Sci-Fi', '2h 49m'),
('The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500', '7:30 PM', 10.99, 'Sci-Fi', '2h 16m'),
('Forrest Gump', 'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500', '5:30 PM', 9.99, 'Drama', '2h 22m'),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500', '8:30 PM', 12.50, 'Crime', '2h 55m'),
('Avatar', 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world.', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500', '9:00 PM', 14.99, 'Sci-Fi', '2h 42m'),
('Titanic', 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=500', '6:30 PM', 11.99, 'Romance', '3h 14m'),
('Gladiator', 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500', '7:45 PM', 12.99, 'Action', '2h 35m'),
('The Lion King', 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.', 'https://images.unsplash.com/photo-1516728778615-2d590ea1855e?w=500', '4:00 PM', 9.99, 'Animation', '1h 58m');