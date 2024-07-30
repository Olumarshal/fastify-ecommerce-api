import app from './app';

const start = async () => {
  try {
    await app.listen(3000);
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
