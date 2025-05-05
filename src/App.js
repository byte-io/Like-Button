import { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://questions.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          header: { contentType: "application/json" },
          body: JSON.stringify({ action: isLiked ? "like" : "unlike" }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log("try if", response);
        setIsLiked(true);
      } else if (response.status === 500) {
        console.log("try else", response);
        setError(data.message);
      }
    } catch (error) {
      console.log("err", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button
        className={isLiked ? "LikedButton" : "unLikedButton"}
        onClick={handleClick}
      >
        {isLoading ? "loading" : <> &#x2665; </>}
        Like
      </button>
      <br />
      {error}
    </div>
  );
}

//https://www.geeksforgeeks.org/how-to-create-like-button-using-react-js/
