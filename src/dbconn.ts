import monogoose from 'mongoose';
import { uri } from './app';
import { problemSubmitTest } from './routes/problem-submit-test';
import { ProblemsSchema } from './schemas/problems-schema';
import { UsersSchema } from './schemas/users-schema';

export const dbconn = monogoose.createConnection(uri);

/**
 * Initialize database.
*/
export function dbInit() {
  dbconn.model('Users', UsersSchema);
  dbconn.model('Problems', ProblemsSchema);
  dbconn.on('error', (error: any) => {
    console.log('Unable to connect to the database.');
    console.error(error);
    process.exit(1);
  });
  dbconn.once('open', () => {
    console.log('Connected to the database.');
    problemSubmitTest();
  });
}
