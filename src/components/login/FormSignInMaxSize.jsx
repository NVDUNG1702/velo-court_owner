
import styles from '../../pages/LoginStyle.module.scss'
import React from 'react'
import InputField from './InputField_component'
import clsx from 'clsx'

const FormSignInMaxSize = ({ register, errors, onSubmit, onError, signIn, handleSubmit, showForgot, setShowForgot }) => {
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

export default FormSignInMaxSize