import express from 'express';
import commonRouter from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport, { Passport } from 'passport';
import "./strategies/local-strategy.mjs";

const app = express();
app.use(express.json());
app.use(cookieParser("devstoc"));
app.use(session({
    secret: 'DEVstoc',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(commonRouter);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Running on Port: ${PORT}`);
})