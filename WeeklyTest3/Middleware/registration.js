import fs from 'fs';
import path from 'path'; // Correctly import the path module

// Validate registration middleware
export function validateRegistration(req, res, next) {
    const { firstName, lastName, password, email, phoneNumber } = req.body;
  
    if (!firstName || firstName[0] !== firstName[0].toUpperCase()) {
      return next(new Error('First letter of the first name must be capitalized.'));
    }
  
    if (!lastName || lastName[0] !== lastName[0].toUpperCase()) {
      return next(new Error('First letter of the last name must be capitalized.'));
    }
  
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return next(new Error('Password must be at least 8 characters long and include one special character, one uppercase letter, and one numeric character.'));
    }
  
    if (!email || !email.includes('@')) {
      return next(new Error('Invalid email address.'));
    }
  
    if (!phoneNumber || phoneNumber.length < 10) {
      return next(new Error('Phone number must be at least 10 digits long.'));
    }
  
    next();
  }

// Error handling middleware function
export function errorHandler(err, req, res, next) {
    const logMessage = `${new Date().toISOString()} - ${err.message}\nStack Trace: ${err.stack}\n`;
    const logPath = path.join(__dirname, 'error.log');
  
    fs.appendFile(logPath, logMessage, (fsErr) => {
      if (fsErr) {
        console.error('Error writing to log file:', fsErr);
      }
    });
  
    console.error(err); // Log the full error to the console
    res.status(500).json({ error: 'Internal Server Error' });
  }