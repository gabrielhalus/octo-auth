import jwt from "jsonwebtoken";

/**
 * Capitalizes the first letter of each word in a string and converts the rest of the letters to lowercase.
 *
 * @param {string} str - The input string to be capitalized.
 * @returns {string} The input string with the first letter of each word capitalized and the rest in lowercase.
 *
 * @example
 * const input = 'hElLo WoRLd';
 * const capitalized = capitalize(input);
 * console.log(capitalized); // Output: "Hello World"
 */
export function capitalize(str: string): string {
  return str
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .join(" ");
}

/**
 * Validates an email address using a basic regular expression pattern.
 *
 * @param {string} email - The email address to be validated.
 * @returns {boolean} `true` if the email address is valid, `false` otherwise.
 *
 * @example
 * const email = "user@example.com";
 * const isValid = isValidEmail(email);
 * console.log(isValid); // Output: `true`
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[0-9a-zA-Z._%+-]+@+[A-Z0-9.-]+.+[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

/**
 * Validate an email using a basic regular expression pattern.
 *
 * @param {string} password - The password to be validated.
 *
 * @example
 * const password = "P@ssword123";
 * const isValid = isValidPassword(password);
 * console.log(isValid): // Output: `true`
 */
export function isValidPassword(password: string): boolean {
  const passwordRegex = /[\w]{8,}/i;
  return passwordRegex.test(password);
}

/**
 * Signs an access token using a secret key, which can be used for authentication and authorization purposes.
 *
 * @param {string} userId - The user identifier to be signed into the access token.
 * @return {string} The signed access token, which can be used for authentication and authorization purposes.
 *
 * @example
 * const userId = "1";
 * const accessToken = signAccessToken(userId);
 * console.log(accessToken); // Output: "eyJhbGciOiJ..."
 */
export function signAccessToken(userId: string): string {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) throw new Error("Please provide a valid access token secret in the .env.local file.");
  return jwt.sign({ id: userId }, accessTokenSecret);
}
