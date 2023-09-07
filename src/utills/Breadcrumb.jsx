import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <div className="container-fluid bg-white">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="breadcrumb  d-flex justify-content-between align-items-center">
              <div>
                <Link className="go-back text-dark opacity-75 text-decoration-none fw-bold px-2" onClick={() => navigate(-1)}>
                  <i className="bi bi-caret-left-fill" aria-hidden="true"></i>Go Back
                </Link>

                <Link to="/" className="go-back text-dark opacity-50 text-decoration-none fw-bold px-2">
                  / Home
                </Link>
              </div>

              {(currentRoute === `/` || currentRoute === `/post/${params.id}`) && (
                <Link to="/post/add" replace={true} className="btn btn-outline-dark rounded rounded-circle" title="add post">
                  <i className="bi bi-plus-circle-fill large-icon p-0"></i>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
