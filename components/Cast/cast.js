import Image from "next/image";
import React from "react";
import styles from "./cast.module.scss";

export default function Cast({ credits }) {
	return (
		<div className="mt-20 mb-10 ml-20">
			<h2 className="text-3xl mb-10 text-white">Cast</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{credits &&
					credits.cast.map((cast) => {
						const { id, name, character, profile_path } = cast;
						const imageUrl =
							profile_path !== null
								? `https://image.tmdb.org/t/p/w500${profile_path}`
								: "/images/avatar.svg"; // 👈 put your fallback here
						return (
							<div key={id} className={styles.cast}>
								<Image
									className={styles.image}
									src={imageUrl}
									width={70}
									height={50}
									alt={`${name} Profile`}
								/>
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
