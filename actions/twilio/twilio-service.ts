"use server";

import twilio from "twilio";

// This functions creates a new Message Service in Twilio on campaign level

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error("Missing Twilio credentials in environment variables");
}

const client = twilio(accountSid, authToken);

export async function createMessageService(teamName: string) {
  try {
    const messageService = await client.messaging.v1.services.create({
      friendlyName: teamName,
      usecase: "marketing",
      // inboundRequestUrl: process.env.INBOUND_REQUEST_URL, // Optional: handle incoming messages
      // fallbackUrl: process.env.FALLBACK_URL, // Optional: handle failed messages
    });

    console.log("Message Service Created, here is SID:", messageService.sid);
    return messageService.sid;
  } catch (error) {
    console.error("[TWILIO_CREATE_MESSAGE_SERVICE_ERROR]", error);
    throw new Error(
      `Failed to add Message Service: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function updateMessageService(
  messageServiceSID: string,
  newTeamName: string
) {
  try {
    console.log("Updating Message Service:", messageServiceSID);
    const messageService = await client.messaging.v1
      .services(messageServiceSID)
      .update({
        friendlyName: newTeamName,
      });

    console.log("Message Service Updated:", messageService.sid);
    return messageService.sid;
  } catch (error) {
    console.error("[TWILIO_UPDATE_MESSAGE_SERVICE_ERROR]", error);
    throw new Error(
      `Failed to update Message Service: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function deleteMessageService(messageServiceSID: string) {
  try {
    await client.messaging.v1.services(messageServiceSID).remove();

    console.log("Message Service Deleted:", messageServiceSID);
  } catch (error) {
    console.error("[TWILIO_DELETE_MESSAGE_SERVICE_ERROR]", error);
    throw new Error(
      `Failed to delete Message Service: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
