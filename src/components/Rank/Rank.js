import React from 'react';

const Rank = ({name, entries, na}) => {
	// body...
	return (
		<div>
			<div className='white f3'>
				<h2>{na}</h2> 
				<p>{"your current entry count is"}</p>
			</div>
			<div className='white f3'>
				{entries}
			</div>
		</div>
	);
}

export default Rank;