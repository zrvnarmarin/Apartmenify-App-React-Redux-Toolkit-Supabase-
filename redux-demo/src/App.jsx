import React from "react";
import  Counter  from "./features/counter/Counter.jsx";
import PostsList from "./features/post/PostsList.jsx";
import "./App.css";
import AddPostForm from "./features/post/AddPostForm.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <PostsList />
        <AddPostForm />
      </header>
    </div>
  );
}

export default App;
