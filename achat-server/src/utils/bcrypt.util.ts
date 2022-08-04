import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
const encrypt = async (password: any) => {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};
const decrypt = async (password: any, hash: any) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
export { encrypt, decrypt };
