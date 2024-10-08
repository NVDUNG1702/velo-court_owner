import React from 'react'


const InputField = ({ label, name, register, errors, type }) => {
    return (
        <div className="w-100">
            <input placeholder={label} name={name} type={type ? type : 'text'} {...register(name)} className={clsx(styles.input)} />
        </div>
    );
};

export default InputField;