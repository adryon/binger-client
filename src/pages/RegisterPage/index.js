import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { userActions } from 'actions';
import { Form, Input, Button, Icon } from 'antd'
import _ from  'lodash';
import './style.scss'

@Form.create()
class RegisterPage extends React.Component {
  static defaultProps = {}

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        const payload = _.pick(values, ['email', 'password', 'name']);
        this.props.register(payload);
      }
    })
  }

	componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
    const { form, isSubmitForm } = this.props

    return (
    	<div>
        <Helmet title="Register" />
        <div className="main-register main-register--fullscreen">
          <div className="main-register__block main-register__block--extended pb-0">
            <div className="main-register__block__promo text-center p-top-5">
              <img
                className="login-main-logo mb-3"
                src="resources/images/mediatec-inverse.png"
                alt="Binger Logo"
              />
            </div>
            <div className="main-register__block__inner">
              <div className="cat__pages__login__block__form">
                <h2 className="text-uppercase">
                  <strong>Please register</strong>
                </h2>
                <br/>
                <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)}>
                  <Form.Item label="Name">
                    {form.getFieldDecorator('name', {
                      rules: [{required: true, message: 'Please input your name!'}],
                    })(<Input prefix={<Icon type="user"/>} />)}
                  </Form.Item>

                  <Form.Item label="E-mail">
                    {form.getFieldDecorator('email', {
                      validateTrigger: 'onSubmit',
                      rules: [
                        {type: 'email', message: 'The input is not a valid e-mail address'},
                        {required: true, message: 'Please input your e-mail!'},
                      ],
                    })(<Input prefix={<Icon type="mail"/>} />)}
                  </Form.Item>

                  <Form.Item label="Password">
                    {form.getFieldDecorator('password', {
                      rules: [{required: true, message: 'Password is required!'}],
                    })(<Input prefix={<Icon type="lock"/>} type="password" />)}
                  </Form.Item>

                  <Form.Item label="Confirm Password">
                    {form.getFieldDecorator('confirm', {
                      rules: [{required: true, message: 'Confirm your password!'}],
                    })(<Input prefix={<Icon type="lock"/>} type="password" />)}
                  </Form.Item>

                  <div className="form-actions ant-row">
                    <Button
                      type="primary"
                      className="mr-4"
                      htmlType="submit"
                    >
                      Sign up
                    </Button>

                    <span>
                      <a onClick={this.props.goToLogin} href="javascript: void(0);" className="utils__link--blue utils__link--underlined">
                        Login
                      </a>
                      {' '}if you already have an account
                    </span>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  register: userActions.register,
  goToLogin: () => dispatch => dispatch(push('/login'))
};

function mapStateToProps(state) {
  return {
    appData: state.appData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
