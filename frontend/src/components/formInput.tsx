import React from "react";

interface FormInputProps {
  name: string;
  label: string;
  placeholder:string;
  type?:string
}

const FormInput: React.FC<FormInputProps> = ({ name, label,placeholder,type }) => {
  return (
    <>
      <label> {label}</label>
      <input className="transition-all bg-white duration-[0.2s] border-1 ring-0 border-gray-300 rounded p-2 hover:ring-2 " name={name} type={type} placeholder={placeholder} />
    </>
  );
};

export default FormInput;
