import { Request, Response } from "express";
import User from "../models/user";

/**
 * Create a new user.
 *
 * @param {Request} req - The HTTP request object containing user data in the request body.
 * @param {Response} res - The HTTP response object for sending the response.
 *
 * @return {void} This function does not return a value directly, but it responds to the client with the result of the user creation.
 *
 * @example
 * // Example usage in an Express.js route handler
 * app.post("/users", createUser);
 */
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = req.body;

    // Create a new user document
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send a success (201) response with the created user
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle and send an error (500) response to the client
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Get a user by their unique identifier.
 *
 * @param {Request} req - The HTTP request object containing user ID in the request parameters.
 * @param {Response} res - The HTTP response object for sending the response.
 *
 * @return {void} This function does not return a value directly, but it responds to the client with the user's informations it found.
 *
 * @example
 * // Example usage in an Express.js route handler
 * app.get("/users/:userId", getUserById);
 */
export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (user) {
      // User found, send a success (200) response with the found user
      res.status(200).json(user);
    } else {
      // User not found, send a not found (404) response
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Handle and send an error (500) response to the client
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Get a list of all users.
 *
 * @param {Request} req - The HTTP request object (optional).
 * @param {Response} res - The HTTP response object for sending the response.
 *
 * @return {void} This function does not return a value directly, but is responds to the client with a list of all users.
 *
 * @example
 * // Example usage in an Express.js route handler
 * app.get("/users", getAllUsers);
 */
export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    // Find all users in the database
    const users = await User.find();

    // Send a success response with the array of users
    res.status(200).json(users);
  } catch (error) {
    // Handle and send an error (500) response to the client
    console.error((error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Update a user by their unique identifier.
 *
 * @param {Request} req - The HTTP request object containing the user ID in the request parameters and the updated user data in the request body.
 * @param {Response} res - The HTTP response object for sending the response.
 *
 * @return {void} This function does not return a value directly, but it responds to the client with the result of the user update.
 *
 * @example
 * // Example usage in an Express.js route handler
 * app.put("/users/:userId", udpateUser)
 */
export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    // Update the user by ID in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    if (updatedUser) {
      // User updated successfully, send a success (201) reponse with the updated user
      res.status(201).json(updateUser);
    } else {
      // User not found, send a not found (404) response
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Handle and send an error (500) response to the client
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Delete a user by their unique identifier.
 *
 * @param {Request} req - The HTTP request object containing the user ID in the request parameters.
 * @param {Response} res - The HTTP response object for sending the response.
 *
 * @return {void} This function does not return a value directly, but it responds to the client with the result of the user deletion.
 *
 * @example
 * // Example usage in an Express.js route handler
 * app.delete("/users/:userId", deleteUser)
 */
export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.userId;

    // Delete the user by ID in the database
    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      // User successfully deleted, send a success (204) reponse
      res.sendStatus(204);
    } else {
      // User not found, send a not found (404) response
    }
  } catch (error) {
    // Handle and send an error (500) response to the client
    res.status(500).json({ error: "Internal server error" });
  }
}
