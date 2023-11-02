import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthService, UserService } from '../services';
import { authenticate } from '../store/slices/auth';
import { useAppDispatch } from '../store/hooks';

const SigninSchema = Yup.object().shape({
    email: Yup.string()
    .email('Debe ser un email valido')
    .required('NEmail requerido'),
    password: Yup.string()
    .required('Contraseña requerido')
});


export const Login = () => {

    const dispatch = useAppDispatch();

    const onLogin = (email: string, password: string) => {
        const { message, user, token } = AuthService.onLogin(new UserService(email, password));
        
        console.log({user, token});
    
        if( user && token ){
            dispatch( authenticate({ user, token }) );
            return;
        }

        alert(message);
    }
      

    return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100 min-vh-100'>
        <Formik
        validationSchema={SigninSchema}
        onSubmit={(values) => onLogin(values.email, values.password)}
        initialValues={{
            email: 'freitezabraham@gmail.com',
            password: '1234'
        }}
        >
        {({ handleSubmit, handleChange, values, errors }) => (

            <Form style={{ width: '24rem' }} onSubmit={handleSubmit} data-testid="submit-form">
                <FloatingLabel
                    controlId="floatingEmail"
                    label="Correo Electronico"
                    className="mb-3"
                    
                >
                    <Form.Control 
                        type="email" 
                        placeholder="name@example.com" 
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        data-testid="email"
                        isInvalid={errors.email ? true : false}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                        {errors.email}
                    </Form.Control.Feedback>

                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Contraseña">
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        data-testid="password"
                        isInvalid={errors.password ? true : false}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                        {errors.password}
                    </Form.Control.Feedback>

                </FloatingLabel>

                <Button type="submit" className='mt-3'>Ingresar</Button>
            </Form>
            )}
        </Formik>
    </div>
    )
}
