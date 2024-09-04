import './App.css';
import ProfileForm from './components/usernameForm';

function App() {


  return (
    <div>
      <h1 className="text-3xl ">Open Source Wand</h1>
      <p className="text-md my-8 mx-4 px-4">
        Open Source Wand allows you to evaluate a user's contributions to open source projects.
      </p>
      <ProfileForm />
    </div>
  );
}

export default App;
