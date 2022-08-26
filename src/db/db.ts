import mongoose from 'mongoose';
import Logger from '../providers/logger';

class Database {
  // Initialize the database connection
  public static async init(): Promise<void> {
    const dsn: string = process.env.COSMOSDB_URL as string;
    try {
      mongoose.connect(dsn);
      Logger.debug('Database initialized successfully');
    } catch (error: any) {
      Logger.error(`Database connection error: ${error.message}`);
    }
  }
}

export default Database;
