import paymentService from '../services/paymentService.js';

const paymentController = {

    async createPayment(req, res) {
        try {
        const id = req.user.id;
        const {bank_account_number,card_cvv,card_expiry_date,card_number}=req.body;

        console.log(req.body);

        // if (!bank_account_number || (card_cvv && card_expiry_date && card_number)) {
        //     return res.status(400).json({ error: 'Missing payment details' });
        // }

            const payment = await paymentService.createPayment(id, { bank_account_number, card_cvv, card_expiry_date, card_number });

            if (!payment) {
                return res.status(400).json({ error: 'Failed to create payment' });
            }
            return res.status(201).json({ message: 'Payment created successfully', payment });
        

           
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }

    },

    async confirmPayment(req, res) {
        try {
            const id = req.user.id;
            const payment = await paymentService.confirmPayment(id);
            if (!payment) {
                return res.status(404).json({ error: 'Payment not found' });
            }
            return res.status(200).json({ payment });
            
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    },


    async updateUser(req, res) {
        try {
           
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }

    },

    async deleteUser(req, res) {
        try {
           
        } catch (error) {
            
            res.status(500).json({ error: 'Failed to delete user' });
        }

},

};

export default paymentController;