import bcrypt from "bcryptjs";
import { pool } from "../../config/db.js";

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
const loginUserIntoDB = async () => {};
const authServices = {
  createUserIntoDB,
  loginUserIntoDB,
};

export default authServices;
