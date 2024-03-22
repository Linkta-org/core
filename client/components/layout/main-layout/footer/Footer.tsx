import React from 'react'
import { Flex, Text, Link } from '@radix-ui/themes';


const Footer = () => {
  return (
    <>
      <Flex display='flex' direction="row" justify='between' gap='9' mb='6' ml='9' position='fixed' bottom='0'>

        <Text>&copy; 2024 - LinkTa, LLC. All rights reserved.</Text>

        <Flex gap='5'>
          <Link>Cookie Preferences  </Link>
          <Link>Security </Link>
          <Link>Legal </Link>
          <Link>Privacy </Link>
        </Flex>
      </Flex>

    </>
  )
}

export default Footer
