"use server";

import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

export default async function sendSMS(phoneNumber: string, message: string) {
  if (!accountSid || !authToken || !twilioPhone) {
    throw new Error("Missing Twilio credentials in environment variables");
  }

  try {
    // Create a Twilio client
    const client = twilio(accountSid, authToken);

    // Send the SMS
    const result = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: phoneNumber,
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
