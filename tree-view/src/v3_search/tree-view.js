import React, { useEffect } from "react";
import { useTreeState } from "./TreeContext";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";

const BlankSpace = () => {
  return <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
};

const TreeNode = ({ node }) => {
  const { dispatch } = useTreeState();
  const [myChecked, setMyChecked] = React.useState(node.isChecked);

  useEffect(() => {
    setMyChecked(node.isChecked);
  }, [node.isChecked]);

  const hasChidlren = !!node.children;
  return (
    <div className="tree-node">
      <button
        style={{ outline: "none", border: "none" }}
        disabled={!hasChidlren}
        onClick={() =>
          dispatch({
            type: "TOGGLE_NODE",
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
      <input
        type="checkbox"
        checked={myChecked}
        onChange={(event) => {
          console.log(
            `onChange check node at id ${node.id} to ${event.target.checked}`
          );
          dispatch({
            type: "CHECK_NODE",
            isChecked: event.target.checked,
            id: node.id,
          });
        }}
      ></input>
      <span style={{ color: node.isHighlight ? "red" : "initial" }}>
        {node.name}
      </span>
      {node.isExpanded && <TreeView data={node?.children} />}
    </div>
  );
};

const TreeView = ({ data }) => {
  return (
    <div className="tree-view">
      {data?.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default TreeView;
