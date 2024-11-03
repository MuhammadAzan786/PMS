import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";

export interface CreateUserParams {
  email: string;
  phone?: string;
  name?: string;
}

export const createUser = async (user: CreateUserParams) => {
  try {
    // Creating a new user
    const newUser = await users.create(
      ID.unique(),
      user.email,
      undefined, // Password, if needed, can be set here
      user.name,
      user.phone
    );
    return newUser;
  } catch (error: any) {
    if (error?.code === 409) {
      // User already exists, retrieve the existing user by email
      const existingUsers = await users.list([
        Query.equal("email", user.email),
      ]);

      if (existingUsers.documents && existingUsers.documents.length > 0) {
        return existingUsers.documents[0]; // Assuming 'documents' contains user data
      }
    } else {
      throw error; // Re-throw unexpected errors
    }
  }
};
