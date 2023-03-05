import { MutableRefObject, ReactNode, createContext, useEffect, useRef, useState } from "react";

type AreElementsAnimated = [
    { isPresentation2Section1Visible: boolean },
    { isPresentation2Section2Visible: boolean },
    { isPresentation2Section3Visible: boolean },
    { isPresentation2Illustration1Visible: boolean },
    { isPresentation2Illustration2Visible: boolean },
    { isPresentation3TitleVisible: boolean },
    { isPresentation3SliderVisible: boolean },
    { isPresentation3ButtonVisible: boolean },
    { isPricesTitleVisible: boolean },
    { isPricesSection1Visible: boolean },
    { isPricesSection2Visible: boolean },
    { isHeaderLogoVisible: boolean },
    { isHeaderNavVisible: boolean },
    { isHeaderBurgerMenuVisible: boolean },
    { isPresentation1Title1Visible: boolean },
    { isPresentation1Title2Visible: boolean },
    { isPresentation1P1Visible: boolean },
    { isPresentation1P2Visible: boolean },
    { isPresentation1Button1Visible: boolean },
    { isPresentation1Button2Visible: boolean },
    { isPresentation1ImgVisible: boolean }
]

type AnimatedElements = [
    { presentation2Section1: MutableRefObject<null> },
    { presentation2Section2: MutableRefObject<null> },
    { presentation2Section3: MutableRefObject<null> },
    { presentation2Illustration1: MutableRefObject<null> },
    { presentation2Illustration2: MutableRefObject<null> },
    { presentation3Title: MutableRefObject<null> },
    { presentation3Slider: MutableRefObject<null> },
    { presentation3Button: MutableRefObject<null> },
    { pricesTitle: MutableRefObject<null> },
    { pricesSection1: MutableRefObject<null> },
    { pricesSection2: MutableRefObject<null> },
    { headerLogo: MutableRefObject<null> },
    { headerNav: MutableRefObject<null> },
    { headerBurgerMenu: MutableRefObject<null> },
    { presentation1Title1: MutableRefObject<null> },
    { presentation1Title2: MutableRefObject<null> },
    { presentation1P1: MutableRefObject<null> },
    { presentation1P2: MutableRefObject<null> },
    { presentation1Button1: MutableRefObject<null> },
    { presentation1Button2: MutableRefObject<null> },
    { presentation1Img: MutableRefObject<null> }
]

interface AnimationContextType {
    toggleElementsAnimation: () => { areElementsAnimated: AreElementsAnimated, animatedElements: AnimatedElements }
    observers: Observer[]
}

interface AnimationProviderProps {
    children: ReactNode
}

interface Observer {
    observer: IntersectionObserver,
    el: HTMLElement
}

export const AnimationContext = createContext({} as AnimationContextType)

export function AnimationProvider({ children }: AnimationProviderProps) {
    const [areElementsAnimated, setAreElementsAnimated] = useState([
        { isPresentation2Section1Visible: false },
        { isPresentation2Section2Visible: false },
        { isPresentation2Section3Visible: false },
        { isPresentation2Illustration1Visible: false },
        { isPresentation2Illustration2Visible: false },
        { isPresentation3TitleVisible: false },
        { isPresentation3SliderVisible: false },
        { isPresentation3ButtonVisible: false },
        { isPricesTitleVisible: false },
        { isPricesSection1Visible: false },
        { isPricesSection2Visible: false },
        { isHeaderLogoVisible: false },
        { isHeaderNavVisible: false },
        { isHeaderBurgerMenuVisible: false },
        { isPresentation1Title1Visible: false },
        { isPresentation1Title2Visible: false },
        { isPresentation1P1Visible: false },
        { isPresentation1P2Visible: false },
        { isPresentation1Button1Visible: false },
        { isPresentation1Button2Visible: false },
        { isPresentation1ImgVisible: false }
    ] as AreElementsAnimated
    )
    const [observers, setObservers] = useState([] as Observer[])

    const animatedElements = [
        { presentation2Section1: useRef(null) },
        { presentation2Section2: useRef(null) },
        { presentation2Section3: useRef(null) },
        { presentation2Illustration1: useRef(null) },
        { presentation2Illustration2: useRef(null) },
        { presentation3Title: useRef(null) },
        { presentation3Slider: useRef(null) },
        { presentation3Button: useRef(null) },
        { pricesTitle: useRef(null) },
        { pricesSection1: useRef(null) },
        { pricesSection2: useRef(null) },
        { headerLogo: useRef(null) },
        { headerNav: useRef(null) },
        { headerBurgerMenu: useRef(null) },
        { presentation1Title1: useRef(null) },
        { presentation1Title2: useRef(null) },
        { presentation1P1: useRef(null) },
        { presentation1P2: useRef(null) },
        { presentation1Button1: useRef(null) },
        { presentation1Button2: useRef(null) },
        { presentation1Img: useRef(null) }
    ] as AnimatedElements

    function toggleElementsAnimation() {
        animatedElements.forEach((element, idx) => {
            if (typeof window !== 'undefined') {
                const el = Object.values(element)[0].current
                const elName = Object.keys(areElementsAnimated[idx])[0]
                const key = Object.keys(areElementsAnimated)[idx]
                const observer = new window.IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting === true) {
                            setAreElementsAnimated((state) => {
                                return { ...state, [key]: { [elName]: entry.isIntersecting } }
                            })
                        } else {
                            setAreElementsAnimated((state) => {
                                return { ...state, [key]: { [elName]: entry.isIntersecting } }
                            })
                        }
                    },
                    { threshold: 0.1 },
                )

                if (el !== null && observers.length < 22) {
                    setObservers(state => {
                        state.push({ observer, el })
                        return state
                    })
                }
            }
        })

        return { areElementsAnimated, animatedElements }
    }

    useEffect(() => {
        toggleElementsAnimation()
        observers.forEach(observer => {
            observer.observer.observe(observer.el)
        })
    }, [])

    return (
        <AnimationContext.Provider value={{ toggleElementsAnimation, observers }}>
            {children}
        </AnimationContext.Provider>
    )
}