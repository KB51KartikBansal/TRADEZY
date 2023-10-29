import { JSEncrypt } from "jsencrypt";

export const encryptUsingRsa = (message, publicKey) => {
  const jsEncrypt = new JSEncrypt();

  jsEncrypt.setPublicKey(publicKey);
  const pass = jsEncrypt.encrypt(message);

  return pass;
};
