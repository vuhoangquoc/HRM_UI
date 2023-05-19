import { useContext } from 'react';
import { EmployeeContext } from 'src/contexts/EmployeeContext';


export const useEmployee = () => useContext(EmployeeContext);
