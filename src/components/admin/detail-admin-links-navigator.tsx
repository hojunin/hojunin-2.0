import Link from 'next/link'
import React from 'react'
import { Badge } from '../ui/badge'
const ADMIN_LINKS = [{
    label: '회고',
    link: '/admin/memoir'
}]

const DetailAdminLinksNavigator = () => {
  return (
    <nav>
    {ADMIN_LINKS.map(link => <Link href={link.link}>
    <Badge size={"xl"}>
    {link.label}
    </Badge>
    </Link>)}
    </nav>
  )
}

export default DetailAdminLinksNavigator