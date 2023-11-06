import express from 'express';
const app = express();
// Middlewares
app.use(express.json());
// Connections and listener
app.listen(10000, () => console.log('server open'));
//# sourceMappingURL=index.js.map