import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://api.leisheng.one/v1")
  .setProject("6695b4a100352e94e36c");
export const account = new Account(client);
export { ID } from "appwrite";

export const getAccount = () => account.get();
