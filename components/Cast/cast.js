import Image from "next/image";
import React from "react";
import styles from "./cast.module.scss";

export default function Cast({ credits }) {
	return (
		<div className={styles.contain}>
			<h2>Cast</h2>
			<div className={styles.castContainer}>
				{credits &&
					credits.cast.map((cast) => {
						const { id, name, character, profile_path } = cast;
						const imageUrl =
							profile_path !== null
								? `https://image.tmdb.org/t/p/w500${profile_path}`
								: "/images/avatar.svg"; // 👈 put your fallback here
						return (
							<div key={id} className={styles.cast}>
								<div className={styles.imgContainer}>
									<Image
										className={styles.image}
										src={imageUrl}
										width={70}
										height={50}
										alt={`${name} Profile`}
									/>
								</div>
								<div className={styles.castDetails}>
									<h2>{name}</h2>
									<p>{character}</p>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
