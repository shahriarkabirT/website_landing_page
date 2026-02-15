import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { User } from "../models/index.js"

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "PLACEHOLDER",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "PLACEHOLDER",
            callbackURL: "/api/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                role: "user",
            }

            try {
                let user = await User.findOne({ email: profile.emails[0].value })

                if (user) {
                    if (!user.googleId) {
                        user.googleId = profile.id
                        await user.save()
                    }
                    done(null, user)
                } else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.error(err)
                done(err, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})

export default passport
