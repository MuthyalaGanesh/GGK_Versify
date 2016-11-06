import React from 'react'
import TreeSelect, { TreeNode, SHOW_PARENT } from 'rc-tree-select';
import 'rc-tree-select/assets/index.css';

export const ParentLocationField = (props) => (
    <TreeSelect
          style={{'width':'100%'}}
          transitionName="rc-tree-select-dropdown-slide-up"
          choiceTransitionName="rc-tree-select-selection__choice-zoom"
          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
          placeholder={<i>Select Parent Location</i>}
          value={props.parentLocation}
          treeData={props.parentLocations}
          treeNodeFilterProp="Id"
          open={props.tsOpen || false}
          onChange={(value) => {
            console.log('onChange', arguments);
            props.onParentLoCationSelect(value);
            } 
          }
          onDropdownVisibleChange={(v, info) => {
            console.log('single onDropdownVisibleChange', v, info);
            if (info.documentClickClose) {
              return false;
            }
            return true;
          } 
        }
          onSelect={(e)=> {console.log("onselect",e);}}
      />  
        )

export default ParentLocationField;

