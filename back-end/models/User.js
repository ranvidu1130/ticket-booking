const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

class User {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    // Create a new user
    static async create(userData) {
        const { email, password, first_name, last_name } = userData;
        
        try {
            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            // Insert user into database
            const [result] = await pool.execute(
                'INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
                [email, hashedPassword, first_name, last_name]
            );
            
            // Return the created user (without password)
            const [users] = await pool.execute(
                'SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?',
                [result.insertId]
            );
            
            return new User(users[0]);
        } catch (error) {
            throw error;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        try {
            const [users] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            
            return users.length > 0 ? new User(users[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    // Find user by ID
    static async findById(id) {
        try {
            const [users] = await pool.execute(
                'SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?',
                [id]
            );
            
            return users.length > 0 ? new User(users[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    // Verify password
    async verifyPassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    // Update user
    static async update(id, updateData) {
        try {
            const updates = [];
            const values = [];

            if (updateData.email) {
                updates.push('email = ?');
                values.push(updateData.email);
            }
            if (updateData.first_name) {
                updates.push('first_name = ?');
                values.push(updateData.first_name);
            }
            if (updateData.last_name) {
                updates.push('last_name = ?');
                values.push(updateData.last_name);
            }
            if (updateData.password) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(updateData.password, saltRounds);
                updates.push('password = ?');
                values.push(hashedPassword);
            }

            if (updates.length === 0) {
                return await User.findById(id);
            }

            values.push(id);

            await pool.execute(
                `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
                values
            );

            return await User.findById(id);
        } catch (error) {
            throw error;
        }
    }

    // Delete user
    static async delete(id) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM users WHERE id = ?',
                [id]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Get user data without password
    toJSON() {
        const { password, ...userWithoutPassword } = this;
        return userWithoutPassword;
    }
}

module.exports = User;