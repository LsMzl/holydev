import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

const Container = (props: PropsWithChildren<{className?: string}>) => {
  return (
    <div className={cn('max-w-7xl m-auto px-2 md:px-0', props.className)}>{props.children}</div>
  )
}

export default Container