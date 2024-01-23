const customError=require('../errors')

const {isTokenValid}=require('../utils')

const authenticateUser=async(req,res,next)=>{

    const token=req.signedCookies.token

    if(!token){
   throw new customError.UnauthenticatedError('Authentication invalid')
    }
    
  
 try {
        const {name,userId,role}=isTokenValid({token})
        req.user={name,userId,role};

        next()
        
    } catch (error) {
        throw new customError.UnauthenticatedError('Authentication invalid')
    } 
   
  
}

const authorizePermisson=(...roles)=>{


return(req,res,next)=>{
    if(!roles.includes(req.user.role)){
        throw new customError.UnauthorizedError('unauthorized to access this route')

    }
    
next()
}

}
module.exports={authenticateUser,authorizePermisson}