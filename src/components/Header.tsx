import React from "react";

const Header = () => (
  <header>
    <div className="header container">
      <div className="col-left flex-wrapper">
        {/* TODO: Create a side navigation bar menu */}
        {false && (
          <div className="header__icons">
            <svg
              className="icon-menu"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M4.5 5h15a.5.5 0 1 1 0 1h-15a.5.5 0 0 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1z"
              />
            </svg>
          </div>
        )}
        <div className="header__main-header">ToDo</div>
      </div>
      <div className="col-mid" />
      <div className="col-right" />
    </div>
  </header>
);

export default Header;
