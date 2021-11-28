const app = require('./src/app');

console.log("All Systems Running!")

const port = process.env.APP_PORT || 80;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: ${process.env.IP}:${port}`);
  /* eslint-enable no-console */
});
