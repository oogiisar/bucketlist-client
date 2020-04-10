import React, { Component } from 'react';
import update from 'immutability-helper';
import NewBucket from './NewBucket';
import Collapsible from 'react-collapsible';
import './css/BucketList.css';


class BucketList extends Component {

    constructor(props){
        super(props)
        this.state = {
            newTask: false,
            newItem: false,
            data: [
                {
                    id: 1,
                    item: 'Go to Mongolia',
                    completed: false,
                    task: [
                        {   
                            id: 1,
                            text: 'Buy sleeping bag',
                            completed: false
                        },
                        {
                            id: 2,
                            text: 'Buy flight',
                            completed: true
                        }
                    ]
                },
                {  
                    id: 2,
                    item: 'Learn to Dance',
                    completed: true,
                    task: [{}]
                }
            ]
        }
    }

    addItem = () => {
        this.setState({newItem: false})
    }

    addTask = () => {
        this.setState({newTask: false})
    }

    handleAddTask = () => {
        // Triggers addition to database and rerenders page. Will impliment with backend.
        this.setState({newTask: true})
    }
    handleAddItem = () => {
        // Triggers addition to database and rerenders page. Will impliment with backend.
        this.setState({newItem: true})
    }

    handleCheck = (e) => {
        const toUpdate = e.target.name.split('_')

        if(toUpdate[0] === 'item') {
            let updateData = this.state.data.find(item => item.id.toString() === toUpdate[1].toString())
            let index = this.state.data.indexOf(updateData)
            let result = updateData.completed ? false : true
            this.setState({
                data: update(this.state.data, {[index]: {completed: {$set: result}}})
            })

        } else {
            let updateData = this.state.data[0].task.find(item => item.id.toString() === toUpdate[1].toString())
            let index = this.state.data[0].task.indexOf(updateData)
            let result = updateData.completed ? false : true
            this.setState({
                data: update(this.state.data, {0: {task: {[index]: {completed: {$set: result}}}}})
            })
        }

    } 

    render() {
        let checked = ''
        let taskChecked = ''
        let body =
            this.state.data.map((data, i) =>
                <section key={i}>
                    <Collapsible className={data.completed ? 'checked item' : 'item'} trigger={data.item}>
                        <input className="checkbox" type="checkbox" name={`item_${data.id}`} onChange={this.handleCheck} checked={data.completed} />
                      
                    
                        <section className="tasks">
                            {data.task.map((task, i) =>
                                <section key={i}>
                                    {/*Check to see if this item or task are checked if they are then strike and check box*/}
                                    {Object.keys(task).length !== 0 ?
                                        <div className="task">
                                                <>
                                                    <p className={task.completed ? 'checked' : ''}>{task.text}</p>
                                                    <input className="checkbox" type="checkbox" name={`task_${task.id}`} onChange={this.handleCheck} checked={task.completed} />
                                                </>
                                        </div>

                                    : 
                                        <div key={i}></div>}
                                </section>
                            )}
                            {this.state.newTask ?
                                <NewBucket addItem={this.addTask} />
                            :
                                <></>
                            }
                            <button onClick={this.handleAddTask}>Add Task</button>
                        </section>
                    </Collapsible>
                </section>
                
            )

        return(
            <>
                <header>
                    <h2>Your Bucket items</h2>
                    <p>Click item to expand</p>
                </header>

                {body}
                {this.state.newItem ?
                    <NewBucket addItem={this.addItem} />
                :
                    <></>
                }
                <button onClick={this.handleAddItem}>Add Item</button>
            </>
        )
    };
}

export default BucketList;