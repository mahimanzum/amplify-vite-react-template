import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Home from './Home';
import Blog from './Blog';
import Todo from './Todo';
import CodeEditor from './CodeEditor';
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material';

const App: React.FC = () => {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                My App
                            </Typography>
                            <Button color="inherit" component={Link} to="/">
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to="/todo">
                                Todo
                            </Button>
                            <Button color="inherit" component={Link} to="/blog">
                                Blog
                            </Button>
                            <Button color="inherit" component={Link} to="/code-editor">
                                Code Editor
                            </Button>
                            <Button color="inherit" onClick={signOut}>
                                Sign Out
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/todo" element={<Todo user={user} />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/code-editor" element={<CodeEditor />} />
                        </Routes>
                    </Container>
                </Router>
            )}
        </Authenticator>
    );
};

export default App;