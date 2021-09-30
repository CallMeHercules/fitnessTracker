const authResolver = require('./auth');
const liftResolver = require('./lifts');
const mergeResolver = require('./merge');

const rootResolver = {
    ...authResolver
    ,...liftResolver
    ,...mergeResolver
};

module.exports = rootResolver;