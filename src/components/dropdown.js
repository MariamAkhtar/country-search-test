 
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch, faCartArrowDown, faArrowDown, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import './dropdown.css';

export default class Dropdown extends Component {

	constructor(props){
        super(props)
        this.state = {
          inputVal:'',
          listOpen: false,
          headerTitle: this.props.title,
          list:this.props.list,
          addBtn: this.props.addBtn,
          noOfRecords : this.props.noOfRecord
        }
      }
      static getDerivedStateFromProps(nextProps){
        const count = nextProps.list.filter(function(a) { return a.selected; }).length;
        // const inputV = nextProps.selectedItem 
       // console.log('count',inputV)
    
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
          listOpen: !prevState.listOpen,
          list:prevState.list
        }))
      }

      
    
      render(){
        const btnStyle = {
          float : 'none'
        };
        
        const{list} = this.props
        const{inputVal,listOpen, headerTitle,noOfRecords } = this.state
        const showMore = ((this.props.noOfRecord != list.length)&&(list.length>0)) ? true : false
      
        return(
          <div className="container DropdownBox">
           
      <div  onClick={() => this.toggleList()}>
              <div className="dd-header-title">{headerTitle} <FontAwesomeIcon icon={faCaretDown} /></div>
              {listOpen
               
              }
          </div>
            {listOpen &&    <div className=""> <FontAwesomeIcon icon={faSearch} /><input type="text" className="input" value={this.props.selectedItem} onChange={(event)=>this.props.searchItem(event)} placeholder="Search..." />
            </div>}
              {this.props.addBtn &&
            
     <div>     
          <p>{this.props.selectedItem}" not found</p>
          <button style={btnStyle}  onClick={(e) => this.props.addItem(e)}>Add & Select</button></div> }
      {listOpen && <ul className="dd-list">
             {list.slice(0, this.props.noOfRecord).map((item, index) => (
              <li className="dd-list-item" key={item.title} onClick={() => this.props.toggleItem(item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
              ))}   
             { showMore && <p onClick={() => this.props.showMoreItems(this.props.noOfRecord)}>{this.props.noOfRecord} more...</p> }
            </ul>
            
            }
             
          </div>
          
        )
      }
}
