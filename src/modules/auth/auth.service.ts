import bcrypt from "bcryptjs";
import { pool } from "../../config/db.js";
import { config } from "../../config/index.js";
import jwt from "jsonwebtoken";
const createUserIntoDB = async (payload: Record<string, unknown>) => {
  const { name, email, password, role } = payload;

  const hasedPassword = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES($1,$2,$3,$4) RETURNING *",
    [name, email, hasedPassword, role],
  );

  delete result.rows[0].password;
  return result;
};

const loginUserIntoDB = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;

  const result = await pool.query("SELECT * FROM users WHERE email = $1 ", [
    email,
  ]);

  if (!result.rows.length) return null;

  const user = result.rows[0];
  const isMatchedPassword = await bcrypt.compare(
    password as string,
    user.password,
  );

  if (!isMatchedPassword) return false;

  const secret = config.jwt_secret as string;
  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role, email: user.email },
    secret,
    {
      expiresIn: "7d",
    },
  );

  delete user.password;
  return {
    token,
    user,
  };
};
const authServices = {
  createUserIntoDB,
  loginUserIntoDB,
};

export default authServices;
