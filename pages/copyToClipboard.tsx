import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import Header from "../components/header";

export default function CopyToClipboard() {
  const [text, setText] = useState("");
  const router = useRouter();
  const Alert = useAlert();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const queryStr: any = router.query.q;

    if (!queryStr) {
      return;
    }

    setText(queryStr);
  }, [router.query]);

  const handleClick = () => {
    copy(text);
    Alert.info(`"${text}" copied to clipboard`);
  };

  return (
    <div>
      <Header text="Copy To Clipboard"></Header>
      <div className="mx-4">
        <input
          className="my-2 px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full max-w-sm"
          placeholder="Enter Text"
          type="text"
          onChange={handleTextChange}
          value={text}
        />
        <br />
        <div className="my-4" onClick={handleClick}>
          <a className="my-4 mx-2 bg-black text-white py-2 px-4 rounded-md cursor-pointer">
            Copy To ClipBoard
          </a>
        </div>
      </div>
    </div>
  );
}
