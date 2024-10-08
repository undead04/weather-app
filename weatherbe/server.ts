import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {createData} from './utils/createData'
import countyRouter from './routers/countryRouter'
import stateRouter from './routers/stateRouter'
import weatherRouter from './routers/weatherRouter'
import forecastRouter from './routers/forecaseWeatherRoute'
import airRouter from './routers/airRouter'
import iconRouter from './routers/iconRouter'
import addressRouter from './routers/addressRouter'
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL||"");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Thêm 'Authorization' vào danh sách các headers cho phép
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Thêm đầy đủ các phương thức HTTP
  next();
});
createData()
app.use('/api/state',stateRouter)
app.use('/api/county',countyRouter)
app.use('/api/weather',weatherRouter)
app.use('/api/forecast',forecastRouter)
app.use('/api/air',airRouter)
app.use('/api/icon',iconRouter)
app.use('/api/address',addressRouter)
app.listen(process.env.PORT,()=>{
  console.log("Kết nối thành công")
})
export default app
