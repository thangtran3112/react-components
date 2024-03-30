import { createContext, useContext, useReducer } from 'react';
import { Node, treeReducer } from './reducer/tree.reducer';

interface TreeContextType {
  state: Node[];
  dispatch: React.Dispatch<any>;
}

const intialContextValue: TreeContextType = {
  state: [],
  dispatch: () => {},
};
const TreeStateContext = createContext<TreeContextType>(intialContextValue);

const TreeProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(treeReducer, []);

  return (
    <TreeStateContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeStateContext.Provider>
  );
};

export const useTreeState = () => {
  const context = useContext(TreeStateContext);
  return context;
};

export default TreeProvider;
