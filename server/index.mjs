import bp from 'body-parser';
import express from 'express';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({'extended': 'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

export default app;
