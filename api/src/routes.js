import express from "express";

import {onboard, ussd} from "./handlers.js"

const route = express.Router();

route.post("/ussd", ussd);
route.post("/onboard", onboard);

export default route