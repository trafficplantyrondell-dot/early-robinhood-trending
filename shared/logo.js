export function getLogo(token = {}) {

  // Use token logo if available
  if (token.logo && token.logo.length > 0) {
    return token.logo;
  }

  // Default Hood Rich Labs logo
  return "./shared/assets/logos/hood-rich-labs.png";

}
 