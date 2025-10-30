import { useState } from 'react';
import {
  useListTasksQuery,
  useAddTaskMutation,
  useToggleTaskMutation,
  useDeleteTaskMutation
} from './tasksApi';

export default function App() {
  const { data: tasks, isLoading, isError } = useListTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [toggleTask] = useToggleTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [title, setTitle] = useState('');

  const onAdd = async () => {
    if (!title.trim()) return;
    await addTask({ title }).unwrap();
    setTitle('');
  };

  if (isLoading) return <p style={{ padding: 16 }}>Loading…</p>;
  if (isError)   return <p style={{ padding: 16, color: 'crimson' }}>Failed to load.</p>;

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Tasks</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title…"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={onAdd}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
        {tasks?.map(t => (
          <li key={t.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask({ id: t.id, completed: !t.completed })}
            />
            <span style={{ textDecoration: t.completed ? 'line-through' : 'none', flex: 1 }}>
              {t.title}
            </span>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
















// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
