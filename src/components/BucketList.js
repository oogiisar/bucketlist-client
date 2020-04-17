import React, { Component } from 'react';
//import update from 'immutability-helper';
import NewBucket from './NewBucket';
import Collapsible from 'react-collapsible';
import TokenService from '../services/token-service';
import { withRouter } from "react-router-dom";
import bucketListApiService from '../services/bucketlist-api-service';
import './css/BucketList.css';


class BucketList extends Component {

    constructor(props){
        super(props)
        this.state = {
            newTask: false,
            newItem: false,
            checkUpdate: false,
            save: false,
            data: ''
        }
    }

    getUserId() {
        const getAuthToken = TokenService.getAuthToken()
        const token = TokenService.parseJwt(getAuthToken)
        let user = token == null ? 'nouser' : token 
        return user.user_is
    }

    componentDidMount() {
        let user = this.getUserId()
        // Prevent people from browsing to users that is not their user
        if(this.props.match.params.id !== user) {
            this.props.history.push(`/${user}/bucketlist`)
        }
        bucketListApiService.getBucketlist(user)
        .then( data => {
            this.setState({data: data})
        })
    }

    addItem = (item) => {
        this.setState({save: true})
        let user = this.getUserId()
        bucketListApiService.postItem(user, item)
    }

    addTask = (task, item_id) => {
        this.setState({save: true})
        let user = this.getUserId()
        bucketListApiService.postTask(user, item_id, task)
    }

    handleAddTask = (e) => {
        e.preventDefault()
        // Triggers addition to database and rerenders page. 
        this.setState({newTask: true})
    }
    handleAddItem = (e) => {
        e.preventDefault()
        // Triggers addition to database and rerenders page.
        this.setState({newItem: true})
    }

    handleCheck = (e) => {
        this.setState({save: true})
        let user = this.getUserId()
        const checked = e.target.checked
        const toUpdate = e.target.name.split('_')
        if(toUpdate[0] === 'item') {
            bucketListApiService.patchItem(user, toUpdate[1], checked)
        } else {
            bucketListApiService.patchTask(user, toUpdate[1], toUpdate[2], checked)
        }
        
    } 

    render() {
        let body
        this.state.data !== '' ? 
            body =
                this.state.data.map((data, i) =>
                    <section className="thisItem" key={i}>
                        <input className="itemCheckbox option-input" type="checkbox" name={`item_${data.item.id}`} onChange={this.handleCheck} defaultChecked={data.item.completed} />
                        {/*Add class checked if database returns checked true*/}
                        <Collapsible className={data.item.completed ? 'checked item' : 'item'} trigger={data.item.text}>
                            <section className="tasks">
                                {data.item.tasks.length !== 0 ? 
                                    data.item.tasks.map((task, i) =>
                                        <section key={i}>
                                            {/*Check to see if this item or task are checked if they are then strike and check box*/}
                                            {Object.keys(task).length !== 0 ?
                                                <div className="task">
                                                        <>
                                                            <p className={task.completed ? 'checked' : ''}>{task.task}</p>
                                                            <input className="checkbox" type="checkbox" name={`task_${task.item}_${task.id}`} onChange={this.handleCheck} defaultChecked={task.completed} />
                                                        </>
                                                </div>

                                            : 
                                                <div key={i}></div>}
                                        </section>
                                    )
                                :
                                    <div></div>
                                }
                                {this.state.newTask ?
                                    // let the component know it is a task for processing as tasl
                                    <NewBucket type="task" item_id={data.item.id} addTask={this.addTask} />
                                :
                                    <></>
                                }
                                {!this.state.newTask ? <button onClick={this.handleAddTask} className="lined thin">Add Task</button> : <></>}
                            </section>
                        </Collapsible>
                    </section>
                    
                )
            :
                body = <div></div>
                        
        return(
            <>
                <header>
                    <h2>Your Bucket items</h2>
                    
                </header>
                <form className="bucketItems">
                    <label>Click item to expand</label>
                    {body}
                    {this.state.newItem ?
                        // let the component know it is a item for processing as item
                        <NewBucket type="item" addItem={this.addItem} />
                    :
                        <></>
                    }
                    {/* conditional rendering on button if a new item or task has been added */}
                    {!this.state.newItem ? <button onClick={this.handleAddItem} className="login__button">Add Item</button> : <></>}
                    {this.state.save ? <button className="login__button save__button" type='submit' value='Save'>Save</button> : <></>}
                </form>
            </>
        )
    };
}

export default withRouter(BucketList);