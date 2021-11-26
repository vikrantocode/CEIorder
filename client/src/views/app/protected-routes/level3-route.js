import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import jwtdecode from 'jwt-decode';

const Level3Route = ({ component: Component, render, ...restProps }) => {
  const level3Auth = ['admin', 'inventoryManager', 'user'];

  return (
    <Route
      {...restProps}
      render={(props) => {
        if (
          !level3Auth.includes(
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

export default Level3Route;
