import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

const Container = (props: PropsWithChildren<{className?: string}>) => {
  return (
    <div className={cn('max-w-[1600px] m-auto px-2 md:px-5 md:mx-5', props.className)}>{props.children}</div>
  )
}

export default Container