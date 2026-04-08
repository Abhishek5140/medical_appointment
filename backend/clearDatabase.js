import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const clearDatabase = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all collections
    const collections = await mongoose.connection.db.collections();
    
    console.log(`\n📊 Found ${collections.length} collections`);
    
    // Drop each collection
    for (let collection of collections) {
      const collectionName = collection.collectionName;
      await collection.drop();
      console.log(`🗑️  Dropped collection: ${collectionName}`);
    }
    
    console.log('\n✅ All data cleared successfully!');
    console.log('💡 Database is now empty and ready for fresh data.\n');
    
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();
