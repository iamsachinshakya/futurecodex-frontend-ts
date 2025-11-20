"use client";

import {
  clearBottomSheet,
  getBottomSheetState,
} from "@/app/modules/ui-wrappers/redux/bottomSheetSlice";
import { BottomSheetType } from "@/app/modules/ui-wrappers/types/IOverlayTypes";
import { LoginContent } from "@/app/shared/components/modals/auth/LoginContent";
import { RegisterContent } from "@/app/shared/components/modals/auth/RegisterContent";
import { AppDispatch } from "@/app/store/store";
import { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BottomSheetWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const bottomSheetState = useSelector(getBottomSheetState);

  const [component, setComponent] = useState<string>("");
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setComponent(bottomSheetState.type);
  }, [bottomSheetState.type]);

  useEffect(() => {
    if (bottomSheetState.show) {
      document.body.style.overflow = "hidden";
      // Mount the component first
      setShouldRender(true);
      // Then trigger the animation after a small delay
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      document.body.style.overflow = "unset";
      // Start closing animation
      setIsAnimating(false);
      // Delay unmount to match animation duration (500ms)
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [bottomSheetState.show]);

  const closeBottomSheet = async () => {
    await dispatch(clearBottomSheet());
  };

  const list: Partial<Record<BottomSheetType, JSX.Element>> = {
    [BottomSheetType.LOGIN]: (
      <LoginContent onClose={closeBottomSheet} data={bottomSheetState.state} />
    ),
    [BottomSheetType.REGISTER]: (
      <RegisterContent
        onClose={closeBottomSheet}
        data={bottomSheetState.state}
      />
    ),
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm 
          transition-opacity duration-500 ease-in-out
          ${isAnimating ? "opacity-100" : "opacity-0"}
        `}
        onClick={closeBottomSheet}
        aria-hidden="true"
      />

      {/* Bottom Sheet Panel */}
      <div
        className={`
          fixed bottom-0 left-0 right-0
          w-full max-h-[90vh]
          z-10
          transform
          transition-transform duration-500 ease-in-out
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-white
          border-t border-gray-200 dark:border-gray-800
          shadow-2xl dark:shadow-black/50
          rounded-t-2xl
          overflow-y-auto
          ${isAnimating ? "translate-y-0" : "translate-y-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>

        {list[component as BottomSheetType] || null}
      </div>
    </div>
  );
}
