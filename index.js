const cors=require("cors");
const express=require("express");
const {getAllEmployees,getEmployeeById}=require("./controllers");
const exp = require("constants");
const app=express();
app.use(cors());
app.use(express.json());
app.get("/employees",async(req,res)=>{
  const employees=await getAllEmployees();
  return res.status(200).json({employees});
});
app.get("/employees/details/:id",async(req,res)=>{
  const id=parseInt(req.params.id);
  const employee=await getEmployeeById(id);
  return res.status(200).json({employee});

});
module.exports={app}

