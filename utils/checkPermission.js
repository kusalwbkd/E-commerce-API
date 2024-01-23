const customError=require('../errors')

const checkPermission=(requestUser,resourceUserId)=>{

   if(requestUser.role === 'admin') return

   if(requestUser.userId === resourceUserId.toString()) return

   throw new customError.UnauthorizedError('Not authorized to access this route')



}

module.exports=checkPermission