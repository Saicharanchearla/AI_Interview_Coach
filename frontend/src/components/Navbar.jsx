import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const isLoggedIn = Boolean(username || email);

  const displayName = username || email?.split("@")[0] || "User";

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <>
      {/* Embedded Navbar CSS */}
      <style>{`
        .site-navbar {
          width: 100%;
          min-height: 68px;
          padding: 12px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: #ffffff;
          border-bottom: 1px solid #e5e5e5;
          position: relative;
          z-index: 10;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #171717;
          text-decoration: none;
          font-size: 19px;
          font-weight: 700;
          white-space: nowrap;
        }

        .brand-mark {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          background: #171717;
          color: #ffffff;
          border-radius: 9px;
          font-size: 12px;
          letter-spacing: 0.5px;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }

        .navbar-links a,
        .navbar-login {
          color: #333333;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .navbar-links a:hover,
        .navbar-login:hover {
          color: #777777;
        }

        .navbar-account {
          display: flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
        }

        .navbar-user {
          color: #333333;
          font-size: 14px;
        }

        .navbar-login {
          padding: 9px 14px;
          border: 1px solid #d4d4d4;
          border-radius: 8px;
        }

        .navbar-signup,
        .navbar-button {
          padding: 9px 15px;
          border: 1px solid #171717;
          border-radius: 8px;
          background: #171717;
          color: #ffffff;
          text-decoration: none;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .navbar-signup:hover,
        .navbar-button:hover {
          background: #333333;
        }

        @media (max-width: 900px) {
          .site-navbar {
            flex-wrap: wrap;
            justify-content: center;
            padding: 14px;
          }

          .navbar-brand {
            width: 100%;
            justify-content: center;
          }

          .navbar-links {
            flex-wrap: wrap;
            gap: 14px;
          }
        }

        @media (max-width: 500px) {
          .navbar-links {
            gap: 10px;
          }

          .navbar-links a {
            font-size: 12px;
          }
        }

        /* Added Custom Overrides */
        .site-navbar .navbar-brand,
        .site-navbar .navbar-account {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        .site-navbar .navbar-brand {
          margin-right: auto;
          color: #171717 !important;
        }

        .site-navbar .navbar-account {
          margin-left: auto;
        }

        .site-navbar .brand-mark {
          display: grid !important;
          background: #171717 !important;
          color: #ffffff !important;
        }

        .site-navbar .navbar-signup,
        .site-navbar .navbar-button {
          background: #171717 !important;
          color: #ffffff !important;
        }
      `}</style>

      {/* Navbar Markup */}
      <header className="site-navbar">
        <Link to="/" className="navbar-brand">
          <span className="brand-mark">AI</span>
          <span>AI Interview Coach</span>
        </Link>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/product-companies">Product Companies</Link>
          <Link to="/service-companies">Service Companies</Link>
          <Link to="/coding">Coding Practice</Link>
        </nav>

        <div className="navbar-account">
          {isLoggedIn ? (
            <>
              <span className="navbar-user">{displayName}</span>
              <button
                type="button"
                className="navbar-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="navbar-login" to="/login">
                Login
              </Link>
              <Link className="navbar-signup" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;