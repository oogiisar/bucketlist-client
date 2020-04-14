import React, { Component } from 'react';
import './css/NewBucket.css';

class NewBucket extends Component {
    constructor(props){
        super(props)
        this.state = {
            item: {
                value: '',
                touched: false
            },
            submitted: false,
            error: ''
        }
    }

    updateItem(item) {
        // Wait for setState before validating text present
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
            this.setState({
                error: 'An Item is required',
                item: {touched: false}
            })
            
        } else if( error !== '') {
            this.setState({error: ''})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.props.type === 'task'){
            this.props.addTask(this.state.item.value, this.props.item_id)
        } else {
            this.props.addItem(this.state.item.value)
        }
        this.setState({submitted: true})

    }

    render() {
        return(
            <section 
                key={this.props.key}
                className="item newItem" 
            >
                <div className="error">{this.state.error}</div>
                {!this.state.submitted ? 
                    <>
                        <input type="text" placeholder="Description" onChange={e => this.updateItem(e.target.value)} />
                        <input type="button" onClick={this.handleSubmit} value="Submit" disabled={!this.state.item.touched}/>
                    </>
                :
                        <div className="tooltip">{this.state.item.value}
                            <span className="tooltiptext">Click save to commit changes</span>
                        </div>
                }
            </section>
        )
    };
}

export default NewBucket;