import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

function linesFromCounts(text: string, counts: readonly number[]) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let index = 0;
  for (const count of counts) {
    const line = words.slice(index, index + count).join(" ");
    if (line) lines.push(line);
    index += count;
  }
  if (index < words.length) {
    const rest = words.slice(index).join(" ");
    if (rest) lines.push(rest);
  }
  return lines.length ? lines : [text];
}

function splitLines(text: string, max = 22) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (current && next.length > max) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function lineStyle(delay: number, duration: number): CSSProperties {
  return { "--line-delay": `${delay}s`, "--line-dur": `${duration}s` } as CSSProperties;
}

/**
 * Headings are split in the server HTML. A blocking script marks
 * `data-motion-ready` before paint, and CSS starts each line hidden.
 * Reduced motion and no-JS skip that attribute, so the final text shows at once.
 */
export function LineReveal({
  as: Tag = "h2",
  text,
  lineWords,
  mobileLineWords,
  className,
  id,
  delay = 0,
  pace = 1,
  wordStagger,
  script,
  scriptClassName,
}: {
  as?: "h1" | "h2";
  text: string;
  /** Desktop line breaks, as word counts taken from `text`. */
  lineWords?: readonly number[];
  /** Mobile line breaks. Same font size as the rest of the heading. */
  mobileLineWords?: readonly number[];
  className?: string;
  id?: string;
  delay?: number;
  pace?: number;
  wordStagger?: number;
  script?: string;
  scriptClassName?: string;
}) {
  const desktop = lineWords?.length ? linesFromCounts(text, lineWords) : splitLines(text);
  const mobileLines = mobileLineWords?.length ? linesFromCounts(text, mobileLineWords) : null;
  const words = text.split(/\s+/).filter(Boolean);
  const glueTail = Tag === "h1" && !mobileLines && words.length >= 2;
  const mobileTokens: { label: string; index: number }[] = [];
  for (let index = 0; index < words.length; index += 1) {
    const next = words[index + 1];
    const glueForty = words[index] === "40" && next?.toLowerCase() === "years";
    const gluePair = glueTail && index === words.length - 2;
    if (next && (glueForty || gluePair)) {
      mobileTokens.push({ label: `${words[index]}\u00a0${next}`, index });
      index += 1;
    } else {
      mobileTokens.push({ label: words[index], index });
    }
  }
  const duration = Math.min(0.5, 0.4 * pace);
  const step = wordStagger ?? 0.06;
  const mobileStep = Math.min(step, 0.045);

  return (
    <Tag id={id} aria-label={text} className={cn("line-reveal relative max-w-full", className)}>
      <span aria-hidden="true" className="hidden md:block">
        {desktop.map((line, index) => (
          <span key={`${line}-${index}`} className="line-mask block">
            <span className="line-inner block" style={lineStyle(delay + index * step, duration)}>
              {line}
            </span>
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="block md:hidden">
        {mobileLines
          ? mobileLines.map((line, index) => (
              <span key={`${line}-${index}`} className="line-mask block">
                <span className="line-inner block" style={lineStyle(delay + index * step, duration)}>
                  {line}
                </span>
              </span>
            ))
          : mobileTokens.map((token, position) => {
              const animIndex = Math.min(token.index, 7);
              const pair = token.label.includes("\u00a0");
              return (
                <span key={`${token.label}-${token.index}`} className="line-mask inline-block max-w-full align-bottom">
                  <span className={cn("line-inner inline-block", pair && "whitespace-nowrap [overflow-wrap:normal]")} style={lineStyle(delay + animIndex * mobileStep, duration)}>
                    {token.label}
                    {position < mobileTokens.length - 1 ? "\u00a0" : ""}
                  </span>
                </span>
              );
            })}
      </span>
      {script ? (
        <span
          aria-hidden="true"
          className={cn(
            "script-accent pointer-events-none absolute inset-x-0 -top-2 overflow-hidden text-right text-[clamp(1.6rem,8vw,3rem)] leading-none",
            scriptClassName,
          )}
          style={{ "--script-delay": `${delay + duration}s` } as CSSProperties}
        >
          {script}
        </span>
      ) : null}
    </Tag>
  );
}
