import axios from "axios";

const JUSTSEND_API_KEY = process.env.JUSTSEND_API_KEY;
const JUSTSEND_API_URL = "https://justsend.io/api";

if (!JUSTSEND_API_KEY) {
  throw new Error("Missing JustSend API key in environment variables");
}

export default async function sendBulkSMS(
  alphanumericSenderId: string,
  campaignName: string,
  restRecipient: { msisdn: string; content?: string }[],
  message?: string
) {
  const headers = {
    "Content-Type": "application/json",
    "App-Key": JUSTSEND_API_KEY,
  };

  // Create a date in the future (half minute from now)
  const futureDate = new Date(Date.now() + 30 * 1000); // 30 seconds from now
  // Convert to ISO string and then remove the milliseconds part
  // ISO string format: "2023-06-24T14:30:45.123Z"
  // We want:           "2023-06-24T14:30:45Z"
  const isoString = futureDate.toISOString();
  const formattedDate = isoString.replace(/\.\d{3}Z$/, "Z");

  const data = {
    name: campaignName,
    bulkType: "STANDARD", // for now not PERSONALIZED
    bulkVariant: "PRO", // TEST_JS for testing or PRO
    bulkPriority: "NORMAL",
    sender: alphanumericSenderId,
    message: message,
    sendDate: formattedDate,
    recipients: restRecipient,
  };

  try {
    console.log("Sending Bulk SMS to JustSend API...");

    const response = await axios.post(
      `${JUSTSEND_API_URL}/sender/bulk/send`,
      data,
      { headers }
    );

    console.log("Response: ", response.data);

    return {
      success: true,

      messageId: response.data.messageId,
      status: response.data.status,
    };
  } catch (error) {
    console.error("Error sending Bulk SMS:", error);

    if (axios.isAxiosError(error)) {
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
    }

    throw new Error(
      `Failed to send Bulk SMS: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
