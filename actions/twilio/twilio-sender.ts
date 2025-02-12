"use server";

import twilio from "twilio";

// This functions create a new Alphanumeric Sender ID in Twilio on campaign level

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error("Missing Twilio credentials in environment variables");
}

const client = twilio(accountSid, authToken);

export async function addAlphaSenderToService(
  messageServiceSID: string,
  newAlphaSenderID: string
) {
  try {
    const alphaSender = await client.messaging.v1
      .services(messageServiceSID)
      .alphaSenders.create({
        alphaSender: newAlphaSenderID,
      });

    console.log(
      "Alpha Sender Added to Message Service, here is SID:",
      alphaSender.accountSid
    );
    return alphaSender.alphaSender;
  } catch (error) {
    console.error("[TWILIO_ADD_ALPHA_SENDER_TO_SERVICE_ERROR]", error);
    throw new Error(
      `Failed to add Alpha Sender to Message Service: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/** Currently not working */
export async function removeAlphaSenderFromService(
  messageServiceSID: string,
  alphaSenderID: string
) {
  try {
    console.log("Removing Alpha Sender from Message Service:", alphaSenderID);
    await client.messaging.v1
      .services(messageServiceSID)
      .alphaSenders(alphaSenderID)
      .remove();

    console.log("Alpha Sender Removed from Message Service:", alphaSenderID);
    return alphaSenderID;
  } catch (error) {
    console.error("[TWILIO_REMOVE_ALPHA_SENDER_FROM_SERVICE_ERROR]", error);
    throw new Error(
      `Failed to remove Alpha Sender from Message Service: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function updateAlphaSenderInService(
  messageServiceSID: string,
  currentAlphaSenderID: string,
  newAlphaSenderID: string
) {
  try {
    console.log(
      "Updating Alpha Sender in Message Service from",
      currentAlphaSenderID,
      "to",
      newAlphaSenderID
    );

    // since Twilio API does not support updating Alpha Sender ID, we will remove the current one and add the new one
    await removeAlphaSenderFromService(messageServiceSID, currentAlphaSenderID);
    const newAlphaSender = await addAlphaSenderToService(
      messageServiceSID,
      newAlphaSenderID
    );

    console.log("Alpha Sender Updated in Message Service:", newAlphaSender);
    return newAlphaSender;
  } catch (error) {
    console.error("[TWILIO_UPDATE_ALPHA_SENDER_IN_SERVICE_ERROR]", error);
    throw new Error(
      `Failed to update Alpha Sender in Message Service: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
