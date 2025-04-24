import { v4 as uuid } from "uuid";
import { db } from "./db/index.js";
import { timeins, timeouts, users } from "./db/schema.js";
import { createError, logger } from "./utils.js";
import { eq } from "drizzle-orm";
import { sendMsg } from "./lib.js";

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
          3. Timeout
          4. Request payment`;
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
    const public_id = uuid();
    const timeStamp = new Date().toISOString();
    const [timeIn] = await db
      .insert(timeins)
      .values({ public_id, datetime: timeStamp })
      .returning();
    logger.info(`User with phone number: ${phoneNumber} checked in at:`, {
      datetime: new Date(timeIn.datetime).toLocaleString(),
    });
    // Send time-in message
    const msg = `Kazipay: You have timed in at ${new Date(
      timeIn.datetime
    ).toLocaleString()}`;
    await sendMsg({ phoneNumber, message: msg });
    response = `END You have checked in at: ${new Date(
      timeIn.datetime
    ).toLocaleString()}.`;
  } else if (text === "1*1") {
    // This is a second level response
    // 1 was selected in the first level, 1 in the second level
    const [userFound] = await db
      .select()
      .from(users)
      .where(eq(users.phone_number, phoneNumber));
    logger.info({ userFound });
    if (userFound) {
      let [verifiedUser] = await db
        .update(users)
        .set({ verified: true })
        .where(eq(users.phone_number, phoneNumber))
        .returning();
      logger.info("User account verified!", { verifiedUser });

      // Send verification message
      const msg = "Kazipay: Your account has been verified successfully!";
      await sendMsg({ phoneNumber, message: msg });
    }
    // The response starts with END since it is a terminal request
    response = `END User account verified!`;
  } else if (text === "1*2") {
    // This is a second level response
    // 1 was selected in the first level, 2 in the second level
    // The response starts with END since it is a terminal request
    // Send time-in message
    const msg = `Kazipay: You can click on this link to onboard https://kazipay.miketeddyomondi.dev/onboarding`;
    await sendMsg({ phoneNumber, message: msg });
    response = `END Create an account here: https://kazipay.miketeddyomondi.dev/onboarding`;
  } else if (text === "3") {
    // Business logic for first level response, option 3
    // Start the response with END since it does not proceed further, (terminal request) it ENDs
    const public_id = uuid();
    const timeStamp = new Date().toISOString();
    const [timeOut] = await db
      .insert(timeouts)
      .values({ public_id, datetime: timeStamp })
      .returning();
    logger.info(`User with phone number: ${phoneNumber} checked out at:`, {
      datetime: new Date(timeOut.datetime).toLocaleString(),
    });
    // Send timeout message
    const msg = `Kazipay: You have timed out at ${new Date(
      timeOut.datetime
    ).toLocaleString()}`;
    await sendMsg({ phoneNumber, message: msg });
    response = `END You have checked out at: ${new Date(
      timeOut.datetime
    ).toLocaleString()}.`;
  }

  // Print the response onto the page so that our SDK can read it
  res.set("Content-Type: text/plain");
  res.send(response);
};

export const smsDelivery = async (req, res, next) => {
  const reqBody = req.body;
  logger.info("SMS delivery: ", { reqBody });

  res.status(200).json({
    success: true,
    message: "SMS delivered successfully!",
  });
};
export const timeIn = async (req, res, next) => {
  const reqBody = req.body;
  logger.info("Time In: ", { reqBody });

  res.status(200).json({
    success: true,
    message: "Time In successfully!",
  });
};
export const timeout = async (req, res, next) => {
  const reqBody = req.body;
  logger.info("Timeout: ", { reqBody });

  res.status(200).json({
    success: true,
    message: "Timeout successfully!",
  });
};
