import { bootstrapApi } from './app';

const port = process.env.PORT || 3000;

const app = bootstrapApi();

app.listen(port);

console.log(`server is listening on ${port}`);
