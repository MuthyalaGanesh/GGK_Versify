import React from 'react'
import _ from 'lodash';

let treeviewSpanStyle = {
};

let treeviewSpanIndentStyle = treeviewSpanStyle;

let treeviewSpanIconStyle = treeviewSpanStyle;

class TreeView extends React.Component {

  constructor(props) {
    super(props);

    this.nodesQuantity = 0;
    /*this.state = {data: props.data};
     this.someData = _.clone(props.data);
     this.setNodeId({Children: this.state.data});*/
    console.log('constructor-nodeid-',props.defaultNodeExpanded);

    this.state = {data: this.setNodeId(_.clone({Children: props.data}),0)};    

    this.findNodeById = this.findNodeById.bind(this);
    this.setChildrenState = this.setChildrenState.bind(this);
    this.setParentSelectable = this.setParentSelectable.bind(this);
    this.checkParentEmpty = this.checkParentEmpty.bind(this);
    this.nodeSelected = this.nodeSelected.bind(this);
    this.nodeDoubleClicked = this.nodeDoubleClicked.bind(this);
    this.addNode = this.addNode.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.recusrsiveexpansion = this.recusrsiveexpansion.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps-nodeid--',nextProps.defaultNodeExpanded);

    this.setState({data: this.setNodeId(_.clone({Children: nextProps.data}),_.clone(nextProps.defaultNodeExpanded))});
     
  }

  setNodeId(node,defaultNodeExpanded) {
    if (!node.Children) return;
    return node.Children.map(childNode => {
      return {
        nodeId: childNode.Id,
        Children: this.setNodeId(childNode),
        parentNode: node,
        state: {
          selected: childNode.state ? !!childNode.state.selected : false ,
          expanded: this.recusrsiveexpansion(childNode,defaultNodeExpanded)? true : childNode.state ? !!childNode.state.expanded : false 
        },
        Name: childNode.Name,
        icon: childNode.icon
      }
    });

  }

  recusrsiveexpansion(node,defaultNodeExpanded) {
  let flag=0
    if(node.Id == defaultNodeExpanded){
      return 1
    }
    else{
      if(!node.Children){
        return 0
      }
      else{
        let i = 0
        for( i in node.Children){
          if(this.recusrsiveexpansion(node.Children[i],defaultNodeExpanded)){
              flag = 1
              break 
          }
        }
        if( flag == 1){
          return 1
        }
        else{
          return 0
        }
      }

    }

  }


  findNodeById(Children, id) {
    let _this = this;
    let result;
    if (Children)
      Children.forEach(function (node) {
        if (node.nodeId == id) result = node;
        else {
          if (node.Children) {
            result = _this.findNodeById(node.Children, id) || result;
          }
        }
      });
    return result;
  }

  deleteById(obj, id) {
    if (!obj || obj.length <= 0)
      return [];
    let arr = [];
    _.each(obj, (val) => {
      if (val.Children && val.Children.length > 0)
        val.Children = this.deleteById(val.Children, id);

      if (val.nodeId !== id) {
        arr.push(val);
      }
    });
    return arr;
  }

  setChildrenState(Children, state) {
    let _this = this;
    if (Children)
      Children.forEach(function (node) {
        node.state.selected = state;
        _this.setChildrenState(node.Children, state);
      });
  }

  setParentSelectable(node) {
    if (!node.parentNode || !node.parentNode.state)
      return;
    node.parentNode.state.selected = true;
    this.setParentSelectable(node.parentNode);
  }

  checkParentEmpty(node) {
    let parent = node.parentNode;
    if (!parent.state || !parent.state.selected)
      return;
    if (parent.Children.every((childNode) => !childNode.state.selected)) {
      parent.state.selected = false;
      this.checkParentEmpty(parent);
    }
  }

  nodeSelected(nodeId, selected) {
    let node = this.findNodeById(this.state.data, nodeId);
    node.state.selected = selected;
    /*if (!selected)
     this.setParent(node);*/
    //this.setParentSelectable(node);
    /*else
     this.checkParentEmpty(node);*/

    this.setChildrenState(node.Children, selected);
    this.setState({data: this.state.data });

    if (this.props.onClick)
      this.props.onClick(this.state.data, node);
  }

  nodeDoubleClicked(nodeId, selected) {
    let node = this.findNodeById(this.state.data, nodeId);
    if (this.props.onDoubleClick)
      this.props.onDoubleClick(this.state.data, node);
  }

  convert(obj) {
    if (!obj || obj.length <= 0)
      return [];
    return _.map(obj, (val) => {
      let treeNodeData = {
        Name: val.Name,
        selected: val.state.selected
      };
      let children = this.convert(val.Children);
      if (children.length > 0)
        treeNodeData.Children = children;
      return treeNodeData;
    });
  }

  addNode(nodeId, Name) {
    let node = this.findNodeById(this.state.data, nodeId);

    let newNode = {
      Name: Name,
      state: {},
      parentNode: node,
      nodeId: this.nodesQuantity++
    };

    if (node.Children) {
      node.Children.push(newNode)
    } else {
      node.Children = [newNode]
    }

    console.log(this.convert(this.state.data));

    if (this.props.onNodeAdded)
      this.props.onNodeAdded(this.state.data);
  }

  removeNode(nodeId) {
    let newData = this.deleteById(_.clone(this.state.data), nodeId);
    if(newData.length === 0)
      return false;
    this.setState({data: newData });
    if (this.props.onNodeRemoved)
      this.props.onNodeRemoved(newData);
  }

  render() {
    let data = this.state.data;
    let children = [];
    if (data) {
      let _this = this;
      data.forEach(function (node) {
        children.push(React.createElement(TreeNode, {
          node: node,
          key: node.nodeId,
          level: 1,
          visible: true,
          onSelectedStatusChanged: _this.nodeSelected,
          onNodeDoubleClicked: _this.nodeDoubleClicked,
          addNode: _this.addNode,
          removeNode: _this.removeNode,
          options: _this.props,
          Children: _this.state.data,
          allowNew: _this.props.allowNew,
          leftMenuDropdownClickEvent: _this.props.leftMenuDropdownClickEvent
        }));
      });
    }

    return (
        
           <section className="sidebar">
           <ul className="sidebar-menu">
            {children}
            </ul>
          </section>
        
    )
  }
}

TreeView.propTypes = {
  levels: React.PropTypes.number,
  expandIcon: React.PropTypes.string,
  selectable: React.PropTypes.bool,

  emptyIcon: React.PropTypes.string,
  nodeIcon: React.PropTypes.string,

  color: React.PropTypes.string,
  backColor: React.PropTypes.string,
  borderColor: React.PropTypes.string,
  onhoverColor: React.PropTypes.string,
  selectedColor: React.PropTypes.string,
  selectedBackColor: React.PropTypes.string,

  enableLinks: React.PropTypes.bool,
  highlightSelected: React.PropTypes.bool,
  showBorder: React.PropTypes.bool,
  showTags: React.PropTypes.bool,

  Children: React.PropTypes.arrayOf(React.PropTypes.object)
};

TreeView.defaultProps = {
  levels: 2,
  selectable: true,

  expandIcon: 'fa  fa-chevron-left',
  collapseIcon: 'fa fa-chevron-down',
  emptyIcon: 'fa',
  nodeIcon: 'fa fa-square',
  unselectedIcon: 'fa fa-square-o',
  selectedIcon: 'fa fa-check-square-o',

  color: "#FFF",
  backColor: undefined,
  borderColor: undefined,
  onhoverColor: '#F5F5F5',
  selectedColor: '#000000',
  selectedBackColor: undefined,

  enableLinks: false,
  highlightSelected: true,
  showBorder: true,
  showTags: false,

  Children: []
};

export class TreeNode extends React.Component {

  constructor(props) {
    super(props);    
    this.state = {node: props.node, expanded:props.node.state && props.node.state.hasOwnProperty('expanded') ?
     props.node.state.expanded : false};
    /*this.expanded = (props.node.state && props.node.state.hasOwnProperty('expanded')) ?
     props.node.state.expanded :
     (this.props.level < this.props.options.levels);*/
    this.selected = (props.node.state && props.node.state.hasOwnProperty('selected')) ?
        props.node.state.selected :false;
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.doubleClicked = this.doubleClicked.bind(this);
    this.newNodeForm = this.newNodeForm.bind(this);
    this.addNode = this.addNode.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.singleClicked = this.singleClicked.bind(this);
    this.leftMenuDropdownClickEvent = props.leftMenuDropdownClickEvent
   
  }

  componentWillReceiveProps(nextProps) {
    this.setState({node: nextProps.node, expanded:nextProps.node.state && nextProps.node.state.hasOwnProperty('expanded') ?
     nextProps.node.state.expanded : false})
    /*this.expanded = (nextProps.node.state && nextProps.node.state.hasOwnProperty('expanded')) ?
     nextProps.node.state.expanded :
     (this.props.level < this.props.options.levels);*/
    this.selected = (nextProps.node.state && nextProps.node.state.hasOwnProperty('selected')) ?
        nextProps.node.state.selected :
        false;
  }

  toggleExpanded(event) {
    this.setState({expanded: !this.state.expanded});
    event.stopPropagation();
  }

  toggleSelected(event) {
    let selected = !this.props.node.state.selected;
    this.props.onSelectedStatusChanged(this.state.node.nodeId, selected);
    event.stopPropagation();
  }

  doubleClicked(event) {
    let selected = !this.props.node.state.selected;
    console.log("doubleclick event-",this.state.node.nodeId)
    this.props.onNodeDoubleClicked(this.state.node.nodeId, selected);
    event.stopPropagation();
  }

   singleClicked(event) {
     let selected = !this.props.node.state.selected;
    console.log("singleClicked event-",this.state.node.nodeId)     
    this.props.leftMenuDropdownClickEvent(this.state.node.nodeId,event);
    event.stopPropagation();
  }

  newNodeForm(event) {
    this.setState({addNode: !this.state.addNode});
    event.stopPropagation();
  }

  addNode(event) {
    if (!new RegExp('^[a-zA-Z0-9]+$').test(this.refs.newNodeName.value)) {
      this.refs.newNodeName.setCustomValidity("Incorrect format");
      return false;
    }
    this.setState({addNode: false});
    console.log("ref", this.refs.newNodeName.value);
    this.props.addNode(this.state.node.nodeId, this.refs.newNodeName.value);
    this.setState({expanded: true});
    event.stopPropagation();
  }

  removeNode(event) {
    this.props.removeNode(this.state.node.nodeId);
    event.stopPropagation();
  }

  render() {
    let node = _.clone(this.props.node);
    let options = _.clone(this.props.options);

    let style;

    if(this.props.options.selectable) node.icon = (node.state.selected) ? options.selectedIcon : options.unselectedIcon;

    if (!this.props.visible) {

      style = {
        display: 'none'
      };
    }
    else {

      if (options.highlightSelected && node.state.selected) {
        style = {
          color: options.selectedColor,
          backgroundColor: options.selectedBackColor
        };
      }
      else {
        style = {
          color: node.color || options.color,
          backgroundColor: node.backColor || options.backColor
        };
      }

      if (!options.showBorder) {
        style.border = 'none';
      }
      else if (options.borderColor) {
        style.border = '1px solid ' + options.borderColor;
      }
    }

    let indents = [];
    for (let i = 0; i < this.props.level - 1; i++) {
      indents.push(
          <span className={'indent'} style={treeviewSpanIndentStyle} key={i}> </span>
      )
    }
    
    let expandCollapseIcon;
    if (node.Children.length >0) {
      if (!this.state.expanded) {
       
        expandCollapseIcon = (
            <span className={options.expandIcon} style={treeviewSpanStyle}
                  onClick={this.toggleExpanded}> </span>
        )
      }
      else {
        expandCollapseIcon = (
            <span className={options.collapseIcon} style={treeviewSpanStyle}
                  onClick={this.toggleExpanded}>   </span>
        )
      }
    }
    else {
      expandCollapseIcon = (
          <span className={options.emptyIcon} style={treeviewSpanStyle}> </span>
      )
    }

    let nodeIcon = (node.icon || options.nodeIcon) ? (
        <span className={'icon'} onClick={this.toggleSelected} style={treeviewSpanIconStyle}> <i
            className={node.icon || options.nodeIcon}> </i> </span>
    ) : "";

    let nodeText;
    if (options.enableLinks) {
      nodeText = (
          <a href={ node.href}> {node.Name} </a>
      )
    }
    else {
      nodeText = (
          <span className='menu-name' style={treeviewSpanStyle}
            onClick={this.singleClicked}
           > <a > {node.Name} </a> </span>
      )
    }

    let badges;
    if (options.showTags && node.tags) {
      badges = node.tags.map(function (tag) {
        return (
            <span className={'badge'} style={treeviewSpanStyle}> {tag} </span>
        )
      });
    }

    let children = [];
    if (node.Children) {
      let _this = this;
      node.Children.forEach(function (node) {
        children.push(React.createElement(TreeNode, {
          node: node,
          key: node.nodeId,
          level: _this.props.level + 1,
          visible: _this.state.expanded && _this.props.visible,
          onSelectedStatusChanged: _this.props.onSelectedStatusChanged,
          onNodeDoubleClicked: _this.props.onNodeDoubleClicked,
          addNode: _this.props.addNode,
          removeNode: _this.props.removeNode,
          options: options,
          allowNew: _this.props.allowNew,
          leftMenuDropdownClickEvent:_this.props.leftMenuDropdownClickEvent

        }));
      });
    }

    let addButton = this.props.allowNew ? (
        <span className="glyphicon glyphicon-plus addElement" style={{float:"right", cursor:"pointer"}}
              onClick={this.newNodeForm}></span>) : "";

    let removeButton = this.props.options.removable ? (
        <span className="glyphicon glyphicon-remove removeElement" style={{cursor:"pointer"}}
              onClick={this.removeNode}></span>) : "";

    let newNode;

    if (this.state.addNode) {
      newNode = (<div className="input-group">
            <input type="text" className="form-control nodeName" ref="newNodeName"/>
          <span className="input-group-btn">
            <span className="btn btn-primary submitNode" onClick={this.addNode}>Add</span>
          </span>
          </div>
      );
    }

    style["cursor"] = "pointer";    
    return (        
          <li className="treeview"
            style={style}
            onDoubleClick={this.doubleClicked}
            key={node.nodeId}>
          {indents}
          {expandCollapseIcon}
          {removeButton}
          {nodeText}
          {badges}
          {addButton}
          {newNode}
         <ul className='treeview-menu menu-open'> {children}</ul>
        </li>
    );
  }
}

export default TreeView;
