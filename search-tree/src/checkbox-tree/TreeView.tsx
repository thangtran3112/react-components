import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai';
import { useTreeState } from './TreeProvider';
import { ActionTypes, Node } from './reducer/tree.reducer';
import Checkbox from './Checkbox';

const BlankSpace = () => {
  return <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
};

interface TreeNodeProps {
  node: Node;
}

interface TreeViewProps {
  data: Node[] | undefined;
}

const TreeNode = ({ node }: TreeNodeProps) => {
  const { dispatch } = useTreeState();
  const hasChidlren = !!node.children;
  return (
    <div className="tree-node">
      <button
        style={{ outline: 'none', border: 'none' }}
        disabled={!hasChidlren}
        onClick={() =>
          dispatch({
            type: ActionTypes.TOGGLE_NODE,
            id: node.id,
            isExpanded: !node.isExpanded,
          })
        }
        className="toggle-icon"
      >
        {node.isExpanded ? (
          hasChidlren ? (
            <AiOutlineCaretDown className="expand-icon" />
          ) : (
            <BlankSpace />
          )
        ) : hasChidlren ? (
          <AiOutlineCaretRight className="expand-icon" />
        ) : (
          <BlankSpace></BlankSpace>
        )}
      </button>
      <Checkbox node={node} />
      <span style={{ color: node.isHighlight ? 'red' : 'initial' }}>
        {node.name}
      </span>
      {node.isExpanded && <TreeView data={node?.children} />}
    </div>
  );
};

const TreeView = ({ data }: TreeViewProps) => {
  return (
    <div className="tree-view">
      {data?.map((node) => <TreeNode key={node.id} node={node} />)}
    </div>
  );
};

export default TreeView;
