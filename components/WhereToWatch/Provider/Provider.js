import React from "react";
import Image from "next/image";
import styles from "./Provider.module.scss";

export default function Provider({ label, value, whereToWatch }) {
	return (
		<div className={styles.provider}>
			<h2>{label}</h2>
			<div className={styles.networkContainers}>
				{whereToWatch[value]?.map((provider) => {
					return (
						<div key={provider.provider_id} className={styles.network}>
							{provider.logo_path ? (
								<Image
									src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
									alt=""
									width={72}
									height={50}
									className={styles.logo}
								/>
							) : (
								<span className={styles.label}>
									{provider.provider_name}
								</span>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
