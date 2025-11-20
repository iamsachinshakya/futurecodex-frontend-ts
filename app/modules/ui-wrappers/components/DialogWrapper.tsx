"use client";

import {
  clearDialog,
  getDialogState,
} from "@/app/modules/ui-wrappers/redux/dialogSlice";
import { DialogType } from "@/app/modules/ui-wrappers/types/IOverlayTypes";
import { LoginContent } from "@/app/shared/components/modals/auth/LoginContent";
import { RegisterContent } from "@/app/shared/components/modals/auth/RegisterContent";
import { AppDispatch } from "@/app/store/store";
import { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DialogWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const dialogState = useSelector(getDialogState);

  const [component, setComponent] = useState<string>("");
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setComponent(dialogState.type);
  }, [dialogState.type]);

  useEffect(() => {
    if (dialogState.show) {
      document.body.style.overflow = "hidden";
      // Mount the component first
      setShouldRender(true);
      // Then trigger the animation after a small delay
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      document.body.style.overflow = "unset";
      // Start closing animation
      setIsAnimating(false);
      // Delay unmount to match animation duration (300ms)
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [dialogState.show]);

  const closeModal = async () => {
    await dispatch(clearDialog());
  };

  const list: Partial<Record<DialogType, JSX.Element>> = {
    [DialogType.LOGIN]: (
      <LoginContent onClose={closeModal} data={dialogState.state} />
    ),
    [DialogType.REGISTER]: (
      <RegisterContent onClose={closeModal} data={dialogState.state} />
    ),
  };

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm 
          transition-opacity duration-500 ease-in-out
          ${isAnimating ? "opacity-100" : "opacity-0"}
        `}
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Centering wrapper */}
      <div className="flex items-center justify-center min-h-full p-4">
        {/* Modal Panel */}
        <div
          className={`
            relative z-10
            w-full max-w-md
            transform transition-all duration-300 ease-in-out
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            border border-gray-200 dark:border-gray-800
            shadow-2xl dark:shadow-black/50
            rounded-2xl
            overflow-hidden
            ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {list[component as DialogType] || null}
        </div>
      </div>
    </div>
  );
}
