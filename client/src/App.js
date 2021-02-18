import React, { Component } from 'react';
import { Alert, Col, Row, Spinner, Badge,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import './App.css';

class App extends Component {
  state = {
    response: '',
    loading: '',
    country: '',
    responseToPost: '',
    error:'',
  };
  
  componentDidMount() {
    this.setState({ loading: false });
/*     this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err)); */
  }
  
/*   callApi = async () => {
    const response = await fetch('/api/weather');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  }; */
  
  handleSubmit = async e => {
    this.setState({ loading: true });
    e.preventDefault();
    const response = await fetch('api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cityName: this.state.country }),
    })
    const body = await response.json();

    this.setState({ responseToPost: body });
    this.setState({ loading: false });
  };
  
render() {
    return (
      <div className="App">
         <h6><Badge color="light" pill>v1.0 | Dev by Bruno Mendez</Badge></h6>
         <br></br>
        <h1><Badge color="primary">How's The Weather In?</Badge></h1><br></br>
        <Form action="api/weather"method ="post" onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Input
                type="text"
                id="city"
                value={this.state.country}
                placeholder="City name"
                onChange={e => this.setState({ country: e.target.value })}
              />
            </FormGroup>
            <br></br>

          <Button color="warning"type="submit">Search</Button>
        </Form>
        <br></br>

        {this.state.responseToPost!=='' && !this.state.loading &&
            <div>
                <img src={this.state.responseToPost.icon_url}></img>
                <Alert color="primary"> Weather of {this.state.responseToPost.city}: {this.state.responseToPost.desc}</Alert> 
                <Alert color="success"> Temperature: {this.state.responseToPost.temp} °C </Alert>
                <Alert color="danger"> Max:  {this.state.responseToPost.max} °C </Alert>
                <Alert color="secondary"> Min: {this.state.responseToPost.min} °C </Alert>
                <Alert color="info"> Feels like: {this.state.responseToPost.feels} °C </Alert>
            </div>
        }
        {this.state.loading &&
          <Spinner type="grow" color="primary" />
        }
       
      </div>
    );
   
  }
}

export default App;