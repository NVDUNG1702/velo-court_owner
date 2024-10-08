import React from 'react'
import InputField from './InputField_component'
import styles from '../../pages/LoginStyle.module.scss'
import clsx from 'clsx'

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

export default FormForgot