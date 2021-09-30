const Lift = require('../../models/lift');
const User = require('../../models/user');
const { user,lifts } = require('./merge');

module.exports = {
    ///insert
    createLift: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('unauthenticated');
        }
        const lift = new Lift({
            name: args.liftInput.name
            ,weight: +args.liftInput.weight
            ,reps: +args.liftInput.reps
            ,date: new Date(args.liftInput.date).toISOString() 
            ,lifter: req.isAuth.userId
        });
        const res = await lift.save()
            createdLift = {...res._doc 
                            ,lifter: user.bind(this, res._doc.lifter)}
            const lifter = await User.findById(req.isAuth.userId);
            lifter.performedLifts.push(lift);
            await lifter.save();
            return createdLift;
        },
    ///query    
    lifts: async () => {
        if (!req.isAuth) {
            throw new Error('unauthenticated');
        }
        const lifts = await Lift.find();
            return lifts.map(lift => {
                return {...lift._doc
                        ,date: new Date(lift._doc.date).toISOString()
                        ,lifter: user.bind(this, lift._doc.lifter)
                }
            });
        } 
    };