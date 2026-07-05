import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hospital from './models/Hospital.js';
import Pharmacy from './models/Pharmacy.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds timeout
      bufferMaxEntries: 0,
      bufferCommands: false
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Sample hospitals data for Meerut and Agra region
const hospitals = [
  // Meerut Hospitals
  {
    name: "Meerut Medical College & Hospital",
    address: "Garh Road, Meerut, Uttar Pradesh",
    location: { type: "Point", coordinates: [77.7064, 28.9845] },
    phone: "+91-121-264-4250",
    email: "mmcmeerut@up.gov.in",
    type: "government",
    specialties: ["General Medicine", "Emergency Care", "Cardiology", "Orthopedics", "Pediatrics"],
    rating: 4.2,
    reviews: 523,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 500, available: 125 },
    website: "https://mmcmeerut.org"
  },
  {
    name: "Anand Hospital",
    address: "Delhi Road, Meerut, Uttar Pradesh",
    location: { type: "Point", coordinates: [77.7146, 28.9673] },
    phone: "+91-121-266-8311",
    email: "info@anandhospitalmeerut.com",
    type: "private",
    specialties: ["General Medicine", "Emergency Care", "Surgery", "ICU"],
    rating: 4.5,
    reviews: 892,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 300, available: 75 },
    website: "https://www.anandhospitalmeerut.com"
  },
  {
    name: "Meerut Heart Center",
    address: "Abu Lane, Meerut, Uttar Pradesh",
    location: { type: "Point", coordinates: [77.7234, 28.9912] },
    phone: "+91-121-276-1234",
    email: "info@meerutheartcenter.com",
    type: "private",
    specialties: ["Cardiology", "Cardiac Surgery", "Emergency Care"],
    rating: 4.8,
    reviews: 445,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 150, available: 40 },
    website: "https://www.meerutheartcenter.com"
  },
  {
    name: "District Hospital Meerut",
    address: "Begum Bagh, Meerut, Uttar Pradesh",
    location: { type: "Point", coordinates: [77.7064, 28.9845] },
    phone: "+91-121-264-0180",
    type: "government",
    specialties: ["General Medicine", "Emergency Care", "Maternity", "Pediatrics"],
    rating: 3.8,
    reviews: 234,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: false,
    beds: { total: 250, available: 60 },
    website: "https://www.uphealth.in"
  },

  // Agra Hospitals
  {
    name: "S.N. Medical College & Hospital",
    address: "Agra, Uttar Pradesh",
    location: { type: "Point", coordinates: [78.0081, 27.1765] },
    phone: "+91-562-252-1234",
    email: "principal@snmcaagra.com",
    type: "government",
    specialties: ["General Medicine", "Emergency Care", "Surgery", "Cardiology", "Neurology"],
    rating: 4.3,
    reviews: 1023,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 800, available: 200 },
    website: "https://www.snmcaagra.com"
  },
  {
    name: "Agra City Hospital",
    address: "M.G. Road, Agra, Uttar Pradesh",
    location: { type: "Point", coordinates: [78.0175, 27.1917] },
    phone: "+91-562-252-8901",
    email: "info@agracityhospital.com",
    type: "private",
    specialties: ["General Medicine", "Emergency Care", "Orthopedics", "Maternity"],
    rating: 4.1,
    reviews: 567,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 350, available: 85 },
    website: "https://www.agracityhospital.com"
  },
  {
    name: "Pushpanjali Hospital",
    address: "Fatehabad Road, Agra, Uttar Pradesh",
    location: { type: "Point", coordinates: [78.0234, 27.1890] },
    phone: "+91-562-228-1234",
    email: "info@pushpanjalihospital.com",
    type: "private",
    specialties: ["General Medicine", "Emergency Care", "ICU", "Pediatrics"],
    rating: 4.6,
    reviews: 789,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 400, available: 100 },
    website: "https://www.pushpanjalihospital.com"
  },
  {
    name: "District Hospital Agra",
    address: "M.G. Road, Agra, Uttar Pradesh",
    location: { type: "Point", coordinates: [78.0081, 27.1765] },
    phone: "+91-562-252-0181",
    type: "government",
    specialties: ["General Medicine", "Emergency Care", "Maternity", "Public Health"],
    rating: 3.7,
    reviews: 345,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: false,
    beds: { total: 300, available: 70 },
    website: "https://www.uphealth.in"
  }
];

// Sample pharmacies data for Meerut and Agra region
const pharmacies = [
  // Meerut Pharmacies
  {
    name: "Apollo Pharmacy",
    address: "Abu Lane, Meerut, Uttar Pradesh",
    location: { type: "Point", coordinates: [77.7146, 28.9673] },
    phone: "+91-121-266-8312",
    email: "meerut@apollopharmacy.com",
    type: "retail",
    rating: 4.2,
    reviews: 234,
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
    address: "Delhi Road, Meerut, Uttar Pradesh",
    location: { type: "Point", coordinates: [77.7234, 28.9912] },
    phone: "+91-121-276-5432",
    email: "meerut@medplus.in",
    type: "retail",
    rating: 4.0,
    reviews: 189,
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
    address: "Garh Road, Meerut, Uttar Pradesh",
    location: { type: "Point", coordinates: [77.7064, 28.9845] },
    phone: "+91-121-264-4251",
    email: "meerut@fortishealth.com",
    type: "retail",
    rating: 4.5,
    reviews: 412,
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

  // Agra Pharmacies
  {
    name: "Apollo Pharmacy Agra",
    address: "M.G. Road, Agra, Uttar Pradesh",
    location: { type: "Point", coordinates: [78.0175, 27.1917] },
    phone: "+91-562-252-8902",
    email: "agra@apollopharmacy.com",
    type: "retail",
    rating: 4.3,
    reviews: 298,
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
    name: "Netmeds",
    address: "Fatehabad Road, Agra, Uttar Pradesh",
    location: { type: "Point", coordinates: [78.0234, 27.1890] },
    phone: "+91-562-228-5432",
    email: "agra@netmeds.com",
    type: "online",
    rating: 4.1,
    reviews: 456,
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
    services: ["Prescription Medicines", "OTC Products", "Online Consultation", "Home Delivery", "Medicine Reminders"],
    website: "https://www.netmeds.com"
  },
  {
    name: "Agra Medical Store",
    address: "Sadar Bazaar, Agra, Uttar Pradesh",
    location: { type: "Point", coordinates: [78.0081, 27.1765] },
    phone: "+91-562-252-0182",
    type: "retail",
    rating: 3.9,
    reviews: 167,
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
    website: "https://www.agrastore.com"
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data in smaller batches
    console.log('🗑️ Clearing existing data...');
    await Hospital.deleteMany({});
    console.log('✅ Cleared hospitals');
    await Pharmacy.deleteMany({});
    console.log('✅ Cleared pharmacies');

    // Insert hospitals in smaller batches
    console.log('🏥 Inserting hospitals...');
    const insertedHospitals = await Hospital.insertMany(hospitals);
    console.log(`✅ Inserted ${insertedHospitals.length} hospitals`);

    // Insert pharmacies in smaller batches
    console.log('💊 Inserting pharmacies...');
    const insertedPharmacies = await Pharmacy.insertMany(pharmacies);
    console.log(`✅ Inserted ${insertedPharmacies.length} pharmacies`);

    console.log('\n🎉 Database seeded successfully!');
    console.log(`📍 Hospitals in Meerut: ${hospitals.filter(h => h.location.coordinates[0] >= 77.7 && h.location.coordinates[0] <= 77.8).length}`);
    console.log(`📍 Hospitals in Agra: ${hospitals.filter(h => h.location.coordinates[0] >= 78.0 && h.location.coordinates[0] <= 78.1).length}`);
    console.log(`📍 Pharmacies in Meerut: ${pharmacies.filter(p => p.location.coordinates[0] >= 77.7 && p.location.coordinates[0] <= 77.8).length}`);
    console.log(`📍 Pharmacies in Agra: ${pharmacies.filter(p => p.location.coordinates[0] >= 78.0 && p.location.coordinates[0] <= 78.1).length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the seed function
seedDatabase();
