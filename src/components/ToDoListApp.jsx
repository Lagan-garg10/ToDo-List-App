import React, { useEffect, useRef, useState } from 'react'
import './ToDoListApp.css'
export default function ToDoListApp() {
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDueDate, setTaskDueDate] = useState('')
    const [taskPriority, setTaskPriority] = useState('')
    const [task, setTask] = useState([])
    const [allTaskData, setAllTaskData] = useState([])
    const counter = useRef(parseInt(localStorage.getItem('counter')) || 0);
    const taskRefs = useRef([])
    const [filterTaskByWhichPriority, setFilterTaskByWhichPriority] = useState('')

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('notes')) || [];
        setTask(storedTasks);
        setAllTaskData(storedTasks);
        counter.current = storedTasks.length > 0 ? storedTasks.length : counter.current;
    }, []);

    // const checkTaskDueDate = () => {
    //     var todayDate = new Date()
    //     var x = taskDueDate.split('-')
    //     // console.log()
    //     // if(taskDueDate)
    //     if(x[2] < todayDate.getDate() || x[1] < todayDate.getMonth() || x[1] < todayDate.getFullYear()){
    //         alert('enter a valid date')
    //     }
    // }

    const addTask = () => {
        // checkTaskDueDate()
        const taskObjName = `task${counter.current}`
        let obj = {
            [taskObjName]: {
                taskDescription: taskDescription,
                taskDueDate: taskDueDate,
                taskPriority: taskPriority,
                taskComplete: false,
                taskey: taskObjName,
                showTaskByRemaining : true,
                showTaskByComplete : false
            }
        }
        var tasks = [...task, obj[taskObjName]]
        setTask(tasks)
        setAllTaskData(tasks)
        localStorage.setItem("notes", JSON.stringify(tasks))
        localStorage.setItem('counter',counter.current)
        counter.current += 1
    }


    // useEffect(() => {
    //     const storedTasks = JSON.parse(localStorage.getItem('notes'));
    //     if (storedTasks) {
    //         setAllTaskData(storedTasks)
    //     }
    // }, [task]);

    const deleteTask = (key) => {
        const updatedTasks = task.filter(taskItem => taskItem.taskey !== key);
        setTask(updatedTasks);
        setAllTaskData(updatedTasks);
        localStorage.setItem('notes', JSON.stringify(updatedTasks));
    };

    const completeTask = (key) => {
        const updatedTasks = task.map(task =>
            task.taskey === key ? { ...task, taskComplete: !task.taskComplete } : task
        );
        setTask(updatedTasks);
        setAllTaskData(updatedTasks);
        localStorage.setItem('notes', JSON.stringify(updatedTasks));
    };

    const filterTask = () => {
        const updatedTasks = task.map(task =>
            task.taskComplete === true ? { ...task, showTaskByComplete: true, showTaskByRemaining: false } : task
        );
        setTask(updatedTasks);
        setAllTaskData(updatedTasks);
        localStorage.setItem('notes', JSON.stringify(updatedTasks));
    }

    const showTaskByRemainingFunction = () => {
        filterTask()
        taskRefs.current.map(taskRef => 
            taskRef.classList[1] !== 'yesShowTaskByRemaining' ? taskRef.style.display = 'none' : taskRef.style.display = 'table-row' 
        )
    }

    const showTaskByCompleteFunction = () => {
        filterTask()
        taskRefs.current.map(taskRef => 
            taskRef.classList[1] === 'completed' ? taskRef.style.display = 'table-row' : taskRef.style.display = 'none' 
        )
    }

    const showAllTaskFunction = () => {
        filterTask()
        taskRefs.current.map(taskRef => 
            taskRef.classList[1] === 'completed' || taskRef.classList[1] === 'yesShowTaskByRemaining' ? taskRef.style.display = 'table-row' : taskRef.style.display = 'table-row'
        )
        console.log(taskRefs)
    }

    // const filterTaskByPriority = () => {

    // }

    useEffect(()=>{
        // console.log(filterTaskByWhichPriority)
        if(filterTaskByWhichPriority === 'high'){
            taskRefs.current.map(taskRef =>
                taskRef.classList[2] === 'yesShowTaskByHighPriority' || taskRef.classList[3] === 'yesShowTaskByHighPriority' ? taskRef.style.display = 'table-row' : taskRef.style.display = 'none'
            )
        }
        else if(filterTaskByWhichPriority === 'medium'){
            taskRefs.current.map(taskRef =>
                taskRef.classList[2] === 'yesShowTaskByMediumPriority' || taskRef.classList[3] === 'yesShowTaskByMediumPriority' ? taskRef.style.display = 'table-row' : taskRef.style.display = 'none'
            )
        }
        else if(filterTaskByWhichPriority === 'low'){
            taskRefs.current.map(taskRef =>
                taskRef.classList[2] === 'yesShowTaskByLowPriority' || taskRef.classList[3] === 'yesShowTaskByLowPriority' ? taskRef.style.display = 'table-row' : taskRef.style.display = 'none'
            )
        }
        else if(filterTaskByWhichPriority === 'all'){
            taskRefs.current.map(taskRef=>
                taskRef.style.display = 'table-row'
            )
        }
    }, [filterTaskByWhichPriority])

    return (
        <div>
            <div className="container">
                <header>
                    <h1>To-Do List</h1>
                    <p className="subheading">Manage your tasks efficiently</p>
                </header>

                <div className="main-content">
                    <div className="task-Form">
                        <h2>Add New Task</h2>
                        <div className="input-group">
                            <label htmlFor="taskDescription">Description:</label>
                            <input onChange={(e) => { setTaskDescription(e.target.value) }} type="text" id="taskDescription" placeholder="Enter task description..." required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="dueDate">Due Date:</label>
                            <input onChange={(e) => { setTaskDueDate(e.target.value)}} type="date" id="dueDate" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="priority">Priority:</label>
                            <select onChange={(e) => { setTaskPriority(e.target.value) }} id="priority" required>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <button onClick={addTask} className="add-task-btn">Add Task</button>
                    </div>

                    <div className="filter-sidebar">
                        <h2>Filter</h2>
                        <ul>
                            <li><button className="filter-btn" onClick={showAllTaskFunction} data-filter="all">All Tasks</button></li>
                            <li><button className="filter-btn" onClick={showTaskByCompleteFunction} data-filter="completed">Completed</button></li>
                            <li><button className="filter-btn" onClick={showTaskByRemainingFunction} data-filter="remaining">Remaining</button></li>
                            <li>
                                <label htmlFor="filterPriority">By Priority:</label>
                                <select onChange={(e) => { setFilterTaskByWhichPriority(e.target.value)}} id="filterPriority">
                                    <option value="all">All</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </li>
                        </ul>
                    </div>

                    <div className="task-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Due Date</th>
                                    <th>Priority</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allTaskData.map((task, index) => (
                                        <tr ref={el => taskRefs.current[index] = el} key={task.taskey} className={`task-row ${task.taskComplete ? 'completed' : ''} ${task.showTaskByComplete ? 'yesShowTaskByComplete' : ''} ${task.showTaskByRemaining ? 'yesShowTaskByRemaining' : ''} ${task.taskPriority === 'medium' ? 'yesShowTaskByMediumPriority' : '' || task.taskPriority === 'low' ? 'yesShowTaskByLowPriority' : '' || task.taskPriority === 'high' ? 'yesShowTaskByHighPriority' : ''}`}>
                                            
                                            <td>{task.taskDescription}</td>
                                            <td>{task.taskDueDate}</td>
                                            <td>{task.taskPriority}</td>
                                            <td>
                                                <button onClick={()=>completeTask(task.taskey)} className="complete-btn">Complete</button>
                                                <button onClick={()=>deleteTask(task.taskey)} className="delete-btn">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}