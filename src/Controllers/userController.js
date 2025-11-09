import userService from '../services/userService.js';

const userController = {

    async getUser(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }

    },

    async createUser(req, res) {
        try {
            const userData = req.body;

            if (!userData || !userData.email) {
                return res.status(400).json({ error: 'Invalid user data' });
            }

            console.log(req.body);

            console.log(req.file);
            const newUser = await userService.createUser(userData,req.file);
            
            if (!newUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
            res.status(201).json({ user: newUser, message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    },


    async updateUser(req, res) {
        try {
            const email = req.params.email;
            if (!email) {
                return res.status(400).json({ error: 'Email parameter is required' });
            }
            const updateData = req.body;
            if (!updateData) {
                return res.status(400).json({ error: 'No data provided for update' });
            }
            const updatedUser = await userService.updateUser(email, updateData);
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ user: updatedUser, message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }

    },

    async deleteUser(req, res) {
        try {
            const email = req.params.email;

         
           const  user=await userService.deleteUser(email);
         if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            
            res.status(500).json({ error: 'Failed to delete user' });
        }

},

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            const user = await userService.login(email,password);

           if (!user) {
               return res.status(401).json({ error: 'Invalid email or password' });
           }

           return res.status(200).json({ message: 'Login successful', user });


        } catch (error) {
            res.status(500).json({ error: 'Failed to login user' });
        }
    },

    async getUserProfile (req, res){
        try {
            const id=req.user.id;
            const exists = await userService.getUserById(id);
            if (!exists) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ user: exists });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch user profile' });    
        }
    },


};

export default userController;