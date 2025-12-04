import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Play, Save, Terminal, Code, RefreshCw } from 'lucide-react';

export default function Playground() {
  const { saveSnippet } = useData();
  const [code, setCode] = useState('console.log("Hello World");\nlet a = 5;\nlet b = 10;\nconsole.log("Sum is:", a + b);');
  const [output, setOutput] = useState('');
  const [lang, setLang] = useState('JS');

  const runCode = () => {
    setOutput('Compiling...');
    
    setTimeout(() => {
      try {
        if (lang === 'JS') {
          // Capturing console.log
          let logs = [];
          const originalLog = console.log;
          console.log = (...args) => logs.push(args.join(' '));
          
          // DANGEROUS IN PROD, OK FOR HACKATHON
          // eslint-disable-next-line no-eval
          eval(code); 
          
          console.log = originalLog; // Restore console
          setOutput(logs.length > 0 ? logs.join('\n') : '> No Output');
        } 
        else if (lang === 'Python') {
          // Mock Logic for Python
          if (code.includes('print')) {
             // Extract text inside print() roughly
             const match = code.match(/print\s*\((.*)\)/);
             const val = match ? match[1].replace(/["']/g, "") : "Unknown";
             // Simple math check for demo
             if(code.includes('+')) setOutput(`> ${eval(code.split('print(')[1].replace(')', ''))}`);
             else setOutput(`> ${val}`);
          } else {
             setOutput('> Python Script Executed. (Mock)');
          }
        }
        else {
          setOutput(`> ${lang} execution simulated.\n> Process finished with exit code 0.`);
        }
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      }
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center bg-white p-2 rounded-lg border shadow-sm">
            <span className="font-bold text-slate-700 flex items-center gap-2 px-2"><Code size={18} className="text-blue-600"/> Code Playground</span>
            <div className="flex gap-2">
                <select value={lang} onChange={e => setLang(e.target.value)} className="border border-slate-300 p-1.5 rounded-md text-sm bg-slate-50 focus:outline-none">
                    <option>JS</option><option>Python</option><option>C++</option><option>SQL</option>
                </select>
                <button onClick={() => setCode('')} className="p-2 text-slate-500 hover:text-slate-700"><RefreshCw size={14}/></button>
                <button onClick={runCode} className="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1 hover:bg-green-700 transition">
                    <Play size={14}/> Run
                </button>
                <button onClick={() => saveSnippet(code, lang)} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1 hover:bg-blue-700 transition">
                    <Save size={14}/> Save
                </button>
            </div>
        </div>
        <textarea 
            className="flex-1 bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm rounded-lg resize-none focus:outline-none leading-relaxed" 
            value={code} 
            onChange={e => setCode(e.target.value)} 
            spellCheck="false"
            placeholder="// Write your code here..."
        />
      </div>
      <div className="bg-black text-green-400 p-4 font-mono text-sm rounded-lg flex flex-col shadow-lg border border-slate-800">
        <div className="border-b border-slate-800 pb-2 mb-2 flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest">
            <Terminal size={14}/> Output Console
        </div>
        <pre className="flex-1 overflow-auto whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
}