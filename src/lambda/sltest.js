import serverless from "serverless-http";
import app from "./lib/app";
import sltest from "./lib/sltest";

app.use("/.netlify/functions/sltest", sltest);

console.log(">>> app.use");

export const handler = serverless(app);
export default app;
