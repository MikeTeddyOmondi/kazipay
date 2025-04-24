import { v4 as uuid } from "uuid";
import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import { createError, logger } from "./utils.js";
import { eq } from "drizzle-orm";

export const onboard = async (req, res, next) => {
  try {
    // Capture phone number
    const { phoneNumber } = req.body;

    const public_id = uuid();

    const [userAdded] = await db
      .insert(users)
      .values({ public_id, phone_number: phoneNumber })
      .returning();

    logger.info({ userAdded });

    logger.info({ success: true, message: "Onboarding succesfull!" });
    res.json({ success: true, message: "Onboarding succesfull!" });
  } catch (error) {
    logger.error({
      success: false,
      message: "Onboarding failed!",
      error: error,
    });
    next(createError(500, "Onboarding failed!"));
  }
};

export const ussd = async (req, res, next) => {
  // Read variables sent via POST from our SDK
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  logger.info(
    { callback: { sessionId, serviceCode, phoneNumber, text } },
    "Callback received..."
  );
  let response = "";

  // Chained IF statements will take us through the USSD logic
  if (text === "") {
    console.log(text);
    // This is the first request
    // Start responses with CON if they have further options/they CONtinue
    response = `CON Kazipay \nWelcome! \nChoose an option to proceed:
          1. Activate
          2. Time-in
          3. Timeout`;
  } else if (text === "1") {
    // Business logic for first level response
    // response = `CON Please enter your registration number:
    //     1. Yes
    //     2. No`;
    response = `CON Do you have an account?
      1. Yes
      2. No `;
  } else if (text === "2") {
    // Business logic for first level response, option 2
    // Start the response with END since it does not proceed further, (terminal request) it ENDs
    response = `END Welcome back, glad you're here. Your phone number is ${phoneNumber}.`;
  } else if (text === "1*1") {
    // This is a second level response
    // 1 was selected in the first level, 1 in the second level
    const [userFound] = await db
      .select()
      .from(users)
      .where(eq(users.phone_number, phoneNumber));
      logger.info({userFound})
    if (userFound) {
      let [verifiedUser] = await db
        .update(users)
        .set({ verified: true })
        .where(eq(users.phone_number, phoneNumber))
        .returning();
        logger.info("User account verified!", { verifiedUser });
    }
    // The response starts with END since it is a terminal request
    response = `END User account verified!`;
  } else if (text === "1*2") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    response = `END What are waiting for? Create an account at developers.africastalking.com. Looking forward to having you!`;
  }

  // Print the response onto the page so that our SDK can read it
  res.set("Content-Type: text/plain");
  res.send(response);
};
