import { useEffect, useState } from 'react';
import TreeView from './TreeView';
import { fetchData } from '../data/camera-data';
import TreeProvider, { useTreeState } from './TreeProvider';
import { ActionTypes, Node } from './reducer/tree.reducer';
import SearchHeader from './SearchHeader';

function MainSearchTree() {
  const { state, dispatch } = useTreeState();
  const [searchQuery, setSearchQuery] = useState('');

  function getCheckedNames(): string {
    const checkNodeNames = [] as string[];
    getCheckedNodeNames(state, checkNodeNames);
    return checkNodeNames.join(', ');
  }

  function getCheckedNodeNames(nodes: Node[], checkedNodeNames: string[]) {
    nodes.forEach((node) => {
      if (node.isChecked) {
        checkedNodeNames.push(node.name);
      }
      if (node.children) {
        getCheckedNodeNames(node.children, checkedNodeNames);
      }
    });
  }

  useEffect(() => {
    fetchData().then((data) => {
      dispatch({ type: ActionTypes.INIT_DATA, data });
    });
  }, []);

  return (
    <div className="App">
      <SearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TreeView data={state} />
      <p>Selected items: ({getCheckedNames()}).</p>
    </div>
  );
}

export default function SearchTree() {
  return (
    <TreeProvider>
      <MainSearchTree />
    </TreeProvider>
  );
}
