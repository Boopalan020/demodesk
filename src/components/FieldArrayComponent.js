import { Field, FieldArray, Form, Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'

function FieldArrayComponent() {

    const initialValues = {
        Company : "Initial Company 1",
        salary : [
            { firstmonth : "10000", LastMonth : "15000" }
        ],
        entire_month : ''
    }

    const calcValue = (values, setFieldValue) => {
        

        let fullfirstmonth = 0
        for (let i = 0; i < values.salary.length; i++) {
            fullfirstmonth += parseInt(values.salary[i].firstmonth)
        }

        console.log(fullfirstmonth)
        setFieldValue('entire_month', String(fullfirstmonth) )
        // console.log(values)
    }

    const onremovedata = (remove, length, values, setFieldValue) => {
        remove(length-1)

        let fullfirstmonth = 0
        for (let i = 0; i < length-1 ; i++) {
            fullfirstmonth += parseInt(values.salary[i].firstmonth)
        }

        console.log(fullfirstmonth)
        setFieldValue('entire_month', String(fullfirstmonth) )
    }

    return (
        <div>
            <Formik
                initialValues = { initialValues }
                onSubmit = {(values) => { console.log('Formik Values', values) }}
            >
            {(formik) => (
                <Form>
                    <FieldArray name = 'salary' >
                    {
                        (fieldArrayprops) => {
                            console.log(fieldArrayprops)
                            const { form, push, remove } = fieldArrayprops
                            const { values } = form
                            const { salary } = values
                            return (
                                <div>
                                {
                                    salary.map((obj, index) => (
                                        <div key = { index }>
                                            <h3>Person {index + 1} </h3>
                                            
                                            <Field name = {`salary[${index}].firstmonth` } onBlur = {() => calcValue(form.values, form.setFieldValue) } /><br></br><br></br>
                                            <Field name = { `salary[${index}].LastMonth` } onBlur = {() => calcValue(form.values, form.setFieldValue) } />
                                        </div>
                                    ))
                                }
                                <br></br>
                                {/* remove(form.values.salary.length-1) */}
                                <button type='button' onClick={() => onremovedata(remove, form.values.salary.length, form.values, form.setFieldValue)}>-</button>
                                <button type='button' onClick={() => push({firstmonth : '', LastMonth : ''})} >+</button>
                                </div>
                            )
                        }
                    }
                    </FieldArray>
                    
                    <h2>
                        Fullsalary : {
                            formik.values.entire_month
                        }
                    </h2>

                    <Field name = 'entire_month' >
                    {
                        (props) => {
                            console.log(props)
                            const { field } = props
                            return ( 
                                <input type="text" { ...field } name = "entire_month"/>
                             )
                        }
                    }
                    </Field>
                    <br></br>

                    <button type="submit">Submit</button>
                </Form>
            )}
            </Formik>
            <Link to='/memotable'>
                    Go to memotable
            </Link>
        </div>
    )
}

export default FieldArrayComponent
