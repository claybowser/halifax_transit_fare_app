import mongoose from 'mongoose';
import qrcode from 'qrcode';
//import User from 'models/userModel.js'
// Define the Product schema
const productSchema = new mongoose.Schema({
  id: String,
  quantity: Number,
  // Add other product-related fields if needed
});

// Define the Receipt schema
const receiptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
  },
  products: [
    {
      id: String,
      quantity: Number,
      // Add other product-related fields if needed
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now, // This will set the 'createdAt' field to the current date and time if not provided
  },
  expiry: {
    type: Date,
    default: null,
  },
  qrCode: {
    type: String,
  }
  // Add other receipt-related fields if needed
});

// Create the models
const Product = mongoose.model('Product', productSchema);
const Receipt = mongoose.model('Receipt', receiptSchema);



// Function to generate and set the QR code for a receipt
// export async function generateQRCode() {
//   try {
//     const receiptData = {
//       receiptId: this._id.toString(), // Add the receipt ID to the data
//       user: this.user.toString(),
//       createdAt: this.createdAt.toString(),
//       expiry: this.expiry ? this.expiry.toString() : null,
//     };

//     const qrCodeData = await qrcode.toDataURL(JSON.stringify(receiptData));
//     this.qrCode = qrCodeData;
//     await this.save();
//   } catch (error) {
//     console.error('Error generating QR code:', error);
//   }
// };




export { Product, Receipt };
//module.exports = {Product, Receipt, generateQRCode};