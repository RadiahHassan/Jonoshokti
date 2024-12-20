import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import issueRoutes from './routes/issueRoutes.js';

const app = express();
//const PORT = process.env.PORT || 1002;

const PORT = 1002;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the routes
app.use('/api', issueRoutes);
app.use(express.static('public'));


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


