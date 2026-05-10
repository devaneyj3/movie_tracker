import Link from "next/link";
import styles from "./Footer.module.scss";

const navItems = [
  {
    href: '/Movies',
    label: 'Movies'
  },
  {
    href: '/TVShows',
    label: 'TV Shows'
  },
  {
    href: '/People',
    label: 'People'
  },
  {
    href: '/Awards',
    label: 'Awards'
  },
  {
    href: '/More',
    label: 'More'
  },
]

const Footer = () => {
  return (
    <header className={styles.footer}>
      <div className={styles.footerContainer}>
        <ul className={`${styles.navLinks}`}>
          {navItems.map((nav, index) => {
            const { href, label } = nav
            return (
              <Link key={index} href={`${href}`}>{label}</Link>
            )
          })}
          {/* {signedInUser && (
				<Button asChild variant="ghost" className={styles.navButton}>
				<Link href="/MovieList">Movie List</Link>
				</Button>
				)}
				<Button asChild variant="ghost" className={styles.navButton}>
				<Link href="/TVShows">TV Shows</Link>
				</Button> */}
        </ul>
      </div>
    </header>
  );
};

export default Footer;
