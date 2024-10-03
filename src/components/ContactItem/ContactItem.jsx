//import React from "react";
import PropTypes from "prop-types";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import styles from "./ContactItem.module.css";

const ContactItem = ({ contact, onDelete }) => {
	return (
		<li className={styles.contactItem}>
			<div className={styles.topRow}>
				<div className={styles.icon}>
					<FaUser />
				</div>
				<span className={styles.name}>{contact.name}</span>
			</div>
			<div className={styles.bottomRow}>
				<div className={styles.icon}>
					<FaPhoneAlt />
				</div>
				<span className={styles.number}>{contact.phone}</span> {}
			</div>
			<button onClick={() => onDelete(contact.id)}>Delete</button>
		</li>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
	}).isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default ContactItem;
