 
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'

export default class Dropdown extends Component {

	constructor(props){
        super(props)
        this.state = {
          inputVal:'',
          listOpen: false,
          headerTitle: this.props.title,
          list:this.props.list,
          addBtn: this.props.addBtn
        }
      }
      static getDerivedStateFromProps(nextProps){
        const count = nextProps.list.filter(function(a) { return a.selected; }).length;
        const inputV = nextProps.list;
        console.log('coungt',inputV)
    
    if(count === 0){
          return {headerTitle: nextProps.title}
        }
        else if(count === 1){
          return {headerTitle: `${count} ${nextProps.titleHelper}`}
        }
        // else if(count > 1){
        //   return {headerTitle: `${count} ${nextProps.titleHelper}s`}
        // }
      }

    handleClickOutside(){
        this.setState({
          listOpen: false
        })
      }
      toggleList(){
        this.setState(prevState => ({
          listOpen: !prevState.listOpen
        }))
      }

      
    
      render(){
        const{list} = this.props
        const{inputVal,listOpen, headerTitle } = this.state
      
        return(
          <div className="dd-wrappe0r">
           
      <div className="dd-header" onClick={() => this.toggleList()}>
              <div className="dd-header-title">{headerTitle}</div>
              {listOpen
               
              }
          </div>
          <input type="text" className="input"   onChange={(event)=>this.props.searchItem(event)} placeholder="Search..." />
              {this.props.addBtn &&
     <div>        <button variant="outline-primary" onClick={(e) => this.props.addItem(e)}>Add & Select</button></div> }
      {listOpen && <ul className="dd-list">
             {list.map((item) => (
              <li className="dd-list-item" key={item.title} onClick={() => this.props.toggleItem(item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
              ))}
            </ul>}
          </div>
        )
      }
}
