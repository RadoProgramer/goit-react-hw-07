//import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import styles from "./ContactForm.module.css";

const formatPhoneNumber = (value) => {
	const cleaned = ("" + value).replace(/\D/g, "");
	const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

	if (match) {
		return [match[1], match[2], match[3]].filter(Boolean).join("-");
	}

	return value;
};

const ContactForm = ({ onAddContact }) => {
	const initialValues = {
		name: "",
		number: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.matches(/^[A-Za-z\s]+$/, "Name should contain only letters")
			.min(3, "Minimum 3 characters")
			.max(50, "Maximum 50 characters")
			.required("Required"),
		number: Yup.string()
			.required("Required")
			.test(
				"is-valid-number",
				"Phone number must be between 8 and 10 digits",
				function (value) {
					const cleanedValue = value.replace(/\D/g, "");
					return cleanedValue.length >= 8 && cleanedValue.length <= 10;
				}
			),
	});

	const handleSubmit = (values, { resetForm }) => {
		const newContact = {
			id: nanoid(),
			name: values.name,
			number: formatPhoneNumber(values.phone),
		};

		onAddContact(newContact);
		resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ values, setFieldValue }) => (
				<Form className={styles.form}>
					<label htmlFor="name">Name</label>
					<Field type="text" name="name" />
					<ErrorMessage name="name" component="div" className={styles.error} />

					<label htmlFor="number">Number</label>
					<Field
						type="text"
						name="number"
						value={values.number}
						onChange={(e) => {
							const formattedNumber = formatPhoneNumber(e.target.value);
							setFieldValue("number", formattedNumber);
						}}
					/>
					<ErrorMessage
						name="number"
						component="div"
						className={styles.error}
					/>

					<button type="submit">Add contact</button>
				</Form>
			)}
		</Formik>
	);
};

ContactForm.propTypes = {
	onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
