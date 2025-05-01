import axios from 'axios';

const productionUrl = 'https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price: string | number) => {
  const value = parseFloat(
    (+price / 100).toFixed(2)
  );
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export const generateAmountOptions = (number: number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;

    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};

export const getErrorMessage = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    return error.message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return defaultMessage || 'An unknown error occurred';
  }
}
