import {config as dotenv} from "dotenv"
dotenv()

console.log(process.env.NICKNAME)

export const config = {
  host: "localhost",
  user : "root",
  password : "",
  database: "restaurant"
}