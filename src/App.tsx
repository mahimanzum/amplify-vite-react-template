import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './Home';
import Blog from './Blog';
import Todo from './Todo';

const App: React.FC = () => {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <Router>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/todo">Todo</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                        <button onClick={signOut}>Sign out</button>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/todo" element={<Todo />} />
                        <Route path="/blog" element={<Blog />} />
                    </Routes>
                </Router>
            )}
        </Authenticator>
    );
};

export default App;
