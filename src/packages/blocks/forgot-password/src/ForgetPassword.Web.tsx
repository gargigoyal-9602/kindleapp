import React from "react";
import {
    createStyles,
    withStyles,
    makeStyles,
    Theme,
} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

//Customizable Area Start
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TextInput
} from "react-native";

import { Formik } from "formik";
import { Input } from "react-native-elements";
import * as Yup from "yup";
import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import ForgotPasswordController, { Props } from "./ForgotPasswordController";
import { closeIcon } from './assets'
//Customizable Area End
const styles = {
    mainDiv: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    },
    card: {
        borderRadius: "8px",
        // backgroundColor:"white",
        height: "200px",
        border: "1px solid #e4e8f0"
    },
    root: {
        minWidth: '400px',
        borderRadius: "8px",
        boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    forgotPassword: {
        fontSize: 32,
        fontFamily: "Inter",
        marginTop: 0,
        fontWeight: 600
    },
    button: {
        marginTop: "30px",
        backgroundColor: "#1976d2",
        color: "white",
        // marginLeft:"70px"
        // alignAlign:"center"
        // justifyContent:"center"
        // display:"flex",
        // justContent:"center"
    },
    circle: {
        background: 'white',
        borderRadius: '50%',
        marginTop: '15px',
        width: ' 25px',
        height: '25px',
        display: 'flex', /* or inline-flex */
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

    },
} as any
class ForgotPassword extends ForgotPasswordController {
    constructor(props: Props) {
        super(props);
        //Customizable Area Start
        //Customizable Area End
    }
    handleClickOpen = () => {        this.setState({
            setOpen: true
        })
    }
    handleClose = () => {
        this.setState({
            setOpen: false
        })
    }
    render() {
        const { navigation, classes } = this.props;
        console.log(this.props, "props")

        return (

            <div className={classes.mainDiv}>
                <Button onClick={this.handleClickOpen}>forgot password</Button>

                {/*                 
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <p className={classes.forgotPassword}>Forgot Password</p>
                        <Formik
                            initialValues={{
                                email: "",

                            }}
                            validateOnBlur={false}
                            validationSchema={Yup.object().shape({
                                // email: Yup.string()
                                // .email("Invalid email address")
                                // .required("Please enter an email address"),
                                email: Yup.string()
                                    .required("Email is required"),
                            })}
                            onSubmit={(values) => {
                                console.log(values);
                                // this.goToConfirmationAfterPasswordChange(values);
                                // this.props.nextStep(values);
                            }}
                            render={({
                                values,
                                errors,
                                touched,
                                handleChange,
                                isValid,
                                handleBlur,
                                setFieldTouched,
                                isSubmitting,
                                handleSubmit,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        name="email"
                                        type="email"
                                        size="small"
                                        fullWidth
                                        label="Email"
                                        value={values.email}
                                        variant="outlined"
                                        helperText={
                                            // errors.confirmPassword && touched.confirmPassword
                                            // ? errors.confirmPassword
                                            // : 'Password must have 8 characters'

                                            // errors.password && touched.password ? (
                                            // <Trans>
                                            // NewPasswordController.mustHavePassword
                                            // </Trans>
                                            // ) : (
                                            // <Trans>
                                            // NewPasswordController.passwordIsRequired
                                            // </Trans>
                                            // )
                                            <span style={{ color: "red" }}>
                                                {errors.email}
                                            </span>
                                        }
                                        // error={
                                        // touched.confirmPassword && errors.confirmPassword
                                        // ? true
                                        // : false
                                        // }
                                        error={
                                            errors.email && touched.email
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <CardActions style={{ justifyContent: 'center' }}>

                                        <Button
                                            className={classes.button}
                                            // color="primary"
                                            type="submit"
                                            variant="contained"
                                        >
                                            CONFIRM EMAIL
</Button>

                                    </CardActions>


                                </form>
                            )}
                        />

                    </CardContent>
                </Card> */}


                {/* forgot password modal */}
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title"

                    open={this.state.setOpen}>
                    <DialogTitle id="customized-dialog-title" style={{ height: "35px" }} >
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <p className={classes.forgotPassword}> Forgot password</p>
                            <div className={classes.circle}>
                                <img src={closeIcon} style={{ height: "15px", width: "15px" }} onClick={this.handleClose} />

                            </div>

                        </div>

                    </DialogTitle>
                    <DialogContent style={{ minWidth: '400px' }}>
                        <div style={{ marginTop: "20px" }}>
                            <Formik
                                initialValues={{
                                    email: "",

                                }}
                                validateOnBlur={false}
                                validationSchema={Yup.object().shape({
                                    // email: Yup.string()
                                    // .email("Invalid email address")
                                    // .required("Please enter an email address"),
                                    email: Yup.string()
                                        .required("Email is required"),
                                })}
                                onSubmit={(values) => {
                                    console.log(values);
                                    // this.goToConfirmationAfterPasswordChange(values);
                                    // this.props.nextStep(values);
                                }}
                                render={({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    isValid,
                                    handleBlur,
                                    setFieldTouched,
                                    isSubmitting,
                                    handleSubmit,
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            name="email"
                                            type="email"
                                            size="small"
                                            fullWidth
                                            label="Email"
                                            value={values.email}
                                            variant="outlined"
                                            helperText={
                                                // errors.confirmPassword && touched.confirmPassword
                                                // ? errors.confirmPassword
                                                // : 'Password must have 8 characters'

                                                // errors.password && touched.password ? (
                                                // <Trans>
                                                // NewPasswordController.mustHavePassword
                                                // </Trans>
                                                // ) : (
                                                // <Trans>
                                                // NewPasswordController.passwordIsRequired
                                                // </Trans>
                                                // )
                                                <span style={{ color: "red" }}>
                                                    {errors.email}
                                                </span>
                                            }
                                            // error={
                                            // touched.confirmPassword && errors.confirmPassword
                                            // ? true
                                            // : false
                                            // }
                                            error={
                                                errors.email && touched.email
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <CardActions style={{ justifyContent: 'center' }}>

                                            <Button
                                                className={classes.button}
                                                // color="primary"
                                                type="submit"
                                                variant="contained"
                                            >
                                                CONFIRM EMAIL
</Button>

                                        </CardActions>


                                    </form>
                                )}
                            />

                        </div>

                    </DialogContent>

                </Dialog>

            </div>

        );
    }
}
export default withStyles(styles)(ForgotPassword)
// Customizable Area Start

