import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

// Interface for the logged in User
export interface UserType {
  name: string;
  id: number;
}

export type UserStateType = UserType | null;

// Tyoe for the UserContext
type UserContextType = [
  UserStateType,
  Dispatch<SetStateAction<UserStateType>> | null
];

const UserCTX = createContext<UserContextType>([null, null]);

export const UserContext = ({ children }) => {
  const UserState = useState<UserStateType>(null);

  return <UserCTX.Provider value={UserState}>{children}</UserCTX.Provider>;
};

export const useUserState = () => useContext(UserCTX);
