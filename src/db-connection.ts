import monogoose from 'mongoose';

import { uri } from './app';
import { problemSubmitTest } from './routes/problem-submit-test';
import { ProblemsSchema } from './schemas/problems-schema';
import { ScoreSchema } from './schemas/score-schema';
import { UsersSchema } from './schemas/users-schema';

export const dbConnection = monogoose.createConnection(uri);

/**
 * Initialize database.
*/
export function dbInit() {
  dbConnection.model('Users', UsersSchema);
  dbConnection.model('Problems', ProblemsSchema);
  dbConnection.model('Scores', ScoreSchema);
  dbConnection.on('error', (error: any) => {
    console.log('Unable to connect to the database.');
    console.error(error);
    process.exit(1);
  });
  dbConnection.once('open', () => {
    console.log('Connected to the database.');
    problemSubmitTest();
  });
}
