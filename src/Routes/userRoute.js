import express from 'express';
import  userController from '../Controllers/userController.js';

import verifyMiddleware from '../middleware/verify.js';
import  upload from '../middleware/multer.js';

const router = express.Router();




router.post('/login', userController.loginUser);
router.post('/create', upload.single('pic'), userController.createUser);



router.get('/getall', userController.getUser);
router.use(verifyMiddleware);

router.put('/:email', userController.updateUser);
router.delete('/:email', userController.deleteUser);

router.get('/profile', userController.getUserProfile);


export default router;