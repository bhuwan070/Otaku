const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://otakujatra.vercel.app',
    'https://otakufestival.vercel.app',
    'https://otaku-festival.com',
    'https://www.otaku-festival.com',
    'http://otaku-festival.com',
    'http://www.otaku-festival.com',
    process.env.CLIENT_ADDRESS,
  ],
  'Access-Control-Allow-Origin': 'https://otaku-festival.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// // 👇️ specify origins to allow
// const whitelist = ["http://localhost:3000", "https://otakujatra.vercel.app"];

// // ✅ Enable pre-flight requests
// app.options("*", cors());

// const corsOptions = {
//   credentials: true,
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));

// mongoose
//   .connect(process.env.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(console.log('db connected'));

mongoose.connect(process.env.DB).then(console.log('db connected'));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   next();
// });

app.use('/gallery', require('./routes/gallery'));
app.use('/event', require('./routes/event'));
app.use('/sponser', require('./routes/sponser'));
app.use('/partner', require('./routes/partner'));
app.use('/organizer', require('./routes/organizer'));
app.use('/contact', require('./routes/contact'));

//user who buys tickets
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));

app.post('/login', require('./controllers/adminController').adminLogin);

app.listen(process.env.PORT, () => {
  console.log(`server running at port:http://localhost:${process.env.PORT}`);
});
