import React, { useEffect, useState } from "react";
import styles from "./LoginStyle.module.scss";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
// import Swal from "sweetalert2";
// import { userStore } from "../zustand/store";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
// import { authAPI } from "../service/auth";
import { RotatingLines } from "react-loader-spinner";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormSignUpMaxSize from "../components/login/FormSignUpMaxSize";
import FormSignInMaxSize from "../components/login/FormSignInMaxSize";
import FormForgot from "../components/login/FormForgot";
import FormSignUpMinSize from "../components/login/FormSignUpMinSize";
import FormLoginAndForgorMinSize from "../components/login/FormLoginAndForgorMinSize";


const LoginPage = () => {
    const nav = useNavigate();

    const [signIn, setSignIn] = useState(true);
    const responsive = useMediaQuery({ minWidth: 770 });

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(true);

    const [showForgot, setShowForgot] = useState(false);
    // console.log('signIn: ', signIn);


    const signUpValidationSchema = Yup.object().shape({
        name: Yup.string().required('Vui lòng nhập tên người dùng!'),
        fullName: Yup.string().required('Vui lòng nhập tên đầy đủ!'),
        phoneNumber: Yup.string()
            .matches(/^\d{10,11}$/, 'Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)!')
            .required('Vui lòng nhập số điện thoại!'),
        mail: Yup.string().email('Vui lòng nhập email hợp lệ!').required('Vui lòng nhập email!'),
        pass: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự!').required('Mật khẩu không được để trống!'),
        // otp: Yup.string().length(6, 'OTP phải có 6 ký tự!'),
    });

    const loginValidationSchema = Yup.object({
        mail: Yup.string()
            .email('Email không hợp lệ')
            .required('Vui lòng nhập email'),
        password: Yup.string()
            .required('Vui lòng nhập mật khẩu'),
    });

    const forgotValidationSchema = Yup.object({
        mail: Yup.string()
            .email('Email không hợp lệ')
            .required('Vui lòng nhập email')
    })

    // Form Sign In
    const { register: registerSignIn, handleSubmit: handleSubmitSignIn, formState: { errors: errorsSignIn } } = useForm({
        resolver: yupResolver(loginValidationSchema),
    });

    // Form Sign Up
    const { register: registerSignUp, handleSubmit: handleSubmitSignUp, formState: { errors: errorsSignUp } } = useForm({
        resolver: yupResolver(signUpValidationSchema),
    });

    // Form Forgot Password
    const { register: registerForgot, handleSubmit: handleSubmitForgot, formState: { errors: errorsForgot } } = useForm({
        resolver: yupResolver(forgotValidationSchema),
    });


    const onError = (errors) => {
        console.log(errors);

        Object.keys(errors).forEach((field) => {

            toast.error(errors[field]?.message);
        });
    }






    useEffect(() => {
        setTimeOut(() => { setLoading(false) }, 2000);
    }, [])



    // const handleChange = (e) => setValue(e.target.value);
    const [timeOut, setTimeOut] = useState(0);
    const [showFormOTP, setShowFromOTP] = useState(false);

    useEffect(() => {
        if (timeOut === 0) return;

        const intervalId = setInterval(() => {
            setTimeOut((prevTime) => prevTime - 1);
        }, 1000);

        // Cleanup interval khi component unmount hoặc khi thời gian hết
        return () => clearInterval(intervalId);
    }, [timeOut]);

    // Chuyển đổi thời gian thành định dạng "mm:ss"
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };


    const onSubmit = (data) => {
        if (signIn) {
            if (showForgot) {
                // Logic xử lý gửi OTP khi quên mật khẩu
                handleSendOTP();
            } else {
                // Logic xử lý đăng nhập
                nav('/')
            }
        } else {
            // Logic xử lý đăng ký
            handleSendOTP()
        }
        // alert('hello')
    };

    const handleSendOTP = () => {
        setShowFromOTP(true);
        setTimeOut(120);
    }

    const handleSignUp = async () => {

    }

    return (
        <div className="j_center fullBox bg-light">
            {!loading ? (
                <>
                    <div className={styles.container} style={{ overflow: `${responsive ? 'visible' : 'hidden'}` }}>
                        {/* Sign Up Container */}
                        {responsive ? (
                            <>

                                <FormSignUpMaxSize errors={errorsSignUp} handleSubmit={handleSubmitSignUp} register={registerSignUp} onError={onError} onSubmit={onSubmit} signIn={signIn} />

                                {/*  */}
                                <FormSignInMaxSize errors={errorsSignIn} handleSubmit={handleSubmitSignIn} register={registerSignIn} onError={onError} onSubmit={onSubmit} signIn={signIn} setShowForgot={setShowForgot} showForgot={showForgot} />
                                {/* forgot */}
                                <FormForgot errors={errorsForgot} handleSubmit={handleSubmitForgot} onError={onError} register={registerForgot} onSubmit={onSubmit} showForgot={showForgot} setShowForgot={setShowForgot} signIn={signIn} />
                            </>
                        ) : (
                            <div>
                                <FormSignUpMinSize errors={errorsSignUp} handleSubmit={handleSubmitSignUp} register={registerSignUp} onError={onError} onSubmit={onSubmit} signIn={signIn} setSignIn={setSignIn} />

                                {
                                    showForgot ? (
                                        <FormLoginAndForgorMinSize errors={errorsForgot} handleSubmit={handleSubmitForgot} onError={onError} onSubmit={onSubmit} register={registerForgot} setShowForgot={setShowForgot} setSignIn={setSignIn} showForgot={showForgot} signIn={signIn} />
                                    ) : (
                                        <FormLoginAndForgorMinSize errors={errorsSignIn} handleSubmit={handleSubmitSignIn} onError={onError} onSubmit={onSubmit} register={registerSignIn} setShowForgot={setShowForgot} setSignIn={setSignIn} showForgot={showForgot} signIn={signIn} />
                                    )
                                }


                            </div>
                        )}

                        {responsive && (
                            <div
                                className={`${styles.overlayContainer} ${signIn ? "" : styles.overlayContainerActive
                                    }`}
                            >
                                <div
                                    className={`${styles.overlay} ${signIn ? "" : styles.overlayActive
                                        }`}
                                >
                                    <div
                                        className={`${styles.leftOverlayPanel} ${signIn ? "" : styles.leftOverlayPanelActive
                                            }`}
                                    >
                                        <h1 className={styles.title}>Welcome Back!</h1>
                                        <p className={styles.paragraph}>
                                            To keep connected with us please login with your personal
                                            info
                                        </p>
                                        <button
                                            className={clsx(
                                                "btn btn-outline-light",
                                                styles.ghostButton,

                                            )}
                                            onClick={() => setSignIn(true)}
                                        >
                                            Sign In
                                        </button>
                                    </div>

                                    <div
                                        className={`${styles.rightOverlayPanel} ${signIn ? "" : styles.rightOverlayPanelActive
                                            }`}
                                    >
                                        <h1 className={styles.title}>Hello, Friend!</h1>
                                        <p className={styles.paragraph}>
                                            Enter your personal details and start your journey with us
                                        </p>
                                        <button
                                            className={clsx(
                                                styles.ghostButton,
                                                "btn btn-outline-light"
                                            )}
                                            onClick={() => setSignIn(false)}
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <ToastContainer style={{ width: "200px", height: "100px" }} />
                    {showFormOTP && (
                        <div className={clsx(styles.optContainer)}>
                            <div className={clsx(styles.contentOTP)}>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => (
                                        <input {...props} className={clsx(styles.otpInput)} />
                                    )}
                                />
                                <div className="mt-4 fw-semibold">
                                    {timeOut != 0 ? (
                                        <p>Thời gian hết hạn otp: {formatTime(timeOut)}</p>
                                    ) : (
                                        <p
                                            className="text-decoration-underline no_click"
                                            onClick={() => { setTimeOut(20) }}
                                        >
                                            Gửi lại otp
                                        </p>
                                    )}
                                </div>
                                <Button className="mt-5"
                                    onClick={handleSignUp}
                                >
                                    Send
                                </Button>
                                <button
                                    className=" btn no_click "
                                    style={{ position: "absolute", top: "20px", left: "20px" }}
                                    onClick={() => {
                                        setShowFromOTP(false);
                                    }}
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faX} size="lg" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </>
            )}
        </div>
    );
};

export default LoginPage;
