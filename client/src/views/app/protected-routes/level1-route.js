import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import jwtdecode from 'jwt-decode';

const Level1Route = ({ component: Component, render, ...restProps }) => {
  const level1Auth = ['admin'];

  return (
    <Route
      {...restProps}
      render={(props) => {
        if (
          !level1Auth.includes(
            jwtdecode(localStorage.getItem('auth-token')).role
          )
        ) {
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: { from: props.location },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default Level1Route;
