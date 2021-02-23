import Link from "next/link";
import React from "react";

type Props = {
  text: string;
  hideBack?: boolean;
};

export default function Header(props: Props) {
  return (
    <div className="flex justify-center align-middle">
      <div style={{ display: props.hideBack ? "none" : "block" }}>
        <Link href="/">
          <div className="absolute left-1 top-1 cursor-pointer">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </div>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl py-2">{props.text}</h1>
      </div>
    </div>
  );
}
