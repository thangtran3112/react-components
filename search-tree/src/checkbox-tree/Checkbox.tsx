import { useTreeState } from './TreeProvider';
import { ActionTypes, Node } from './reducer/tree.reducer';

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

export default Checkbox;
