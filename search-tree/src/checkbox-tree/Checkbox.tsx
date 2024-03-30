import { useTreeState } from './TreeProvider';
import { ActionTypes, Node } from './reducer/tree.reducer';
import MuiCheckbox from '@mui/material/Checkbox';

interface CheckboxProps {
  node: Node;
}

const Checkbox = ({ node }: CheckboxProps) => {
  const { dispatch } = useTreeState();

  const handleOnChange = (event: any) => {
    console.log(
      `onChange check node at id ${node.id} to ${event.target.checked}`,
    );
    dispatch({
      type: ActionTypes.CHECK_NODE,
      isChecked: event.target.checked,
      id: node.id,
    });
  };

  return (
    <input
      className="check-box"
      id={node.id}
      type="checkbox"
      checked={node?.isChecked || false}
      onChange={(event) => handleOnChange(event)}
    />
  );
};

const StyledCheckbox = ({ node }: CheckboxProps) => {
  const { dispatch } = useTreeState();

  const handleOnChange = (event: any) => {
    console.log(
      `onChange check node at id ${node.id} to ${event.target.checked}`,
    );
    dispatch({
      type: ActionTypes.CHECK_NODE,
      isChecked: event.target.checked,
      id: node.id,
    });
  };

  const label = {
    inputProps: {
      'aria-label': 'Checkbox demo',
    },
  };

  return (
    <MuiCheckbox
      {...label}
      sx={{ boxSizing: 'border-box' }}
      id={node.id}
      checked={node?.isChecked || false}
      onChange={(event) => handleOnChange(event)}
    />
  );
};

export { StyledCheckbox };
export default Checkbox;
