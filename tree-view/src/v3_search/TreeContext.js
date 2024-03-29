import React, { createContext, useContext, useReducer } from "react";

const TreeStateContext = createContext();

const toggleNode = (nodes, id, expanded) => {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, isExpanded: expanded };
    }
    if (node.children) {
      return { ...node, children: toggleNode(node.children, id, expanded) };
    }
    return node;
  });
};

const updateAllNodes = (nodes, isExpanded) => {
  return nodes.map((node) => {
    if (node.children) {
      return {
        ...node,
        isExpanded,
        children: updateAllNodes(node.children, isExpanded),
      };
    }
    return { ...node, isExpanded };
  });
};

const collectIdsFromNode = (node, targetId, ids) => {
  if (node.id === targetId) {
    //if this node have the corresponding it, we will add all child id to the ids array
    ids.add(targetId);
    if (node.children) {
      node.children.forEach((child) =>
        collectIdsFromNode(child, child.id, ids)
      );
    }
  } else {
    //if this node is not having the corresponding id, try to find the id in its children
    if (node.children) {
      node.children.forEach((child) =>
        collectIdsFromNode(child, targetId, ids)
      );
    }
  }
};

const markAllNodes = (nodes, isChecked, ids) => {
  return nodes.map((node) => {
    const matching = ids.has(`${node.id}`);
    console.log(`Current node.id = ${node.id} and matching=${matching}`);
    //having children
    if (node.children) {
      if (matching) {
        console.log(`Marking isChecked=${isChecked} for node at id=${node.id}`);
        return {
          ...node,
          isChecked,
          children: markAllNodes(node.children, isChecked, ids),
        };
      } else {
        return {
          ...node,
          children: markAllNodes(node.children, isChecked, ids),
        };
      }
    }

    //no children
    if (matching) {
      console.log(`Marking isChecked=${isChecked} for node at id=${node.id}`);
      return { ...node, isChecked };
    } else {
      return node;
    }
  });
};

const checkNodes = (nodes, checked, id) => {
  console.log(`Dispatch check nodes with id=${id}, checked=${checked}`);
  const ids = new Set();
  nodes.forEach((node) => {
    collectIdsFromNode(node, id, ids);
  });
  console.log(`Marking isChecked=${checked} for all nodes with: `, ids);

  return markAllNodes(nodes, checked, ids);
};

const searchNodes = (nodes, query) => {
  nodes.forEach((node) => {
    let shouldHighlight = query.length
      ? node.name.toLowerCase().includes(query.toLowerCase())
      : false;

    node.isHighlight = shouldHighlight;

    if (node.children) {
      searchNodes(node.children, query);
    }
  });

  return nodes;
};

const searchNodesHighlightPath = (nodes, query) => {
  nodes.forEach((node) => {
    let shouldHighlight = query.length
      ? node.name.toLowerCase().includes(query.toLowerCase())
      : false;

    node.isHighlight = shouldHighlight;

    if (node.children) {
      searchNodesHighlightPath(node.children, query);
      if (node.children.some((child) => child.isHighlight)) {
        node.isHighlight = true;
      }
    }
  });

  return nodes;
};

const treeReducer = (state, action) => {
  //console.log("ttt", action);
  switch (action.type) {
    case "INIT_DATA":
      return action.data;
    case "TOGGLE_NODE":
      return toggleNode(state, action.id, action.isExpanded);
    case "CHECK_NODE":
      return checkNodes(state, action.isChecked, action.id);
    case "EXPAND_ALL":
      return updateAllNodes(state, true);
    case "COLLAPSE_ALL":
      return updateAllNodes(state, false);
    case "SEARCH":
      return searchNodes(state, action.query);
    case "SEARCH_HIGHLIGHT_SUBTREE":
      return searchNodesHighlightPath(state, action.query);
    default:
      return state;
  }
};

export const TreeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(treeReducer, []); // Default state set as an empty array

  return (
    <TreeStateContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeStateContext.Provider>
  );
};

export const useTreeState = () => {
  const context = useContext(TreeStateContext);
  return context;
};
