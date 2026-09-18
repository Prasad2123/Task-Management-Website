import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CheckCircle2, ChevronRight, Loader2, ShieldCheck } from 'lucide-react';

interface SwipeToApproveProps {
  onApprove: () => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
}

export const SwipeToApprove: React.FC<SwipeToApproveProps> = ({
  onApprove,
  isLoading = false,
  disabled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const x = useMotionValue(0);

  const backgroundOpacity = useTransform(x, [0, 200], [0.15, 0.95]);

  const handleDragEnd = async (_: any, info: any) => {
    if (!containerRef.current || disabled || isLoading || isCompleted) return;

    const containerWidth = containerRef.current.offsetWidth;
    const buttonWidth = 56;
    const maxDrag = containerWidth - buttonWidth - 8;
    const threshold = maxDrag * 0.8;

    if (info.offset.x >= threshold) {
      setIsCompleted(true);
      try {
        await onApprove();
      } catch {
        setIsCompleted(false);
      }
    } else {
      setIsCompleted(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-15 bg-slate-900 rounded-2xl p-1 overflow-hidden select-none shadow-lg border border-slate-800"
    >
      <motion.div
        className="absolute inset-0 bg-emerald-600 rounded-2xl pointer-events-none"
        style={{ opacity: isCompleted ? 1 : backgroundOpacity }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs sm:text-sm font-bold tracking-wider text-white uppercase px-12 text-center">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Authorizing Supervisor Approval...</span>
          </div>
        ) : isCompleted ? (
          <div className="flex items-center gap-1.5 text-white">
            <ShieldCheck className="w-4 h-4" />
            <span>Approved! Recording Sign-Off...</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-slate-300">
            <span>Swipe to Approve Work</span>
            <ChevronRight className="w-4 h-4 animate-pulse text-emerald-400" />
            <ChevronRight className="w-4 h-4 animate-pulse text-emerald-300 -ml-2" />
          </div>
        )}
      </div>

      {!isLoading && !isCompleted && (
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.05}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="relative z-10 w-13 h-13 rounded-xl bg-white text-emerald-700 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md hover:bg-slate-50 transition-colors"
        >
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </motion.div>
      )}
    </div>
  );
};
