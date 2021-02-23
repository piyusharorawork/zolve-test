import React from "react";
import Link from "next/link";

export default function App() {
  return (
    <>
      <div>
        <h1 className="text-center text-xl my-2">
          Front-end Developer Hiring Assignment
        </h1>

        <ul>
          <li className="mx-2 cursor-pointer text-purple-700">
            <Link href="/apiEndpoint">1. 3rd Party API & Visualization</Link>
          </li>

          <li className="mx-2 cursor-pointer text-purple-700">
            <Link href="/copyToClipboard">2. Copy to clip board</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
