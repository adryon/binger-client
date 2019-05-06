import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { userActions } from 'actions';
import { Form, Input, Button, Icon } from 'antd'
import './style.scss'

@Form.create()
class ForgotPage extends React.Component {
	static defaultProps = {};

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault();
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        this.props.forgot({email: values.email});
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
	      <Helmet title="Forgot" />
      	<div className="main-forgot main-forgot--fullscreen">
	        <div className="main-forgot__block main-forgot__block--extended pb-0">
	          <div className="main-forgot__block__promo text-center p-top-5">
	            <img
	              className="login-main-logo mb-3"
	              src="resources/images/mediatec-inverse.png"
	              alt="Binger Logo"
	            />
	          </div>
	          <div className="main-forgot__block__inner">
	            <div className="cat__pages__login__block__form">
				        <h4 className="text-uppercase">
				          <strong>Reset password by email</strong>
				        </h4>
				        <br/>
				        <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)}>
				          <Form.Item label="E-mail">
				            {form.getFieldDecorator('email', {
				              initialValue: '',
				              rules: [
				                {type: 'email', message: 'The input is not a valid e-mail address'},
				                {required: true, message: 'Please input your e-mail address'},
				              ],
				            })(<Input prefix={<Icon type="user"/>}/>)}
				          </Form.Item>


				          <div className="form-actions ant-row">
				            <Button
				              type="primary"
				              className="mr-4"
				              htmlType="submit"
				            >
				              Reset Password
				            </Button>

				            <span>
				              <a onClick={this.props.goToRegister} href="javascript: void(0);" className="utils__link--blue utils__link--underlined">
				                Register
				              </a>
				              {' '}if you don't have account
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
  forgot: userActions.forgot,
  goToRegister: () => dispatch => dispatch(push('/register'))
};

function mapStateToProps(state) {
  return {
  	appData: state.appData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPage);
