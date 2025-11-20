"use client";

import {
  clearBottomSheet,
  getBottomSheetState,
} from "@/app/modules/ui-wrappers/redux/bottomSheetSlice";
import { AppDispatch } from "@/app/store/store";
import { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BottomSheetWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const bottomSheetState = useSelector(getBottomSheetState);
  const [component, setComponent] = useState<string>("");

  useEffect(() => {
    setComponent(bottomSheetState.type);
  }, [bottomSheetState.type]);

  useEffect(() => {
    if (bottomSheetState.show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [bottomSheetState.show]);

  const closeBottomSheet = async () => {
    await dispatch(clearBottomSheet());
  };

  // Always pass state and close function to all components
  const list: Record<string, JSX.Element> = {
    // comment: (
    //   <CommentReview close={closeBottomSheet} state={bottomSheetState.state} />
    // ),
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          bottomSheetState.show
            ? "opacity-25 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeBottomSheet}
      />

      {/* Bottom Sheet - Slides from Bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 w-full max-h-[90vh] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto rounded-t-[12px] ${
          bottomSheetState.show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {list[component] || null}
      </div>
    </>
  );
}
