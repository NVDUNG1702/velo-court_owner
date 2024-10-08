import styles from '../../pages/LoginStyle.module.scss'
import React from 'react'
import InputField from './InputField_component'

const FormSignUpMaxSize = ({ register, errors, onSubmit, onError, signIn, handleSubmit }) => {
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

export default FormSignUpMaxSize