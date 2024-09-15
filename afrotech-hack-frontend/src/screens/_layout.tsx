import wand from '../assets/magic-wand.svg';
import { Outlet } from 'react-router-dom';


export default function _layout() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl mx-auto cursor-pointer" onClick={() => {
                if (window.location.pathname !== "/") {
                    window.location.href = "/";
                }
            }}>Open Source Wand
                <img src={wand} alt="wand" className="inline-block h-8 w-8" />
            </h1>
            <Outlet />
        </div>
    )
}