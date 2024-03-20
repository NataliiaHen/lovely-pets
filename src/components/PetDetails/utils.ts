export const generateUniqueRandomKey = (): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomKey = '';

  do {
    const randomIndex = Math.floor(Math.random() * characters.length);

    randomKey += characters.charAt(randomIndex);
  } while (randomKey.length < 9);

  return randomKey;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove any non-digit characters from the phone number
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned number matches any of the formats
  const matchWithPlus = /^\+?380(\d{9})$/.exec(cleanedNumber);
  const matchWithoutPlus = /^0?(\d{9})$/.exec(cleanedNumber);

  if (matchWithPlus) {
    // Extract the matched part
    const numberPart = matchWithPlus[1];

    // Format the phone number starting with +38 0
    const formattedNumber = `+38 0${numberPart.slice(0, 3)} ${numberPart.slice(3, 6)} ${numberPart.slice(6, 8)} ${numberPart.slice(8)}`;

    return formattedNumber;
  }

  if (matchWithoutPlus) {
    // Extract the matched part
    const numberPart = matchWithoutPlus[1];

    // Format the phone number starting with +38 0
    const formattedNumber = `+38 0${numberPart.slice(0, 3)} ${numberPart.slice(3, 6)} ${numberPart.slice(6, 8)} ${numberPart.slice(8)}`;

    return formattedNumber;
  }

  // If no match, return the original phone number without spaces
  return cleanedNumber;
};
