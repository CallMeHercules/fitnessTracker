const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports =  {        
    createUser: async (args) => {
        return User.findOne({ email: args.userInput.email}).then(user =>{
            if (user){
                throw new Error('User already exists.');
            }
        return bcrypt.hash(args.userInput.password, 12)})
        .then(
            hashedPassword => {
            const user = new User ({
                email: args.userInput.email
                    ,password: hashedPassword
                    ,bodyweight: +args.userInput.bodyweight
                });
                return user.save();
            })
        .then(res => {
                return {...res._doc, password: null};
        })    
        .catch(err =>{
            throw err;
        }) 
    }, 
    login: async ({ email, password })=> {
        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error('invalid login');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('invalid login');
        }
        const token = jwt.sign({userId: user.id, email: user.email}
        , 'secretkey123'
        , {
            expiresIn: '1h'
        });
        return { userId: user.id, token: token, tokenExpiration: 1 }
    }
};