import express from 'express';

import patientRouter from './src/routes/diaries';
import diagnosisRouter from './src/routes/diagnosis';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});


app.use('/api/patients', patientRouter);

app.use('/api/diagnosis', diagnosisRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});