/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import IntlMessages from '../../helpers/IntlMessages';
import { adminRoot } from '../../constants/defaultValues';

const getMenuTitle = (sub) => {
  if('/'+sub===adminRoot) return <IntlMessages id="menu.home" />;
  return <IntlMessages id={`menu.${sub}`} />;
};

const getUrl = (path, sub, index) => {
  return path.split(sub)[0] + sub;
};

const BreadcrumbContainer = ({ heading, match }) => {
  return (
    <>
      {heading && (
        <h1>
          <IntlMessages id={heading} />
        </h1>
      )}
      <BreadcrumbItems match={match} />
    </>
  );
};

function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}

const BreadcrumbItems = ({ match }) => {
  const path = match.path.substr(1);
  let paths = path.split('/');
  if (paths[paths.length - 1].indexOf(':') > -1) {
    paths = paths.filter((x) => x.indexOf(':') === -1);
  }
  return (
    <>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => {
          sub = sub === 'app' ? 'Home' : sub 
          getAllIndexes(sub, '-').map( index => {
            sub = sub.slice(0, index+1) + sub.charAt(index + 1).toUpperCase() + sub.slice(index + 2)
          })
          sub = sub.replace(/-/g, " ");
          return (
            <BreadcrumbItem key={index} active={paths.length === index + 1}>
              {paths.length !== index + 1 ? (
                <NavLink to={`/${getUrl(path, sub, index)}`}>
                  {sub.charAt(0).toUpperCase() + sub.slice(1)}
                </NavLink>
              ) : 
                sub.charAt(0).toUpperCase() + sub.slice(1)
              }
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbContainer;
