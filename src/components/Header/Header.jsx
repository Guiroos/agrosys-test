const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="mb-5">
      <nav className="navbar navbar-expand navbar-light bg-dark">
        <div className="px-5 w-100">
          <ul className="navbar-nav d-flex justify-content-between align-items-center">
            <li className="nav-item">
              <a
                className="nav-link text-light fs-3"
                href="/dashboard/clientes"
              >
                Clientes
              </a>
            </li>

            <li className="nav-item">
              <button
                className="nav-link text-danger fs-3"
                onClick={handleLogout}
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
