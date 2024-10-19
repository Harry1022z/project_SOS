import bcrypt from 'bcrypt';

const generateHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export default generateHash;
