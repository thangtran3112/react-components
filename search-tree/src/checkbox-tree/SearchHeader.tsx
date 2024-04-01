import { useState } from 'react';
import { useTreeState } from './TreeProvider';
import { ActionTypes } from './reducer/tree.reducer';

interface FilterHeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

enum FilterTypes {
  NONE = 'none',
  SHOW_SELECTED = 'show-selected',
  HIDE_SELECTED = 'hide-selected',
  SHOW_SELECTED_ONLY = 'show-selected-only',
  SHOW_ALL = 'show-all',
  HIDE_ALL = 'hide-all',
}

const SearchHeader = ({ searchQuery, setSearchQuery }: FilterHeaderProps) => {
  const { dispatch } = useTreeState();
  const [selectedFilter, setSelectedFilter] = useState<FilterTypes>(
    FilterTypes.SHOW_SELECTED,
  );

  const onHandleSearch = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Perform search and update filtered state
    dispatch({ type: ActionTypes.SEARCH, query });
  };

  const handleSelectedFilterChange = (e: any) => {
    const filter = e.target.value;
    setSelectedFilter(filter);

    switch (filter) {
      case FilterTypes.SHOW_SELECTED:
        dispatch({ type: ActionTypes.EXPAND_CHECKED_NODES });
        break;
      case FilterTypes.HIDE_SELECTED:
        dispatch({ type: ActionTypes.COLLAPSE_CHECKED_NODES });
        break;
      case FilterTypes.SHOW_SELECTED_ONLY:
        dispatch({ type: ActionTypes.SHOW_ONLY_CHECKED_NODES });
        break;
      case FilterTypes.SHOW_ALL:
        dispatch({ type: ActionTypes.EXPAND_ALL });
        break;
      case FilterTypes.HIDE_ALL:
        dispatch({ type: ActionTypes.COLLAPSE_ALL });
        break;
      case FilterTypes.NONE:
        break;
      default:
        throw new Error('Invalid filter type!');
    }

    setSelectedFilter(FilterTypes.NONE);
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
      <select
        value={selectedFilter} // ...force the select's value to match the state variable...
        onChange={(e: any) => handleSelectedFilterChange(e)} // ... and update the state variable on any change!
      >
        <option value={FilterTypes.NONE}>Expand/Collapse</option>
        <option value={FilterTypes.SHOW_SELECTED}>Show Selected</option>
        <option value={FilterTypes.HIDE_SELECTED}>Hide Selected</option>
        <option value={FilterTypes.SHOW_SELECTED_ONLY}>
          Expand Selected Only
        </option>
        <option value={FilterTypes.SHOW_ALL}>Expand All</option>
        <option value={FilterTypes.HIDE_ALL}>Hide All</option>
      </select>
    </div>
  );
};

export default SearchHeader;
