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
                    <section key={i}>
                        <Collapsible className={data.item.completed ? 'checked item' : 'item'} trigger={data.item.text}>
                            <input className="checkbox" type="checkbox" name={`item_${data.item.id}`} onChange={this.handleCheck} defaultChecked={data.item.completed} />
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
                                    <NewBucket type="task" item_id={data.item.id} addTask={this.addTask} />
                                :
                                    <></>
                                }
                                {!this.state.newTask ? <button onClick={this.handleAddTask}>Add Task</button> : <></>}
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
                    <p>Click item to expand</p>
                </header>
                <form>
                    {body}
                    {this.state.newItem ?
                        <NewBucket type="item" addItem={this.addItem} />
                    :
                        <></>
                    }
                    {!this.state.newItem ? <button onClick={this.handleAddItem}>Add Item</button> : <></>}
                    {this.state.save ? <input type='submit' value='Save'/> : <></>}
                </form>
            </>
        )
    };
}

export default withRouter(BucketList);