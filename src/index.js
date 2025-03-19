import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { employeeRouter } from "./routes/employee.route.js";
import { config } from "./auth-config.js";
import { auth } from "express-openid-connect";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(auth(config));


app.use("/v1/employee/", employeeRouter);

app.get("/", async(req, res) => {
    try {
        
        if (!req.oidc.isAuthenticated()) {
            return res.send("Please login to access the API");
        }
        console.log("User", req.oidc.user);
        console.log("AccessToken", req.oidc.accessToken);
        return res.json({
            message: "Welcome to the Employee",
            user : req.oidc.user,
            accessToken: req.oidc.accessToken
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
    
});


app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});
