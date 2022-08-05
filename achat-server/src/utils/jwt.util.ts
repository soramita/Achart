import * as sha256 from 'sha256';
import * as jwt from 'jsonwebtoken';
const jwt_secret = sha256('200902149');
/**
 * jwt加密
 */
const jwtEncrypt = (uuid: string) => {
  const jwtInfo = {
    uuid,
    iat: Date.now() / 1000,
    exp: Date.now() / 1000 + 24 * 60 * 60 * 2,
  };
  const jwt_token = jwt.sign(jwtInfo, jwt_secret);
  return jwt_token;
};

/**
 * jwt解密
 */
const jwtDecrypt = (token: string, uuid: string): boolean => {
  try {
    const payload: any = jwt.verify(token, jwt_secret);
    const nowData = Date.now() / 1000;
    if (nowData > payload.exp || uuid !== payload.uuid) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};
export { jwtEncrypt, jwtDecrypt };
