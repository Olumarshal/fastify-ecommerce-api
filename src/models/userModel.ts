import client from '../utils/db';

export const createUser = async (id: string, username: string, password: string) => {
  const query = 'INSERT INTO users (id, username, password) VALUES (?, ?, ?)';
  await client.execute(query, [id, username, password], { prepare: true });
};

export const getUserByUsername = async (username: string) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const result = await client.execute(query, [username], { prepare: true });
  return result.rows[0];
};
