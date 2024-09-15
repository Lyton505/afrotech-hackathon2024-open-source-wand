import wand from '../assets/magic-wand.svg';
import { Outlet } from 'react-router-dom';


export default function _layout() {
    return (
        <>
            <h1 className="text-3xl mx-auto">Open Source Wand
                <img src={wand} alt="wand" className="inline-block h-8 w-8" />
            </h1>
            <Outlet />
        </>
    )
}