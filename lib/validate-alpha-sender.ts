/**
 * Validates an Alphanumeric Sender ID according to Twilio's specifications:
 * - Up to 11 characters long
 * - Can contain ASCII letters (upper and lower case)
 * - Can contain digits 0-9
 * - Can contain spaces
 *
 * @param senderId - The Alphanumeric Sender ID to validate
 * @returns An object containing validation result and any error message
 */
export function validateAlphanumericSenderId(senderId: string): {
  isValid: boolean;
  error?: string;
} {
  // Check if senderId is provided
  if (!senderId) {
    return {
      isValid: false,
      error: "Alphanumeric Sender ID is required",
    };
  }

  // Check length (up to 11 characters)
  if (senderId.length > 11) {
    return {
      isValid: false,
      error: "Alphanumeric Sender ID must not exceed 11 characters",
    };
  }

  // Check if empty or only spaces
  if (senderId.trim().length === 0) {
    return {
      isValid: false,
      error: "Alphanumeric Sender ID cannot be empty or contain only spaces",
    };
  }

  // Check for valid characters (ASCII letters, digits 0-9, and spaces)
  if (!/^[a-zA-Z0-9 ]+$/.test(senderId)) {
    return {
      isValid: false,
      error:
        "Alphanumeric Sender ID can only contain letters, numbers, and spaces",
    };
  }

  return { isValid: true };
}
