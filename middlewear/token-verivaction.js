const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            code: 401,
            message: "Access Denied"
        })
    } else {
        const bearer = token.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
}

module.exports = { verifyToken };
