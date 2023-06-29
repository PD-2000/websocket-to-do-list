import React, {useState} from 'react';
import styles from './AddTaskForm.module.scss';
import Button from '../Button/Button';
import shortid from 'shortid';

const AddTaskForm = ({socket, addTask}) => {
  const [taskName, setTaskName] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    const task = {id: shortid(), name: taskName};
    addTask(task);
    setTaskName('');
  };

  return (
    <form id="add-task-form" onSubmit={submitForm}>
      <input
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
        className={styles.textInput}
        autocomplete="off"
        type="text"
        placeholder="Type your description"
        id="task-name"
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddTaskForm;