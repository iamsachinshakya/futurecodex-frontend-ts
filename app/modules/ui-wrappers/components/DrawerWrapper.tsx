"use client";

import {
  clearDrawer,
  getDrawerState,
} from "@/app/modules/ui-wrappers/redux/drawerSlice";
import { AppDispatch } from "@/app/store/store";
import { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DrawerWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const drawerState = useSelector(getDrawerState);

  const [component, setComponent] = useState<string>("");

  useEffect(() => {
    setComponent(drawerState.type);
  }, [drawerState.type]);

  useEffect(() => {
    if (drawerState.show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [drawerState.show]);

  const closeDrawer = async () => {
    await dispatch(clearDrawer());
  };

  const list: Record<string, JSX.Element> = {
    // comment: <CommentReview close={closeDrawer} state={drawerState.state} />,
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          drawerState.show
            ? "opacity-25 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer Panel - Slides from Right */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[470px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          drawerState.show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {list[component] || null}
      </div>
    </>
  );
}
