import React from 'react'
import { Navbar as BootstrapNavbar, NavbarBrand } from 'reactstrap'

import logo from 'assets/img/emani-color-logo 2.png'

const Navbar = () => (
  <BootstrapNavbar light className="px-5 py-2 bg-white">
    <NavbarBrand>
      <img
        src={logo}
        height={45}
        className="d-inline-block align-top"
        alt="Emani"
      />
    </NavbarBrand>
  </BootstrapNavbar>
)

export default Navbar
