export interface Node {
  id: string;
  name: string;
  children?: Node[];
  isExpanded?: boolean;
  isChecked?: boolean;
  isHighlight?: boolean;
}

const toggleNode = (nodes: Node[], id: string, expanded: boolean): Node[] => {
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

const updateAllNodes = (nodes: Node[], isExpanded: boolean): Node[] => {
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

const collectIdsFromNode = (
  node: Node,
  targetId: string,
  ids: Set<string>,
): void => {
  if (node.id === targetId) {
    //if this node have the corresponding it, we will add all child id to the ids array
    ids.add(targetId);
    if (node.children) {
      node.children.forEach((child) =>
        collectIdsFromNode(child, child.id, ids),
      );
    }
  } else {
    //if this node is not having the corresponding id, try to find the id in its children
    if (node.children) {
      node.children.forEach((child) =>
        collectIdsFromNode(child, targetId, ids),
      );
    }
  }
};

const markAllNodes = (
  nodes: Node[],
  isChecked: boolean,
  ids: Set<string>,
): Node[] => {
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

const checkNodes = (nodes: Node[], checked: boolean, id: string) => {
  console.log(`Dispatch check nodes with id=${id}, checked=${checked}`);
  const ids = new Set<string>();
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

const searchNodesHighlightPath = (nodes: Node[], query: string): Node[] => {
  nodes.forEach((node: Node) => {
    let shouldHighlight = query.length
      ? node.name.toLowerCase().includes(query.toLowerCase())
      : false;

    node.isHighlight = shouldHighlight;

    if (node.children) {
      searchNodesHighlightPath(node.children, query);
      if (node.children.some((child: Node) => child.isHighlight)) {
        node.isHighlight = true;
      }
    }
  });

  return nodes;
};

export enum ActionTypes {
  INIT_DATA = 'INIT_DATA',
  TOGGLE_NODE = 'TOGGLE_NODE',
  CHECK_NODE = 'CHECK_NODE',
  EXPAND_ALL = 'EXPAND_ALL',
  COLLAPSE_ALL = 'COLLAPSE_ALL',
  SEARCH = 'SEARCH',
  SEARCH_HIGHLIGHT_SUBTREE = 'SEARCH_HIGHLIGHT_SUBTREE',
}

export const treeReducer = (state: Node[], action: any): Node[] => {
  //console.log("ttt", action);
  switch (action.type) {
    case ActionTypes.INIT_DATA:
      return action.data;
    case ActionTypes.TOGGLE_NODE:
      return toggleNode(state, action.id, action.isExpanded);
    case ActionTypes.CHECK_NODE:
      return checkNodes(state, action.isChecked, action.id);
    case ActionTypes.EXPAND_ALL:
      return updateAllNodes(state, true);
    case ActionTypes.COLLAPSE_ALL:
      return updateAllNodes(state, false);
    case ActionTypes.SEARCH:
      return searchNodes(state, action.query);
    case ActionTypes.SEARCH_HIGHLIGHT_SUBTREE:
      return searchNodesHighlightPath(state, action.query);
    default:
      return state;
  }
};
