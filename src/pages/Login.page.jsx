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

const InputField = ({ label, name, register, errors, type }) => {
    return (
        <div className="w-100">
            <input placeholder={label} name={name} type={type ? type : 'text'} {...register(name)} className={clsx(styles.input)} />
        </div>
    );
};

const FormSignUpMax = ({ register, errors, onSubmit, onError, signIn, handleSubmit }) => {
    return (
        <div
            className={`${styles.signUpContainer} ${signIn ? styles.signUpContainerActive : ""
                } `}
        >
            <form className={styles.form}
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <h1 className={styles.title}>Create Account</h1>
                <InputField label="User name" name="name" register={register} errors={errors} />
                <InputField label="Full name" name="fullName" register={register} errors={errors} />
                <InputField label="Phone number" name="phoneNumber" register={register} errors={errors} />
                <InputField label="Email" type={'email'} name="mail" register={register} errors={errors} />
                <InputField label="Password" name="pass" type="password" register={register} errors={errors} />
                <button
                    type="submit"
                    className={styles.button}
                // onClick={handleSignUp}
                >
                    Sign Up
                </button>
            </form>

        </div>
    )
}

const FormSignInMax = ({ register, errors, onSubmit, onError, signIn, handleSubmit, showForgot, setShowForgot }) => {
    return (
        <div
            className={`${styles.signInContainer} ${styles.siginForgot} ${signIn ? "" : styles.signInContainerActive
                } ${!showForgot ? styles.showForgot : styles.hiddenForgot}`}
        >
            <form className={styles.form}
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <h1 className={clsx(styles.title, 'mb-4')}>Sign in</h1>
                <InputField label="Email" name="mail" register={register} errors={errors} />
                <InputField label="Mật khẩu" name="password" type="password" register={register} errors={errors} />
                <a className={styles.anchor}
                    onClick={() => setShowForgot(!showForgot)}
                >
                    Forgot your password?
                </a>
                <button
                    type="submit"
                    className={clsx(styles.button, "bg-primary")}

                >
                    Sign In
                </button>
            </form>
        </div>
    )
}

const FormForgot = ({ signIn, showForgot, handleSubmit, onSubmit, onError, register, errors, setShowForgot }) => {
    return (
        <div
            className={`${styles.signInContainer} ${styles.siginForgot} ${signIn ? "" : styles.signInContainerActive
                } ${showForgot ? styles.showForgot : styles.hiddenForgot} w-50`}
        >
            <form className={styles.form}
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <h1 className={clsx(styles.title, 'mb-4')}>Forgot password</h1>
                <InputField label="Email" name="mail" register={register} errors={errors} />
                {/* <InputField label="Mật khẩu" name="password" type="password" register={register} errors={errors} /> */}
                <a href="#" className={styles.anchor}
                    onClick={() => setShowForgot(!showForgot)}
                >
                    Login now?
                </a>
                <button
                    type="submit"
                    className={clsx(styles.button, "bg-primary")}
                >
                    Send OTP
                </button>
            </form>
        </div>
    )
}

const FormSignUp = ({ register, errors, onSubmit, onError, signIn, handleSubmit, setSignIn, }) => {
    return (
        <div
            className={`${styles.signUpContainer} ${signIn ? styles.signUpContainerActive : ""
                } w-100 ${signIn ? styles.translateX100 : styles.translateX0}`}
        >
            <form className={styles.form}
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <h1 className={styles.title}>Create Account</h1>
                <InputField label="User name" name="name" register={register} errors={errors} />
                <InputField label="Tên đầy đủ" name="fullName" register={register} errors={errors} />
                <InputField label="Số điện thoại" name="phoneNumber" register={register} errors={errors} />
                <InputField label="Email" type={'email'} name="mail" register={register} errors={errors} />
                <InputField label="Mật khẩu" name="pass" type="password" register={register} errors={errors} />
                <span className="mb-3">
                    You have an account,{" "}
                    <span
                        onClick={() => {
                            setSignIn(!signIn);
                        }}
                        className="text-decoration-underline"
                    >
                        login now
                    </span>
                </span>
                <button
                    className={styles.button}
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

const ForrmSignInForgotMinSize = ({ signIn, showForgot, handleSubmit, onSubmit, onError, register, errors, setShowForgot, setSignIn }) => {
    return (
        <div
            className={`${styles.signInContainer} ${signIn ? "" : styles.signInContainerActive
                } w-100 ${!signIn ? styles.translateX100 : styles.translateX0}`}
        >
            <form className={styles.form}
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <h1 className={styles.title}>{!showForgot ? 'SignIn?' : 'Forgot'}</h1>
                <InputField label="Email" type={'email'} name="mail" register={register} errors={errors} />
                {
                    !showForgot && <InputField label="Mật khẩu" name="password" type="password" register={register} errors={errors} />
                }
                <a href="#" className={clsx(styles.anchor, "")}
                    onClick={() => {
                        setShowForgot(!showForgot);
                    }}
                >
                    {!showForgot ? 'Forgot your password?' : 'Login now'}
                </a>
                <div className="j_around w-100 mb-5">
                    <span className="">
                        you don't have acount,{" "}
                        <span
                            onClick={() => {
                                setSignIn(!signIn);
                            }}
                            className="text-decoration-underline"
                        >
                            sign up now
                        </span>
                    </span>

                </div>

                <button
                    type="submit"
                    className={clsx(styles.button, "bg-primary mt-3")}


                >
                    {!showForgot ? 'Login' : 'Send OTP'}
                </button>
            </form>
        </div>
    )
}

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

                                <FormSignUpMax errors={errorsSignUp} handleSubmit={handleSubmitSignUp} register={registerSignUp} onError={onError} onSubmit={onSubmit} signIn={signIn} />

                                {/*  */}
                                <FormSignInMax errors={errorsSignIn} handleSubmit={handleSubmitSignIn} register={registerSignIn} onError={onError} onSubmit={onSubmit} signIn={signIn} setShowForgot={setShowForgot} showForgot={showForgot} />
                                {/* forgot */}
                                <FormForgot errors={errorsForgot} handleSubmit={handleSubmitForgot} onError={onError} register={registerForgot} onSubmit={onSubmit} showForgot={showForgot} setShowForgot={setShowForgot} signIn={signIn} />
                            </>
                        ) : (
                            <div>
                                <FormSignUp errors={errorsSignUp} handleSubmit={handleSubmitSignUp} register={registerSignUp} onError={onError} onSubmit={onSubmit} signIn={signIn} setSignIn={setSignIn} />

                                {
                                    showForgot ? (
                                        <ForrmSignInForgotMinSize errors={errorsForgot} handleSubmit={handleSubmitForgot} onError={onError} onSubmit={onSubmit} register={registerForgot} setShowForgot={setShowForgot} setSignIn={setSignIn} showForgot={showForgot} signIn={signIn} />
                                    ) : (
                                        <ForrmSignInForgotMinSize errors={errorsSignIn} handleSubmit={handleSubmitSignIn} onError={onError} onSubmit={onSubmit} register={registerSignIn} setShowForgot={setShowForgot} setSignIn={setSignIn} showForgot={showForgot} signIn={signIn} />
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
