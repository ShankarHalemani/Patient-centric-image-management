const jwt = require("jsonwebtoken");

const getUser = async(token)=>{
    const payload = await jwt.decode(token);
    return payload;
}

module.exports = getUser;