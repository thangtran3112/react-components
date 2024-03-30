import { useEffect, useState } from 'react';
import TreeView from './TreeView';
import { fetchData } from '../data/data';
import TreeProvider, { useTreeState } from './TreeProvider';
import { ActionTypes } from './reducer/tree.reducer';
import SearchHeader from './SearchHeader';

function MainSearchTree() {
  const { state, dispatch } = useTreeState();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData().then((data) => {
      dispatch({ type: ActionTypes.INIT_DATA, data });
    });
  }, []);

  return (
    <div className="App">
      <SearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TreeView data={state} />
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
