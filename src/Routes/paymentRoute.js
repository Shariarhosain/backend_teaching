import express from 'express';
import  paymentController from '../Controllers/PaymentController.js';

import verifyMiddleware from '../middleware/verify.js';

const router = express.Router();


router.use(verifyMiddleware);

router.post('/create-payment', paymentController.createPayment);
 router.get('/', paymentController.confirmPayment);
// router.put('/update-payment/:id', paymentController.updatePaymentStatus);
// router.delete('/delete-payment/:id', paymentController.deletePaymentRecord);





export default router;