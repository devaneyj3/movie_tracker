import React from "react";
import { User } from "lucide-react";
import styles from "./ProfileInfo.module.scss";

const ProfileInfo = ({ user }) => {
	const {
		name,
		email,
		id,
		phone,
		address,
		city,
		state,
		zip,
		profileComplete = false,
	} = user || {};

	return (
		<div className={styles.infoContainer}>
			<div className={styles.sectionTitle}>
				<User />
				Profile Information
			</div>

			<div className={styles.infoGrid}>
				<div className={styles.infoCard}>
					<div className={styles.infoLabel}>Full Name</div>
					<div className={styles.infoValue}>
						{name || <span className={styles.emptyValue}>Not provided</span>}
					</div>
				</div>

				<div className={styles.infoCard}>
					<div className={styles.infoLabel}>Email Address</div>
					<div className={styles.infoValue}>
						{email || <span className={styles.emptyValue}>Not provided</span>}
					</div>
				</div>

				<div className={styles.infoCard}>
					<div className={styles.infoLabel}>Account Status</div>
					<div className={styles.infoValue}>
						<span className={styles.statusActive}>Active</span>
					</div>
				</div>

				{phone && (
					<div className={styles.infoCard}>
						<div className={styles.infoLabel}>Phone Number</div>
						<div className={styles.infoValue}>{phone}</div>
					</div>
				)}

				{address && (
					<div className={styles.infoCard}>
						<div className={styles.infoLabel}>Address</div>
						<div className={styles.infoValue}>{address}</div>
					</div>
				)}

				{(city || state || zip) && (
					<div className={styles.infoCard}>
						<div className={styles.infoLabel}>Location</div>
						<div className={styles.infoValue}>
							{[city, state, zip].filter(Boolean).join(", ") || (
								<span className={styles.emptyValue}>Not provided</span>
							)}
						</div>
					</div>
				)}

				<div className={styles.infoCard}>
					<div className={styles.infoLabel}>Profile Complete</div>
					<div className={styles.infoValue}>
						<span
							className={
								profileComplete ? styles.statusActive : styles.emptyValue
							}>
							{profileComplete ? "Complete" : "Incomplete"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
