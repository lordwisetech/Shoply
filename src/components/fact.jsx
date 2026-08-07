                       import React from 'react';

// Import template styles
import '../assets/css/bootstrap.min.css';
import '../assets/css/style.css';

const factsData = [
  {
    id: 1,
    title: 'satisfied customers',
    value: '1963',
    icon: 'fa fa-users',
  },
  {
    id: 2,
    title: 'quality of service',
    value: '99%',
    icon: 'fa fa-thumbs-up',
  },
  {
    id: 3,
    title: 'quality certificates',
    value: '33',
    icon: 'fa fa-award',
  },
  {
    id: 4,
    title: 'Available Products',
    value: '789',
    icon: 'fa fa-box-open',
  },
];

function Facts() {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="bg-light p-5 rounded">
          <div className="row g-4 justify-content-center">
            {factsData.map((fact) => (
              <div key={fact.id} className="col-md-6 col-lg-6 col-xl-3">
                <div className="counter bg-white rounded p-5 text-center">
                  <i className={`${fact.icon} text-secondary fa-3x mb-3`}></i>
                  <h4 className="text-capitalize">{fact.title}</h4>
                  <h1>{fact.value}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facts;                               