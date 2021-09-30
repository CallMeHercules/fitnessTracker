const Lift = require('../../models/lift');
const User = require('../../models/user');

const user = async userId => {
    try {
    const user = await User.findById(userId)
        return { ...user._doc,
                _id: user.id, 
                performedLifts: lifts.bind(this, user._doc.performedLifts) 
        };
        return user;
    }
    catch(err) {
        throw err;
    }
}
const lifts = async liftIds => {
        try {
            const lifts = await Lift.find({_id: {$in: liftIds}});
                    return lifts.map(lift => {
                        return {...lift._doc,
                                date: new Date(lift._doc.date).toISOString(),
                                lifter: user.bind(this, lift._doc.lifter)
                        };
                    });
        }
        catch(err) {
            throw err;
        }
    }
const singleLift = async singleLift => {
    const lift = await Lift.findById(liftId)
    try {
        return { ...Lift._doc,
                _id: lift.id, 
                lifter: lifts.bind(this, lift._doc.lifter) 
        };
        return lift;
    }
    catch(err) {
        throw err;
    }
};
exports.user = user;
exports.lifts = lifts;
exports.singleLift = singleLift;