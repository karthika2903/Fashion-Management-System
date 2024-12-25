const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const path= require('path');
const fs= require('fs');
const Dress= require('./models/dress');
const dressRoutes = require('./routes/dressRoutes');

require('dotenv').config();
const PORT=process.env.PORT || 3000;
const mongoURI= process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI);

const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
// console.log(path.join(__dirname,'public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname ,'views'));

const connectDB= async()=>{
    try{
        await mongoose.connect(mongoURI,{
            useNewUrlParser:true,   	                                            
            useUnifiedTopology:true
        });
        console.log('connectd to mongodb');
        
        const count= await Dress.countDocuments();
        if(count===0){
            const data= JSON.parse(fs.readFileSync('./data.json','utf-8'))
            await Dress.insertMany(data);
            console.log('initially data loaded successfully');
        }
    }
    catch(error){
        console.log('error in connecting mongoDB',error.message);  
    }
}
connectDB();

app.use('/',dressRoutes);

app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`);   
});