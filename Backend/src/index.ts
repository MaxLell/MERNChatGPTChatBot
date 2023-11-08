import app from './app.js';
import { connectToDatabase } from './db/connection.js';

const PORT = process.env.PORT || 10000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log('server open & connected to DB')
    );
  })
  .catch((error) => console.log(error));
