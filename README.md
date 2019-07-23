This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## A Coding Challenge

### ChallengeX refactored to use React Hooks

The challenge:

Create a web interface using React.js
Use a 5x5 grid to display an inventory shelf for shoes; each slot should show which shoe is
placed in it.
When a spot is clicked, there should be a prompt to add, edit, or remove the shoe that is currently
in that slot.
Use a form with the following fields for a shoe ( all generic text fields)
- Brand
- Style
- Size
- UPC ID

### The component structure is as follows:

App <- GridLayout <- Block <- UpdateForm

The GridLayout requests the data, creates the context, and maps the Blocks

The Block represents an individual shoe, or an empty spot for managing a shoe.

The UpdateForm is a modal for editing the data of a shoe
