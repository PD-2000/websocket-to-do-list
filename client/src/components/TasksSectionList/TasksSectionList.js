import React from 'react';
import styles from './TasksSectionList.module.scss';
import Button from '../Button/Button';

const TasksSection = ({tasks, removeTask}) => {
  return (
    <ul className={styles.list} id="tasks-list">
      {tasks.map((task) => (
        <li key={task.id} className={styles.task}>
          {task.name}
          <Button onClick={() => removeTask(task.id)} btnRed>
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default TasksSection;