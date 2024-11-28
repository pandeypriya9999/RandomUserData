import { Router } from 'express';
import { fetchUsers, populateUsers } from '../controllers/userController';
import { upsertConfig } from '../controllers/configController';
import { validateConfig } from '../middleware/validator';

const router = Router();

router.get('/users', fetchUsers);
router.post('/users/fetch', populateUsers);

router.post('/config', validateConfig, upsertConfig)

export default router;
