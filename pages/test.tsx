import React from "react";

const Button = () => {
  return (
    <div className="container">
      <button className="bg-blue-500 text-white font-bold py-2 px-4 hover:bg-blue-400 my-2">
        Click Me
      </button>
    </div>
  );
};

const Alert = () => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 py-2 px-3 my-2 mx-1">
      This is my alert
    </div>
  );
};

const Card = () => {
  return (
    <div className="bg-white rounded-md shadow-xl p-6 m-2 flex">
      <img className="w-40 h-40 rounded-md" src="/dosa.jpeg"></img>
      <div>
        <h1 className="ml-4 text-2xl">Dosa</h1>
        <p className="ml-4">
          This is the best dosa ever you have ever eaten in your entire life
        </p>
      </div>
    </div>
  );
};

export default function Test() {
  return (
    <div>
      <Button />
      <Alert />
      <Card />
    </div>
  );
}
