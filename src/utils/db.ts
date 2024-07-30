import { Client } from 'cassandra-driver';
import dotenv from 'dotenv';

dotenv.config();

const contactPoints = process.env.SCYLLADB_CONTACT_POINTS || 'localhost';
const localDataCenter = process.env.DATA_CENTER;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const keyspace = process.env.SCYLLADB_KEYSPACE || 'ecommerce';

if (!localDataCenter || !username || !password) {
  throw new Error('Missing required environment variables for ScyllaDB connection.');
}

const client = new Client({
  contactPoints: [contactPoints],
  localDataCenter: localDataCenter,
  credentials: { username: username, password: password },
  keyspace: keyspace,
  pooling: {
    coreConnectionsPerHost: {
      '0': 2,
      '1': 1,
      '2': 0,
    },
  },
  queryOptions: { consistency: 1 },
  socketOptions: { connectTimeout: 3000 },
});

const connectWithRetry = async (retries = 5) => {
    while (retries) {
      try {
        await client.connect();
        console.log('Connected to ScyllaDB');
        return;
      } catch (err) {
        retries -= 1;
        console.error(`Failed to connect to ScyllaDB. Retries left: ${retries}`, err);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    throw new Error('Failed to connect to ScyllaDB after multiple attempts');
  };
  
  connectWithRetry();
export default client;
