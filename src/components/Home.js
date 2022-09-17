
import { useEffect } from 'react';
import Notes from './Notes';

export const Home = (props) => {
  const {showAlert} = props
  async function verifyAuth() {
    try {
      const response = await fetch(
        "https://inotebook-backend-api.herokuapp.com/auth/verify",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      console.log(parseRes);

      parseRes.data === true ? props.setAuth(true) : props.setAuth(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    verifyAuth();
  }, []);
  return (
    <div>
    
      <Notes showAlert={showAlert}/>
    </div>
  )
}
