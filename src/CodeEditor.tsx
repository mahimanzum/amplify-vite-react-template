import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { Box, Button, Container, Grid, Paper, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        background: {
            default: '#f4f6f8',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: '20px',
                    color: '#333',
                    backgroundColor: '#fff',
                },
            },
        },
    },
});

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState<string>('print("Hello, World!")');
    const [output, setOutput] = useState<string>('');

    const executeCode = async () => {
        try {
            const response = await axios.post('http://localhost:5000/execute', { code });
            setOutput(response.data.output);
        } catch (error) {
            setOutput('Error executing code');
            console.error(error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box my={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>
                                Problem Description
                            </Typography>
                            <Paper elevation={2}>
                                <Typography variant="body1">
                                    Write a function to output the "Hello, World!" message.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>
                                Code Editor
                            </Typography>
                            <Paper elevation={2}>
                                <Editor
                                    height="60vh"
                                    width="30vh"
                                    defaultLanguage="python"
                                    defaultValue={code}
                                    onChange={(value) => setCode(value || '')}
                                    options={{
                                        fontSize: 16,
                                        minimap: { enabled: false },
                                        automaticLayout: true,
                                        scrollBeyondLastLine: false,
                                        theme: 'vs-dark',
                                    }}
                                />
                                <Button variant="contained" color="primary" onClick={executeCode} sx={{ mt: 2 }}>
                                    Run Code
                                </Button>
                            </Paper>
                            <Typography variant="h6" sx={{ mt: 2 }}>Output:</Typography>
                            <Paper elevation={1} sx={{ padding: 2, backgroundColor: '#f5f5f5', minHeight: '50px' }}>
                                <pre>{output}</pre>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default CodeEditor;
