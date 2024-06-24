import { useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [websocketUrl, setWebsocketUrl] = useState<string>("");
  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
      <div className="flex flex-col gap-4 text-2xl">
        <input
          type="text"
          placeholder="ws://localhost:8080"
          className="border border-gray-300 p-2 rounded-md w-full"
          onChange={(e) => setWebsocketUrl(e.target.value)}
        />
        {websocketUrl.length > 0 && (
          <>
            <Link
              to={`/timing?ws=${websocketUrl}`}
              className="bg-blue-500 text-white p-2 rounded-md w-full text-center"
            >
              Timing Overlay
            </Link>
            <Link
              to={`/results?ws=${websocketUrl}`}
              className="bg-blue-500 text-white p-2 rounded-md w-full text-center"
            >
              Results Overlay
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
