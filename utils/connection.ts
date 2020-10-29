const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const dbname = process.env.DATABASE_NAME;
export const url = `mongodb+srv://${username}:${password}@tenbond.2lzls.mongodb.net/${dbname}?retryWrites=true&w=majority`;
