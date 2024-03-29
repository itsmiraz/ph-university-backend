import app from './app';
import config from './app/config';

import mongoose from 'mongoose';
import { Server } from 'http';
import seedSuperAdmin from './app/DB/seedSuperAdmin';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

process.on('unhandledRejection', () => {
  console.log(`😡 unhandled Rejection is Detected , shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😡 uncaughtException is Detected , shutting down...`);
  process.exit(1);
});
