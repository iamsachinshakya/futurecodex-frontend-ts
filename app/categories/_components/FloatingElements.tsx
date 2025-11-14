"use client";

export function FloatingElements() {
  return (
    <>
      {/* Floating Geometric Shapes */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-cyan-500/30 rounded-lg rotate-45 animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-purple-500/30 rounded-full animate-float-delayed"></div>
    </>
  );
}
