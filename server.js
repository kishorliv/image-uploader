const app = require('./src/app');

const PORT = process.env.PORT || 9060;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at port ${PORT}`);
});
