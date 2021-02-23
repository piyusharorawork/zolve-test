import React from "react";
import Link from "next/link";
import Header from "../components/header";

export default function App() {
  return (
    <>
      <div>
        <Header
          text="Front-end Developer Hiring Assignment"
          hideBack={true}
        ></Header>

        <ul>
          <li className="mx-2 cursor-pointer text-purple-700">
            <Link href="/apiEndpoint">1. 3rd Party API & Visualization</Link>
          </li>

          <li className="mx-2 cursor-pointer text-purple-700">
            <Link href="/copyToClipboard">2. Copy to clip board</Link>
          </li>

          <li className="mx-2 cursor-pointer text-purple-700">
            <Link href="/selfie">3. Take Selfie</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
