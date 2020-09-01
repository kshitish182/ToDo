import React from "react";

import Header from "./Header";
import TodoMain from "./todoComponents";


const Home = () => {  
 
  return (
  <>
    <Header />
    <main className="main-content">
      <div className="container">
        <div className="col-left" />
        <div className="col-mid">
          <TodoMain />
        </div>
        <div className="col-right" />
      </div>
    </main>
  </>
)}

export default Home;
