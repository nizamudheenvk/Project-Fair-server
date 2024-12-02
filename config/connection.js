const mongoose = require('mongoose')

const connection_striing = process.env.CONNECTIONSTRING
mongoose.connect(connection_striing).then((res)=>{

    console.log("MONGODB ATLAS CONNECTER SUCCESSFULLY WITH PF SERVER");
    
}).catch(err=>{
    console.log("connction failed");
    console.log(err);
    
    
})
