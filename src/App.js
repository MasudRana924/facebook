import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [message, setMessage] = useState('');

  const responseFacebook = (response) => {
    if (response.accessToken) {
      setAccessToken(response.accessToken);
    }
  };

  const handlePost = async () => {
    if (!accessToken) return alert('Please log in first.');

    const url = `https://graph.facebook.com/me/feed?access_token=${accessToken}`;
    const postBody = {
      message: message,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postBody),
      });

      if (response.ok) {
        alert('Post successful');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error.message}`);
      }
    } catch (error) {
      alert('Error posting to Facebook');
    }
  };

  return (
    <div className="App">
      <h1>Post to Facebook</h1>
      {!accessToken ? (
        <FacebookLogin
          appId="1633652027488123"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      ) : (
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
          />
          <button onClick={handlePost}>Post to Facebook</button>
        </div>
      )}
    </div>
  );
}

export default App;
