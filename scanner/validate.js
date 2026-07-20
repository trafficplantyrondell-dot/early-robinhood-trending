export function validateAddress(address) {
  if (!address) {
    return {
      valid: false,
      error: "Please enter a contract address."
    };
  }

  const value = address.trim();

  if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
    return {
      valid: false,
      error: "Invalid EVM contract address."
    };
  }

  return {
    valid: true,
    address: value
  };
}