const apis = require('./apis');

const app = require('./app')(apis());
const PORT = process.env.PORT;
app.listen(PORT);
