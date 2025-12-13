"use client";

import { useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "@harurobo-2026-score-tool/shared"

export default function Home() {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>(io("http://localhost:3001"));

  return (
    <div className="">
      <main className="">
        hello
        <div>
          <button
            onClick={() => {
              socketRef.current.emit("game:list", () => {
                console.log("game:list emitted");
              });
            }}
          >
            Emit game:list
          </button>
        </div>
      </main>
    </div>
  );
}
