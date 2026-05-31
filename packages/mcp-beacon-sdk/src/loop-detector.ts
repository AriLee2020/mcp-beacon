/**
 * Loop Detector — detects when agents get stuck in repetitive message patterns.
 * Uses Jaccard similarity and LCS (Longest Common Subsequence) heuristics.
 *
 * ⚠️ EXPERIMENTAL: This is a heuristic detector, not a formal verification tool.
 * False positives are expected. Tune the thresholds for your use case.
 */

export interface LoopResult {
  similarity: number;
  messages: unknown[];
  repeated_pattern: string;
}

export class LoopDetector {
  private messageHistory: string[] = [];
  private maxHistory = 20;
  private jaccardThreshold = 0.85; // 85% similarity triggers alert
  private lcsThreshold = 0.9; // 90% LCS ratio triggers alert

  /** Check recent messages for loop patterns. Returns alert if detected. */
  check(messages: unknown): LoopResult | null {
    const content = this.extractContent(messages);
    if (!content) return null;

    this.messageHistory.push(content);
    if (this.messageHistory.length > this.maxHistory) {
      this.messageHistory.shift();
    }

    // Need at least 3 messages to detect a loop
    if (this.messageHistory.length < 3) return null;

    // Compare the last message with the previous 2
    return this.compareRecent();
  }

  /** Reset the detector state */
  reset(): void {
    this.messageHistory = [];
  }

  private compareRecent(): LoopResult | null {
    const last = this.messageHistory[this.messageHistory.length - 1];
    const results: LoopResult[] = [];

    for (let i = this.messageHistory.length - 2; i >= Math.max(0, this.messageHistory.length - 5); i--) {
      const prev = this.messageHistory[i];
      const jaccard = this.jaccardSimilarity(last, prev);
      const lcs = this.lcsRatio(last, prev);

      const combined = Math.max(jaccard, lcs);
      if (jaccard >= this.jaccardThreshold || lcs >= this.lcsThreshold) {
        results.push({
          similarity: Math.round(combined * 100) / 100,
          messages: [prev, last],
          repeated_pattern: this.findCommonPattern(last, prev),
        });
      }
    }

    return results.length > 0 ? results[0] : null;
  }

  /**
   * Jaccard similarity: |A ∩ B| / |A ∪ B| on character bigrams.
   * Fast, robust to reordering.
   */
  private jaccardSimilarity(a: string, b: string): number {
    const bigramsA = this.getBigrams(a);
    const bigramsB = this.getBigrams(b);

    const setA = new Set(bigramsA);
    const setB = new Set(bigramsB);

    let intersection = 0;
    for (const bg of setA) {
      if (setB.has(bg)) intersection++;
    }
    const union = setA.size + setB.size - intersection;
    return union === 0 ? 0 : intersection / union;
  }

  /**
   * Longest Common Subsequence ratio.
   * Better at catching structural similarities.
   */
  private lcsRatio(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    if (m === 0 || n === 0) return 0;

    // Use the shorter string for efficiency
    const dp: number[][] = Array.from({ length: 2 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
      const curr = i % 2;
      const prev = 1 - curr;
      for (let j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) {
          dp[curr][j] = dp[prev][j - 1] + 1;
        } else {
          dp[curr][j] = Math.max(dp[prev][j], dp[curr][j - 1]);
        }
      }
    }
    const lcsLen = dp[m % 2][n];
    return lcsLen / Math.max(m, n);
  }

  private getBigrams(text: string): string[] {
    const bigrams: string[] = [];
    for (let i = 0; i < text.length - 1; i++) {
      bigrams.push(text.substring(i, i + 2));
    }
    return bigrams;
  }

  private findCommonPattern(a: string, b: string): string {
    const maxLen = Math.min(a.length, b.length, 200);
    let commonPrefix = "";
    for (let i = 0; i < maxLen; i++) {
      if (a[i] === b[i]) {
        commonPrefix += a[i];
      } else {
        break;
      }
    }
    return commonPrefix.length > 20 ? commonPrefix + "..." : commonPrefix;
  }

  private extractContent(messages: unknown): string {
    if (typeof messages === "string") return messages;
    if (Array.isArray(messages)) {
      return messages
        .map((m) => {
          if (typeof m === "object" && m !== null) {
            const msg = m as Record<string, unknown>;
            return String(msg.content ?? "");
          }
          return String(m);
        })
        .join(" ");
    }
    if (typeof messages === "object" && messages !== null) {
      return JSON.stringify(messages);
    }
    return String(messages);
  }
}
