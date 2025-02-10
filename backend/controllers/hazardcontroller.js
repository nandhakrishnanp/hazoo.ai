const hazardshmea = require("../model/hazardshmea");

// const hazardSchema = new mongoose.Schema({
//     cctv_id: {
//         type: String,
//         required: true
//     },
//     image:{
//         type: String,
//         required: true
//     },
//     hazard_type: {
//         type: String,
//         required: true
//     },
//     location:{
//         latitude: {
//             type: String,
//             required: true
//         },
//         longitude: {
//             type: String,
//             required: true
//         }
//     },
//     created_at: {
//         type: Date,
//         default: Date.now
//     },
//     completed_at:{
//         type: Date,
//         default: null
//     },
//     status: {
//         type: String,
//         default: "Active"
//     }
// })

const createHazard = async (req, res) => {
  try {
    const { isUser_reported, user_id, cctv_id, image, hazard_type, location } = req.body;
   if(cctv_id){

     const newhazard = new hazardshmea({
       cctv_id,
       image,
       hazard_type,
       location,
       status:"verification pending"
     });
     await newhazard.save();
   }
   else{
    const newhazard = new hazardshmea({
      isUser_reported,
      user_id,
      image,
      hazard_type,
      location,
      status:"verification pending"
    });
    await newhazard.save();
   }
    return res.json({ message: "Hazard added successFully" });
  } catch (error) {
    return res.json({ message: error.message }).status(400);
  }
};

const addmorehazrds =async (req,res)=>{
    try {
         const data = req.body;
         console.log(data);
         
          const newhazard =  hazardshmea.create(data);
            // await newhazard.save();
            return res.json({ message: "Hazard added successFully" });
    } catch (error) {
        return res.json({ message: error.message }).status(400);
        

    }
}
const getAllHazards = async (req,res)=>{
    try {
        const data = await hazardshmea.find({});
        return res.json({data}).status(200)
    } catch (error) {
    return res.json({ message: error.message }).status(400);
        
    }
}

const resolveHazards = async(req,res)=>{
   try {
      const { id , discription} = req.body;
     
        

    const hazard = await hazardshmea.findById(id);

    if(!hazard){
      return res.json({message:"Hazard not found"}).status(400);
    }
       
     const updatedHazard = await hazardshmea.findByIdAndUpdate(id,{
      status:"Resolved",
      discription:discription
     })
     
     await updatedHazard.save();

     return res.json({message:"Hazard resolved successfully"}).status(200);
   } catch (error) {
      return res.json({ message: error.message }).status(400);
   }
}


const verifyHazard = async(req,res)=>{
  try {
    const { id } = req.body;
    const hazard = await hazardshmea.findById(id);
    if(!hazard){
      return res.json({message:"Hazard not found"}).status(400);
    }
       
     const updatedHazard = await hazardshmea.findByIdAndUpdate(id,{
      status:"Verified"
     })
     
     await updatedHazard.save();

     return res.json({message:"Hazard verified successfully"}).status(200);
  } catch (error) {
    return res.json({ message: error.message }).status(400);
  }
}

module.exports={
    createHazard,
    getAllHazards,
    addmorehazrds,
    resolveHazards,
    verifyHazard
}
