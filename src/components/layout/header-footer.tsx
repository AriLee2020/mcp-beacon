import Link from "next/link";
import { MCPBeaconLogo } from "./logo";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <MCPBeaconLogo className="w-8 h-8" />
          <span className="font-bold text-lg tracking-tight">MCP Beacon</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link>
          <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">Sign In</Link>
          <Link
            href="/auth/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MCPBeaconLogo className="w-6 h-6" />
              <span className="font-bold">MCP Beacon</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI Agent Observability Platform</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#features" className="hover:text-gray-900 dark:hover:text-gray-200">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-gray-900 dark:hover:text-gray-200">Pricing</Link></li>
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Documentation</Link></li>
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-200">API Reference</Link></li>
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-200">SDK Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-200">About</Link></li>
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Blog</Link></li>
              <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} MCP Beacon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
