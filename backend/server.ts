import express,{ Application} from 'express'
import connectDB from './db/db.ts';

import authRouter from "./routes/auth.routes.ts";
import campaignRouter from "./routes/campaign.routes.ts";
import dashboaredRouter from "./routes/dashboard.routes.ts"

const app:Application = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/campaign",campaignRouter);
app.use("/api/v1/dashboard",dashboaredRouter);

app.listen(PORT, () => { 
    connectDB();   
    console.log(`Server running on port ${PORT}`);
});