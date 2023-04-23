import { ReactNode, createContext } from 'react'

interface AnimationContextType {
  handleChangeAnimation: (animationInfo: {
    entry: IntersectionObserverEntry
    entryAnimationName: string
    exitAnimationName: string
    animationDelayName: string
  }) => void
}

interface AnimationProviderProps {
  children: ReactNode
}

export const AnimationContext = createContext({} as AnimationContextType)

export function AnimationProvider({ children }: AnimationProviderProps) {
  function handleChangeAnimation(animationInfo: {
    entry: IntersectionObserverEntry
    entryAnimationName: string
    exitAnimationName: string
    animationDelayName: string
  }) {
    animationInfo.entry.target.classList.add('animate__animated')

    if (animationInfo.entry.isIntersecting) {
      animationInfo.entry.target.classList.add(
        animationInfo.entryAnimationName,
        animationInfo.animationDelayName,
      )
      animationInfo.entry.target.classList.remove(
        animationInfo.exitAnimationName,
        animationInfo.animationDelayName,
      )
    } else {
      animationInfo.entry.target.classList.add(
        animationInfo.exitAnimationName,
        animationInfo.animationDelayName,
      )
      animationInfo.entry.target.classList.remove(
        animationInfo.entryAnimationName,
        animationInfo.animationDelayName,
      )
    }
  }

  return (
    <AnimationContext.Provider value={{ handleChangeAnimation }}>
      {children}
    </AnimationContext.Provider>
  )
}
