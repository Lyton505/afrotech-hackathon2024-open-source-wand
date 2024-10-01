import wand from '../assets/magic-wand.svg';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeCompare, faGraduationCap, faHandHoldingHeart, faUserGroup } from '@fortawesome/free-solid-svg-icons';
// has a header with the wand logo and the title "Open Source Wand"
// the top has a contribute text in header that links to open source projects the user can contribute to

export default function _layout() {
    return (
        <div>
            <div className="flex gap-2 bg-slate-100 flex-row justify-between">

            {/* wand logo and title */}
                <h1 className="text-3xl cursor-pointer p-4 align-left" onClick={() => {
                    if (window.location.pathname !== "/") {
                    window.location.href = "/";
                }
            }}>Open Source Wand
                <img src={wand} alt="wand" className="inline-block h-8 w-8" />
            </h1>

            <div className="flex flex-row gap-4">
                {/* contribute text */}
            <div className="flex flex-col gap-0 p-4 cursor-pointer" onClick={() => {
                if (window.location.pathname !== "/projects") {
                    window.location.href = "/projects";
                }
            }}>
                <FontAwesomeIcon icon={faCodeCompare} />
                <div className="text-base align-left">Contribute</div>
            </div>

            {/* learn more about open source text */}
            <div className="flex flex-col gap-0 p-4 cursor-pointer" onClick={() => {
                // nav to https://www.redhat.com/en/topics/open-source/what-is-open-source in new tab
                window.open("https://www.redhat.com/en/topics/open-source/what-is-open-source", "_blank");
            }}>
                <FontAwesomeIcon icon={faGraduationCap} />
                <div className="text-base align-left">Learn About Open Source</div>
                </div>
            
            {/* about us text */}
            <div className="flex flex-col gap-0 p-4 cursor-pointer" onClick={() => {
                if (window.location.pathname !== "/about-us") {
                    window.location.href = "/about-us";
                }
            }}>
                <FontAwesomeIcon icon={faHandHoldingHeart} />
                <div className="text-base align-left">About Us</div>
            </div>
            </div>

            
        </div>
            <Outlet />
        </div>
    )
}