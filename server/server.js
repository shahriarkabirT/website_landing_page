import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mailRoutes from "./routes/mailRoutes.js"

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/mail", mailRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" })
})

const PORT = process.env.PORT || 5003
app.listen(PORT, () => {
  console.log(`✓ Backend running on http://localhost:${PORT}`)
})
