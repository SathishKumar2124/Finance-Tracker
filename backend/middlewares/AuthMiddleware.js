import jwt from 'jsonwebtoken';

const validateToken = async(req,res,next) => {
    const headers = req.headers.authorization;

    if(!headers){
        return res.status(403).json({msg : "Unauthorized , Token Required!!!" , success : false});
    }

    try {
        const decoded  = jwt.verify(headers,process.env.secret_key);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({msg : "Unauthorized , Wrong Token !!!" , success : false});
    }

}

export default validateToken;