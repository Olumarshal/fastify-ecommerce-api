import client from '../utils/db';

export const createProduct = async (id: string, name: string, description: string, price: number) => {
  const query = 'INSERT INTO products (id, name, description, price) VALUES (?, ?, ?, ?)';
  await client.execute(query, [id, name, description, price], { prepare: true });
};

export const getProducts = async () => {
  const query = 'SELECT * FROM products';
  const result = await client.execute(query, [], { prepare: true });
  return result.rows;
};
