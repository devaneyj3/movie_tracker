import Menu from "./Menu";
import styles from "./Header.module.scss";
import UserButton from "./user-button";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div className={styles.menu}>
					<Menu />
				</div>
				<div className={styles.signIn}>
					<UserButton />
				</div>
			</div>
		</header>
	);
};

export default Header;
