import { config } from "dotenv";
import AfricasTalking from "africastalking";
import { logger } from "./utils.js";

config();

const {AFRICASTALKING_API_KEY, AFRICASTALKING_USERNAME} = process.env;

const africasTalking = AfricasTalking({
  apiKey: AFRICASTALKING_API_KEY,
  username: AFRICASTALKING_USERNAME,
});

export const sendMsg = async ({phoneNumber, message}) => {
    logger.info({AFRICASTALKING_API_KEY, AFRICASTALKING_USERNAME});

    const result = await africasTalking.SMS.send({
        from: 'AFTKNG', // Your Alphanumeric Sender ID
        to: phoneNumber,
        message: message
    });
    
    logger.info("SMS result: ", {result});
    logger.info({result})
    return result;
};
