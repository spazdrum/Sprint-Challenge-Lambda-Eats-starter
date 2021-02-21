import React from "react";
import Form from './components/form';
import { Route, Link, } from 'react-router-dom';

const App = () => {
  return (
    <section>
      <header>
        <nav>
          <Link to="/" >Home</Link>
          <Link to="/pizza">Pizza</Link>
        </nav>
      </header>
      <Route exact path="/">
        <h1>Welcome to Lambda Eats!</h1>
      </Route>
      <Route path="/pizza" component={Form} />
    </section> 
  );
};
export default App;
