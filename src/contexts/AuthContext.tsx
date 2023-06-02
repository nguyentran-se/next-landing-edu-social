import SaveIcon from '@mui/icons-material/Save';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { Reducer, useContext, useMemo, useReducer, useState } from 'react';
// import { AuthContextValue } from '@types';
interface AuthContextValue {
  verifiedEmail: string;
  setVerifiedEmail: React.Dispatch<React.SetStateAction<string>>;
}
export const AuthContext = React.createContext<AuthContextValue>({} as AuthContextValue);
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [verifiedEmail, setVerifiedEmail] = useState<string>('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ verifiedEmail, setVerifiedEmail }), [verifiedEmail]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
