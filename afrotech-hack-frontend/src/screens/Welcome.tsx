// import wand from '../assets/magic-wand.svg';
import ProfileForm from '../components/usernameForm';



export default function Welcome() {
    return (
        <>
            <p className="text-md my-8 mx-4 px-4">
                Open Source Wand allows you to evaluate a user's contributions to open source projects.
            </p>
            <ProfileForm />
        </>
    )
}   