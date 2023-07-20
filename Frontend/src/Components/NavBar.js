import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";


const NavBar = () => {


  const navigate = useNavigate();
  const isLaptop = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });

  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')

  }

  useEffect(() => { }, [location]);

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (


    <>


      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <a className="navbar-brand mx-2" href="/">
          <h4>iNotebook</h4>
        </a>
        <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09" style={
          isLaptop
            ? { justifyContent: "end" }
            : { justifyContent: "start" }
        }>
          <ul className="navbar-nav ">
            <li className="nav-item ">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""
                  } d-none `}
                to="/"

              >
                <h6>Home</h6>
              </Link>
            </li>



            {(!localStorage.getItem('token')) ? <li>
              <Link type="button" className="btn btn-primary mx-2 my-1" to="/login" style={{ borderRadius: '25px', width: '130px' }}>Login</Link>
            </li> :
              <li>
                <Link type="button" className="btn btn-primary mx-2 my-1" onClick={handleLogout} to="/login" style={{ borderRadius: '25px', width: '130px' }}>Logout</Link>
              </li>
            }
            {(!localStorage.getItem('token')) ? <li>
              <Link type="button" className="btn btn-primary mx-2 my-1" to="/signup" style={{ borderRadius: '25px', width: '130px' }}>Signup</Link>
            </li> :
              <></>
            }

          </ul>
        </div>
      </nav>

    </>
  );
};

export default NavBar;
