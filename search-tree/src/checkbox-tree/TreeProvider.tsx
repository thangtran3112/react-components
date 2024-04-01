import { createContext, useContext, useReducer, useState } from 'react';
import { Node, treeReducer } from './reducer/tree.reducer';

interface TreeContextType {
  state: Node[];
  checkedNodes: Node[];
  setCheckedNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  dispatch: React.Dispatch<any>;
}

const intialContextValue: TreeContextType = {
  state: [],
  checkedNodes: [],
  setCheckedNodes: () => {},
  dispatch: () => {},
};
const TreeStateContext = createContext<TreeContextType>(intialContextValue);

const TreeProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(treeReducer, []);
  const [checkedNodes, setCheckedNodes] = useState<Node[]>([]);

  return (
    <TreeStateContext.Provider
      value={{
        state,
        dispatch,
        checkedNodes,
        setCheckedNodes,
      }}
    >
      {children}
    </TreeStateContext.Provider>
  );
};

export const useTreeState = () => {
  const context = useContext(TreeStateContext);
  return context;
};

export default TreeProvider;
