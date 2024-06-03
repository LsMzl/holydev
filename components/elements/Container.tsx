import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

const Container = (props: PropsWithChildren<{className?: string}>) => {
  return (
    <div className={cn('max-w-7xl m-auto', props.className)}>{props.children}</div>
  )
}

export default Container