const jwt = require('jsonwebtoken');
const secret = "sourabh"



function setUser( user) {
    const payload = {
        id: user._id,  
        username: user.username,
        role:user.role,
    };
    return jwt.sign(payload , secret)
}

function getUser(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded; 
    } catch (error) {
        return null; 
    }
}

module.exports = {
    setUser,
    getUser
}