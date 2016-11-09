import React from 'react'
import TreeSelect, { TreeNode, SHOW_PARENT } from 'rc-tree-select';
import 'rc-tree-select/assets/index.css';

export const ParentLocationField = (props) => (

  <TreeSelect
    {...props.input}
    style={{'width':'100%'}}
    transitionName="rc-tree-select-dropdown-slide-up"
    choiceTransitionName="rc-tree-select-selection__choice-zoom"
    dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
    placeholder={"Select Parent Location"}
    value={props.input.value !== '' ? props.input.value :undefined}
    showSearch ={false}
    treeLine
    treeData={props.parentLocations}
    treeNodeFilterProp="Name"
    open={props.tsOpen || false}
    />
  )
  export default ParentLocationField;