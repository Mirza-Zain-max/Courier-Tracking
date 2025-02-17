import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Col, Row, Button, Input, Form, message } from 'antd'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {  useNavigate } from 'react-router-dom'
import { Fade } from 'react-awesome-reveal'
import { auth } from '../../Config/firebase'

const Login = () => {
    const navigate = useNavigate()
    const initialState = { email: "", password: "" }
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const handleChange = e => setState({ ...state, [e.target.name]: e.target.value })
    const handleSubmit = e => {
        e.preventDefault();
        let { email, password } = state
        setIsProcessing(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                localStorage.setItem('user-login', true)
                localStorage.setItem('user-uid', user.uid)
                message.success("User is Successfully  Login ")
                navigate('/')
            })
            .catch((user) => {
                message.error("This Account Can't Register")
            })
            .finally(() => {
                setTimeout(()=>{
                    setIsProcessing(false)
                },1000)
            })
    }
    return (
        <main className='auth p-3 p-md-4 p-lg-5'>
            <Fade cascade damping={0.1}>
                <Container>
                    <div className="card p-3 p-md-4 p-lg-4">
                        <Form layout="vertical">
                            <h1 className='mb-4 text-center'>
                                <i>
                                    Login
                                </i>
                            </h1>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="Email" required>
                                        <Input type='email' placeholder='Enter Your Email' name='email' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Password" required>
                                        <Input.Password placeholder='Enter Your Password' name='password' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Button htmlType='submit' onClick={handleSubmit} loading={isProcessing} className='bg-info w-100'>Login</Button>
                                </Col>
                                {/* <Col span={12}>
                                    <Link to='/auth/forgot' className=' my-2 text-center  nav-link'>Forgot Password</Link>
                                </Col>
                                <Col span={12}>
                                    <Link to='/auth/register' className=' my-2 text-center  nav-link'>Register Account</Link>
                                </Col> */}
                            </Row>
                        </Form>
                    </div>
                </Container>
            </Fade>
        </main>
    )
}

export default Login