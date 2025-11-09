import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import authGoogle from "./routes/auth.js";
import './utils/passport.js';

dotenv.config();
const app = express();

// ✅ Ruxsat berilgan domenlar
const allowedOrigins = [
  "http://localhost:5173",
  "https://14ea94ce8be2.ngrok-free.app",
];

// ✅ CORS middleware (credential-friendly)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); // aniq origin
    res.setHeader("Access-Control-Allow-Credentials", "true"); // cookie yuborish uchun
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // preflight OPTIONS
  }
  next();
});

app.use(express.json());

// ✅ Session sozlamalari
app.use(session({
  secret: 'cyberwolve',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // HTTPS bo‘lsa true
    httpOnly: true,
    sameSite: "lax",
    maxAge: 365 * 24 * 60 * 60 * 1000
  }
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routers
import registerMeetUsUser from './routes/registerMeetUsUser.js';
import helpCenter from './routes/helpCenter.js';
import userProfile from './routes/userProfile.js';
import userInformation from './GetData/userInformation.js';
import tokenRoutes from './routes/tokenRoutes.js';
import linkRoute from './routes/linkRoute.js';
import resume from './routes/resume.js';

app.use('/api/', registerMeetUsUser);
app.use('/api/meetus/help', helpCenter);
app.use('/api/profile', userProfile);
app.use('/api/get-info', userInformation);
app.use('/api/token', tokenRoutes);
app.use('/api/user', linkRoute);
app.use('/api/auth', authGoogle);
app.use('/resume', resume);

// ✅ MongoDB ulanishi
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB ulandi"))
  .catch(err => console.log("Mongo hatolik:", err));

// ✅ Server ishga tushurish
const PORT = process.env.PORT || 1747;
app.listen(PORT, () => console.log(`Server ${PORT} da ishlayapti`));
