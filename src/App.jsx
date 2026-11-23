import React, { useState, useRef, useEffect, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { 
  Code2, 
  Braces, 
  Sliders, 
  GitBranch, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Sun, 
  Moon, 
  Sparkles, 
  Copy, 
  Check,
  Terminal,
  Eye,
  Layers,
  BookOpen,
  Search,
  ChevronRight,
  ChevronDown,
  Box,
  MousePointerClick,
  ListChecks,
  FileText,
  AlignLeft,
  ChevronDownSquare,
  LayoutGrid,
  CheckSquare,
  CircleDot,
  ExternalLink,
  Loader2,
  Palette,
  FileCode,
  Paintbrush,
  Compass,
  Zap,
  Crosshair,
  Cpu,
  Hash,
  Menu,
  X
} from 'lucide-react';

// ============================================================================
// UTILITY: Simple Syntax Highlighter Component
// Highlights JSX tags, curly braces, strings, keywords, and comments cleanly
// ============================================================================
const CodeBlock = ({ code, title, badge, darkMode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tokenize lines for clean, safe syntax coloring without dangerous HTML injection
  const renderHighlightedLine = (line, lineIndex) => {
    // Handle single-line comments
    if (line.trim().startsWith('//')) {
      return <span className="text-slate-400 italic">{line}</span>;
    }

    // Regex splitting for JSX tags, strings, keywords, and curly braces
    const tokens = line.split(/(\bconst\b|\blet\b|\breturn\b|\bif\b|\belse\b|\bfunction\b|\btrue\b|\bfalse\b|\bnull\b|<\/?[a-zA-Z0-9.-]+|\/?>|"[^"]*"|'[^']*'|`[^`]*`|\{|\})/g);

    return tokens.map((token, idx) => {
      if (!token) return null;

      // Keywords
      if (/^(const|let|return|if|else|function)$/.test(token)) {
        return <span key={idx} className="text-purple-400 font-semibold">{token}</span>;
      }
      // Booleans / Null
      if (/^(true|false|null)$/.test(token)) {
        return <span key={idx} className="text-amber-400 font-medium">{token}</span>;
      }
      // Strings
      if (/^(".*"|'.*'|`.*`)$/.test(token)) {
        return <span key={idx} className="text-emerald-400">{token}</span>;
      }
      // JSX Tags
      if (/^(<\/?[a-zA-Z0-9.-]+|\/?>)$/.test(token)) {
        return <span key={idx} className="text-sky-400 font-medium">{token}</span>;
      }
      // Curly Braces
      if (token === '{' || token === '}') {
        return <span key={idx} className="text-yellow-300 font-bold">{token}</span>;
      }
      return <span key={idx} className="text-slate-200">{token}</span>;
    });
  };

  return (
    <div className={`rounded-xl overflow-hidden border transition-colors ${
      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-300 shadow-sm'
    }`}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/60 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {badge}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <pre>
          {code.split('\n').map((line, i) => (
            <div key={i} className="table-row">
              <span className="table-cell pr-4 text-right select-none text-slate-600 text-xs">
                {i + 1}
              </span>
              <span className="table-cell whitespace-pre">
                {renderHighlightedLine(line, i)}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

// ============================================================================
// MODULE 1: React JSX Intro
// ============================================================================
const JsxIntroModule = ({ darkMode }) => {
  const [viewMode, setViewMode] = useState('jsx'); // 'jsx' | 'compiled'
  const [headingText, setHeadingText] = useState('Hello, React World!');
  const [tagType, setTagType] = useState('h2');
  const [includeSubtext, setIncludeSubtext] = useState(true);

  const jsxSnippet = `function WelcomeBanner() {
  return (
    <div className="banner-card">
      <${tagType}>${headingText}</${tagType}>${
    includeSubtext ? `\n      <p>JSX compiles directly into React.createElement() calls.</p>` : ''
  }
    </div>
  );
}`;

  const compiledSnippet = `function WelcomeBanner() {
  return React.createElement(
    "div",
    { className: "banner-card" },
    React.createElement("${tagType}", null, "${headingText}")${
    includeSubtext
      ? `,\n    React.createElement("p", null, "JSX compiles directly into React.createElement() calls.")`
      : ''
  }
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Conceptual Explanation */}
      <section className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
            <BookOpen className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold">What is JSX?</h2>
        </div>
        <p className={`leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          <strong>JSX (JavaScript XML)</strong> is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. Under the hood, build tools like Babel or Vite transform JSX into standard <code className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-sm">React.createElement()</code> function calls that return plain JavaScript objects describing the UI.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-semibold text-sm mb-1 text-indigo-400">1. Single Root Element</h4>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Adjacent JSX elements must be wrapped in a single parent tag or a Fragment (<code className="font-mono">&lt;&gt;...&lt;/&gt;</code>).
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-semibold text-sm mb-1 text-indigo-400">2. Close All Tags</h4>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Every element must be explicitly closed, including self-closing tags like <code className="font-mono">&lt;img /&gt;</code> and <code className="font-mono">&lt;br /&gt;</code>.
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-semibold text-sm mb-1 text-indigo-400">3. Declarative UI</h4>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Instead of manually mutating DOM nodes, you describe <em>what</em> the UI should look like for a given state.
            </p>
          </div>
        </div>
      </section>

      {/* Side-by-Side Code Comparison */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-500" />
            JSX vs. Compiled JavaScript
          </h3>
          <div className={`inline-flex rounded-lg p-1 border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setViewMode('jsx')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'jsx'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side View
            </button>
            <button
              onClick={() => setViewMode('compiled')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'compiled'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Focus Compiled Output
            </button>
          </div>
        </div>

        <div className={`grid gap-4 ${viewMode === 'jsx' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {viewMode === 'jsx' && (
            <CodeBlock
              title="WelcomeBanner.jsx"
              badge="What You Write"
              code={jsxSnippet}
              darkMode={darkMode}
            />
          )}
          <CodeBlock
            title="WelcomeBanner.compiled.js"
            badge="What Babel Outputs"
            code={compiledSnippet}
            darkMode={darkMode}
          />
        </div>
      </section>

      {/* Interactive Sandbox */}
      <section className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Interactive JSX Compiler Sandbox</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                Heading Content
              </label>
              <input
                type="text"
                value={headingText}
                onChange={(e) => setHeadingText(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
                placeholder="Type heading text..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                  HTML Element Tag
                </label>
                <select
                  value={tagType}
                  onChange={(e) => setTagType(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="h1">&lt;h1&gt; (Largest)</option>
                  <option value="h2">&lt;h2&gt; (Section)</option>
                  <option value="h3">&lt;h3&gt; (Subsection)</option>
                  <option value="span">&lt;span&gt; (Inline)</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <label className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer select-none ${
                  darkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={includeSubtext}
                    onChange={(e) => setIncludeSubtext(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium">Include &lt;p&gt; child</span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Rendered Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-500" /> Live Browser Output
              </span>
              <span className="text-xs font-mono text-emerald-500">Rendered DOM</span>
            </div>
            <div className={`p-6 rounded-xl border-2 border-dashed transition-all ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
            }`}>
              <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg">
                {React.createElement(
                  tagType,
                  {
                    className:
                      tagType === 'h1'
                        ? 'text-2xl font-extrabold tracking-tight'
                        : tagType === 'h2'
                        ? 'text-xl font-bold'
                        : tagType === 'h3'
                        ? 'text-lg font-semibold'
                        : 'text-base font-medium',
                  },
                  headingText || '(Empty Heading)'
                )}
                {includeSubtext && (
                  <p className="mt-2 text-sm text-indigo-100">
                    JSX compiles directly into React.createElement() calls.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 2: React JSX Expressions
// ============================================================================
const JsxExpressionsModule = ({ darkMode }) => {
  const [userName, setUserName] = useState('Ada Lovelace');
  const [price, setPrice] = useState(49);
  const [quantity, setQuantity] = useState(3);
  const [discountPercent, setDiscountPercent] = useState(20);

  const subtotal = price * quantity;
  const total = subtotal - (subtotal * discountPercent) / 100;

  const jsxCode = `function OrderSummary() {
  const user = "${userName}";
  const price = ${price};
  const quantity = ${quantity};
  const discount = ${discountPercent};

  const formatCurrency = (val) => "$" + val.toFixed(2);

  return (
    <div className="summary">
      <h3>Customer: {user.toUpperCase()}</h3>
      <p>Calculation: {price} × {quantity} = {price * quantity}</p>
      <p>After {discount}% off: {formatCurrency((price * quantity) * (1 - discount / 100))}</p>
    </div>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Conceptual Explanation */}
      <section className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
            <Braces className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold">Embedding JavaScript with Curly Braces <code className="text-amber-500">{`{ }`}</code></h2>
        </div>
        <p className={`leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Curly braces <code className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-sm">{`{ }`}</code> are your portal into JavaScript inside JSX. Any valid JavaScript <strong>expression</strong> (something that evaluates to a value) can be placed inside curly braces—including variables, arithmetic operations, method calls, and array mappings.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-emerald-950/20 border-emerald-800/40' : 'bg-emerald-50 border-emerald-200'}`}>
            <div className="flex items-center gap-2 font-semibold text-sm text-emerald-500 mb-1.5">
              <CheckCircle2 className="w-4 h-4" /> Valid Expressions (Allowed)
            </div>
            <ul className={`text-xs space-y-1 font-mono ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• {`{user.name}`} (Property access)</li>
              <li>• {`{2 + 2 * 10}`} (Math operations)</li>
              <li>• {`{formatDate(now)}`} (Function calls)</li>
              <li>• {`{items.length > 0 ? "Full" : "Empty"}`} (Ternary)</li>
            </ul>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-rose-950/20 border-rose-800/40' : 'bg-rose-50 border-rose-200'}`}>
            <div className="flex items-center gap-2 font-semibold text-sm text-rose-500 mb-1.5">
              <AlertCircle className="w-4 h-4" /> Statements & Raw Objects (Invalid)
            </div>
            <ul className={`text-xs space-y-1 font-mono ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• {`{if (x) { return y; }}`} (Statements fail)</li>
              <li>• {`{for (let i=0; i<5; i++)}`} (Loops fail)</li>
              <li>• {`{{ name: "Ada" }}`} (Raw objects throw error)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Block */}
      <CodeBlock
        title="OrderSummary.jsx"
        badge="Dynamic Expressions"
        code={jsxCode}
        darkMode={darkMode}
      />

      {/* Interactive Sandbox */}
      <section className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Live Expression Evaluator Playground</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                String Variable: <code className="text-amber-500">user</code>
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                  Price ($)
                </label>
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                  className={`w-full px-3 py-2 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                  className={`w-full px-3 py-2 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                  Discount (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                  className={`w-full px-3 py-2 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Rendered Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-500" /> Evaluated Component Output
              </span>
              <span className="text-xs font-mono text-amber-500">Live Expressions</span>
            </div>

            <div className={`p-5 rounded-xl border-2 border-dashed ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
            }`}>
              <div className={`p-5 rounded-xl border ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between border-b pb-3 mb-3 border-slate-700/40">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-500 font-semibold">
                      {`{user.toUpperCase()}`}
                    </span>
                    <h4 className="text-lg font-bold">
                      {userName ? userName.toUpperCase() : 'GUEST'}
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-500 font-semibold">
                    {discountPercent}% OFF
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-75">Expression <code>{`{price * quantity}`}</code>:</span>
                    <span className="font-mono font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Savings <code>{`{subtotal * (discount/100)}`}</code>:</span>
                    <span className="font-mono text-rose-400">-${((subtotal * discountPercent) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-700/40 text-base font-bold">
                    <span>Final <code>{`{formatCurrency(total)}`}</code>:</span>
                    <span className="font-mono text-emerald-500">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 3: React JSX Attributes
// ============================================================================
const JsxAttributesModule = ({ darkMode }) => {
  const [btnVariant, setBtnVariant] = useState('primary'); // 'primary' | 'danger' | 'outline'
  const [isDisabled, setIsDisabled] = useState(false);
  const [borderRadius, setBorderRadius] = useState(12);
  const [customTitle, setCustomTitle] = useState('Click to deploy production build');
  const [clickCount, setClickCount] = useState(0);

  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white border-transparent',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white border-transparent',
    outline: darkMode
      ? 'bg-transparent hover:bg-slate-800 text-indigo-400 border-indigo-500'
      : 'bg-transparent hover:bg-indigo-50 text-indigo-600 border-indigo-600',
  };

  const jsxCode = `function ActionButton() {
  const isDisabled = ${isDisabled};
  const dynamicStyle = {
    borderRadius: "${borderRadius}px",
    opacity: ${isDisabled ? 0.5 : 1}
  };

  return (
    <button
      type="button"
      className="btn btn-${btnVariant}"
      style={dynamicStyle}
      disabled={isDisabled}
      title="${customTitle}"
      onClick={() => handleDeploy()}
    >
      Deploy Project
    </button>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Conceptual Explanation */}
      <section className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
            <Sliders className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold">JSX Attributes & camelCase Conventions</h2>
        </div>
        <p className={`leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Because JSX is closer to JavaScript than to HTML, React DOM uses <strong>camelCase</strong> property naming instead of HTML attribute names. You can pass string literals with quotes (<code className="font-mono text-sky-400">type="button"</code>) or dynamic JavaScript values using curly braces (<code className="font-mono text-sky-400">disabled={`{isDisabled}`}</code>).
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-semibold text-sm mb-1 text-sky-400 font-mono">class → className</h4>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Since <code className="font-mono">class</code> is a reserved JavaScript keyword, JSX uses <code className="font-mono">className</code> for CSS classes.
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-semibold text-sm mb-1 text-sky-400 font-mono">style={`{{ ... }}`}</h4>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Inline styles accept a JavaScript object with camelCased keys (e.g., <code className="font-mono">backgroundColor</code>, <code className="font-mono">borderRadius</code>).
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-semibold text-sm mb-1 text-sky-400 font-mono">Boolean Attributes</h4>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Pass boolean expressions directly inside braces, like <code className="font-mono">disabled={`{true}`}</code> or <code className="font-mono">readOnly={`{false}`}</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Code Block */}
      <CodeBlock
        title="ActionButton.jsx"
        badge="camelCase & Dynamic Props"
        code={jsxCode}
        darkMode={darkMode}
      />

      {/* Interactive Sandbox */}
      <section className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Interactive Attribute & Style Inspector</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                <code>className</code> Theme Variant
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['primary', 'danger', 'outline'].map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setBtnVariant(variant)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold capitalize border transition-all ${
                      btnVariant === variant
                        ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                        : darkMode
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                <span><code>style={`{{ borderRadius }}`}</code></span>
                <span className="font-mono text-sky-500">{borderRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                  <code>title</code> Tooltip Attribute
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer select-none ${
                  darkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={isDisabled}
                    onChange={(e) => setIsDisabled(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-xs font-mono font-medium">
                    disabled={`{${isDisabled}}`}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Live Rendered Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-500" /> Interactive Component Preview
              </span>
              <span className="text-xs font-mono text-sky-500">
                Clicks: {clickCount}
              </span>
            </div>

            <div className={`p-8 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[180px] ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
            }`}>
              <button
                type="button"
                disabled={isDisabled}
                title={customTitle}
                onClick={() => setClickCount((c) => c + 1)}
                style={{
                  borderRadius: `${borderRadius}px`,
                  opacity: isDisabled ? 0.5 : 1,
                }}
                className={`px-6 py-3 font-semibold text-sm border-2 transition-all duration-150 shadow-md ${
                  variantClasses[btnVariant]
                } ${isDisabled ? 'cursor-not-allowed' : 'active:scale-95 cursor-pointer'}`}
              >
                Deploy Project
              </button>
              <p className="mt-3 text-xs opacity-60 text-center">
                {isDisabled
                  ? 'Button is disabled — onClick events are blocked by the DOM.'
                  : 'Hover to see your custom title tooltip, or click to trigger onClick!'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 4: React JSX If Statements (Conditional Rendering)
// ============================================================================
const JsxIfStatementsModule = ({ darkMode }) => {
  const [pattern, setPattern] = useState('ternary'); // 'if-else' | 'ternary' | 'logical-and'
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(4);
  const [role, setRole] = useState('admin'); // 'admin' | 'member'

  const getSnippetForPattern = () => {
    if (pattern === 'if-else') {
      return `function UserGreeting({ isLoggedIn, role }) {
  // Standard if/else statements live OUTSIDE the JSX return
  if (!isLoggedIn) {
    return <button>Sign In to Continue</button>;
  }

  if (role === "admin") {
    return <div className="badge-admin">Welcome, System Admin!</div>;
  }

  return <div className="badge-member">Welcome back, Member!</div>;
}`;
    }
    if (pattern === 'ternary') {
      return `function UserStatus({ isLoggedIn, role }) {
  // Ternary operators (? :) work INSIDE JSX curly braces
  return (
    <div className="status-card">
      {isLoggedIn ? (
        <span>Authenticated as {role === "admin" ? "Admin" : "Member"}</span>
      ) : (
        <span>Guest Mode — Please Log In</span>
      )}
    </div>
  );
}`;
    }
    return `function NotificationBell({ isLoggedIn, unreadCount }) {
  // Logical && renders the right side ONLY when left side is truthy
  return (
    <div className="inbox">
      <span>Messages</span>
      {isLoggedIn && unreadCount > 0 && (
        <span className="pill">{unreadCount} New</span>
      )}
    </div>
  );
}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Conceptual Explanation */}
      <section className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5 mb-3">
          <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <GitBranch className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold">Conditional Rendering in JSX</h2>
        </div>
        <p className={`leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          React does not have special template directives like <code className="font-mono">v-if</code> or <code className="font-mono">*ngIf</code>. Instead, you use standard JavaScript conditionals! Because <code className="font-mono text-emerald-400">if / else</code> is a statement (not an expression), you place it <em>outside</em> JSX, or use inline ternary (<code className="font-mono text-emerald-400">? :</code>) and logical AND (<code className="font-mono text-emerald-400">&&</code>) expressions inside curly braces.
        </p>

        <div className="grid sm:grid-cols-3 gap-3">
          {[
            {
              id: 'if-else',
              title: '1. External if / else',
              desc: 'Best for early returns or complex branching before returning JSX.',
            },
            {
              id: 'ternary',
              title: '2. Ternary (? :)',
              desc: 'Best for inline either/or branches directly inside JSX markup.',
            },
            {
              id: 'logical-and',
              title: '3. Logical && Operator',
              desc: 'Best when you want to render an element or nothing at all.',
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPattern(item.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                pattern === item.id
                  ? 'bg-emerald-500/10 border-emerald-500 ring-1 ring-emerald-500'
                  : darkMode
                  ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="font-semibold text-sm text-emerald-500 mb-1">{item.title}</div>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Code Block */}
      <CodeBlock
        title="ConditionalRender.jsx"
        badge={`Pattern: ${pattern}`}
        code={getSnippetForPattern()}
        darkMode={darkMode}
      />

      {/* Interactive Sandbox */}
      <section className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Conditional Logic Simulator</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-700/40">
              <div>
                <div className="text-sm font-semibold font-mono">isLoggedIn</div>
                <div className="text-xs opacity-70">Toggle user authentication state</div>
              </div>
              <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
                  isLoggedIn
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {String(isLoggedIn)}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                  <code>role</code> Variable
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="admin">"admin"</option>
                  <option value="member">"member"</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                  <code>unreadCount</code>
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={unreadMessages}
                  onChange={(e) => setUnreadMessages(Math.max(0, Number(e.target.value) || 0))}
                  className={`w-full px-3 py-2 rounded-lg border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Rendered Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-500" /> Rendered Branch Output
              </span>
              <span className="text-xs font-mono text-emerald-500">Live State</span>
            </div>

            <div className={`p-6 rounded-xl border-2 border-dashed min-h-[165px] flex flex-col justify-center ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
            }`}>
              {/* Render based on selected pattern */}
              {pattern === 'if-else' && (
                <div>
                  {!isLoggedIn ? (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-400">Session Expired</span>
                      <button
                        onClick={() => setIsLoggedIn(true)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold"
                      >
                        Sign In to Continue
                      </button>
                    </div>
                  ) : role === 'admin' ? (
                    <div className="p-4 rounded-xl bg-purple-500/15 border border-purple-500/40 text-purple-300 font-semibold text-sm">
                      🛡️ Welcome, System Admin! Full dashboard access granted.
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-sky-500/15 border border-sky-500/40 text-sky-300 font-semibold text-sm">
                      👋 Welcome back, Member!
                    </div>
                  )}
                </div>
              )}

              {pattern === 'ternary' && (
                <div className={`p-4 rounded-xl border ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="text-xs font-mono opacity-60 mb-1">
                    {`{isLoggedIn ? <Authenticated /> : <Guest />}`}
                  </div>
                  {isLoggedIn ? (
                    <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>
                        Authenticated as {role === 'admin' ? 'Admin' : 'Member'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-400 font-semibold">
                      <AlertCircle className="w-5 h-5" />
                      <span>Guest Mode — Please Log In</span>
                    </div>
                  )}
                </div>
              )}

              {pattern === 'logical-and' && (
                <div className={`p-4 rounded-xl border flex items-center justify-between ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-5 h-5 text-indigo-400" />
                    <span className="font-semibold text-sm">Inbox Notifications</span>
                  </div>
                  {isLoggedIn && unreadMessages > 0 ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white animate-pulse">
                      {unreadMessages} New
                    </span>
                  ) : (
                    <span className="text-xs font-mono opacity-50">
                      (Nothing rendered: condition false)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// SHARED UI: Standard Module Header & Concept Card
// ============================================================================
const TopicHeader = ({ icon: Icon, iconBg, iconColor, title, description, tips = [], darkMode }) => (
  <section className={`p-6 rounded-2xl border ${
    darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
  }`}>
    <div className="flex items-center gap-2.5 mb-3">
      <span className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    <p className={`leading-relaxed ${tips.length > 0 ? 'mb-4' : ''} ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
      {description}
    </p>
    {tips.length > 0 && (
      <div className={`grid sm:grid-cols-${Math.min(tips.length, 3)} gap-3 pt-1`}>
        {tips.map((tip, i) => (
          <div key={i} className={`p-3.5 rounded-xl border ${
            darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className={`font-semibold text-xs mb-1 ${iconColor}`}>{tip.title}</h4>
            <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {tip.text}
            </p>
          </div>
        ))}
      </div>
    )}
  </section>
);

// ============================================================================
// MODULE 5: React Props Children
// ============================================================================
const PropsChildrenModule = ({ darkMode }) => {
  const [cardTheme, setCardTheme] = useState('indigo');
  const [cardTitle, setCardTitle] = useState('System Notification');
  const [bodyCopy, setBodyCopy] = useState('Any JSX passed between opening and closing tags is received as props.children.');
  const [showFooterBtn, setShowFooterBtn] = useState(true);

  const themes = {
    indigo: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
    emerald: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    amber: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  };

  const WrapperCard = ({ title, theme, children }) => (
    <div className={`p-5 rounded-xl border-2 transition-all ${themes[theme]}`}>
      <div className="text-xs font-mono uppercase tracking-wider opacity-75 mb-1">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );

  const code = `function WrapperCard({ title, children }) {
  return (
    <div className="card-shell">
      <h4>{title}</h4>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Parent passes arbitrary JSX inside <WrapperCard>...</WrapperCard>
<WrapperCard title="${cardTitle}">
  <p>${bodyCopy}</p>${showFooterBtn ? `\n  <button>Acknowledge</button>` : ''}
</WrapperCard>`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={Box}
        iconBg="bg-violet-500/10"
        iconColor="text-violet-500"
        title="React Props Children"
        description="Every React component automatically receives a special prop named children. It contains whatever JSX, text, or nested components are placed between the component's opening and closing tags—enabling reusable layout wrappers, modals, and cards."
        tips={[
          { title: 'Composition Pattern', text: 'Wrap arbitrary UI without knowing child structure ahead of time.' },
          { title: 'Any Renderable Type', text: 'children can be strings, elements, arrays, or even render functions.' },
          { title: 'React.Children API', text: 'Use React.Children.count(children) to inspect passed slots safely.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="WrapperCard.jsx" badge="props.children" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Component Composition Sandbox</h3>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">Wrapper Prop: <code>title</code></label>
              <input
                type="text"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'}`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">Child Element 1: <code>&lt;p&gt;</code></label>
              <input
                type="text"
                value={bodyCopy}
                onChange={(e) => setBodyCopy(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'}`}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                {['indigo', 'emerald', 'amber'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setCardTheme(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border ${
                      cardTheme === t ? 'bg-violet-600 text-white border-violet-500' : darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFooterBtn}
                  onChange={(e) => setShowFooterBtn(e.target.checked)}
                  className="rounded text-violet-600"
                />
                Pass <code>&lt;button&gt;</code> child
              </label>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-75 mb-2 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-500" /> Rendered Wrapper Output
            </div>
            <div className={`p-5 rounded-xl border-2 border-dashed ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}>
              <WrapperCard title={cardTitle || 'Untitled Wrapper'} theme={cardTheme}>
                <p className={`text-sm ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{bodyCopy}</p>
                {showFooterBtn && (
                  <button
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
                  >
                    Acknowledge
                  </button>
                )}
              </WrapperCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 6: React Events
// ============================================================================
const EventsModule = ({ darkMode }) => {
  const [eventLogs, setEventLogs] = useState(['Click, double-click, hover, or type in the pad to inspect SyntheticEvents']);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [lastKey, setLastKey] = useState('None');

  const pushLog = (msg) => {
    const time = new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' });
    setEventLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 5)]);
  };

  const code = `function EventPlayground() {
  const handleShoot = (goalType, event) => {
    event.preventDefault();
    console.log("Event type:", event.type, "Goal:", goalType);
  };

  return (
    <button onClick={(e) => handleShoot("Penalty Kick", e)}>
      Take the Shot!
    </button>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={MousePointerClick}
        iconBg="bg-rose-500/10"
        iconColor="text-rose-500"
        title="React Events"
        description="React events are named using camelCase (e.g., onClick, onMouseMove, onKeyDown) rather than lowercase, and you pass a function reference as the event handler rather than a string. React wraps native browser events in a cross-browser SyntheticEvent."
        tips={[
          { title: 'Pass Functions, Don’t Call', text: 'Write onClick={shoot}, not onClick={shoot()} which triggers immediately on render.' },
          { title: 'Passing Arguments', text: 'Use an arrow wrapper: onClick={(e) => shoot("Goal!", e)}.' },
          { title: 'SyntheticEvent', text: 'Call e.preventDefault() or e.stopPropagation() reliably across all browsers.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="EventPlayground.jsx" badge="SyntheticEvent" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold">SyntheticEvent Interactive Console</h3>
          </div>
          <button
            onClick={() => setEventLogs([])}
            className="text-xs px-2.5 py-1 rounded border border-slate-700/50 hover:bg-slate-800/40"
          >
            Clear Log
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={(e) => pushLog(`onClick fired (button=${e.button})`)}
                onDoubleClick={() => pushLog('onDoubleClick fired!')}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm active:scale-95 transition-transform"
              >
                Click or Double-Click Me
              </button>
              <button
                onMouseEnter={() => pushLog('onMouseEnter triggered')}
                onMouseLeave={() => pushLog('onMouseLeave triggered')}
                className={`px-4 py-2 rounded-lg border text-xs font-semibold ${
                  darkMode ? 'bg-slate-950 border-slate-700 hover:border-rose-500' : 'bg-slate-100 border-slate-300'
                }`}
              >
                Hover Sensor
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                Keyboard Event Listener (<code>onKeyDown</code>) — Last Key: <span className="text-rose-400 font-mono">{lastKey}</span>
              </label>
              <input
                type="text"
                placeholder="Type any key here..."
                onKeyDown={(e) => {
                  setLastKey(e.key);
                  pushLog(`onKeyDown: key="${e.key}" code="${e.code}"`);
                }}
                className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'}`}
              />
            </div>

            <div
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setCoords({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
              }}
              className={`h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center select-none ${
                darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
              }`}
            >
              <span className="text-xs font-semibold opacity-75">onMouseMove Tracker Pad</span>
              <span className="text-sm font-mono text-rose-400 mt-1">
                clientX: {coords.x}px | clientY: {coords.y}px
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="text-slate-500 border-b border-slate-800 pb-2 mb-2 flex justify-between">
                <span>SyntheticEvent Stream</span>
                <span>Latest 6</span>
              </div>
              <div className="space-y-1.5">
                {eventLogs.length === 0 ? (
                  <div className="text-slate-600 italic">Waiting for user interaction...</div>
                ) : (
                  eventLogs.map((log, i) => (
                    <div key={i} className={i === 0 ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 7: React Conditional Rendering
// ============================================================================
const ConditionalRenderingModule = ({ darkMode }) => {
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'empty' | 'ready'

  const code = `function DataPanel({ status, items }) {
  switch (status) {
    case "loading":
      return <Spinner />;
    case "error":
      return <ErrorBanner message="Failed to fetch records" />;
    case "empty":
      return <EmptyState />;
    default:
      return <RecordsTable data={items} />;
  }
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={GitBranch}
        iconBg="bg-teal-500/10"
        iconColor="text-teal-500"
        title="React Conditional Rendering"
        description="In React, components render different UI trees depending on application state or props. Beyond basic if statements, real-world apps combine early returns, ternary expressions, logical && guards, and lookup maps to handle loading, error, empty, and success states cleanly."
        tips={[
          { title: 'Avoid Falsy 0 Pitfall', text: 'Use items.length > 0 && <List /> instead of items.length && <List /> so 0 isn’t printed.' },
          { title: 'Returning null', text: 'A component returning null renders nothing in the DOM while keeping hooks intact.' },
          { title: 'State Machines', text: 'Model mutually exclusive UI states with a single status string ("idle" | "loading" | "error").' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="DataPanel.jsx" badge="Multi-State UI" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold">UI State Switcher Sandbox</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['loading', 'error', 'empty', 'ready'].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold capitalize border transition-all ${
                  status === s
                    ? 'bg-teal-600 text-white border-teal-500'
                    : darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-xl border-2 border-dashed min-h-[150px] flex items-center justify-center ${
          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
        }`}>
          {status === 'loading' && (
            <div className="flex items-center gap-3 text-teal-400 font-medium">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Fetching latest user records from API...</span>
            </div>
          )}
          {status === 'error' && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <div className="font-bold text-sm">503 Service Unavailable</div>
                <div className="text-xs opacity-80">Unable to reach upstream database. Click "ready" to recover.</div>
              </div>
            </div>
          )}
          {status === 'empty' && (
            <div className="text-center opacity-75">
              <div className="font-semibold text-sm">No Records Found</div>
              <div className="text-xs mt-1">Your query returned 0 items.</div>
            </div>
          )}
          {status === 'ready' && (
            <div className="w-full grid sm:grid-cols-3 gap-3">
              {['Server US-East', 'Server EU-West', 'Server AP-South'].map((node) => (
                <div key={node} className={`p-3 rounded-lg border flex items-center justify-between ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <span className="text-xs font-semibold">{node}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono">ONLINE</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 8: React Lists
// ============================================================================
const ListsModule = ({ darkMode }) => {
  const [frameworks, setFrameworks] = useState([
    { id: 'fw-1', name: 'React 19', category: 'UI Library' },
    { id: 'fw-2', name: 'Vite', category: 'Build Tool' },
    { id: 'fw-3', name: 'Tailwind CSS', category: 'Styling' },
  ]);
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState('Tooling');

  const addFramework = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setFrameworks((prev) => [...prev, { id: `fw-${Date.now()}`, name: newName.trim(), category: newCat }]);
    setNewName('');
  };

  const removeFramework = (id) => {
    setFrameworks((prev) => prev.filter((item) => item.id !== id));
  };

  const code = `function StackList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // Every sibling in .map() MUST have a stable, unique "key" prop
        <li key={item.id}>
          <strong>{item.name}</strong> — {item.category}
        </li>
      ))}
    </ul>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={ListChecks}
        iconBg="bg-blue-500/10"
        iconColor="text-blue-500"
        title="React Lists & Keys"
        description="In React, you render collections of elements using JavaScript’s Array.prototype.map() method. Each item returned inside a loop must include a unique, stable key prop so React’s reconciliation algorithm can track insertions, deletions, and reorders efficiently."
        tips={[
          { title: 'Why Keys Matter', text: 'Keys let React match DOM nodes across renders without losing input state.' },
          { title: 'Avoid Array Index Keys', text: 'Using index as key causes bugs when items are reordered or deleted.' },
          { title: 'Keys Are Not Props', text: 'Components cannot read props.key; pass id separately if needed.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="StackList.jsx" badge="Array.map() & key" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Dynamic Keyed List Sandbox</h3>
        </div>

        <form onSubmit={addFramework} className="flex flex-wrap gap-2 mb-5">
          <input
            type="text"
            placeholder="Add package (e.g. Zustand)..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className={`flex-1 min-w-[180px] px-3.5 py-2 rounded-lg border text-sm ${
              darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
            }`}
          />
          <select
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-sm ${
              darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
            }`}
          >
            <option value="UI Library">UI Library</option>
            <option value="State">State</option>
            <option value="Build Tool">Build Tool</option>
            <option value="Tooling">Tooling</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold"
          >
            + Add Item
          </button>
        </form>

        <div className="space-y-2">
          {frameworks.map((fw) => (
            <div
              key={fw.id}
              className={`p-3 rounded-xl border flex items-center justify-between ${
                darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-400">
                  key="{fw.id}"
                </span>
                <span className="font-semibold text-sm">{fw.name}</span>
                <span className="text-xs opacity-60">• {fw.category}</span>
              </div>
              <button
                onClick={() => removeFramework(fw.id)}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
          {frameworks.length === 0 && (
            <div className="text-center py-6 text-xs opacity-60">List is empty. Add an item above!</div>
          )}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 9: React Submit Forms
// ============================================================================
const SubmitFormsModule = ({ darkMode }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [submittedPayload, setSubmittedPayload] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid username and email address.');
      return;
    }
    setErrorMsg('');
    setSubmittedPayload({ username: username.trim(), email: email.trim(), timestamp: new Date().toLocaleTimeString() });
  };

  const code = `function SignupForm() {
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    // Prevent full-page browser reload!
    event.preventDefault();
    alert(\`Submitting form for: \${username}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={FileText}
        iconBg="bg-indigo-500/10"
        iconColor="text-indigo-500"
        title="React Submit Forms"
        description="In React, form data is typically handled by the component via Controlled Components rather than the DOM. You attach an onSubmit handler to the <form> element and call event.preventDefault() to prevent the browser’s default full-page reload."
        tips={[
          { title: 'onSubmit on <form>', text: 'Attach onSubmit to <form> (not button onClick) so pressing Enter submits too.' },
          { title: 'Controlled Inputs', text: 'Bind value={state} and onChange={(e) => setState(e.target.value)}.' },
          { title: 'Client Validation', text: 'Validate React state inside handleSubmit before dispatching API requests.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="SignupForm.jsx" badge="onSubmit & preventDefault" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Controlled Form Submission Sandbox</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-75">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. grace_hopper"
                className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'}`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-75">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="grace@compiler.org"
                className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'}`}
              />
            </div>
            {errorMsg && <div className="text-xs text-rose-400 font-medium">{errorMsg}</div>}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-sm"
            >
              Submit Form (No Reload)
            </button>
          </form>

          <div className={`p-5 rounded-xl border-2 border-dashed flex flex-col justify-center ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">Submitted JSON Payload</div>
            {submittedPayload ? (
              <pre className="text-xs font-mono text-emerald-400 bg-slate-900 p-3.5 rounded-lg overflow-x-auto">
                {JSON.stringify(submittedPayload, null, 2)}
              </pre>
            ) : (
              <div className="text-xs opacity-60">Fill out and submit the form to inspect the captured payload.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 10: React Forms - Textarea
// ============================================================================
const FormsTextareaModule = ({ darkMode }) => {
  const [bio, setBio] = useState('Building declarative user interfaces with React and JSX.');
  const maxChars = 160;

  const code = `function BioEditor() {
  const [bio, setBio] = useState("Initial multiline text...");

  return (
    <form>
      {/* In React, <textarea> uses a "value" attribute instead of inner children */}
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={4}
      />
    </form>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={AlignLeft}
        iconBg="bg-cyan-500/10"
        iconColor="text-cyan-500"
        title="React Forms - Textarea"
        description="In plain HTML, a <textarea> defines its text via inner children (<textarea>text</textarea>). In React, <textarea> is self-closing and uses a value attribute just like a single-line <input>, making state synchronization completely uniform."
        tips={[
          { title: 'Self-Closing Syntax', text: 'Write <textarea value={text} onChange={...} /> rather than wrapping children.' },
          { title: 'Live Character Metrics', text: 'Because text lives in state, computing bio.length or word counts is trivial.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="BioEditor.jsx" badge="Controlled <textarea>" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold">Controlled Textarea Sandbox</h3>
          </div>
          <span className={`text-xs font-mono ${bio.length > maxChars ? 'text-rose-400 font-bold' : 'text-cyan-400'}`}>
            {bio.length} / {maxChars} chars
          </span>
        </div>

        <textarea
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className={`w-full p-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
            darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
          }`}
        />
        <div className="mt-3 flex items-center justify-between text-xs opacity-75">
          <span>Word count: <strong>{bio.trim() ? bio.trim().split(/\s+/).length : 0}</strong></span>
          <button
            type="button"
            onClick={() => setBio('')}
            className="text-cyan-400 hover:underline"
          >
            Clear Textarea
          </button>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 11: React Forms - Select
// ============================================================================
const FormsSelectModule = ({ darkMode }) => {
  const [selectedCar, setSelectedCar] = useState('Volvo');

  const specs = {
    Ford: { origin: 'USA', type: 'Mustang Mach-E (Electric)' },
    Volvo: { origin: 'Sweden', type: 'XC90 Recharge (Hybrid)' },
    Fiat: { origin: 'Italy', type: '500e (Compact EV)' },
    Toyota: { origin: 'Japan', type: 'GR Supra (Sports)' },
  };

  const code = `function CarSelector() {
  const [myCar, setMyCar] = useState("${selectedCar}");

  return (
    <form>
      {/* Put "value" on <select> instead of "selected" on <option> */}
      <select value={myCar} onChange={(e) => setMyCar(e.target.value)}>
        <option value="Ford">Ford</option>
        <option value="Volvo">Volvo</option>
        <option value="Fiat">Fiat</option>
        <option value="Toyota">Toyota</option>
      </select>
    </form>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={ChevronDownSquare}
        iconBg="bg-amber-500/10"
        iconColor="text-amber-500"
        title="React Forms - Select"
        description="In HTML, the initially selected dropdown option is marked with a selected attribute on <option>. In React, you place a value attribute directly on the parent <select> tag, keeping selection state centralized and easy to update programmatically."
        tips={[
          { title: 'Parent value Prop', text: 'Set value={selected} on <select> rather than selected on <option>.' },
          { title: 'Programmatic Reset', text: 'Calling setMyCar("Volvo") immediately updates the visible dropdown option.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="CarSelector.jsx" badge="Controlled <select>" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Controlled Dropdown Sandbox</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
              Choose Manufacturer
            </label>
            <select
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium ${
                darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
              }`}
            >
              {Object.keys(specs).map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="text-xs font-mono text-amber-400">state.myCar === "{selectedCar}"</div>
            <div className="text-base font-bold mt-1">{specs[selectedCar].type}</div>
            <div className="text-xs opacity-70 mt-0.5">Origin: {specs[selectedCar].origin}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 12: React Forms - Multiple Input Fields
// ============================================================================
const FormsMultipleInputsModule = ({ darkMode }) => {
  const [inputs, setInputs] = useState({
    firstName: 'Linus',
    lastName: 'Torvalds',
    role: 'Kernel Architect',
    experienceYears: '15',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const code = `function ProfileForm() {
  const [inputs, setInputs] = useState({});

  // Single dynamic handler using computed property names [name]
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <form>
      <input name="firstName" value={inputs.firstName || ""} onChange={handleChange} />
      <input name="lastName" value={inputs.lastName || ""} onChange={handleChange} />
      <input name="role" value={inputs.role || ""} onChange={handleChange} />
    </form>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={LayoutGrid}
        iconBg="bg-purple-500/10"
        iconColor="text-purple-500"
        title="React Forms - Multiple Input Fields"
        description="Instead of creating separate useState hooks and change handlers for every single field in a large form, store all fields in a single state object and use ES6 computed property names ([event.target.name]: event.target.value) inside one shared onChange handler."
        tips={[
          { title: 'name Attribute Required', text: 'Each <input> must have a name matching its key in the state object.' },
          { title: 'Functional State Update', text: 'Use setInputs(prev => ({ ...prev, [name]: value })) to avoid stale closures.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="ProfileForm.jsx" badge="Computed [name] Handler" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Unified Form State Sandbox</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: 'firstName', label: 'First Name' },
              { name: 'lastName', label: 'Last Name' },
              { name: 'role', label: 'Job Role' },
              { name: 'experienceYears', label: 'Years Exp.' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-75">
                  name="{field.name}"
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={inputs[field.name]}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${
                    darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs">
            <div className="text-slate-400 mb-2">Live <code>inputs</code> State Object:</div>
            <pre className="text-purple-300 overflow-x-auto">{JSON.stringify(inputs, null, 2)}</pre>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 13: React Forms - Checkbox
// ============================================================================
const FormsCheckboxModule = ({ darkMode }) => {
  const [toppings, setToppings] = useState({
    tomato: true,
    onion: false,
    jalapeno: true,
    extraCheese: false,
  });

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setToppings((prev) => ({ ...prev, [name]: checked }));
  };

  const activeList = Object.entries(toppings)
    .filter(([, isChecked]) => isChecked)
    .map(([key]) => key);

  const code = `function BurgerBuilder() {
  const [inputs, setInputs] = useState({ tomato: true, onion: false });

  // For checkboxes, read event.target.checked (boolean), NOT value!
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs((values) => ({ ...values, [target.name]: value }));
  };

  return (
    <label>
      <input type="checkbox" name="tomato" checked={inputs.tomato} onChange={handleChange} />
      Tomato
    </label>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={CheckSquare}
        iconBg="bg-emerald-500/10"
        iconColor="text-emerald-500"
        title="React Forms - Checkbox"
        description="Unlike text inputs that read event.target.value, controlled checkboxes bind their boolean state to the checked prop and read event.target.checked inside the onChange handler."
        tips={[
          { title: 'checked vs value', text: 'Always pass checked={Boolean(state)} to make a checkbox controlled.' },
          { title: 'Multi-Select Pattern', text: 'Store a boolean dictionary ({ tomato: true, onion: false }) or an array of selected IDs.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="BurgerBuilder.jsx" badge="checked & target.checked" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Multi-Checkbox Toppings Sandbox</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div className="grid grid-cols-2 gap-3">
            {Object.keys(toppings).map((item) => (
              <label
                key={item}
                className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer select-none transition-colors ${
                  toppings[item]
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                    : darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  name={item}
                  checked={toppings[item]}
                  onChange={handleToggle}
                  className="w-4 h-4 rounded text-emerald-600"
                />
                <span className="text-sm font-medium capitalize">{item.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>

          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-65 mb-2">Selected Toppings ({activeList.length})</div>
            <div className="flex flex-wrap gap-2">
              {activeList.length > 0 ? (
                activeList.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/15 text-emerald-400">
                    ✓ {t}
                  </span>
                ))
              ) : (
                <span className="text-xs opacity-60">Plain burger (0 toppings selected)</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 14: React Forms - Radio
// ============================================================================
const FormsRadioModule = ({ darkMode }) => {
  const [selectedFruit, setSelectedFruit] = useState('banana');

  const code = `function FruitRadioGroup() {
  const [selectedFruit, setSelectedFruit] = useState("${selectedFruit}");

  return (
    <form>
      {["apple", "banana", "cherry"].map((fruit) => (
        <label key={fruit}>
          <input
            type="radio"
            name="fruit"
            value={fruit}
            checked={selectedFruit === fruit}
            onChange={(e) => setSelectedFruit(e.target.value)}
          />
          {fruit}
        </label>
      ))}
    </form>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={CircleDot}
        iconBg="bg-orange-500/10"
        iconColor="text-orange-500"
        title="React Forms - Radio"
        description="Radio buttons allow the user to pick exactly one option from a mutually exclusive group. In React, every radio input in the group compares its value against a single state variable via checked={selectedValue === optionValue}."
        tips={[
          { title: 'Explicit Comparison', text: 'Set checked={selected === "banana"} so React controls which radio is active.' },
          { title: 'Shared name Attribute', text: 'Give all radios in a group the same name attribute for keyboard arrow accessibility.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="FruitRadioGroup.jsx" badge="Exclusive Radio Group" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Controlled Radio Group Sandbox</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div className="space-y-2.5">
            {[
              { id: 'apple', label: 'Honeycrisp Apple', emoji: '🍎' },
              { id: 'banana', label: 'Cavendish Banana', emoji: '🍌' },
              { id: 'cherry', label: 'Bing Cherry', emoji: '🍒' },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedFruit === opt.id
                    ? 'bg-orange-500/10 border-orange-500 text-orange-400 font-semibold'
                    : darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="radio"
                  name="fruit-choice"
                  value={opt.id}
                  checked={selectedFruit === opt.id}
                  onChange={(e) => setSelectedFruit(e.target.value)}
                  className="w-4 h-4 text-orange-500"
                />
                <span>{opt.emoji} {opt.label}</span>
              </label>
            ))}
          </div>

          <div className={`p-5 rounded-xl border text-center ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="text-xs font-mono text-orange-400">selectedFruit === "{selectedFruit}"</div>
            <div className="text-4xl my-2">
              {selectedFruit === 'apple' ? '🍎' : selectedFruit === 'banana' ? '🍌' : '🍒'}
            </div>
            <div className="text-xs opacity-70">Only one radio button can be true at a time.</div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 15: React Portals
// ============================================================================
const PortalsModule = ({ darkMode }) => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [portalClicks, setPortalClicks] = useState(0);

  const code = `import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Renders children into document.body, escaping parent overflow:hidden!
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={ExternalLink}
        iconBg="bg-fuchsia-500/10"
        iconColor="text-fuchsia-500"
        title="React Portals"
        description="createPortal lets a component render some of its children into a different part of the DOM tree (such as document.body) while keeping them inside the same React component tree for state, context, and event bubbling."
        tips={[
          { title: 'Escape overflow: hidden', text: 'Ideal for modals, tooltips, and dropdowns trapped inside clipped containers.' },
          { title: 'React Event Bubbling', text: 'Clicks inside a portal still bubble up to React parent components!' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="ModalPortal.jsx" badge="createPortal(jsx, domNode)" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold">Live <code>document.body</code> Portal Demo</h3>
          </div>
          <span className="text-xs font-mono text-fuchsia-400">
            Parent Bubbled Clicks: {portalClicks}
          </span>
        </div>

        {/* Deliberately clipped parent container */}
        <div
          onClick={() => setPortalClicks((c) => c + 1)}
          className={`p-5 rounded-xl border-2 border-dashed overflow-hidden relative ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}
        >
          <p className="text-xs opacity-75 mb-3">
            This container has <code className="text-fuchsia-400 font-mono">overflow: hidden</code>. Click below to mount a real <code className="text-fuchsia-400 font-mono">createPortal(..., document.body)</code> modal that breaks out cleanly—and watch clicks inside the portal bubble back to this parent!
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPortalOpen(true);
            }}
            className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-semibold shadow-md"
          >
            Launch Portal Modal
          </button>

          {isPortalOpen &&
            createPortal(
              <div
                onClick={() => setIsPortalOpen(false)}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-md w-full rounded-2xl bg-slate-900 border border-fuchsia-500/40 p-6 text-slate-100 shadow-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-fuchsia-500/20 text-fuchsia-300">
                      Mounted in &lt;body&gt; via createPortal
                    </span>
                    <button
                      onClick={() => setIsPortalOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-lg font-bold">I Escaped the Parent Container!</h4>
                  <p className="text-sm text-slate-300">
                    Even though I am rendered directly inside <code>document.body</code>, clicking the button below still bubbles through React’s virtual tree to increment the parent counter ({portalClicks}).
                  </p>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      className="px-3.5 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-semibold"
                    >
                      Trigger Bubbled Click
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPortalOpen(false)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold"
                    >
                      Close Modal
                    </button>
                  </div>
                </div>
              </div>,
              document.body
            )}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 16: React Suspense
// ============================================================================
const SuspenseModule = ({ darkMode }) => {
  const [mountKey, setMountKey] = useState(0);
  const [delayMs, setDelayMs] = useState(1200);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), delayMs);
    return () => clearTimeout(timer);
  }, [mountKey, delayMs]);

  const code = `import { Suspense, lazy } from "react";

// Code-split heavy component so it loads on demand
const AnalyticsChart = lazy(() => import("./AnalyticsChart"));

function Dashboard() {
  return (
    <Suspense fallback={<div className="skeleton">Loading chart...</div>}>
      <AnalyticsChart />
    </Suspense>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={Loader2}
        iconBg="bg-sky-500/10"
        iconColor="text-sky-500"
        title="React Suspense & Lazy Loading"
        description="<Suspense> lets you declaratively specify a loading fallback UI (like a spinner or skeleton screen) while child components are waiting for code-split bundles (React.lazy) or asynchronous data to finish loading."
        tips={[
          { title: 'Code Splitting', text: 'Pair React.lazy(() => import("./Comp")) with <Suspense fallback={...}>.' },
          { title: 'Nested Boundaries', text: 'Wrap granular sections in separate <Suspense> boundaries so fast UI renders first.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="Dashboard.jsx" badge="<Suspense fallback={...}>" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold">Lazy Chunk & Fallback Simulator</h3>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={delayMs}
              onChange={(e) => setDelayMs(Number(e.target.value))}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
              }`}
            >
              <option value={800}>800ms Network</option>
              <option value={1500}>1500ms Network</option>
              <option value={2500}>2500ms Slow 3G</option>
            </select>
            <button
              onClick={() => setMountKey((k) => k + 1)}
              className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
            >
              Reload Lazy Chunk
            </button>
          </div>
        </div>

        <div className={`p-6 rounded-xl border-2 border-dashed min-h-[150px] flex items-center justify-center ${
          darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
        }`}>
          {!isLoaded ? (
            <div className="w-full max-w-md space-y-3 animate-pulse">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Rendering &lt;Suspense fallback=&quot;Skeleton&quot;&gt;...</span>
              </div>
              <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              <div className="h-16 bg-slate-800/80 rounded-xl w-full"></div>
            </div>
          ) : (
            <div className="w-full max-w-md p-4 rounded-xl bg-gradient-to-r from-sky-500/15 to-indigo-500/15 border border-sky-500/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-emerald-400">✓ Chunk Resolved</span>
                <span className="text-xs opacity-60">{delayMs}ms</span>
              </div>
              <div className="font-bold text-base">AnalyticsWidget.chunk.js Loaded!</div>
              <p className="text-xs opacity-75 mt-1">
                Suspense seamlessly swapped the fallback skeleton with the resolved component.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 17: Styling React Using CSS
// ============================================================================
const StylingCssModule = ({ darkMode }) => {
  const [bgColor, setBgColor] = useState('#4f46e5');
  const [padding, setPadding] = useState(20);
  const [letterSpacing, setLetterSpacing] = useState(1);

  const code = `// 1. Inline JavaScript Style Object (camelCase properties)
const headerStyle = {
  backgroundColor: "${bgColor}",
  padding: "${padding}px",
  letterSpacing: "${letterSpacing}px",
  color: "white",
  borderRadius: "12px"
};

// 2. External CSS Stylesheet import
import "./App.css";

function StyledHeader() {
  return <h1 style={headerStyle} className="hero-banner">Hello CSS!</h1>;
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={Palette}
        iconBg="bg-pink-500/10"
        iconColor="text-pink-500"
        title="Styling React Using CSS"
        description="React supports standard CSS stylesheets imported directly into components (import './App.css') as well as inline style objects passed to the style prop using camelCased property names."
        tips={[
          { title: 'camelCase Keys', text: 'Write backgroundColor instead of background-color in JS style objects.' },
          { title: 'Numeric Pixels', text: 'React automatically appends "px" to numeric values like padding: 20.' },
          { title: 'Global Stylesheets', text: 'Imported .css files are bundled globally unless scoped via CSS Modules.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="StyledHeader.jsx" badge="Inline & External CSS" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Inline Style Object Sandbox</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-75">
                <code>backgroundColor</code>
              </label>
              <div className="flex gap-2">
                {['#4f46e5', '#059669', '#e11d48', '#d97706'].map((hex) => (
                  <button
                    key={hex}
                    onClick={() => setBgColor(hex)}
                    style={{ backgroundColor: hex }}
                    className={`w-8 h-8 rounded-lg border-2 ${bgColor === hex ? 'border-white scale-110' : 'border-transparent'}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span>padding</span>
                <span>{padding}px</span>
              </div>
              <input type="range" min="8" max="40" value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span>letterSpacing</span>
                <span>{letterSpacing}px</span>
              </div>
              <input type="range" min="0" max="8" value={letterSpacing} onChange={(e) => setLetterSpacing(Number(e.target.value))} className="w-full" />
            </div>
          </div>

          <div className={`p-6 rounded-xl border-2 border-dashed flex items-center justify-center ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <div
              style={{
                backgroundColor: bgColor,
                padding: `${padding}px`,
                letterSpacing: `${letterSpacing}px`,
                color: 'white',
                borderRadius: '12px',
              }}
              className="font-bold text-center shadow-lg transition-all"
            >
              Styled with React Inline CSS
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 18: React CSS Modules
// ============================================================================
const CssModulesModule = ({ darkMode }) => {
  const [hashSeed, setHashSeed] = useState('x9f2a');

  const code = `/* Button.module.css */
.primaryBtn {
  background-color: #2563eb;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
}

// Button.jsx
import styles from "./Button.module.css";

function Button() {
  // Compiles to a locally scoped unique class: "Button_primaryBtn__${hashSeed}"
  return <button className={styles.primaryBtn}>Scoped Button</button>;
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={FileCode}
        iconBg="bg-indigo-500/10"
        iconColor="text-indigo-500"
        title="React CSS Modules"
        description="CSS Modules (*.module.css) automatically scope CSS class names locally to the component that imports them. At build time, class names are transformed into unique hashed identifiers so two components can use .title or .button without style collisions."
        tips={[
          { title: '.module.css Naming', text: 'Name files Component.module.css to enable automatic scoping in Vite/CRA.' },
          { title: 'Zero Naming Collisions', text: 'styles.btn compiles to a unique hash like _btn_1a2b3_1.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="Button.module.css & Button.jsx" badge="Locally Scoped CSS" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold">CSS Module Hash Scope Inspector</h3>
          </div>
          <button
            onClick={() => setHashSeed(Math.random().toString(36).substring(2, 7))}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
          >
            Simulate Rebuild Hash
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="text-xs font-mono text-indigo-400 mb-1">Header.module.css → .button</div>
            <div className="text-xs font-mono opacity-75 mb-3">Compiled DOM: class="Header_button__{hashSeed}"</div>
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold">
              Header Action
            </button>
          </div>
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="text-xs font-mono text-emerald-400 mb-1">Footer.module.css → .button</div>
            <div className="text-xs font-mono opacity-75 mb-3">Compiled DOM: class="Footer_button__{hashSeed.split('').reverse().join('')}"</div>
            <button className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold">
              Footer Action
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 19: React CSS-in-JS
// ============================================================================
const CssInJsModule = ({ darkMode }) => {
  const [isPrimary, setIsPrimary] = useState(true);
  const [size, setSize] = useState('md');

  const code = `import styled from "styled-components";

// Tagged template literal creates a React component with dynamic prop styles
const ActionBadge = styled.button\`
  background: \${(props) => (props.$primary ? "#7c3aed" : "transparent")};
  color: \${(props) => (props.$primary ? "#ffffff" : "#a78bfa")};
  border: 2px solid #7c3aed;
  padding: \${(props) => (props.$size === "lg" ? "12px 24px" : "8px 16px")};
  border-radius: 10px;
\`;`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={Paintbrush}
        iconBg="bg-violet-500/10"
        iconColor="text-violet-500"
        title="React CSS-in-JS"
        description="CSS-in-JS libraries (such as styled-components or Emotion) let you write actual CSS syntax inside JavaScript tagged template literals. Styles are co-located with component logic and dynamically adapt to component props."
        tips={[
          { title: 'Prop-Driven Styling', text: 'Interpolate props directly inside template literals: ${props => props.color}.' },
          { title: 'Automatic Vendor Prefixing', text: 'CSS-in-JS engines inject scoped <style> tags and auto-prefix rules.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="StyledBadge.jsx" badge="styled-components" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Prop-Driven Styled Component Sandbox</h3>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPrimary(!isPrimary)}
              className="px-3 py-1.5 rounded-lg border border-violet-500/40 text-xs font-mono"
            >
              $primary={`{${String(isPrimary)}}`}
            </button>
            <button
              onClick={() => setSize(size === 'md' ? 'lg' : 'md')}
              className="px-3 py-1.5 rounded-lg border border-violet-500/40 text-xs font-mono"
            >
              $size="{size}"
            </button>
          </div>

          <button
            type="button"
            style={{
              backgroundColor: isPrimary ? '#7c3aed' : 'transparent',
              color: isPrimary ? '#ffffff' : '#a78bfa',
              border: '2px solid #7c3aed',
              padding: size === 'lg' ? '12px 24px' : '8px 16px',
              borderRadius: '10px',
            }}
            className="font-semibold text-sm transition-all"
          >
            Styled Component Button
          </button>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 20: React Router
// ============================================================================
const RouterModule = ({ darkMode }) => {
  const [route, setRoute] = useState('/');

  const code = `import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function AppRouter() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={Compass}
        iconBg="bg-emerald-500/10"
        iconColor="text-emerald-500"
        title="React Router"
        description="React does not include built-in page routing. React Router (react-router-dom) enables client-side navigation using <BrowserRouter>, <Routes>, <Route>, and <Link> so URLs update without triggering full server page reloads."
        tips={[
          { title: '<Link> vs <a>', text: 'Use <Link to="/about"> instead of <a href> to prevent full page refreshes.' },
          { title: 'Catch-All 404 Route', text: 'Use <Route path="*" element={<NotFound />} /> for unmatched URLs.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="AppRouter.jsx" badge="react-router-dom" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Client-Side SPA Router Simulator</h3>
        </div>

        <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'}`}>
          {/* Simulated Browser Bar */}
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
              https://myapp.vercel.app<span className="text-emerald-400 font-bold">{route}</span>
            </div>
            <div className="flex gap-1.5">
              {[
                { path: '/', label: 'Home' },
                { path: '/blogs', label: 'Blogs' },
                { path: '/contact', label: 'Contact' },
                { path: '/unknown', label: '404 Test' },
              ].map((link) => (
                <button
                  key={link.path}
                  onClick={() => setRoute(link.path)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    route === link.path ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 min-h-[120px]">
            {route === '/' && <div><h4 className="font-bold text-base">🏠 Home Page</h4><p className="text-xs opacity-75 mt-1">Matched <code>&lt;Route path=&quot;/&quot; /&gt;</code> without reloading the browser.</p></div>}
            {route === '/blogs' && <div><h4 className="font-bold text-base">📝 Engineering Blog</h4><p className="text-xs opacity-75 mt-1">Matched <code>&lt;Route path=&quot;/blogs&quot; /&gt;</code> instantly via History API.</p></div>}
            {route === '/contact' && <div><h4 className="font-bold text-base">✉️ Contact Team</h4><p className="text-xs opacity-75 mt-1">Matched <code>&lt;Route path=&quot;/contact&quot; /&gt;</code>.</p></div>}
            {route === '/unknown' && <div><h4 className="font-bold text-base text-rose-400">404 — Page Not Found</h4><p className="text-xs opacity-75 mt-1">Matched wildcard fallback <code>&lt;Route path=&quot;*&quot; /&gt;</code>.</p></div>}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 21: React Transitions
// ============================================================================
const TransitionsModule = ({ darkMode }) => {
  const [expanded, setExpanded] = useState(false);

  const code = `function AnimatedDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle Panel</button>
      <div
        style={{
          maxHeight: open ? "200px" : "0px",
          opacity: open ? 1 : 0,
          transition: "all 350ms cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden"
        }}
      >
        Smooth CSS-driven React transition!
      </div>
    </div>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={Zap}
        iconBg="bg-amber-500/10"
        iconColor="text-amber-500"
        title="React Transitions"
        description="Smooth UI animations in React are achieved by toggling CSS classes or dynamic style properties (transform, opacity, maxHeight) based on component state—or by using React 18+ useTransition for non-blocking state updates."
        tips={[
          { title: 'GPU-Accelerated Props', text: 'Animate transform and opacity for smooth 60fps performance.' },
          { title: 'State-Driven Classes', text: 'Toggle Tailwind transition-all duration-300 classes via state booleans.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="AnimatedDrawer.jsx" badge="CSS & State Transitions" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold">Interactive Transition Drawer</h3>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
          >
            {expanded ? 'Collapse Drawer' : 'Expand Drawer'}
          </button>
        </div>

        <div
          style={{
            maxHeight: expanded ? '180px' : '0px',
            opacity: expanded ? 1 : 0,
            transform: expanded ? 'translateY(0px)' : 'translateY(-8px)',
            transition: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
          }}
        >
          <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm">
            ✨ Smoothly animated via state-bound <code>opacity</code>, <code>transform</code>, and <code>maxHeight</code> transitions!
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 22: React forwardRef
// ============================================================================
const ForwardRefModule = ({ darkMode }) => {
  const inputRef = useRef(null);

  const CustomInput = React.forwardRef((props, ref) => (
    <input
      ref={ref}
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
      }`}
    />
  ));

  const code = `import { forwardRef, useRef } from "react";

// Child component exposes its internal <input> DOM node to parents
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} className="fancy-input" {...props} />;
});

function ParentForm() {
  const inputRef = useRef(null);
  return (
    <>
      <CustomInput ref={inputRef} placeholder="Click button to focus me" />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </>
  );
}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={Crosshair}
        iconBg="bg-cyan-500/10"
        iconColor="text-cyan-500"
        title="React forwardRef"
        description="By default, a parent component cannot attach a ref to a custom child component to access its internal DOM node. Wrapping a component in React.forwardRef lets it accept a ref prop and forward it down to a native DOM element."
        tips={[
          { title: 'Imperative DOM Actions', text: 'Used for focusing inputs, selecting text, scrolling, or triggering media playback.' },
          { title: 'React 19 Note', text: 'In React 19+, ref can also be passed as a standard prop, though forwardRef remains widely used.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="CustomInput.jsx" badge="React.forwardRef" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold">Imperative Ref Focus Sandbox</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <CustomInput ref={inputRef} placeholder="Child <CustomInput ref={inputRef} />" />
          <button
            type="button"
            onClick={() => {
              inputRef.current?.focus();
              inputRef.current?.select();
            }}
            className="px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shrink-0"
          >
            inputRef.current.focus()
          </button>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 23: React Higher Order Components (HOC)
// ============================================================================
const HocModule = ({ darkMode }) => {
  const [enableBorderHoc, setEnableBorderHoc] = useState(true);
  const [enableBadgeHoc, setEnableBadgeHoc] = useState(true);

  const BaseProfile = ({ name, role }) => (
    <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white border border-slate-200'}`}>
      <div className="font-bold text-base">{name}</div>
      <div className="text-xs opacity-70">{role}</div>
    </div>
  );

  const withHighlightBorder = (WrappedComponent) => (props) => (
    <div className="p-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <WrappedComponent {...props} />
    </div>
  );

  const withProBadge = (WrappedComponent) => (props) => (
    <div className="relative">
      <span className="absolute -top-2.5 right-3 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 shadow">
        PRO HOC
      </span>
      <WrappedComponent {...props} />
    </div>
  );

  let EnhancedProfile = BaseProfile;
  if (enableBorderHoc) EnhancedProfile = withHighlightBorder(EnhancedProfile);
  if (enableBadgeHoc) EnhancedProfile = withProBadge(EnhancedProfile);

  const code = `// A Higher-Order Component takes a component and returns an enhanced component
function withHighlightBorder(WrappedComponent) {
  return function EnhancedComponent(props) {
    return (
      <div className="gradient-border-wrapper">
        <WrappedComponent {...props} />
      </div>
    );
  };
}

const HighlightedProfile = withHighlightBorder(UserProfile);`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={Cpu}
        iconBg="bg-indigo-500/10"
        iconColor="text-indigo-500"
        title="React Higher Order Components (HOC)"
        description="A Higher-Order Component (HOC) is an advanced pattern where a function takes a component as an argument and returns a new, enhanced component—allowing you to share cross-cutting behaviors like logging, permissions, or visual wrappers."
        tips={[
          { title: 'Pure Function Pattern', text: 'Never mutate the original component; wrap it and forward {...props}.' },
          { title: 'Naming Convention', text: 'Prefix HOC functions with "with" (e.g., withAuth, withTheme, withLogger).' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="withHighlightBorder.jsx" badge="HOC Wrapper Pattern" code={code} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold">Composable HOC Enhancer Sandbox</h3>
          </div>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
              <input type="checkbox" checked={enableBorderHoc} onChange={(e) => setEnableBorderHoc(e.target.checked)} />
              withHighlightBorder()
            </label>
            <label className="flex items-center gap-2 text-xs font-mono cursor-pointer">
              <input type="checkbox" checked={enableBadgeHoc} onChange={(e) => setEnableBadgeHoc(e.target.checked)} />
              withProBadge()
            </label>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <EnhancedProfile name="Margaret Hamilton" role="Director of Software Engineering" />
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MODULE 24: React Sass Styling
// ============================================================================
const SassModule = ({ darkMode }) => {
  const [accentVar, setAccentVar] = useState('#ec4899');

  const scssCode = `// my-style.scss
$primary-accent: ${accentVar};
$card-radius: 14px;

.sass-card {
  border-radius: $card-radius;
  border: 2px solid $primary-accent;

  // Nested selector compiles to ".sass-card .sass-title"
  .sass-title {
    color: $primary-accent;
    font-weight: 700;
  }
}

// App.jsx
import "./my-style.scss";`;

  return (
    <div className="space-y-8 animate-fadeIn">
      <TopicHeader
        icon={Hash}
        iconBg="bg-pink-500/10"
        iconColor="text-pink-500"
        title="React Sass Styling"
        description="Sass (Syntactically Awesome Style Sheets) is a CSS pre-processor that adds variables ($primary-color), nested rules, mixins, and functions. After installing the sass package (npm i sass), Vite and Create React App compile .scss files automatically."
        tips={[
          { title: 'Install Once', text: 'Run npm install sass — no extra webpack or Vite plugins required.' },
          { title: 'Variables & Nesting', text: 'Define $brand-color tokens and nest child selectors cleanly.' },
        ]}
        darkMode={darkMode}
      />

      <CodeBlock title="my-style.scss" badge="Sass Variables & Nesting" code={scssCode} darkMode={darkMode} />

      <section className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold">Sass <code>$primary-accent</code> Variable Preview</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono opacity-75">$primary-accent:</span>
            {['#ec4899', '#8b5cf6', '#10b981', '#f59e0b'].map((c) => (
              <button
                key={c}
                onClick={() => setAccentVar(c)}
                style={{ backgroundColor: c }}
                className={`w-6 h-6 rounded-full border-2 ${accentVar === c ? 'border-white scale-110' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>

        <div
          style={{ borderColor: accentVar, borderRadius: '14px' }}
          className={`p-5 border-2 transition-all ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}
        >
          <div style={{ color: accentVar }} className="font-bold text-base">
            .sass-card .sass-title
          </div>
          <p className="text-xs opacity-75 mt-1">
            Compiled from SCSS variables and nested rules directly into standard browser CSS.
          </p>
        </div>
      </section>
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION SHELL (All 24 Curriculum Modules)
// ============================================================================
export default function App() {
  const [activeTab, setActiveTab] = useState('intro');
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    {
      name: 'JSX Foundations (4)',
      items: [
        { id: 'intro', title: 'React JSX Intro', icon: Code2, accent: 'text-indigo-400' },
        { id: 'expressions', title: 'React JSX Expressions', icon: Braces, accent: 'text-amber-400' },
        { id: 'attributes', title: 'React JSX Attributes', icon: Sliders, accent: 'text-sky-400' },
        { id: 'conditionals', title: 'React JSX If Statements', icon: GitBranch, accent: 'text-emerald-400' },
      ],
    },
    {
      name: 'Props, Events & Lists (4)',
      items: [
        { id: 'props-children', title: 'React Props Children', icon: Box, accent: 'text-violet-400' },
        { id: 'events', title: 'React Events', icon: MousePointerClick, accent: 'text-rose-400' },
        { id: 'conditional-rendering', title: 'React Conditional Rendering', icon: GitBranch, accent: 'text-teal-400' },
        { id: 'lists', title: 'React Lists', icon: ListChecks, accent: 'text-blue-400' },
      ],
    },
    {
      name: 'React Forms (6)',
      items: [
        { id: 'submit-forms', title: 'React Submit Forms', icon: FileText, accent: 'text-indigo-400' },
        { id: 'forms-textarea', title: 'React Forms - Textarea', icon: AlignLeft, accent: 'text-cyan-400' },
        { id: 'forms-select', title: 'React Forms - Select', icon: ChevronDownSquare, accent: 'text-amber-400' },
        { id: 'forms-multiple', title: 'React Forms - Multiple Input Fields', icon: LayoutGrid, accent: 'text-purple-400' },
        { id: 'forms-checkbox', title: 'React Forms - Checkbox', icon: CheckSquare, accent: 'text-emerald-400' },
        { id: 'forms-radio', title: 'React Forms - Radio', icon: CircleDot, accent: 'text-orange-400' },
      ],
    },
    {
      name: 'Advanced React (4)',
      items: [
        { id: 'portals', title: 'React Portals', icon: ExternalLink, accent: 'text-fuchsia-400' },
        { id: 'suspense', title: 'React Suspense', icon: Loader2, accent: 'text-sky-400' },
        { id: 'forward-ref', title: 'React forwardRef', icon: Crosshair, accent: 'text-cyan-400' },
        { id: 'hoc', title: 'React Higher Order Components', icon: Cpu, accent: 'text-indigo-400' },
      ],
    },
    {
      name: 'Styling & Routing (6)',
      items: [
        { id: 'styling-css', title: 'Styling React Using CSS', icon: Palette, accent: 'text-pink-400' },
        { id: 'css-modules', title: 'React CSS Modules', icon: FileCode, accent: 'text-indigo-400' },
        { id: 'css-in-js', title: 'React CSS-in-JS', icon: Paintbrush, accent: 'text-violet-400' },
        { id: 'router', title: 'React Router', icon: Compass, accent: 'text-emerald-400' },
        { id: 'transitions', title: 'React Transitions', icon: Zap, accent: 'text-amber-400' },
        { id: 'sass', title: 'React Sass Styling', icon: Hash, accent: 'text-pink-400' },
      ],
    },
  ];

  const allModules = categories.flatMap((c) => c.items);
  const currentIndex = allModules.findIndex((m) => m.id === activeTab);

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'intro': return <JsxIntroModule darkMode={darkMode} />;
      case 'expressions': return <JsxExpressionsModule darkMode={darkMode} />;
      case 'attributes': return <JsxAttributesModule darkMode={darkMode} />;
      case 'conditionals': return <JsxIfStatementsModule darkMode={darkMode} />;
      case 'props-children': return <PropsChildrenModule darkMode={darkMode} />;
      case 'events': return <EventsModule darkMode={darkMode} />;
      case 'conditional-rendering': return <ConditionalRenderingModule darkMode={darkMode} />;
      case 'lists': return <ListsModule darkMode={darkMode} />;
      case 'submit-forms': return <SubmitFormsModule darkMode={darkMode} />;
      case 'forms-textarea': return <FormsTextareaModule darkMode={darkMode} />;
      case 'forms-select': return <FormsSelectModule darkMode={darkMode} />;
      case 'forms-multiple': return <FormsMultipleInputsModule darkMode={darkMode} />;
      case 'forms-checkbox': return <FormsCheckboxModule darkMode={darkMode} />;
      case 'forms-radio': return <FormsRadioModule darkMode={darkMode} />;
      case 'portals': return <PortalsModule darkMode={darkMode} />;
      case 'suspense': return <SuspenseModule darkMode={darkMode} />;
      case 'styling-css': return <StylingCssModule darkMode={darkMode} />;
      case 'css-modules': return <CssModulesModule darkMode={darkMode} />;
      case 'css-in-js': return <CssInJsModule darkMode={darkMode} />;
      case 'router': return <RouterModule darkMode={darkMode} />;
      case 'transitions': return <TransitionsModule darkMode={darkMode} />;
      case 'forward-ref': return <ForwardRefModule darkMode={darkMode} />;
      case 'hoc': return <HocModule darkMode={darkMode} />;
      case 'sass': return <SassModule darkMode={darkMode} />;
      default: return <JsxIntroModule darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Header */}
      <header className={`sticky top-0 z-30 border-b backdrop-blur-md ${
        darkMode ? 'bg-slate-950/85 border-slate-800' : 'bg-white/85 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-700/50"
              aria-label="Toggle curriculum menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg tracking-tight">
                  React Full Curriculum Lab
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Sparkles className="w-3 h-3" /> 24 Interactive Topics
                </span>
              </div>
              <p className="text-xs opacity-65 hidden sm:block">
                JSX Foundations • Props & Events • Forms • Portals & Suspense • Styling & Routing
              </p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl border transition-colors flex items-center gap-2 text-xs font-medium shrink-0 ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Toggle color theme"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className={`lg:col-span-3 lg:sticky lg:top-20 space-y-4 ${
            mobileMenuOpen ? 'block' : 'hidden lg:block'
          }`}>
            {/* Search Filter */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter 24 topics..."
                className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'
                }`}
              />
            </div>

            {/* Categorized Topic Tree */}
            <div className="space-y-4 max-h-[calc(100vh-11rem)] overflow-y-auto pr-1">
              {filteredCategories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider opacity-55 px-2">
                    {category.name}
                  </div>
                  <div className="space-y-1">
                    {category.items.map((mod) => {
                      const Icon = mod.icon;
                      const isActive = activeTab === mod.id;
                      return (
                        <button
                          key={mod.id}
                          onClick={() => {
                            setActiveTab(mod.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-all ${
                            isActive
                              ? darkMode
                                ? 'bg-indigo-600/20 text-white border border-indigo-500/40 font-semibold'
                                : 'bg-indigo-50 text-indigo-900 border border-indigo-300 font-semibold'
                              : darkMode
                              ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                              : 'text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${mod.accent}`} />
                          <span className="truncate">{mod.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Active Module Content Area */}
          <main className="lg:col-span-9 min-w-0 space-y-6">
            {renderActiveModule()}

            {/* Next / Previous Lesson Footer Navigation */}
            <div className={`pt-6 border-t flex items-center justify-between gap-4 ${
              darkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <button
                disabled={currentIndex <= 0}
                onClick={() => setActiveTab(allModules[currentIndex - 1].id)}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                  currentIndex <= 0
                    ? 'opacity-40 cursor-not-allowed border-slate-800'
                    : darkMode
                    ? 'bg-slate-900 border-slate-700 hover:bg-slate-800'
                    : 'bg-white border-slate-300 hover:bg-slate-100'
                }`}
              >
                ← Previous Topic
              </button>
              <span className="text-xs font-mono opacity-60">
                Topic {currentIndex + 1} of {allModules.length}
              </span>
              <button
                disabled={currentIndex >= allModules.length - 1}
                onClick={() => setActiveTab(allModules[currentIndex + 1].id)}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                  currentIndex >= allModules.length - 1
                    ? 'opacity-40 cursor-not-allowed border-slate-800'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white border-transparent'
                }`}
              >
                Next Topic →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
