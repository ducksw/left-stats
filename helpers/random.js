const help = {};

help.randomString = () => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let randomStr = '';
  
  for (let i = 0; i < 10; i++) {
      randomStr += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return "L4D2#" + randomStr;
}

export default help;
