import express from 'express';

import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {

  res.send(diaryService.getNonSensitiveEntries()); // getNonSensitiveEntries
});


router.get('/:id', (req, res) => {
  const diary = diaryService.findById(String(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
    const {name, dateOfBirth, ssn, gender, occupation} = req.body;
    const newPatientEntry = diaryService.addDiary({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    })
    res.json(newPatientEntry);
});

export default router;