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

// Sample hospitals data for Meerut and Agra region
const hospitals = [
  {
    name: "Meerut Medical College & Hospital",
    address: "Garh Road, Meerut, Uttar Pradesh",
    location: { type: "Point", coordinates: [77.7064, 28.9845] },
    phone: "+91-1824-517-000",
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
  }
];

const addHospitals = async () => {
  try {
    console.log('🏥 Adding hospitals to database...');
    
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

    console.log(`\n🎉 Successfully inserted ${insertedCount}/${hospitals.length} hospitals!`);
    
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
