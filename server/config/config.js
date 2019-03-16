const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: "SUPERMAN",
        DATABASE: 'mongodb://sandipguchait:roshni77@ds149344.mlab.com:49344/bookstore21'
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}