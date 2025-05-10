
/**
 * Generate a random cryptocurrency address based on the selected cryptocurrency
 */
export function generateRandomAddress(crypto: string): string {
  // These are just sample patterns - not real addresses
  const patterns = {
    bitcoin: () => {
      // Bitcoin addresses are typically 26-35 characters long, starting with 1, 3, or bc1
      const prefixes = ["1", "3", "bc1"];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const length = prefix === "bc1" ? 42 : Math.floor(Math.random() * 10) + 26;
      return prefix + generateRandomString(length - prefix.length);
    },
    ethereum: () => {
      // Ethereum addresses are 42 characters long, starting with 0x
      return "0x" + generateRandomString(40);
    },
    litecoin: () => {
      // Litecoin addresses are typically 34 characters long, starting with L, M, or ltc1
      const prefixes = ["L", "M", "ltc1"];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const length = prefix === "ltc1" ? 42 : 34;
      return prefix + generateRandomString(length - prefix.length);
    },
    xrp: () => {
      // XRP addresses are typically around 33 characters long, starting with r
      return "r" + generateRandomString(32);
    },
  };

  // Use the pattern for the selected crypto, or a generic pattern if not found
  const generateAddress = patterns[crypto as keyof typeof patterns] || (() => generateRandomString(34));
  return generateAddress();
}

/**
 * Generate a random string of hex characters of specified length
 */
function generateRandomString(length: number): string {
  const chars = "abcdef0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
