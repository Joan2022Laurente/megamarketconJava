import express from "express";
import cors from "cors";
import morgan from "morgan"
import TaskRoutes from "./routes/platos"

const app = express();

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(TaskRoutes)

export default app