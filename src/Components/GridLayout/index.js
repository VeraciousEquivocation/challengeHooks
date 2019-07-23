import React, { Component } from 'react';

import scss from './gridlayout.module.scss';

import shoeArray from './shoeArray';
import Block from './Blockhook';
import classNames from 'classnames';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const fetchData = () => {
	return new Promise( (resolve, reject) => {
		resolve(shoeArray);
	});
}
export const GirdLayoutContext = React.createContext();

/**
 * You'll notice the style has been lifted form the StockX website.
 * However, I have chosen to utilize css grid, instead of flexbox
 */
class GridLayout extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        shoeArray: [],
      };
    }

    componentDidMount() {
	  // fetchData
		this.setState({loading: true});
		
		setTimeout(
			function() {
				fetchData().then(response => {
					this.setState({loading: false,shoeArray:response});
				  })
				  .catch(error => console.log('This should not be required, but good practice'));
			}
			.bind(this),
			2000
		);

	  // I would also utilize reacts error boundary to show that an error occurred, 
	  // potentially in a parent element
    }
    updateShoeArray = (idx, dataObj, callback) => {
        let updatedArr = this.getUpdateArray();
        
		updatedArr[idx] = dataObj;
        if(callback) {
            this.setState({shoeArray:updatedArr},callback);
        } else {
            this.setState({shoeArray:updatedArr});
        }
    }
    getUpdateArray = () => {
        let updateArr = [];
		this.state.shoeArray.forEach(shoeObj => {
			updateArr.push({...shoeObj}); // no nested items in this object
        });
        return updateArr;
    }
    render() {
      const { loading, shoeArray  } = this.state;
      if(loading) return (
	  	<div className={scss.spinnerDiv}>
			{/* <FontAwesomeIcon className={classNames("fa-10x fa-pulse")} icon={faSpinner} /> */}
			<div className={classNames(scss.element, scss.element3)}></div>
			<div className={classNames(scss.element, scss.element2)}></div>
			<div className={classNames(scss.element, scss.element1)}></div>
			<div className={classNames(scss.element, scss.element0)}></div>
		</div>
	  ); 

      return (
          <div className={scss.container}>
              {shoeArray && shoeArray.length > 0 
              ? shoeArray.map((shoe,idx) => {
				    let contextObj = {
                      idx,
                      shoe,
                      updateShoeArray:this.updateShoeArray
                    };
                    return(
                        <GirdLayoutContext.Provider value={contextObj} key={idx} >
                            <Block />
                        </GirdLayoutContext.Provider>
                    );
                })
              : <div>This should not be empty</div>}
              
          </div>
      );
    }
}

export default GridLayout;
