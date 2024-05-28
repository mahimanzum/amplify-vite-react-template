// src/pages/Todo.tsx
import React, { useEffect, useState } from 'react';
import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
}
interface TodoProps {
    user: any;
}
const Todo: React.FC<TodoProps> = ({ user }) => {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    useEffect(() => {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }, []);

    function createTodo() {
        client.models.Todo.create({ content: window.prompt("Todo content") });
    }

    return (
        <main>
            <h1>{user?.signInDetails?.loginId}'s Todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map(todo => (
                    <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
                        {todo.content}
                    </li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br />
                <a href="https://docs.amplify.aws/react/start/quickstart/">Review next step of this tutorial.</a>
            </div>
        </main>
    );
};

export default Todo;
