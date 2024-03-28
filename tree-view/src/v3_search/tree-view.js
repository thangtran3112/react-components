import React from "react";
import { useTreeState } from "./TreeContext";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

const TreeNode = ({ node }) => {
  const { dispatch } = useTreeState();
  return (
    <div
      className="tree-node"
      style={{ color: node.isHighlight ? "red" : "initial" }}
    >
      {node.children && (
        <button
          style={{ outline: "none", border: "none" }}
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
            <IoIosArrowDropleft style={{ color: "blue" }} />
          ) : (
            <IoIosArrowDropright style={{ color: "blue" }} />
          )}
        </button>
      )}
      <span>{node.name}</span>
      <input type="checkbox"></input>
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
