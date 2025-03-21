import express, { Request, Response } from "express";
import { UserController } from "./controller/userController";

const app = express();
const PORT = process.env.PORT || 3000;

const userController = new UserController();

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "Hello World!" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});
app.get("/user", userController.getAllUsers);
app.post("/user", userController.createUser);
app.put("/user/:id", userController.updateUser);
app.delete("/user/:id", userController.deleteUserById);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
