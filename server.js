const apis = require('./apis');

const app = require('./app')(apis());
const PORT = process.env.SF_MONTAGE_PORT;
app.listen(PORT);
console.log(`PB_RESIZER listening on ${PORT}`);
