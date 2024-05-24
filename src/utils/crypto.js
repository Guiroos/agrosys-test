import Crypto from "crypto-js";

export function hashPassword(password) {
  return Crypto.AES.encrypt(password, "secret").toString();
}

export function comparePassword(password, hash) {
  return (
    Crypto.AES.decrypt(hash, "secret").toString(Crypto.enc.Utf8) === password
  );
}
