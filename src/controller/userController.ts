import { Request, Response } from "express";
import { users } from "../db/schemas/users";
import { db } from "../db/connection";
import { eq } from "drizzle-orm";

export type CreateUser = {
	name: string;
	email: string;
	password: string;
};

export class UserController {
	async getAllUsers(req: Request, res: Response) {
		try {
			const data = await db.select().from(users);
			res.status(200).json({
				success: true,
				message: "Data retrieved successfully",
				data,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "Data not retrieved",
			});
		}
	}

	async createUser(req: Request, res: Response) {
		try {
			const data = req.body as CreateUser;
			await db.insert(users).values(data);

			res.status(200).json({
				success: true,
				message: "User created successfully",
			});
		} catch (error) {
			res.status(500).json({
				succes: false,
				message: "User not created",
			});
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const id = req.params.id;
			const data = req.body as CreateUser;
			await db
				.update(users)
				.set(data)
				.where(eq(users.id, Number(id)));
			res.status(200).json({
				success: true,
				message: "User updated successfully",
			});
		} catch (error) {
			res.status(500).json({
				succes: false,
				message: "User not created",
			});
		}
	}

	async deleteUserById(req: Request, res: Response) {
		try {
			const id = req.params.id;
			await db.delete(users).where(eq(users.id, Number(id)));
			res.status(200).json({
				success: true,
				message: "User deleted successfully",
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: "User not deleted",
			});
		}
	}
}
