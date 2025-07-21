import { isAxiosError } from "axios";

type DjangoValidationError = {
  [field: string]: string[];
};

export const getBackendErrorMessage = (error: any) => {
  if (isAxiosError(error) && error.response?.data) {
    const data = error.response.data as DjangoValidationError;
    
    const messages = Object.values(data).flat();
    if (messages.length > 0) {
      return messages.join('\n');
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
};
