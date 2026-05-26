"use client";
import React from "react";
import Link from "next/link";
import styles from "./NavDropdown.module.scss";

const NavDropdown = ({ label, href }) => {
  return (
    <Link
      className={styles.signedInOptions}
      onClick={async (e) => {
        e.stopPropagation();
      }}
      href={`${href}`}>
      {label}
    </Link>);
};

export default NavDropdown;
