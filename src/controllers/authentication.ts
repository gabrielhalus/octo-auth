import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { signAccessToken } from "../utils";

/**
 * Sign in a user with email and password
 *
 * @param {Request} req - The HTTP request object, containing user credentials in the request body.
 * @param {Response} res - The HTTP response object for sending the response.
 *
 * @return {void} This function does not return a value directly, but it responds to the client with an access token.
 *
 * @example
 * // Example usage in an Express.js route handler
 * app.post("auth/login", signIn)
 */
export async function signIn(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Missing fields, send a bad request (400) response
    if (!email || !password) {
      res.status(400).json({ error: "Missing fields" });
    }

    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      // User not found, send an unauthorized (401) response
      res.status(401).json({ error: "Authentication failed. Invalid email or password." });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      // Password is invalid, send an unauthorized (401) response
      res.status(401).json({ error: "Authentication failed. Invalid email or password." });
      return;
    }

    // Password is valid, send a success (200) response with the access token
    const accessToken = signAccessToken(user._id.toString());
    res.status(200).json({ accessToken });
  } catch (error) {
    // Handle and send an error (500) response to the client
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Sign up a user.
 *
 * @param {Request} req - The HTTP request object, containing user data in the request body.
 * @param {Response} res - The HTTP response object for sending the response.
 *
 * @return {void} This function does not return value directly, but it responds to the client with an access token.
 *
 * @example
 * // Example usage in an Express.js route handler
 * app.post("auth/register", signUp)
 */
export async function signUp(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      // Missing fields, send a bad request (400) response
      res.status(400).json({ error: "Missing fields" });
      return;
    }

    // Create a new user document
    const newUser = new User({ name, email, password });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send a success (200) response with the access token
    const accessToken = signAccessToken(savedUser._id.toString());
    res.status(200).json(accessToken);
  } catch (error) {
    // Handle and send an error (500) response to the client
    res.status(500).json({ error: "Internal server error" });
  }
}
