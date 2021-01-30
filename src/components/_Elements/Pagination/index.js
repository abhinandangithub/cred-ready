import React from "react";

import "./index.scss";

function Pagination() {
	return (
		<ul className="pagination">
			<li>Prev</li>
			<li className="active">1</li>
			{/* <li>2</li>
			<li>3</li> */}
			<li>Next</li>
		</ul>
	);
}

export default Pagination;
