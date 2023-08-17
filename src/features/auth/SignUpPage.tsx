import React, {useEffect} from "react";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {login, selectIsAuthorized} from "./authSlice";

export const SignUpPage = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthorized) {
            navigate('/');
        }
    }, [isAuthorized]);

    const handleOnSuccess = async (credentialResponse: CredentialResponse) => {
        let accessToken = credentialResponse.credential as string;
        await dispatch(login(accessToken));
        document.location.reload();
        navigate("/");
    }

    return (
        <div className="container d-flex-column">
            <div className='center-container'>
                <h2 className='title mb-0'>Create new account</h2>
                <p className='mt-3 mb-3 text-align-center'>By creating an account you get an opportunity to practice topics by completing exercises.</p>
                <GoogleLogin
                    onSuccess={handleOnSuccess}
                    text="signup_with"
                    onError={() => {
                        console.log('Sign up failed!');
                    }}
                />
            </div>

        </div>
    );
}