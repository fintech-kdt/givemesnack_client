import { FormEvent, useEffect, useState } from "react";
import "./App.css";

interface Snack {
  id: number;
  name: string;
  createdAt: string;
}

function App() {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [newSnack, setNewSnack] = useState("");
  const url = import.meta.env.VITE_API_URL || "http://localhost:8100";
  useEffect(() => {
    fetch(`${url}/api/snacks`)
      .then((res) => res.json())
      .then(setSnacks);
  }, [url]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch(`${url}/api/snacks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSnack }),
    })
      .then((res) => res.json())
      .then((snack: Snack) => {
        setSnacks([...snacks, snack]);
        setNewSnack("");
      });
  };
  return (
    <>
      <ul>
        {snacks.map((snack) => (
          <li key={snack.id} style={{ margin: 12 }}>
            <span style={{ paddingRight: 24 }}>{snack.name}</span>
            <button
              onClick={() => {
                fetch(`${url}/api/snacks/${snack.id}`, {
                  method: "DELETE",
                }).then(() => {
                  setSnacks(snacks.filter((s) => s.id !== snack.id));
                });
              }}
            >
              먹었어요!
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={{ margin: 12 }}>
        <input
          style={{ marginRight: 12 }}
          type="text"
          value={newSnack}
          onChange={(e) => setNewSnack(e.target.value)}
        />
        <button type="submit">사주세요!</button>
      </form>
    </>
  );
}

export default App;
