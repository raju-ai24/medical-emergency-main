import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pharmacy from './models/Pharmacy.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Pharmacies around Ahmedabad region (72.589378°N, 23.098049°E)
const pharmacies = [
  {
    name: "Apollo Pharmacy",
    address: "Bodakdev, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.568745, 23.098049] },
    phone: "+91-79-6622-2000",
    email: "ahmedabad@apollopharmacy.com",
    type: "retail",
    rating: 4.5,
    reviews: 892,
    isOpen: true,
    isOpen24x7: false,
    hasHomeDelivery: true,
    hasOnlineOrdering: true,
    openingHours: {
      monday: { open: "08:00", close: "22:00" },
      tuesday: { open: "08:00", close: "22:00" },
      wednesday: { open: "08:00", close: "22:00" },
      thursday: { open: "08:00", close: "22:00" },
      friday: { open: "08:00", close: "22:00" },
      saturday: { open: "08:00", close: "22:00" },
      sunday: { open: "09:00", close: "21:00" }
    },
    services: ["Prescription Medicines", "OTC Products", "Health Consultation", "Home Delivery"],
    website: "https://www.apollopharmacy.com"
  },
  {
    name: "MedPlus",
    address: "C.G. Road, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.578745, 23.098049] },
    phone: "+91-79-2747-1234",
    email: "ahmedabad@medplus.in",
    type: "retail",
    rating: 4.2,
    reviews: 456,
    isOpen: true,
    isOpen24x7: false,
    hasHomeDelivery: true,
    hasOnlineOrdering: true,
    openingHours: {
      monday: { open: "09:00", close: "21:00" },
      tuesday: { open: "09:00", close: "21:00" },
      wednesday: { open: "09:00", close: "21:00" },
      thursday: { open: "09:00", close: "21:00" },
      friday: { open: "09:00", close: "21:00" },
      saturday: { open: "09:00", close: "21:00" },
      sunday: { open: "10:00", close: "20:00" }
    },
    services: ["Prescription Medicines", "OTC Products", "Health Checkup", "Home Delivery"],
    website: "https://www.medplus.in"
  },
  {
    name: "Fortis Health Pharmacy",
    address: "Prahladnagar, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.598765, 23.098049] },
    phone: "+91-79-2746-4251",
    email: "ahmedabad@fortishealth.com",
    type: "retail",
    rating: 4.6,
    reviews: 312,
    isOpen: true,
    isOpen24x7: true,
    hasHomeDelivery: true,
    hasOnlineOrdering: true,
    openingHours: {
      monday: { open: "00:00", close: "23:59" },
      tuesday: { open: "00:00", close: "23:59" },
      wednesday: { open: "00:00", close: "23:59" },
      thursday: { open: "00:00", close: "23:59" },
      friday: { open: "00:00", close: "23:59" },
      saturday: { open: "00:00", close: "23:59" },
      sunday: { open: "00:00", close: "23:59" }
    },
    services: ["Prescription Medicines", "OTC Products", "Emergency Medicines", "Home Delivery", "Online Consultation"],
    website: "https://www.fortishealth.com"
  },
  {
    name: "Zydus Wellness",
    address: "Satellite, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.578745, 23.098049] },
    phone: "+91-79-6644-4333",
    email: "ahmedabad@zyduswellness.com",
    type: "retail",
    rating: 4.3,
    reviews: 567,
    isOpen: true,
    isOpen24x7: false,
    hasHomeDelivery: true,
    hasOnlineOrdering: true,
    openingHours: {
      monday: { open: "08:00", close: "22:00" },
      tuesday: { open: "08:00", close: "22:00" },
      wednesday: { open: "08:00", close: "22:00" },
      thursday: { open: "08:00", close: "22:00" },
      friday: { open: "08:00", close: "22:00" },
      saturday: { open: "08:00", close: "22:00" },
      sunday: { open: "09:00", close: "21:00" }
    },
    services: ["Prescription Medicines", "OTC Products", "Health Consultation", "Home Delivery", "Medicine Reminders"],
    website: "https://www.zyduswellness.com"
  },
  {
    name: "Wellness Pharmacy",
    address: "Navrangpura, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.608745, 23.098049] },
    phone: "+91-79-2745-0800",
    email: "ahmedabad@wellnesspharmacy.in",
    type: "retail",
    rating: 4.1,
    reviews: 234,
    isOpen: true,
    isOpen24x7: false,
    hasHomeDelivery: false,
    hasOnlineOrdering: false,
    openingHours: {
      monday: { open: "10:00", close: "20:00" },
      tuesday: { open: "10:00", close: "20:00" },
      wednesday: { open: "10:00", close: "20:00" },
      thursday: { open: "10:00", close: "20:00" },
      friday: { open: "10:00", close: "20:00" },
      saturday: { open: "10:00", close: "20:00" },
      sunday: { open: "11:00", close: "19:00" }
    },
    services: ["Prescription Medicines", "OTC Products", "Basic Medical Supplies"],
    website: "https://www.wellnesspharmacy.in"
  }
];

const addPharmacies = async () => {
  try {
    console.log('💊 Adding Ahmedabad pharmacies to database...');
    
    await connectDB();
    
    // Insert pharmacies one by one
    let insertedCount = 0;
    for (const pharmacy of pharmacies) {
      try {
        await Pharmacy.create(pharmacy);
        insertedCount++;
        console.log(`✅ Inserted: ${pharmacy.name}`);
      } catch (error) {
        console.error(`❌ Failed to insert ${pharmacy.name}:`, error.message);
      }
    }

    console.log(`\n🎉 Successfully inserted ${insertedCount}/${pharmacies.length} Ahmedabad pharmacies!`);
    
    // Verify insertion
    const count = await Pharmacy.countDocuments();
    console.log(`📊 Total pharmacies in database: ${count}`);

  } catch (error) {
    console.error('❌ Error adding pharmacies:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the function
addPharmacies();
