require('dotenv').config()
require('express-async-errors')


const express=require('express')
const morgan=require('morgan')
const cookieParser=require('cookie-parser')
const port=process.env.PORT||5000



//database

const connectDB=require('./db/connect')

//middleware

const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')


//routes

const authRouter=require('./routes/authRoutes')
const userRouter=require('./routes/userRoutes')
const productRouter=require('./routes/productRoutes')



const app=express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))


app.get('/',(req,res)=>{
    res.send('e-commerce')
})

app.get('/api/v1',(req,res)=>{
    console.log(req.signedCookies);
    res.send('e-commerce')
})
    
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/products',productRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const start=async ()=>{
    try {
       await connectDB(process.env.MONGO_URL)
        app.listen(port,console.log(`the server is listening to port ${port}`))
    } catch (error) {
console.log(error);
    }
}


start()