import { useToast as chakraUseToast } from '@chakra-ui/react';

// Export a useToast hook for use in the app
export const useToast = chakraUseToast;

// Export a Toaster component that does nothing (for compatibility)
export function Toaster() {
  return null
}
