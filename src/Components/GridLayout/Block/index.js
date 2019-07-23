import React, { Component } from 'react';

import scss from './block.module.scss';
import classNames from 'classnames';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {GirdLayoutContext} from '../../GridLayout/index';
import UpdateForm from '../UpdateForm';

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
	  loading: false,
	  anchorEl: null,
	  formOpen: false
    };
  }

  componentDidMount() {
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleAdd_Edit = (edit) => {
    this.setState({ formOpen: true });
		this.handleClose();
  }
  handleRemove = (idx,removeFunc) => {
	removeFunc(idx,{});
	this.handleClose();
  }
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleFormClose = () => {
    this.setState({ formOpen: false });
  }

  render() {
	const { anchorEl } = this.state;
	
	// EmptyBlock does not require the data, so I can build it outside the render
	let emptyBlock = (
		<React.Fragment>
			<Menu
			  id="simple-menu"
			  className={scss.menu}
        	  anchorEl={anchorEl}
        	  open={Boolean(anchorEl)}
        	  onClose={this.handleClose}
        	>
        	  	<MenuItem className={scss.menuItem} onClick={() => this.handleAdd_Edit()}>Add</MenuItem>
        	</Menu>
			<div className={classNames(scss.card,scss.cardEmpty)}
				aria-owns={anchorEl ? 'simple-menu' : undefined}
				aria-haspopup="true"
				onClick={this.handleClick}
			>
	  			<div className={scss.cardHeader}>
					<div className={scss.cardImg}>
					</div>
				</div>
				<div className={scss.cardBody}>
					<div className={scss.cardBodyText}>
						<div>Empty</div>
						<div></div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);

		/** 
		 * 	So UpdateForm is inside the container div, otherwise css-grid sees it as an additional element
		 *	which screws up the layout
		 *  I originally wanted to use context for the update form as well, but, there's an issue where I cannot
		 *  access the context from componentDidMount, so i had to pass it down.
		*/
		
    return (
		<GirdLayoutContext.Consumer>
			{({shoe, idx, updateShoeArray}) => {
      				return (
						<React.Fragment>
	  				  	<div className={scss.container}>
							{this.state.formOpen &&
								<UpdateForm 
									open={this.state.formOpen} 
									handleFormClose={this.handleFormClose}
									context={{shoe, idx, updateShoeArray}}
									edit={!Boolean(shoe.brand) ? null : true}
								/>
							}
							{!Boolean(shoe.brand)
							? emptyBlock
							: <React.Fragment>
							<Menu
							  id="simple-menu"
							  className={scss.menu}
        					  anchorEl={anchorEl}
        					  open={Boolean(anchorEl)}
        					  onClose={this.handleClose}
        					>
        					    <MenuItem className={scss.menuItem} onClick={() => this.handleAdd_Edit('edit')}>Edit</MenuItem>
        					    <MenuItem className={scss.menuItem} onClick={() => this.handleRemove(idx,updateShoeArray)}>Remove</MenuItem>
        					</Menu>
							<div className={classNames(scss.card,scss.cardFull)}
								aria-owns={anchorEl ? 'simple-menu' : undefined}
								aria-haspopup="true"
								onClick={this.handleClick}
							>
	  				  			<div className={scss.cardHeader}>
									<div className={scss.cardImg}>
										<img src={'/images/'+shoe.imagePath} alt='shoe' />
									</div>
								</div>
								<div className={scss.cardBody}>
									<div className={scss.cardBodyText}>
										<div>{shoe.brand}</div>
										<div>{shoe.style}</div>
									</div>
								</div>
							</div>
							</React.Fragment> 
							}
						</div>
						</React.Fragment>
      				)
				}
			}
		</GirdLayoutContext.Consumer>
    );
  }
}

export default Block;
