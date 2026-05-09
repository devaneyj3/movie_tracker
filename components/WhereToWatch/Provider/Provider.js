import React from "react";
import styles from "./Provider.module.scss";
import { Button } from "@/components/ui/button";

export default function Provider({ label, value, whereToWatch }) {
	return (
		<div className={styles.provider}>
			<h1 className="text-white">{label}</h1>
			{whereToWatch[value] &&
				whereToWatch[value].map((provider, index) => {
					return (
						<div key={index} className={styles.network}>
							<Button
								variant="ghost"
								className="w-full bg-blue-400 text-white text-xl font-thin">
								{provider.provider_name}
							</Button>
						</div>
					);
				})}
		</div>
	);
}
