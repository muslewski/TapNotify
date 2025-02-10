"use server";

export default async function sendSMS(phoneNumber: string, message: string) {
  console.log(`Sending SMS to ${phoneNumber} with message: ${message}`);
}
