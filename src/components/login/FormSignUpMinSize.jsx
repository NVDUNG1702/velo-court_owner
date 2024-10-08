import React from 'react'
import InputField from './InputField_component';
import styles from '../../pages/LoginStyle.module.scss'
const FormSignUpMinSize = ({ register, errors, onSubmit, onError, signIn, handleSubmit, setSignIn, }) => {
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

export default FormSignUpMinSize