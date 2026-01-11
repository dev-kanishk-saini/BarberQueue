import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user-routes.js';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));  
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Barber Queue API');
}); 

app.get('/api/v1/health', (req, res) => {
  res.send('Health Check: OK');
}); 

app.use('/api/v1/user', userRoutes); 


export default app;