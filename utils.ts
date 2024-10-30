export const trim = (text: string) => {
  const lines = text.split('\n');
  const trimmedLines = lines.map(line => line.trim());
  return trimmedLines.join('\n');
};

export const roundPrice = (price: number) => {
  if (price === undefined) {
    return '';
  }

  let k = price;
  let decimalPlaces = 0;

  while (k !== 0 && Math.abs(k) < 1) {
    k *= 10;
    decimalPlaces += 1;
  }

  decimalPlaces += 2;
  return price.toFixed(decimalPlaces);
};

export const convertToShort = (number: number) => {
  if (number === undefined) {
    return '';
  }

  if (number >= 1e9) {
    return `${(number / 1e9).toFixed(2)}B`;
  }
  if (number >= 1e6) {
    return `${(number / 1e6).toFixed(2)}M`;
  }
  if (number >= 1e3) {
    return `${(number / 1e3).toFixed(2)}K`;
  }
  return number.toString();
};

export const formatNumber = (number: number) => {
  if (Number.isNaN(number)) {
    return NaN;
  }
  if (number > 0) {
    return `+${number}`;
  }
  if (number < 0) {
    return `-${Math.abs(number)}`;
  }
  return '0';
};

export const getHistoryPrice = (price: string, changeRate: number) => {
  return parseFloat(price) * (1 + changeRate / 100.0);
};

export const getChangeRate = (oldPrice: number, newPrice: number) => {
  return (100.0 * ((newPrice - oldPrice) / newPrice)).toFixed(2);
};

export const encrypt = (message: string) => {
  let result = '';
  for (let i = 0; i < message.length; i += 1) {
    if ((i + 1) % 3 === 0) {
      result += message[i];
    } else {
      result += String.fromCharCode(97 + parseInt(message[i], 10));
    }
  }
  return result;
};

export const decrypt = (encryptedMessage: string) => {
  let result = '';
  for (let i = 0; i < encryptedMessage.length; i += 1) {
    if ((i + 1) % 3 === 0) {
      result += encryptedMessage[i];
    } else {
      result += String.fromCharCode(48 + encryptedMessage.charCodeAt(i) - 97);
    }
  }
  return result;
};

export const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
