import { useContext } from 'react';
import { AppContext } from 'src/contexts/AppContext';
export const useApp = () => useContext(AppContext);
