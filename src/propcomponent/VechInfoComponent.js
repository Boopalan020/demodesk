import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Container, TextField } from '@material-ui/core'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'

function VechInfoComponent() {

    const initialValues = {
        vehicle_no : '',
        from_date : '',
        to_date : '',
        driver_name : '',
        cleaner_name : ''
    }

    const validationSchema = yup.object({
        vehicle_no: yup
            .string()
            .matches(
                /^[a-z]{2}\s[0-9]{2}\s[a-z]{1,2}\s[0-9]{4}$/i,
                "Ex : TN 00 AB 1234"
            )
            .required("Required")
    })

    return (
        <Container maxWidth="md" >
            <Row style={{textAlign: "center"}}>
                <Col md = {12}>
                    <h4>Vechicle information component</h4>
                </Col>
            </Row>

            <Row style={{textAlign: "center"}}>
                <Col sm>
                    <Formik
                        initialValues = { initialValues }
                        validationSchema = { validationSchema }
                        onSubmit = {(values) => console.log(values)}
                    >
                    {
                        (formik) => (
                            <Form>
                                <Inputs name = "vehicle_no" label = "Vehicle No" />
                            </Form>
                        )
                    }
                    </Formik>
                </Col>
            </Row>
        </Container>
    )
}

export default VechInfoComponent

function Inputs(props){

    const { label, name, ...rest } = props
    return (
        <div>
            <Field name = {name} {...rest}>
            {
                (fieldprops) => {

                    const { field, meta } = fieldprops
                    return (
                        <div>
                            <TextField 
                                size="small" 
                                name = {name} 
                                label = { label } 
                                variant="outlined" 
                                {...field} 
                                error = { Boolean(meta.touched && meta.error) }
                                helperText={ <ErrorMessage name = {name} /> }
                            />
                        </div>
                    )
            }}
            </Field>
        </div>    
    )
}
