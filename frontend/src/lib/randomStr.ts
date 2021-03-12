export const randomStr = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  const charsOnlyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  const string_length = 25;
  let randomstring = '';

  for (let i = 0; i < string_length; i++) {
    const selChar = i === 0 ? charsOnlyStr : chars;
    const rnum = Math.floor(Math.random() * (i === 0 ? selChar.length : selChar.length));
    randomstring += selChar.substring(rnum, rnum + 1);
  }

  //document.randform.randomfield.value = randomstring;
  return randomstring;
};
