import styles from './Task.module.css';
import { Check, Trash } from 'lucide-react';
import { ITask } from '../../App';

interface TaskProps {
  data: ITask;
  onDeleteTask: (id: number) => void;
  onToggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void;
}

export function Task({ data, onDeleteTask, onToggleTaskStatus }: TaskProps) {
  const checkBoxClassName = data.isComplete
    ? styles['checked']
    : styles['uncheck'];
  const taskTextClassName = data.isComplete
    ? styles['text-checked']
    : styles['text-uncheck'];

  function handleDeleteTask() {
    onDeleteTask(data.id);
  }

  function handleToggleTaskStatus() {
    onToggleTaskStatus({ id: data.id, value: !data.isComplete });
  }

  return (
    <div className={styles.task}>
      <span className={checkBoxClassName} onClick={handleToggleTaskStatus}>
        {data.isComplete && <Check size={14} />}
      </span>
      <p className={taskTextClassName}>{data.content}</p>
      <button className={styles.delete} onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </div>
  );
}
