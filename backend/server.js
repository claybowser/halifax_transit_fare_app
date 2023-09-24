// sk_test_51NkKtmLB0AdTCUhBZCw8Gd2YF2DsbzZXZuHgitUecKSEZIJgsZL0n9NsWWwKiUBUbNneWf2PHpi6kTXrYa0CAoOE00JWFDb1w0
//Adult Pass = price_1NkfZILB0AdTCUhB2gVNjjWR
//Senior Youth Pass = price_1NkfZyLB0AdTCUhB9bfAna0a
//Child Pass = price_1NkfbBLB0AdTCUhBhD0z6G0c
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js';
const port = process.env.PORT || 4000;
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NkKtmLB0AdTCUhBZCw8Gd2YF2DsbzZXZuHgitUecKSEZIJgsZL0n9NsWWwKiUBUbNneWf2PHpi6kTXrYa0CAoOE00JWFDb1w0');
import User from './models/userModel.js';
import UserPrivacyInfo from './models/userPrivacyModel.js';
import mongoose from 'mongoose';
import {Product, Receipt } from './models/storeModels.js';
import qr from 'qrcode';
import device from 'express-device';
//import generateQRCode  from './models/storeModels.js';
//import Receipt from './models/storeModels.js';

import { protect } from './middleware/authMiddleware.js';
import { checkConsentMiddleware } from './middleware/consentMiddleware.js';

connectDB();

const app = express();

//app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the origin of your frontend application
  credentials: true, // Allow credentials (cookies)
}));

app.use(bodyParser.json());
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

// Use the express-device middleware
app.use(device.capture());

//middleware for user data
// Your middleware to capture user privacy info
app.use((req, res, next) => {
  if (req.path === '/') {
    const userPrivacyInfo = new UserPrivacyInfo({
      ip: req.ip,
      country: req.headers['x-country'],
      location: req.headers['x-location'],
      datetime: new Date(),
      userAgent: req.get('User-Agent'), // Capture the browser information
      device: req.device.type, // Capture the device type (you'll need the 'express-device' package for this)
      deviceInfo: {
        screenSize: req.headers['x-screen-size'], // Capture the screen size if available in headers
        // Add other device info fields as needed
      },
      language: req.get('Accept-Language'), // Capture the preferred language
      // Add other fields from headers as needed
    });

    userPrivacyInfo.save()
      .then(() => {
        // Handle a successful save here
        console.log('User privacy info saved successfully');
        next();
      })
      .catch((err) => {
        console.error('Error saving user privacy info:', err);
        next();
      });
  } else {
    next(); // For all other routes, skip this middleware
  }
});

//PRODUCTION
if (process.env.NODE_ENV === 'production'){
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get('*', (req, res)=> res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
  app.get('/',(req, res)=> res.send('Server is ready'));
}

// Define a route to capture user privacy info
app.post('/capture-info', (req, res) => {
  const {
    ip,
    country,
    location,
    userAgent,
    device,
    screenSize,
    language,
    // Add other fields you want to capture
  } = req.body; // Assuming you send this data in the request body

  // Create a new UserPrivacyInfo instance with the captured data
  const userPrivacyInfo = new UserPrivacyInfo({
    ip,
    country,
    location,
    datetime: new Date(),
    userAgent,
    device,
    deviceInfo: {
      screenSize,
      // Add other device info fields as needed
    },
    language,
    // Add other fields from the request as needed
  });

  // Save the user privacy info to the database
  userPrivacyInfo.save()
    .then(() => {
      console.log('User privacy info captured successfully');
      res.sendStatus(200); // Send a success response
    })
    .catch((err) => {
      console.error('Error capturing user privacy info:', err);
      res.sendStatus(500); // Send an error response if needed
    });
});


// Simulated successful payment webhook
app.post('/webhook', async (req, res) => {
    const stripeEvent = req.body;
  
    // Check if the event is a successful payment
    if (req.body.data.object.payment_status === 'paid') {
      // Retrieve the user ID from the authenticated user
      //const userId = req.user._id;
        console.log('PAID')
        let email = req.body.data.object.metadata.user.toString()
        console.log(email)
        email = email.slice(1, -1)
        try {
        const foundUser = await User.findOne({ email: email});
        console.log('USER FOUND: ' , foundUser)

// Create an array of product data based on the provided JSON string
const productsData = JSON.parse(req.body.data.object.metadata.products);

// Create an array to hold the product documents
const productDocuments = [];

// Loop through the products data and create Product documents
for (const productData of productsData) {
  const product = new Product(productData);
  productDocuments.push(product);
}

// Create a new receipt using the user and product documents
const receipt = new Receipt({
  user: foundUser._id,
  products: productDocuments,
  createdAt: Date.now(),
  // Add other receipt-related fields if needed
});


// Save the receipt to the database
receipt.save()
.then(async savedReceipt => {
  console.log('Receipt saved:', savedReceipt);

  // Generate a QR code with the receipt ID
  const receiptId = savedReceipt._id.toString(); // Assuming _id is an ObjectId
  const qrCodeData = await qr.toDataURL(receiptId);

  // Now you can save the QR code data as a string to the receipt
  savedReceipt.qrCode = qrCodeData;

  // Save the receipt with the QR code
  savedReceipt.save()
    .then(updatedReceipt => {
      console.log('Receipt with QR code saved:', updatedReceipt);
    })
    .catch(error => {
      console.error('Error saving receipt with QR code:', error);
    });
})
.catch(error => {
  console.error('Error saving receipt:', error);
});












        } catch (err) {
            console.error(err);
        }

        //let userId = (req.body.data.object.metadata.user).trim();
        //console.log('user id ' + userId);
        //const userId = '64fd95cea8a05ac5f96187f3';
        //console.log(userId)
        //const userIdObject = new mongoose.Types.ObjectId(userId.toString())
        //const userIdObject = new mongoose.Types.ObjectId(userId)
        //const user = await User.findById(userIdObject);
        //console.log(user)

        // try {
        //     const userIdString = req.body.data.object.metadata.user.toString().trim();
        //     console.log(userIdString)
        //     const objectIdInstance = new mongoose.Types.ObjectId(userIdString);
        //     let foundUser = await User.findById(objectIdInstance);
        //     console.log(foundUser)
        //     // Use objectIdInstance as needed
        //   } catch (error) {
        //     console.error('Error converting to ObjectId:', error);
        //     // Handle the error appropriately, such as logging or sending an error response
        //   }

    }//endif paid
  
    //console.log(req.body.data.object.payment_status)
    //console.log(req.body)
    //console.log(userId)
    res.sendStatus(201);
  });



// Define a route to retrieve and display receipts
app.get('/receipts', protect, async (req, res) => {
  try {
    // Fetch receipts and populate the products field
    const user = await User.findById(req.user._id);
    console.log(user._id)
    //const receipts = await Receipt.find().populate('products');
    const receipts = await Receipt.find({ user: user._id }).populate('products').sort({createdAt: -1});
    console.log(receipts);
    // Send the data to the user as JSON
    res.json(receipts);
  } catch (error) {
    // Handle any errors that occur during the database query
    res.status(500).json({ error: 'Error fetching receipts' });
  }
});

// QR Code scanning and receipt update route
app.post('/scan', async (req, res) => {
  try {
    // Simulate scanning a QR code to get the receipt ID from the request body
    const receiptId = req.body.receiptId; // Assuming the receipt ID is in the request body
    console.log(receiptId)
    // Calculate the new expiry time (2 hours from now)
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 2);

// Retrieve the receipt document
const receipt = await Receipt.findById(receiptId);

if (!receipt) {
  // If receipt not found
  res.status(404).json({ message: 'Receipt not found' });
  return;
}

// Check if expiry is null before updating
if (receipt.expiry === null) {
  // Update the receipt's expiry
  receipt.expiry = expiryTime;
  await receipt.save();
  res.status(201).json({
    message: 'ACCESSS GRANTED EXPIRY UPDATED TO TWO HOURS FROM NOW',
    receipt: receipt.toObject() // Convert to plain JavaScript object for a cleaner response
  });
} else {
  // If expiry is not null
  let currentDate = new Date();
  if (currentDate > receipt.expiry){
    //expired
    res.status(200).json({ message: 'ACCESS DENIED TICKET IS EXPIRED', receipt: receipt.toObject() });

  } else {
  res.status(200).json({ message: 'ACCESS GRANTED, TICKET EXPIRY VALID', receipt: receipt.toObject() });
  }
}
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}

    // const result = await Receipt.findOneAndUpdate(
    //   { _id: receiptId, expiry: null }, // Replace with your actual query criteria
    //   { $set: { expiry: expiryTime } },
    //   { new: true }
    // );

    // if (result){
    //   res.status(200).json({ message: 'Receipt updated successfully :', receipt: result });
    // }

    // Send a response indicating success or failure
  //   if (result.modifiedCount === 1) {
  //     res.status(200).json({ message: 'Receipt updated successfully :', receipt: result });
  //   } else {
  //     res.status(404).json({ message: 'Receipt not found' , receipt: result});
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Internal server error' });
  // }
});

app.post("/checkout", async (req, res) => {
    const items = req.body.items;
    //const userInfo = req.body.user;
    //const { email, password } = req.body;
    const email = req.body.user.email
    //console.log(email);

    //console.log(email);
    //const user = await User.findOne({ email });
    //const userId = await User.findOne({ email });
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        );
    })
    //initialize session with stripe
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
        metadata: {
            user: JSON.stringify(email),
            //user: JSON.stringify(await User.findOne({ email }).select('_id name email')),
            products: JSON.stringify(items)
        }
    });

    //send user to stripe
    res.send(JSON.stringify({
        url: session.url
    }));
});



app.use('/api/users', userRoutes);

//app.get('/',(req, res)=> res.send('Server is ready'));
app.get('/', (req, res) => {
  const userData = {
    message: 'Server is ready',
    // Add other user data properties here if needed
  };

  res.json(userData);
});


app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});