//import Library
import React from "react"
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import MUI
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

//import Pages
import Main from "./Main";
import Signup from "./Signup";

//import elements
import { Button, Grid, Input, Image, Text } from "../elements"
//import Icon
//impot Component
//import Actions
//import axios


//43268aa6f88af6282a341e3b61b9a761
import instance from "../shared/Request";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state=>state.user);

    const handleSubmit = (event) => {
        
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        
        const userInfo = {
            username: data.get('loginID'),
            password: data.get('password'),
        };

        console.log(userInfo);


        
    };

    return (
        <Grid wrap>
            <Grid is_flex alignItems="center" flexDirection="column" border="1px solid black" height="90px" width="320px">
                <Text fontSize="30px" fontWeight="600">로그인</Text>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width : "300px", mt: 1, alignItems: 'center', textAlign: 'center' }}>
                <TextField
                    sx={{height : "40px" ,bgcolor : "white", }}
                    margin="normal"
                    size="small"
                    fullWidth
                    id="loginID"
                    label="ID"
                    name="loginID"
                    // autoComplete="loginID"
                    autoFocus
                    />
                    <TextField
                    sx={{ marginTop:"0px", marginBottom:"0px" ,height : "40px",bgcolor : "white"}}
                    margin="normal"
                    size="small"
                    //required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="password"
                    // autoComplete="current-password"
                    />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ color : 'white' ,bgcolor : 'primary.button', mt: 3, mb: 2 }}
                    >
                    가입
                    </Button></Box>
                
                <Grid margin="10px"><Button onClick={()=>window.location.assign('https://kauth.kakao.com/oauth/authorize?client_id=43268aa6f88af6282a341e3b61b9a761&redirect_uri=http://localhost:3000/login/kakaoLogin&response_type=code')}>카카오 계정 로그인</Button></Grid>
                <Grid margin="10px">Signin with Google</Grid>
                <Text>회원이 아니신가요?</Text>
                <Button>회원가입</Button>
                <Copyright/>
            </Grid>

        </Grid>
    );
}
export default Login;