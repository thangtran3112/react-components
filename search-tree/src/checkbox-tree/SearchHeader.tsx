import { useTreeState } from './TreeProvider';
import { ActionTypes } from './reducer/tree.reducer';

interface FilterHeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
const SearchHeader = ({ searchQuery, setSearchQuery }: FilterHeaderProps) => {
  const { dispatch } = useTreeState();

  const onHandleSearch = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Perform search and update filtered state
    dispatch({ type: ActionTypes.SEARCH, query });
  };

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={onHandleSearch}
      />
      <button
        className="expand-all"
        onClick={() => dispatch({ type: ActionTypes.EXPAND_CHECKED_NODES })}
      >
        Show Selected
      </button>
      <button
        className="expand-all"
        onClick={() => dispatch({ type: ActionTypes.COLLAPSE_CHECKED_NODES })}
      >
        Collapse Selected
      </button>
      <button
        className="expand-all"
        onClick={() => dispatch({ type: ActionTypes.EXPAND_ALL })}
      >
        Expand All
      </button>
      <button
        className="expand-all"
        onClick={() => dispatch({ type: ActionTypes.COLLAPSE_ALL })}
      >
        Collapse All
      </button>
      <button
        className="expand-all"
        onClick={() => dispatch({ type: ActionTypes.COLLAPSE_UNCHECKED_NODES })}
      >
        Collapse Unselected
      </button>
    </div>
  );
};

export default SearchHeader;
