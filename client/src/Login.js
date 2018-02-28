import React from 'react';
import { Form, Message, Button, Input, Container, Header } from 'semantic-ui-react';
import Hello from './Hello';

class Login extends React.Component {
  state = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onSubmit = () => {

    var details = {
      'email': this.state.email,
      'password': this.state.password,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      credentials: 'include',
      body: formBody
    }).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      // Error :(
    });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const {
      email, password, emailError, passwordError,
    } = this.state;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <div>
        <Container text>
          <Header as="h2">Register</Header>
          <Hello />
          <Form>
            <Form.Field error={!!emailError}>
              <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
            </Form.Field>
            <Form.Field error={!!passwordError}>
              <Input
                name="password"
                onChange={this.onChange}
                value={password}
                type="password"
                placeholder="Password"
                fluid
              />
            </Form.Field>
            <Button onClick={this.onSubmit}>Submit</Button>
          </Form>
          {errorList.length ? (
            <Message error header="There was some errors with your submission" list={errorList} />
          ) : null}
        </Container>
      </div>
    );
  }
}

export default Login;
