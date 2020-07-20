import React from 'react';
import Spinner from '../common/Spinner';

const LoaderComponent = () => (
  <div className="empty-section">
    <Spinner />
    <div className="text--secondary">
      Loading
    </div>
  </div>
);

export default LoaderComponent;