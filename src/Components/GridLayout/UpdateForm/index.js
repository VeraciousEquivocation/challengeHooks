import React, {useState, useEffect, useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import scss from './updateform.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import {GirdLayoutContext} from '../../GridLayout/index';

/**
 *  Your Standard form. I decided to go with MaterialUI, due to familiarity, 
 *  it's well documented (mostly), 
 *  and time. Plus the Dialog and the popup menu are rather smooth.
 *  There is a caveat with using such a library:
 * 	It does not appear to play nice with libraries for running tests
 */

const UpdateForm = (props) => {
	const {open, handleFormClose, edit, fullScreen} = props;

	const [brand,setBrand] = useState('');
	const [style,setStyle] = useState('');
	const [size,setSize] = useState('');
	const [upc,setUpc] = useState('');

	const context = useContext(GirdLayoutContext);
	let {shoe, idx, updateShoeArray} = context;

	// shoe, idx, updateShoeArray

	useEffect(() => {
		setBrand(shoe.brand ? shoe.brand:'');
		setStyle(shoe.style ? shoe.style:'');
		setSize(shoe.size ? shoe.size:'');
		setUpc(shoe.upc ? shoe.upc:'');
	}, [shoe.brand, shoe.style, shoe.size, shoe.upc]);

	let disableBtn = (Boolean(!brand)||Boolean(!style)||Boolean(!size)||Boolean(!upc));

	const handleSubmit = useCallback((edit,brand,style,size,upc,imagePath='') => {
		if(Boolean(!brand)||Boolean(!style)||Boolean(!size)||Boolean(!upc)) return;

	  	let updatedShoe = {
		brand:brand,
		style:style,
		size:size,
		upc:upc
		}
		if(edit) updatedShoe.imagePath = imagePath;

	  updateShoeArray(idx, updatedShoe, handleFormClose);
  	},[idx,updateShoeArray,handleFormClose])

	return(

		<div>
      		<Dialog
			  fullScreen={fullScreen}
			  PaperProps={
				  {
					classes: {
						root: scss.paperRoot
					}
				  }
			  }
      		  open={open}
      		  onClose={handleFormClose}
      		  aria-labelledby="form-dialog-title"
      		>
      		  <DialogTitle id="form-dialog-title">
			  	{edit
				? 'Edit'
				: 'Add New Item'
				}
			</DialogTitle>
      		  <DialogContent>
      		      <TextField
					autoFocus
					error={Boolean(!brand)}
					helperText={brand === "" ? 'Empty field!' : ' '}
      		      	margin="dense"
					required  
					id="brand"
      		      	label="Brand"
					type="text"
					onChange={(event)=>setBrand(event.target.value)}
					value={brand}
					fullWidth
			    />
      		  </DialogContent>
      		  <DialogContent>
      		      <TextField
					error={Boolean(!style)}
      		      	margin="dense"
					required  
					id="style"
      		      	label="Style"
					type="text"
					onChange={(event)=>setStyle(event.target.value)}
					value={style}
					fullWidth
			    />
      		  </DialogContent>
      		  <DialogContent>
      		      <TextField
					error={Boolean(!size)}
      		      	margin="dense"
					required  
					id="size"
      		      	label="Size"
					type="text"
					onChange={(event)=>setSize(event.target.value)}
					value={size}
					fullWidth
			    />
      		  </DialogContent>
      		  <DialogContent>
      		      <TextField
					error={Boolean(!upc)}
      		      	margin="dense"
					required  
					id="upc"
      		      	label="UPC"
					type="text"
					onChange={(event)=>setUpc(event.target.value)}
					value={upc}
					fullWidth
			    />
      		  </DialogContent>
      		  <DialogActions>
      		    <Button onClick={handleFormClose} color="primary">
      		      Cancel
      		    </Button>
							{edit
      		    ? <Button disabled={disableBtn} onClick={() => handleSubmit('edit',brand,style,size,upc,shoe.imagePath)} color="primary">Submit</Button>
      		    : <Button disabled={disableBtn} onClick={() => handleSubmit(null,brand,style,size,upc)} color="primary">Add</Button>
							}
      		  </DialogActions>
      		</Dialog>
		</div>

	);
}

UpdateForm.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};
  
export default withMobileDialog()(UpdateForm);