"use client";

import { useState } from "react";
import { X, Copy, Check, Mail } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("sales@mcpbeacon.asia");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = "sales@mcpbeacon.asia";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Contact Sales
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Our team will help you find the right plan for your needs. 
            Reach out and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="space-y-4">
          {/* Email section */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Email us directly
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                sales@mcpbeacon.asia
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* What to include in your message */}
          <div className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
            <p className="font-medium mb-1">💡 Tips for a faster response:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Tell us about your team size and use case</li>
              <li>Estimated monthly API call volume</li>
              <li>Any specific compliance or SSO requirements</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 
              hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
