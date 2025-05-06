// utils/validation.js

// Validate Card Number: 16 digits
export const isValidCardNumber = (cardNumber) => {
    const regex = /^[0-9]{16}$/;  // 16 digits only
    return regex.test(cardNumber);
  };
  
  // Validate Expiry Date: MM/YY format and not expired
  export const isValidExpiryDate = (expiryDate) => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // MM/YY format
    if (!regex.test(expiryDate)) return false;
  
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;  // Last two digits of current year
    const currentMonth = currentDate.getMonth() + 1;  // 0-based index, so add 1
  
    // Check if the card has expired
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      return false;
    }
  
    return true;
  };
  
  // Validate CVV: 3 digits
  export const isValidCVV = (cvv) => {
    const regex = /^[0-9]{3}$/;  // 3 digits only
    return regex.test(cvv);
  };
  