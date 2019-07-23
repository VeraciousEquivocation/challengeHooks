import React, { Component, useState, useEffect, useContext } from 'react';

import scss from './block.module.scss';
import classNames from 'classnames';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {GirdLayoutContext} from '../../GridLayout/index';
import UpdateForm from '../UpdateForm';

const BlockHook = () => {
	const [anchorEl,setAnchorEl] = useState(null);
	const [formOpen,setFormOpen] = useState(false);

	const context = useContext(GirdLayoutContext);
	let {shoe, idx, updateShoeArray} = context;

	useEffect(() => {
		if (formOpen) {
			setAnchorEl(null);
		}
	}, [formOpen]);

	let emptyBlock = (
		<React.Fragment>
			<Menu
			  id="simple-menu"
			  className={scss.menu}
        	  anchorEl={anchorEl}
        	  open={Boolean(anchorEl)}
        	  onClose={()=>setAnchorEl(null)}
        	>
				<MenuItem className={scss.menuItem} onClick={() => {
					setFormOpen(true);
					setAnchorEl(null);
				}}>Add</MenuItem>
        	</Menu>
			<div className={classNames(scss.card,scss.cardEmpty)}
				aria-owns={anchorEl ? 'simple-menu' : undefined}
				aria-haspopup="true"
				onClick={(event)=>setAnchorEl(event.currentTarget)}
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

	return (
		<React.Fragment>
	  	<div className={scss.container}>
			{formOpen &&
				<UpdateForm 
					open={formOpen} 
					handleFormClose={()=>setFormOpen(false)}
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
        	  onClose={()=>setAnchorEl(null)}
        	>
        	    <MenuItem className={scss.menuItem} onClick={() => {
					setFormOpen(true);
					setAnchorEl(null);
				}}>Edit</MenuItem>
        	    {/* <MenuItem className={scss.menuItem} onClick={() => this.handleRemove(idx,updateShoeArray)}>Remove</MenuItem> */}
        	    <MenuItem className={scss.menuItem} onClick={() => {
					updateShoeArray(idx,{
						brand:'',
						style:'',
						size:'',
						upc:'',
						imagePath:''
					});
					setAnchorEl(null);
				}}>Remove</MenuItem>
        	</Menu>
			<div className={classNames(scss.card,scss.cardFull)}
				aria-owns={anchorEl ? 'simple-menu' : undefined}
				aria-haspopup="true"
				onClick={(event)=>setAnchorEl(event.currentTarget)}
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
	);
};

export default BlockHook;
