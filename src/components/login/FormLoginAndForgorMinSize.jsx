import React from 'react'
import styles from '../../pages/LoginStyle.module.scss'
import InputField from './InputField_component';
import clsx from 'clsx';

const FormLoginAndForgorMinSize = ({ signIn, showForgot, handleSubmit, onSubmit, onError, register, errors, setShowForgot, setSignIn }) => {
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

export default FormLoginAndForgorMinSize