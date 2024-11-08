import LiveCursors from "@/components/cursor/LiveCursors";
import {useMyPresence, useOthers} from "@liveblocks/react/suspense";
import React, {useCallback, useEffect, useState} from "react";
import CursorChat from "@/components/cursor/CursorChat";
import {CursorMode} from "@/types/type";

const Live = () => {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const [cursorState, setCursorState] = useState({
    mode: CursorMode.Hidden
  });

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, [])

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    updateMyPresence({ cursor: null, message: null });
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === '/') {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: ''
        });
      } else if (e.key === 'Escape') {
        updateMyPresence({ message: '' })
        setCursorState({
          mode: CursorMode.Hidden,
        });
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
      }
    }

    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [updateMyPresence]);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="border-2 border-green-500 h-[100vh] w-full flex justify-center items-center text-center"
    >

      <h1 className="text-2xl text-white">DrawKit UI/UX Design</h1>

      {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
      )}
      <LiveCursors others={others}/>
    </div>
  );
};

export default Live;
