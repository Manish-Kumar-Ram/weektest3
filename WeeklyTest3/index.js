import express from 'express';
import { errorHandler } from './Middleware/registration.js';
import { validateRegistration } from './Middleware/registration.js';

const app = express();
const port = process.env.PORT || 5589;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the User Registration API!');
  });

// Registration route
app.post('/register', validateRegistration, (req, res) => {
  res.status(201).json({ message: 'User registered successfully' });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log('Server started at port ' + port);
});
