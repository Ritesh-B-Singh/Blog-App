import React from 'react'
import { Box } from '@mui/material'
import logo from '../assets/logo.jpg'

const NavBar = () => {
  return (
      <Box p={'0 5rem'} pb={'1rem'}>
          <img style={{ height: '100%', width: '12rem', objectFit: 'cover' }} src={logo} alt="logo" />
      </Box>
  )
}

export default NavBar