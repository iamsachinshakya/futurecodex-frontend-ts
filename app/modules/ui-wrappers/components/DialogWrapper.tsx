"use client";

import {
  clearDialog,
  getDialogState,
} from "@/app/modules/ui-wrappers/redux/dialogSlice";
import { AppDispatch } from "@/app/store/store";
import { JSX, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DialogWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const dialogState = useSelector(getDialogState);

  const [component, setComponent] = useState<string>("");
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    setMobile(window.innerWidth < 600);
    setComponent(dialogState.type);
  }, [dialogState.type]);

  useEffect(() => {
    if (dialogState.show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [dialogState.show]);

  const closeModal = async () => {
    await dispatch(clearDialog());
  };

  const list: Record<string, JSX.Element> = {
    // comment: <CommentReview close={closeModal} state={dialogState.state} />
  };

  if (!dialogState.show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          dialogState.show ? "opacity-25" : "opacity-0"
        }`}
        onClick={closeModal}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 overflow-y-auto z-50">
        <div
          className={`${
            mobile && dialogState.type !== "coupon-applied"
              ? "items-end"
              : "items-center"
          } ${
            mobile && dialogState.type === "coupon-applied"
              ? "w-[312px] mx-auto"
              : ""
          } flex min-h-full justify-center p-0 md:p-4 text-center`}
        >
          {/* Modal Panel */}
          <div
            className={`${
              dialogState.type === "coupon-applied"
                ? "rounded-[12px] min-w-[312px] w-[321px] md:min-w-[390px] md:w-[470px]"
                : dialogState.type === "login-inform"
                ? "md:w-[360px] md:max-w-[360px] md:min-w-[360px]"
                : dialogState.type === "login"
                ? "md:min-h-[610px] full-height-mobile md:min-w-[390px] md:w-[390px]"
                : dialogState.type === "payment-failed"
                ? "md:min-w-[340px] max-w-[360px] h-[234px]"
                : "md:min-w-[390px] md:w-[470px]"
            } ${
              dialogState.type === "coupon-applied" ? "" : "overflow-hidden"
            } min-h-full min-w-full max-w-md transform bg-white text-left align-middle shadow-xl transition-all duration-300 rounded-tr-[12px] rounded-tl-[12px] md:rounded-xl ${
              dialogState.show ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {list[component] || null}
          </div>
        </div>
      </div>
    </>
  );
}
