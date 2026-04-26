import React, { useState } from 'react';
import { 
  Shield, AlertTriangle, Activity, Smartphone, 
  Monitor, Wifi, Send, CheckCircle2, Lock, Globe 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

// モックデータ: 通信トラフィックの推移
const trafficData = [
  { time: '10:00', upload: 1.2, download: 5.5 },
  { time: '10:05', upload: 1.5, download: 6.2 },
  { time: '10:10', upload: 15.8, download: 4.1 },
  { time: '10:15', upload: 18.2, download: 3.8 },
  { time: '10:20', upload: 17.5, download: 4.2 },
  { time: '10:25', upload: 1.4, download: 5.9 },
];

export default function App() {
  const [alerts] = useState([
    {
      id: 1,
      type: 'critical',
      device: 'iPhone 15 Pro',
      message: '意図しない画面共有シグナルを検知',
      time: '10:12:45',
    },
    {
      id: 2,
      type: 'warning',
      device: 'Windows PC (Work)',
      message: '海外IPアドレスへの不審なパケット送信',
      time: '10:05:12',
    }
  ]);

  const [reporting, setReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const handleReport = () => {
    setReporting(true);
    setTimeout(() => {
      setReporting(false);
      setReportSuccess(true);
      setTimeout(() => setReportSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      {/* GitHub リンク等を追加するとリポジトリらしくなります */}
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 text-blue-400">
              <Shield size={36} />
              AI Signal Guardian
            </h1>
            <p className="text-slate-400 mt-1">Open Source Security Monitoring Dashboard</p>
          </div>
          <div className="flex gap-3 bg-slate-800 p-2 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 px-3 py-1 text-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Monitoring</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Activity className="text-blue-400" /> パケット解析
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                    <Area type="monotone" dataKey="upload" stroke="#ef4444" fill="url(#colorUp)" />
                    <Line type="monotone" dataKey="download" stroke="#3b82f6" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* デバイスステータス */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Smartphone size={18}/> デバイス</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-900/10 border border-red-500/50 rounded-lg flex justify-between items-center">
                    <span className="text-sm">iPhone 15 Pro</span>
                    <span className="text-xs text-red-400 font-bold">ATTACK DETECTED</span>
                  </div>
                  <div className="p-3 bg-slate-700/30 border border-slate-600 rounded-lg flex justify-between items-center">
                    <span className="text-sm">Work Desktop</span>
                    <span className="text-xs text-green-500">SECURE</span>
                  </div>
                </div>
              </div>

              {/* IPインテリジェンス */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-semibold mb-4 flex items-center gap-2"><Globe size={18}/> 外部接続</h3>
                <div className="text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-700 pb-1">
                    <span>45.xx.xx.12 (C&C Server)</span>
                    <span className="text-red-400">BLOCKED</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700 pb-1">
                    <span>192.168.1.1 (Gateway)</span>
                    <span className="text-green-400">SAFE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-bold mb-4">アラート履歴</h2>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div key={alert.id} className="p-3 bg-slate-900/50 border-l-4 border-red-500 rounded">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>{alert.time}</span>
                      <span className="uppercase font-bold">{alert.type}</span>
                    </div>
                    <p className="text-xs font-bold">{alert.device}</p>
                    <p className="text-[11px] text-slate-400">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 rounded-xl p-6 shadow-lg shadow-blue-900/20">
              <h2 className="font-bold mb-2 flex items-center gap-2"><Send size={18}/> キャリア報告</h2>
              <p className="text-xs text-blue-100 mb-4">検知した攻撃データを匿名化して送信します</p>
              <button 
                onClick={handleReport}
                disabled={reporting}
                className="w-full py-2 bg-white text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors"
              >
                {reporting ? '送信中...' : 'レポートを送信'}
              </button>
              {reportSuccess && <p className="text-center text-xs mt-2 text-blue-100">報告が完了しました</p>}
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-slate-500 text-xs">
          <p>© 2026 AI Signal Guardian - GitHub Edition</p>
        </footer>
      </div>
    </div>
  );
}
