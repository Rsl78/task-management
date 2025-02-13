import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to learn React such than I can treat it like my slave and make it do whatever I want to do",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] =useState(null);

  function handleAddEditTask( newTask, isAdd) {
    // console.log("adding task...", newTask);
    if(isAdd){
      setTasks([...tasks,newTask])
    }else{
      setTasks(tasks.map(task => {
        if(task.id === newTask.id){
          return newTask;
        }
        return task;
      }))
    }
    setShowAddModal(false)
  }

  function handleEditTask(task){
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleCloseClick (){
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleDeleteTask(taskID){
    const taskAfterDelete = tasks.filter(task => task.id !== taskID);
    setTasks(taskAfterDelete);
  }

  function handleDeleteAllClick(){
    tasks.length =0;
    setTasks([...tasks])
  }

  function handleFavorite(taskId){
    const taskIndex = tasks.findIndex(task => task.id === taskId)

    const newTasks = [...tasks];
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  }

  function handleSearch(searchTerm){
    console.log(searchTerm)

    const filtered = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

    setTasks([...filtered])
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        {/* <!-- Search Box --> */}
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />

          {tasks.length> 0 ? <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onFav={handleFavorite}
          /> : <NoTaskFound/> }
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
