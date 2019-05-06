import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { userActions } from 'actions';
import { Form, Input, Button, Icon } from 'antd'
import _ from  'lodash';
import './style.scss'

@Form.create()
class LoginPage extends React.Component {
	static defaultProps = {}

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
      	const payload = _.pick(values, ['email', 'password']);
        this.props.login(payload);
      }
    })
  };

	componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
  	const { form, isSubmitForm } = this.props;

    return (
    	<div>
	      <Helmet title="Login" />
      	<div className="main-login main-login--fullscreen">
	        <div className="main-login__block main-login__block--extended pb-0">
	          <div className="main-login__block__promo text-center p-top-5">
	            <img
	              className="login-main-logo mb-3"
	              src="resources/images/mediatec-inverse.png"
	              alt="Binger Logo"
	            />
	          </div>
	          <div className="main-login__block__inner">
	          	<div className="card">
	          		<div className="card-header">
	          			<h2 className="text-uppercase">
					          <strong>Please log in</strong>
					        </h2>
					      </div>
					      <div className="card-body">
					      	<Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)}>
				          <Form.Item label="Username">
				            {form.getFieldDecorator('email', {
				              initialValue: '',
				              validateTrigger: 'onSubmit',
				              rules: [
				                { type: 'email', message: 'The input is not a valid e-mail address' },
				                { required: true, message: 'Please input your e-mail address' },
				              ],
				            })(<Input prefix={<Icon type="user" />} />)}
				          </Form.Item>

				          <Form.Item label="Password">
				            {form.getFieldDecorator('password', {
				              initialValue: '',
				              rules: [{ required: true, message: 'Please input your password' }],
				            })(<Input prefix={<Icon type="lock" />} type="password" />)}
				          </Form.Item>
				          <Form.Item>
				          	<a
				              href="javascript: void(0);"
				              onClick={this.props.goToForgot}
				              className="utils__link--blue utils__link--underlined align-right"
				            >
				              Forgot password?
				            </a>
				          </Form.Item>

				          <div className="form-actions ant-row">
				            <Button
				              type="primary"
				              className="mr-4"
				              htmlType="submit"
				            >
				              Sign in
				            </Button>

				            <span>
				              <a onClick={this.props.goToRegister} href="javascript: void(0);" className="utils__link--blue utils__link--underlined">
				                Register
				              </a>
				              {' '}if you don't have an account!
				            </span>
				          </div>
				        </Form>
					      </div>
	          	</div>
	          </div>
	        </div>
	      </div>
	    </div>
    )
  }
}

const mapDispatchToProps = {
  login: userActions.login,
  goToRegister: () => dispatch => dispatch(push('/register')),
  goToForgot: () => dispatch => dispatch(push('/forgot')),
};

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
