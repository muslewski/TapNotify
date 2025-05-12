"use server";

import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const ourMessagingService = process.env.TWILIO_MESSAGING_SERVICE_SID;
// const ourPhoneNumber = process.env.TWILIO_OUR_PHONE_NUMBER_SID;

if (!accountSid || !authToken) {
  throw new Error("Missing Twilio credentials in environment variables");
}

const client = twilio(accountSid, authToken);

export default async function sendSMS(
  alphanumericSenderId: string,
  messagingServiceSID: string,
  phoneNumber: string,
  message: string
) {
  try {
    console.log("Sending SMS to:", phoneNumber);
    console.log("Using Messaging Service SID:", messagingServiceSID);
    console.log("Using Alphanumeric Sender ID:", alphanumericSenderId);
    console.log("Message:", message);

    // Send the SMS
    const result = await client.messages.create({
      body: message,
      // before from: alphanumericSenderId,
      // from: ourPhoneNumber,
      to: phoneNumber,
      messagingServiceSid: ourMessagingService,
      // before messagingServiceSid: messagingServiceSID,
    });

    console.log("SMS sent:", result);

    return {
      success: true,
      messageId: result.sid,
      status: result.status,
    };
  } catch (error) {
    console.error("Error creating Twilio client:", error);
    throw new Error(
      `Failed to send SMS: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
