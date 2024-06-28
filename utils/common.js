export const handleAll =(req,res)=>{
  return res.status(405).json({status:'error',message:'method not allowed'});
}