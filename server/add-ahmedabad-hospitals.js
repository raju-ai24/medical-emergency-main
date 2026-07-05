import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hospital from './models/Hospital.js';

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

// Hospitals around Ahmedabad region (23.098049°N, 72.589378°E)
const hospitals = [
  {
    name: "Civil Hospital, Ahmedabad",
    address: "Asarva, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.589378, 23.098049] },
    phone: "+91-79-226-8100",
    email: "civilhospital.ahd@gujarat.gov.in",
    type: "government",
    specialties: ["General Medicine", "Emergency Care", "Cardiology", "Orthopedics", "Pediatrics", "Surgery"],
    rating: 4.3,
    reviews: 892,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 1200, available: 280 },
    website: "https://www.gujarathealth.gov.in"
  },
  {
    name: "SVP Hospital & Institute of Medical Sciences",
    address: "Vasna, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.598765, 23.118049] },
    phone: "+91-79-226-8300",
    email: "info@svphospital.org",
    type: "government",
    specialties: ["General Medicine", "Emergency Care", "Cardiology", "Neurology", "ICU", "Trauma Care"],
    rating: 4.5,
    reviews: 1234,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 1500, available: 350 },
    website: "https://www.svphospital.org"
  },
  {
    name: "Shalby Hospital",
    address: "Shalby Crossroads, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.612345, 23.078049] },
    phone: "+91-79-2747-0800",
    email: "info@shalbyhospital.org",
    type: "private",
    specialties: ["General Medicine", "Emergency Care", "Maternity", "Pediatrics"],
    rating: 4.2,
    reviews: 567,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 500, available: 120 },
    website: "https://www.shalbyhospital.org"
  },
  {
    name: "Zydus Hospital",
    address: "Makarba, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.578923, 23.058049] },
    phone: "+91-79-6644-4444",
    email: "info@zydushospital.org",
    type: "private",
    specialties: ["General Medicine", "Emergency Care", "Cardiology", "Oncology", "Nephrology"],
    rating: 4.7,
    reviews: 890,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 800, available: 200 },
    website: "https://www.zydushospital.org"
  },
  {
    name: "Apollo Hospital, Ahmedabad",
    address: "Bodakdev, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.568745, 23.048049] },
    phone: "+91-79-6622-2000",
    email: "ahmedabad@apollohospitals.com",
    type: "private",
    specialties: ["General Medicine", "Emergency Care", "Cardiology", "Neurosurgery", "Orthopedics", "Gastroenterology"],
    rating: 4.8,
    reviews: 1456,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 1000, available: 250 },
    website: "https://www.apollohospitals.com/ahmedabad"
  },
  {
    name: "Narayana Hrudayalaya Multispecialty Hospital",
    address: "New C.G. Road, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.558745, 23.028049] },
    phone: "+91-79-2550-6911",
    email: "info@nhm-ahmedabad.org",
    type: "government",
    specialties: ["General Medicine", "Emergency Care", "Surgery", "Cardiology", "Pediatrics", "Psychiatry"],
    rating: 4.1,
    reviews: 734,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 2000, available: 450 },
    website: "https://www.nhm-ahmedabad.org"
  },
  {
    name: "Sterling Hospital",
    address: "Prahladnagar, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.628745, 23.038049] },
    phone: "+91-79-2745-0800",
    email: "info@sterlinghospital.org",
    type: "private",
    specialties: ["General Medicine", "Emergency Care", "Cardiology", "Maternity", "IVF"],
    rating: 4.4,
    reviews: 623,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 600, available: 150 },
    website: "https://www.sterlinghospital.org"
  },
  {
    name: "CIMS Hospital",
    address: "Bodakdev, Ahmedabad, Gujarat",
    location: { type: "Point", coordinates: [72.548745, 23.048049] },
    phone: "+91-79-2686-0800",
    email: "info@cimshospital.org",
    type: "private",
    specialties: ["General Medicine", "Emergency Care", "Cardiology", "Orthopedics", "Neurology"],
    rating: 4.6,
    reviews: 445,
    isOpen24x7: true,
    emergencyAvailable: true,
    hasAmbulance: true,
    beds: { total: 400, available: 100 },
    website: "https://www.cimshospital.org"
  }
];

const addHospitals = async () => {
  try {
    console.log('🏥 Adding Ahmedabad hospitals to database...');
    
    await connectDB();
    
    // Insert hospitals one by one
    let insertedCount = 0;
    for (const hospital of hospitals) {
      try {
        await Hospital.create(hospital);
        insertedCount++;
        console.log(`✅ Inserted: ${hospital.name}`);
      } catch (error) {
        console.error(`❌ Failed to insert ${hospital.name}:`, error.message);
      }
    }

    console.log(`\n🎉 Successfully inserted ${insertedCount}/${hospitals.length} Ahmedabad hospitals!`);
    
    // Verify insertion
    const count = await Hospital.countDocuments();
    console.log(`📊 Total hospitals in database: ${count}`);

  } catch (error) {
    console.error('❌ Error adding hospitals:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the function
addHospitals();
