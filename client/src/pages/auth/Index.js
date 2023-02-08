import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                My Project
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Index() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const password = data.get("password");
        if (!isAuthenticated) {
            if (username === "admin" && password === "admin") {
                const localData = JSON.parse(localStorage.getItem("myProject")) || {};
                localStorage.setItem("myProject", JSON.stringify({ ...localData, isAuthenticated: true }));
                if (!localData.nodes)
                    setIsAuthenticated(true);
                else
                    navigate("/");
            }
            else
                alert("Invalid Credentials");
        }
        else {
            const nodes = [];
            for (let i = 1; i <= Number(data.get("nodes")); i++)
                nodes.push({ label: `Node ${i}` });
            const localData = JSON.parse(localStorage.getItem("myProject")) || {};
            localStorage.setItem("myProject", JSON.stringify({ ...localData, nodes }));
            navigate("/");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            disabled={isAuthenticated}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            disabled={isAuthenticated}
                            autoComplete="current-password"
                        />
                        {isAuthenticated ? <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="nodes"
                            label="Nodes"
                            defaultValue={1}
                            inputProps={{ max: 8, min: 1 }}
                            type="number"
                            id="nodes"
                        /> : null}
                        {/* <FormControlLabel
                            name="remember"
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {!isAuthenticated ? "Sign In" : "Update Nodes"}
                        </Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}