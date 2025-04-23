const adminSchema =require('../model/adminShmea')
const bcrypt = require('bcrypt');


const loginadmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminSchema.findOne({ email });
        if (!admin) {
            return res.json({ message: 'Invalid email or password' }).status(400);
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({ message: 'Invalid email or password' }).status(400);
        }
        res.json({ message: 'Login successful', data:{
            email:admin.email,
            district:admin.district,
            id:admin._id
        } });
    }
    catch (error) {
        res.json({ message: 'Something went wrong' }).status(500);
    }
}



const registeradmin = async (req, res) => {
    const { email, password, district } = req.body;
    try {
        const admin = await adminSchema.findOne({
            email
        });
        if (admin) {
            return res.json({ message: 'Admin already exists' }).status(400);
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newAdmin = new adminSchema({
            email,
            password: hashedPassword,
            district
        });
        await newAdmin.save();
        res.json({ message: 'Admin registered successfully' });

    }
    catch (error) {
        res.json({ message: 'Something went wrong' }).status(500);
    }
}


module.exports = {
    loginadmin,
    registeradmin
}
