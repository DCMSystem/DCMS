import CryptoJS from 'crypto-js';

export const encrypt = ({ data }: { data: string }) => {
  if (!process.env.REACT_APP_ENCRYPT_KEY) {
    return;
  }

  return CryptoJS.AES.encrypt(data, process.env.REACT_APP_ENCRYPT_KEY).toString();
};

export const decrypt = ({ data }: { data: string }) => {
  if (!process.env.REACT_APP_ENCRYPT_KEY) {
    return;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    console.log(e);
    return;
  }
};

export const decryptStr = ({ data }: { data: string }) => {
  if (!process.env.REACT_APP_ENCRYPT_KEY) {
    return;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.log(e);
    return;
  }
};
