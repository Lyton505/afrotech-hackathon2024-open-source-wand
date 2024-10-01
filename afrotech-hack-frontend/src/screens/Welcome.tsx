// import wand from '../assets/magic-wand.svg';
import ProfileForm from '../components/usernameForm';



export default function Welcome() {
    

    return (
        <>
            <p className="text-base my-8 mx-4 px-4">
                Open Source Wand is a tool that helps you improve software development skills through collaborative open source projects and highlights your fantastic contribution skills in open source projects.
            </p>
            <ProfileForm />
        </>
    )
}   