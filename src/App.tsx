import styles from "./App.module.css";
import { createSignal, batch, For, Show } from "solid-js";
import { createLocalStore, removeIndex } from "./Utils";

type TodoItem = { title: string; done: boolean };

function App() {
  const [newTitle, setTitle] = createSignal("");
  const [todos, setTodos] = createLocalStore<TodoItem[]>("todos", []);
  const addTodo = (e: SubmitEvent) => {
    e.preventDefault();
    batch(() => {
      setTodos(todos.length, {
        title: newTitle(),
        done: false,
      });
      setTitle("");
    });
  };
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>TodoApp</h1>
        <form method="post" class={styles.inputField} onSubmit={addTodo}>
          <label for="input-task" class={styles.label}>
            New Task
          </label>
          <input
            type="text"
            placeholder="New task"
            name="input-task"
            id="input-task"
            value={newTitle()}
            required
            onInput={(e) => setTitle(e.currentTarget.value)}
            class={styles.input}
          />
          <button type="submit" class={styles.btnPrimary}>
            Add new task
          </button>
        </form>
        <ul class={styles.ul}>
          <Show when={todos}>
            <For each={todos}>
              {(todo, i) => (
                <li class={styles.item}>
                  <span
                    class={
                      todo.done
                        ? `${styles.title} ${styles.task_done}`
                        : styles.title
                    }
                  >
                    {todo.title}
                  </span>
                  <div class={styles.btns}>
                    <button
                      onClick={(e) => setTodos(i(), "done", !todo.done)}
                      class={styles.done}
                    >
                      <Show when={todo.done} fallback={<span>Done</span>}>
                        <span class={styles.done}>Undone</span>
                      </Show>
                    </button>
                    <button
                      class={styles.remove}
                      onClick={() => setTodos((t) => removeIndex(t, i()))}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )}
            </For>
          </Show>
        </ul>
      </header>
    </div>
  );
}

export default App;
