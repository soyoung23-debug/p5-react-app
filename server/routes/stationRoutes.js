import express from 'express';

import * as stationController from '../controllers/stationController.js';
import { isAllowed } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All station routes should be protected
router.use(isAllowed);

router.post('/save', stationController.saveStation);
router.get('/my-stations', stationController.getSavedStations);

export default router;