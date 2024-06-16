import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

const Container = (props: PropsWithChildren<{className?: string}>) => {
  return (
    <div className={cn('w-full m-auto px-2 md:pl-5 ', props.className)}>{props.children}</div>
  )
}

export default Container