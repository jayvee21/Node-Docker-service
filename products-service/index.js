const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');
const app = express()
const port = process.env.PORT || 4000;
const { productsRoute, usersRoute } = require('./routes/index');

app.use( express.json() )

const connectWithRetry = () => {
    const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(()=>console.log("successfully connected to DB"))
    .catch((e)=>{
        console.log(e);
        setTimeout( connectWithRetry, 5000 );
    });
}

connectWithRetry()



// Products route
app.use("/v1/products", productsRoute);
app.use("/v1/users", usersRoute)

// Initial route
app.get('/', (req, res)=>{
    res.send(`Products service API`);
});



app.listen( port, () => {
    console.log(`Products services api is running at port : ${port}`)
});