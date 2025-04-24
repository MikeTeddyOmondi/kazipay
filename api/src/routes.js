import express from "express";

import {onboard, smsDelivery, timeIn, timeout, ussd} from "./handlers.js"

const route = express.Router();

route.post("/ussd", ussd);
route.post("/onboard", onboard);
route.post("/time-in", timeIn);
route.post("/timeout", timeout);
route.post("/sms/delivery", smsDelivery);

export default route
