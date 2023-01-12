import sha256 from 'crypto-js/sha256';

const shaTwoFiveSix = (password:string) => {
  return sha256(password);
}

export default {
  shaTwoFiveSix
} 