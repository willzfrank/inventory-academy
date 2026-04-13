import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

const LENGTH = 6;
const MASK_DELAY_MS = 600;

export default function OneTokenForm() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(() => Array(LENGTH).fill(""));
  /** When true, show the real digit; when false but digit set, show bullet */
  const [plainVisible, setPlainVisible] = useState<boolean[]>(() => Array(LENGTH).fill(false));
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const maskTimersRef = useRef<(ReturnType<typeof setTimeout> | null)[]>(
    Array.from({ length: LENGTH }, () => null)
  );

  const clearMaskTimer = useCallback((index: number) => {
    const t = maskTimersRef.current[index];
    if (t) {
      clearTimeout(t);
      maskTimersRef.current[index] = null;
    }
  }, []);

  const scheduleMask = useCallback(
    (index: number) => {
      clearMaskTimer(index);
      maskTimersRef.current[index] = setTimeout(() => {
        setPlainVisible((prev) => {
          const next = [...prev];
          next[index] = false;
          return next;
        });
        maskTimersRef.current[index] = null;
      }, MASK_DELAY_MS);
    },
    [clearMaskTimer]
  );

  useEffect(() => {
    const timers = maskTimersRef.current;
    return () => {
      timers.forEach((t) => {
        if (t) clearTimeout(t);
      });
    };
  }, []);

  const focusAt = useCallback((index: number) => {
    const el = inputsRef.current[index];
    if (el) el.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = cleaned;
    setDigits(next);

    if (cleaned) {
      setPlainVisible((prev) => {
        const p = [...prev];
        p[index] = true;
        return p;
      });
      scheduleMask(index);
      if (index < LENGTH - 1) focusAt(index + 1);
    } else {
      clearMaskTimer(index);
      setPlainVisible((prev) => {
        const p = [...prev];
        p[index] = false;
        return p;
      });
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      clearMaskTimer(index - 1);
      focusAt(index - 1);
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      setPlainVisible((prev) => {
        const p = [...prev];
        p[index - 1] = false;
        return p;
      });
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    for (let i = 0; i < LENGTH; i++) clearMaskTimer(i);
    const next = [...digits];
    for (let i = 0; i < LENGTH; i++) next[i] = pasted[i] ?? "";
    setDigits(next);
    const visible = Array(LENGTH).fill(false);
    for (let i = 0; i < pasted.length; i++) {
      visible[i] = true;
      scheduleMask(i);
    }
    setPlainVisible(visible);
    const last = Math.min(pasted.length, LENGTH) - 1;
    if (last >= 0) focusAt(last);
  };

  const handleFocus = (index: number) => {
    if (!digits[index]) return;
    clearMaskTimer(index);
    setPlainVisible((prev) => {
      const p = [...prev];
      p[index] = true;
      return p;
    });
    scheduleMask(index);
  };

  const token = digits.join("");
  const isComplete = token.length === LENGTH;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isComplete) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    navigate("/dashboard");
  };

  const cellClass =
    "relative h-12 w-12 shrink-0 sm:h-14 sm:w-14 rounded-lg border border-neutral-grey3 bg-primary-sterling-white outline-none transition focus-within:border-neutral-grey3 focus-within:ring-2 focus-within:ring-neutral-grey3/20";

  const inputClass =
    "absolute inset-0 z-10 w-full bg-transparent text-center text-lg font-bold leading-6 text-transparent caret-black outline-none";

  const overlayClass =
    "pointer-events-none absolute inset-0 z-0 flex items-center justify-center text-lg font-bold leading-6 text-primary-sterling-black select-none";

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[400px] space-y-6">
      <div className="space-y-3">
        <label htmlFor="onetoken-0" className="text-base font-medium leading-6 text-neutral-black1">
          OneToken
        </label>
        <div className="flex max-w-[400px] gap-2 sm:gap-3">
          {digits.map((d, i) => (
            <div key={i} className={cellClass}>
              <input
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                id={i === 0 ? "onetoken-0" : undefined}
                type="text"
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                onFocus={() => handleFocus(i)}
                className={inputClass}
                aria-label={`Digit ${i + 1} of ${LENGTH}`}
              />
              <span className={overlayClass} aria-hidden>
                {d ? (plainVisible[i] ? d : "•") : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" isLoading={isLoading} disabled={isLoading || !isComplete}>
        Login
      </Button>
      <p className="text-center">
        <Link
          to="/login"
          className="text-base font-medium text-primary-sterling-red hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-sterling-red/30"
        >
          Go Back
        </Link>
      </p>
    </form>
  );
}
