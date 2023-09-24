import mongoose from "mongoose";

const userPrivacyInfoSchema = new mongoose.Schema({
  ip: String,         // User's IP address
  country: String,    // Country derived from headers or geolocation
  location: String,   // Location information from headers
  datetime: Date,     // Date and time of the request
  userAgent: String,  // User-Agent header (browser information)
  device: String,     // Type of device (e.g., desktop, mobile)
  deviceInfo: {
    screenSize: String,  // Screen size if available in headers
    // Add other device-related fields as needed
  },
  language: String,   // Preferred language from headers
  // Add other fields as needed
});

const UserPrivacyInfo = mongoose.model('UserPrivacyInfo', userPrivacyInfoSchema);

export default UserPrivacyInfo;
