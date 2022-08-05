import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
/**
 * 密码加密
 */
const encrypt = async (password: any) => {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

/**
 * @param password 原密码
 * @param hash 加密后的密码
 */
const decrypt = async (password: any, hash: any) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
export { encrypt, decrypt };
