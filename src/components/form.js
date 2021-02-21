import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import '../App.css'

export default function Form() {

    const initialFormState = {
        name: "",
        size: "",
        sauce: "",
        pepperoni: false,
        sausage: false,
        chicken: false,
        peppers: false,
        pineapple: false,
        special: "",
    };

    const [post, setPost] = useState([]);

    const [serverError, setServerError] = useState("");

    const [formState, setFormState] = useState(initialFormState);

    const [isBtnDis, setIsBtnDis] = useState(true);

    const [errors, setErrors] = useState(initialFormState);

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is required!").min(3, "Name but be at least 3 characters."),
        size: yup.string().required("Please choose a size."),
        sauce: yup.string().required("Please select a sauce."),
        pepperoni: yup.string(),
        sausage: yup.string(),
        chicken: yup.string(),
        peppers: yup.string(),
        pineapple: yup.string(),
        special: yup.string()
    });

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({ ...errors, [e.target.name]: ""});
            })
            .catch(err => {
                console.log("ERROR!", err);
                setErrors({ ...errors, [e.target.name]: err.console.errors[0]});
            });
    };

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            console.log("valid?", valid);
            setIsBtnDis(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                setPost(response.data);
                setFormState({
                    name: "",
                    size: "",
                    sauce: "",
                    pepperoni: false,
                    sausage: false,
                    chicken: false,
                    peppers: false,
                    pineapple: false,
                    special: "",
                });
                setServerError(null);
            })
            .catch(err => console.log(err.response));
    };

    const inputChange = e => {
        e.persist();

        const newFormData = {
            ...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        setFormState(newFormData);
    };

    return (
        <form onSubmit = {formSubmit}>
            {serverError ? <p className="error">{serverError}</p> : null}
            <label htmlFor="name">
                What is your name?
                <textarea name="name" onChange={inputChange} value={formState.name} data-cy="name" />
            </label>

            <label htmlFor="size">
                Size:
                <select id="size" name="size" onChange={inputChange}>
                    <option value="">--Please Select A Size--</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
                {errors.size.length > 0 ? (<p className="error">{errors.size}</p>) : null}
            </label>

            <label htmlFor="sauce">
                Sauce:
                <select id="sauce" name="sauce" onChange={inputChange}>
                    <option value="">--Please Select A Sauce--</option>
                    <option value="Marinara">Marinara</option>
                    <option value="BBQ">BBQ</option>
                </select>
                {errors.sauce.length > 0 ? (<p className="error">{errors.sauce}</p>) : null}
            </label>

            <div className="toppings">
                <h2>Toppings</h2>
                <label htmlFor="pepperoni">
                    Pepperoni
                    <input 
                        type="checkbox"
                        name="pepperoni"
                        checked={formState.pepperoni}
                        onChange={inputChange}
                    />    
                </label>

                <label htmlFor="sausage">
                    Sausage
                    <input  
                        type="checkbox"
                        name="sausage"
                        checked={formState.sausage}
                        onChange={inputChange}
                    />
                </label>

                <label htmlFor="chicken">
                    Chicken
                    <input 
                        type="checkbox"
                        name="chicken"
                        checked={formState.chicken}
                        onChange={inputChange}
                    />
                </label>

                <label htmlFor="peppers">
                    Peppers
                    <input 
                        type="checkbox"
                        name="peppers"
                        checked={formState.peppers}
                        onChange={inputChange}
                    />
                </label>

                <label htmlFor="pineapple">
                    Pineapple
                    <input
                        type="checkbox"
                        name="pineapple"
                        checked={formState.pineapple}
                        onChange={inputChange}
                    />
                </label>
            </div>

            <label htmlFor="special">
                Special Instructions:
                <textarea  
                    name="special"
                    onChange={inputChange}
                    value={formState.special}
                />
            </label>

            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={isBtnDis} type="submit">Place Order</button>
        </form>
    )
}

// export default Form;