import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number; fill?: string }
type IconName = 'arrowDown' | 'arrowRight' | 'arrowUpRight' | 'check' | 'chevronDown' | 'compass' | 'heart' | 'menu' | 'plus' | 'rotateCcw' | 'send' | 'sparkles' | 'x'

const paths: Record<IconName, React.ReactNode> = {
  arrowDown: <path d="M12 5v14m-7-7 7 7 7-7" />,
  arrowRight: <path d="M5 12h14m-7-7 7 7-7 7" />,
  arrowUpRight: <path d="M7 17 17 7M7 7h10v10" />,
  check: <path d="m5 12 4 4L19 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  compass: <><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3 6.3-2.1Z"/></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  plus: <path d="M12 5v14m-7-7h14" />,
  rotateCcw: <><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/></>,
  send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
  sparkles: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14ZM5 2l.8 2.2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8L5 2Z"/></>,
  x: <path d="m18 6-12 12M6 6l12 12" />,
}

function makeIcon(name: IconName) {
  return function Icon({ size = 24, fill = 'none', ...props }: IconProps) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
  }
}

export const ArrowDown = makeIcon('arrowDown')
export const ArrowRight = makeIcon('arrowRight')
export const ArrowUpRight = makeIcon('arrowUpRight')
export const Check = makeIcon('check')
export const ChevronDown = makeIcon('chevronDown')
export const Compass = makeIcon('compass')
export const Heart = makeIcon('heart')
export const Menu = makeIcon('menu')
export const Plus = makeIcon('plus')
export const RotateCcw = makeIcon('rotateCcw')
export const Send = makeIcon('send')
export const Sparkles = makeIcon('sparkles')
export const X = makeIcon('x')
