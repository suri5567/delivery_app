import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing name, email, password, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input data or server error
 *       500:
 *         description: Internal server error
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user with email and password, and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns a message and a token
 *       400:
 *         description: Invalid credentials or missing fields
 *       401:
 *         description: Unauthorized access due to invalid credentials
 *       500:
 *         description: Internal server error
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trim email and search for user
    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(404).json({ message: "Email does not exist" });
    }

    let isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie with token
    res.cookie("access_token", token, {
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successfully!" });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "An error occurred during login. Please try again." });
  }
};
