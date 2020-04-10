import React, { Component } from 'react';
import './css/NewBucket.css';

class NewBucket extends Component {
    constructor(props){
        super(props)
        this.state = {
            item: {
                value: '',
                touched: false
            }
        }
    }

    updateItem(item) {
        // Wait for setState before validating email
        this.setState({item: {value: item, touched: true}}, () => {
            this.requireItem()
        })
    }

    requireItem() {
        // Make sure the user has entered an item text
        const item = this.state.item.value.trim();
        const touched = this.state.item.touched;
        const error = this.state.error;

        if(item.length === 0 && touched === true) {
            this.setState({error: 'An Item is required'})
        } else if( error !== '') {
            this.setState({error: ''})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addItem()

    }

    render() {
        return(
            <form 
                key={this.props.key}
                className="item newItem" 
                onSubmit={this.handleSubmit}
            >
                <input type="text" placeholder="New Item" />
                <input type="submit" value="Submit" />
            </form>
        )
    };
}

export default NewBucket;