//import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid/non-secure";
import styles from "./SearchBox.module.css";

const SearchBox = ({ filter, onChange }) => {
	const searchId = nanoid();
	return (
		<div className={styles.filter}>
			<label htmlFor={searchId}>Find contact by name</label>
			<input
				type="text"
				id={searchId}
				name="filter"
				value={filter}
				onChange={onChange}
			/>
		</div>
	);
};

SearchBox.propTypes = {
	filter: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default SearchBox;
