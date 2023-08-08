// This code is inspired by the Tutorial by Web Dev Simplified - https://www.youtube.com/watch?v=bAJlYgeovlg
import React, {useState } from 'react';
import styles from "./select.module.css"


// A type to support the value option
type SelectOption = {
    label: string
    value: number;
}

// Object type representing properties used to pass data and functions into React component
type SelectProps ={
 options: SelectOption[] // Options is an array of SelectOptions
 value?: SelectOption // Value is a single SelectOption. The question mark reprents the value as an optional field.
 onChange: (value: SelectOption | undefined) => void // onChange is a function that passes in a value. It can either be an option or undefined.Void function returns nothing
}

export function Select({ value, onChange, options }: SelectProps) {
    // State variable to control the dropdown open/close state
    const [isOpen, setIsOpen] = useState(false)

    function clearOptions() {
        // Clear the dropdown contents
        onChange(undefined)
    }

    function selectOption(option: SelectOption) {
        onChange(option)
    }
        // Wrapper for the entire component using styles from select.module.css
    return (
        <div 
        // when item loses focus
        onBlur={() => setIsOpen(false)}
        //toggle the drop down on click
            onClick={() => setIsOpen(prev => !prev)}
            // add keyboard focus for accessibility
            tabIndex={0} 
            // use styles
            className={styles.container}
        >
          <span className={styles.value}>{value?.label}</span>
          <button onClick ={e => {
            // Prevent events bubbling up the DOM
            e.stopPropagation()
            clearOptions()
          }} 
            className={styles["clear-btn"]}
            >
                &times;
            </button>
          <div className={styles.divider}></div>
          <div className={styles.caret}></div>
          <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
            {options.map(option => (
                <li 
                    onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }} 
                    key={option.label} 
                    className={styles.option}
                >
                    {option.label}
                </li>
            ))}
          </ul>
        </div>
    )
}