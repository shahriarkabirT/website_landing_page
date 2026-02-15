import "dotenv/config"
import express from "express"
import cors from "cors"
import session from "express-session"
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"
import passport from "./config/passport.js"
import connectDB from "./config/db.js"
import mailRoutes from "./routes/mailRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import consultationRoutes from "./routes/consultationRoutes.js"
import demoRoutes from "./routes/demoRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import { User, Plan } from "./models/index.js"
import path from "path"

// Connect to Database
connectDB()

const app = express()
app.set("trust proxy", 1)

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://idokans.com",
      "https://www.idokans.com",
      process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Session & Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "somethingsecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }),
)
app.use(passport.initialize())

// Routes
app.use("/api/mail", mailRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/consultation", consultationRoutes)
app.use("/api/demo", demoRoutes)
app.use("/api/upload", uploadRoutes)

const __dirname = path.resolve()
console.log("Serving static files from:", path.join(__dirname, "/uploads"))
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// Seed Admin and Plans
const seedData = async () => {
  try {
    // User Seeding (Admin)
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL || "admin@example.com" })
    if (!adminExists) {
      await User.create({
        name: "Admin User",
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        password: process.env.ADMIN_PASSWORD || "admin123",
        role: "admin",
      })
      console.log("✓ Admin user seeded")
    }

    // Plans Seeding
    const plansCount = await Plan.countDocuments()
    if (plansCount === 0) {
      const defaultPlans = [
        {
          name: "Monthly Subscription",
          price: "1,000",
          period: "BDT / month",
          description: "Perfect for testing and small operations",
          features: ["Full E-commerce Setup", "No Hosting Charge", "Free Consultation", "Responsive Mobile Design", "Basic SEO Optimization", "24/7 Support"],
          highlight: false,
          order: 1
        },
        {
          name: "Yearly Subscription",
          price: "7,000",
          period: "BDT / year",
          description: "Best value for growing businesses",
          features: ["Everything in Monthly", "Discounted Annual Price", "Priority Support", "Free Domain Integration", "Speed Optimization", "Advanced Analytics"],
          highlight: true,
          order: 2
        },
        {
          name: "2-Year Subscription",
          price: "12,000",
          period: "BDT / 2 years",
          description: "Complete long-term solution",
          features: ["Everything in Yearly", "Max Savings (Save 12k+)", "VIP Dedicated Support", "Free Feature Updates", "Custom Logo Guidance", "Marketing Consultation"],
          highlight: false,
          order: 3
        }
      ]
      await Plan.insertMany(defaultPlans)
      console.log("✓ Default plans seeded")
    }
  } catch (error) {
    console.error("Error seeding data:", error)
  }
}
seedData()

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`✓ Backend running on http://localhost:${PORT}`)
})
