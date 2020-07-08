import React from 'react';

const Header = () => (
	<header>
		<div className="container">
			<div className="header">
				<div className="header__icons">
					<svg width="24" height="24" viewBox="0 0 24 24">
						<path 
							fill="currentColor" 
							fillRule="evenodd" 
							d="M4.5 5h15a.5.5 0 1 1 0 1h-15a.5.5 0 0 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1z" 
						/>
					</svg>
				</div>
				<div className="header__text">
					ToDo
				</div>
			</div>
		</div>
	</header>
);

export default Header;
