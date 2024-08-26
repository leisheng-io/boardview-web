import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://api.leisheng.one/v1")
  .setProject("66c72efa002bb3c4d2da");
export const account = new Account(client);
export { ID } from "appwrite";

export const getAccount = () => account.get();
