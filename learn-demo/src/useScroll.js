import {useEffect} from 'react'
import reset from './restScroll'

export default function useScroll(pathname) {
    useEffect(() => {
        reset()
    }, [pathname])
}