import React from 'react';
import PropTypes from 'prop-types'
import { Heading } from "./heading";

const Error = ({ message }) => {
  return (
    <section>
      <Heading>Fehler</Heading>
      <p>{message}</p>
    </section>
  );
};

Error.propTypes = {
  message: PropTypes.string
}

export default Error;
