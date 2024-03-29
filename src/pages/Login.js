//import Library
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//import MUI
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


//import elements
import { Button, Grid, Input, Image, Text } from "../elements";


//API
import instance from "../shared/Request";
import { setCookie } from "../shared/Cookie";


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const _user = useSelector((state) => state.user);

    const [loginFail, setLoginFail]=React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userInfo = {
            username: data.get("loginID"),
            password: data.get("password"),
        };


        instance({
            method : "post",
            url : "/user/login",
            data : userInfo,
            headers : {
                "Content-Type": "application/json;charset-UTF-8"
            }
        }).then(res=>{
            const token = res.headers.authorization;
            setCookie('WW_user',token);
            window.location.assign('/');
        }).catch(err =>{
            setLoginFail(true)
        });
        
    }


    return (
        <Grid wrap>
            <Grid
                is_flex
                alignItems="center"
                flexDirection="column"
                margin="150px 0 0 0"
                width="100%"
            >
                <Grid is_flex flexDirection='column' width='300px'>
                    <Grid onClick={()=>{navigate('/')}} cursor='pointer' backgroundColor="#F9FAFB00" is_flex border="0" marginBottom='20px'>
                        <Image backgroundSize='contain' backgroundRepeat='no-repeat' width='200px' height='68px' src="/Logo/Logo_p.png"></Image>
                    </Grid>
                    <Text color='#7E7E7E' fontSize="12px" fontWeight="400">
                        서비스 이용을 위해 로그인 해주세요.
                    </Text>
                </Grid>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        width: "300px",
                        mt: 1,
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <TextField
                        sx={{
                            height: "40px",
                            bgcolor: "white",
                            margin: "30px 0",
                        }}
                        margin="normal"
                        error={loginFail}
                        
                        size="small"
                        fullWidth
                        id="loginID"
                        label="이메일"
                        name="loginID"
                        // autoComplete="loginID"
                        autoFocus
                    />
                    <TextField
                        sx={{
                            marginTop: "0px",
                            marginBottom: "0px",
                            height: "40px",
                            bgcolor: "white",
                        }}
                        error={loginFail}
                        helperText={loginFail?'유효하지 않은 아이디 혹은 비밀번호입니다.':''}
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
                    <Button theme="unfilled" width='100%' height='40px' margin='50px 0 20px 0'>
                        로그인
                    </Button>
                </Box>
                <Grid is_flex alignItems='center' width='80%'>
                    <Grid
                        width="45%"
                        heigh="1px"
                        borderBottom="1px solid gray"/>
                    
                        <Text>또는</Text>
                    
                        <Grid
                        width="45%"
                        heigh="1px"
                        borderBottom="1px solid gray"/>

                    
                </Grid>

                <Grid is_flex flexDirection='column' alignItems='center' margin="10px" width='100%' padding="0 10px 0 10px">
                    <Grid kakao
                        width='300px'
                        height = '40px'
                        borderRadius='5px'
                            onClick={() =>
                            window.location.assign(
                                `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=https://www.wewrite.co.kr/login/kakaoLogin&response_type=code`
                            )
                        }
                    > 
                    </Grid>
                </Grid>
                <Grid is_flex justifyContent="center" alignItems='center' width="100%">
                    <Button
                        border="0px"
                        backgroundColor="#00000000"
                        onClick={() => navigate("/signup")}
                    >
                        회원가입
                    </Button>
                    <Text>|</Text>
                    <Button border="0px" backgroundColor="#00000000">
                        비밀번호 찾기
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default Login;
