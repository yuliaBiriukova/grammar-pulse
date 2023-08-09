import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {loginUserAsync} from "./authApi";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {login, selectIsAuthorized} from "./authSlice";

export const LoginPage = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthorized) {
            navigate('/');
        }
    }, [isAuthorized]);

    const handleOnSuccess = async (credentialResponse: CredentialResponse) => {
        let userToken = credentialResponse.credential as string;
        localStorage.setItem('userToken', userToken);
        await loginUserAsync();
        dispatch(login());
        navigate("/");
    }

    return (
        <div className="container d-flex-column">
            <div className='center-container'>
                <h2 className='title mb-0'>Log in to your account</h2>
                <p className='mt-3 mb-3 text-align-center'>By logging in you get an opportunity to practice topics by completing exercises.</p>
                <GoogleLogin
                    onSuccess= {handleOnSuccess}
                    onError={() => {
                        console.log('Login failed!');
                    }}
                />
            </div>
        </div>
    );
}