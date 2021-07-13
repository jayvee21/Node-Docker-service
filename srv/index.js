const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_HOST, REDIS_PORT, SESSION_SECRET, MAX_COOKIE_MILISECONDS } = require('./config/config');

let redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
})


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


app.use(session({
    store: new RedisStore({ client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: MAX_COOKIE_MILISECONDS
    }
}))


// Products route
app.use("/v1/products", productsRoute);
app.use("/v1/users", usersRoute)

// Initial route
app.get('/', (req, res)=>{
    res.send(`Products service API`);
});



app.listen( port, () => {
    console.log(`API services api is running at port : ${port}`)
});