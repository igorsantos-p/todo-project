import './App.module.css';
import { PlusCircle } from 'lucide-react';
import { Header } from './Components/Header';
import styles from './App.module.css';
import { Input } from './Components/Input';
import { Button } from './Components/Button';
import { Task } from './Components/List/Task';
import { useEffect, useState } from 'react';
import { Empty } from './Components/Empty';

export interface ITask {
  id: number;
  content: string;
  isComplete: boolean;
}

const dataLocalStorage = JSON.parse(localStorage.getItem('TODOLIST') || '[]');

export function App() {
  const [tasks, setTasks] = useState<ITask[]>(dataLocalStorage);
  const [inputContent, setInputContent] = useState('');

  const totalTasksComplete = tasks.reduce((prevValue, currentValue) => {
    if (currentValue.isComplete) {
      return prevValue + 1;
    }
    return prevValue;
  }, 0);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputContent(event.target.value);
  }

  function handleAddNewTask() {
    if (inputContent === '') {
      return;
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      content: inputContent,
      isComplete: false,
    };

    setTasks((state) => [newTask, ...state]);
    setInputContent('');
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleAddNewTask();
    }
  }

  function deleteTask(id: number) {
    const tasksWithoutDeletedTask = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(tasksWithoutDeletedTask);
  }

  function ToggleTaskStatus({ id, value }: { id: number; value: boolean }) {
    const taskStatusSwapped = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: value };
      }

      return { ...task };
    });
    setTasks(taskStatusSwapped);
  }

  useEffect(() => {
    localStorage.setItem('TODOLIST', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.inputTaskWrapper}>
            <Input
              onChange={handleChange}
              value={inputContent}
              onKeyDown={handleKeyPress}
            />
            <Button onClick={handleAddNewTask}>
              Criar
              <PlusCircle size={16} />
            </Button>
          </div>
          <main>
            <header>
              <p>
                Tarefas criadas<span>{tasks.length}</span>
              </p>
              <p>
                Concluídas
                <span>
                  {tasks.length === 0
                    ? 0
                    : `${totalTasksComplete} de ${tasks.length}`}
                </span>
              </p>
            </header>
            <section>
              {tasks.length !== 0 ? (
                tasks.map((task) => {
                  return (
                    <Task
                      key={task.id}
                      data={task}
                      onDeleteTask={deleteTask}
                      onToggleTaskStatus={ToggleTaskStatus}
                    />
                  );
                })
              ) : (
                <Empty />
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
