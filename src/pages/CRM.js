// src/pages/CRM.js
// SolarHub CRM Dashboard — auth-gated, Supabase-backed
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiUsers, FiTrendingUp, FiDownload, FiRefreshCw, FiDollarSign, FiFilter } from 'react-icons/fi';
import { supabaseAdmin } from '../lib/supabase';
import { getDemoLeads } from '../services/leadApi';

const CRM_PASSWORD = process.env.REACT_APP_CRM_PASSWORD || 'solarhub2024';

const STATUS_OPTIONS = ['new', 'contacted', 'site_visit', 'quote_sent', 'won', 'lost'];
const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  site_visit: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  quote_sent: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  won: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  lost: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

const SCORE_BADGE = {
  hot: { emoji: '🔥', label: 'Hot', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  warm: { emoji: '🟡', label: 'Warm', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' },
  cold: { emoji: '🔵', label: 'Cold', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
};

const formatInr = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);

// ---- Password Gate ----
const PasswordGate = ({ onAuth }) => {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (pw === CRM_PASSWORD) onAuth();
    else { setError('Galat password. Phir try karein.'); setPw(''); }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-gray-700">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">☀️</div>
          <h1 className="text-2xl font-extrabold text-white">SolarHub CRM</h1>
          <p className="text-gray-400 text-sm mt-1">Internal dashboard — authorized access only</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter CRM password"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 text-white focus:border-amber-400 focus:outline-none"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// ---- Export to CSV ----
const exportCsv = (leads) => {
  const headers = ['Name','Phone','Pincode','Property','Bill','Est kW','Commission','Score','Status','Source','Created'];
  const rows = leads.map((l) => [
    l.name, l.phone, l.pincode, l.property_type,
    l.monthly_bill, l.estimated_kw, l.estimated_commission,
    l.score, l.status, l.source,
    l.created_at ? new Date(l.created_at).toLocaleDateString('en-IN') : '',
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v ?? ''}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `solarhub-leads-${Date.now()}.csv`; a.click();
};

// ---- CRM Dashboard ----
const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterScore, setFilterScore] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      if (supabaseAdmin) {
        const { data, error: err } = await supabaseAdmin
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (err) throw err;
        setLeads(data || []);
        setIsDemo(false);
      } else {
        // Fallback to demo localStorage leads
        const demoLeads = getDemoLeads().map((l, i) => ({
          id: l.id || `demo_${i}`,
          name: l.name,
          phone: l.phone,
          pincode: l.pincode,
          property_type: l.property_type,
          monthly_bill: l.monthly_bill,
          estimated_kw: l.estimated_kw,
          estimated_commission: l.estimated_commission,
          score: l.score || 'cold',
          status: l.status || 'new',
          source: l.source,
          notes: l.notes,
          created_at: l.created_at || new Date().toISOString(),
          closed_kw: l.closed_kw,
        }));
        setLeads(demoLeads);
        setIsDemo(true);
      }
    } catch (err) {
      setError('Leads load nahi ho rahi: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateStatus = async (id, status) => {
    if (!supabaseAdmin) return;
    await supabaseAdmin.from('leads').update({ status }).eq('id', id);
    setLeads((l) => l.map((lead) => lead.id === id ? { ...lead, status } : lead));
    if (selectedLead?.id === id) setSelectedLead((l) => ({ ...l, status }));
  };

  const saveNotes = async () => {
    if (!supabaseAdmin || !selectedLead) return;
    setSavingNotes(true);
    await supabaseAdmin.from('leads').update({ notes: notesDraft }).eq('id', selectedLead.id);
    setLeads((l) => l.map((lead) => lead.id === selectedLead.id ? { ...lead, notes: notesDraft } : lead));
    setSelectedLead((l) => ({ ...l, notes: notesDraft }));
    setSavingNotes(false);
  };

  const filtered = useMemo(() => leads.filter((l) => {
    if (filterStatus !== 'all' && l.status !== filterStatus) return false;
    if (filterScore !== 'all' && l.score !== filterScore) return false;
    return true;
  }), [leads, filterStatus, filterScore]);

  // Stats
  const stats = useMemo(() => {
    const total = leads.length;
    const won = leads.filter((l) => l.status === 'won');
    const contacted = leads.filter((l) => l.status !== 'new').length;
    const totalCommission = won.reduce((s, l) => s + (l.closed_kw || l.estimated_kw || 0) * 1000, 0);
    const hot = leads.filter((l) => l.score === 'hot').length;
    return { total, won: won.length, contacted, totalCommission, hot, convRate: total > 0 ? ((won.length / total) * 100).toFixed(1) : '0.0' };
  }, [leads]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 sm:p-6">
      {isDemo && (
        <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 rounded-xl text-sm text-yellow-800 dark:text-yellow-300">
          ⚠️ Demo mode — Supabase not configured. Showing localStorage leads only.
          Configure <code>REACT_APP_SUPABASE_*</code> env vars for real data.
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">☀️ SolarHub CRM</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Lead management & commission tracker</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchLeads} className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FiRefreshCw size={14} /> Refresh
            </button>
            <button onClick={() => exportCsv(filtered)} className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
              <FiDownload size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          {[
            { icon: <FiUsers />, label: 'Total Leads', value: stats.total, color: 'text-blue-500' },
            { icon: '🔥', label: 'Hot Leads', value: stats.hot, color: 'text-red-500' },
            { icon: <FiTrendingUp />, label: 'Contacted', value: stats.contacted, color: 'text-purple-500' },
            { icon: '✅', label: 'Won', value: stats.won, color: 'text-green-500' },
            { icon: '%', label: 'Conv. Rate', value: `${stats.convRate}%`, color: 'text-amber-500' },
            { icon: <FiDollarSign />, label: 'Commission Earned', value: formatInr(stats.totalCommission), color: 'text-green-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className={`text-2xl mb-1 ${stat.color}`}>{stat.icon}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mb-4 flex flex-wrap gap-3 items-center">
          <FiFilter className="text-gray-400" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none">
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterScore} onChange={(e) => setFilterScore(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none">
            <option value="all">All Scores</option>
            <option value="hot">🔥 Hot</option>
            <option value="warm">🟡 Warm</option>
            <option value="cold">🔵 Cold</option>
          </select>
          <span className="text-sm text-gray-400 ml-auto">{filtered.length} leads</span>
        </div>

        {/* Error */}
        {error && <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl text-red-700 dark:text-red-300 text-sm mb-4">{error}</div>}

        {/* Main content: table + detail panel */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Table */}
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-12 text-center text-gray-400">Loading leads...</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <p className="text-4xl mb-3">📭</p>
                <p>Koi leads nahi mili. Filters change karein.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      {['Score', 'Name & Phone', 'Pincode', 'Property', 'Bill', 'Est kW', 'Commission', 'Status', 'Date'].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {filtered.map((lead) => {
                      const sb = SCORE_BADGE[lead.score] || SCORE_BADGE.cold;
                      return (
                        <tr
                          key={lead.id}
                          onClick={() => { setSelectedLead(lead); setNotesDraft(lead.notes || ''); }}
                          className="hover:bg-amber-50 dark:hover:bg-amber-900/10 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${sb.color}`}>
                              {sb.emoji} {sb.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{lead.name}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">{lead.phone}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{lead.pincode}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 capitalize">{lead.property_type}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{formatInr(lead.monthly_bill)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{lead.estimated_kw} kW</td>
                          <td className="px-4 py-3 text-sm font-semibold text-green-600">{formatInr(lead.estimated_commission)}</td>
                          <td className="px-4 py-3">
                            <select
                              value={lead.status || 'new'}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => updateStatus(lead.id, e.target.value)}
                              className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 focus:outline-none cursor-pointer ${STATUS_COLORS[lead.status] || STATUS_COLORS.new}`}
                            >
                              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-400">
                            {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-IN') : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selectedLead && (
            <div className="lg:w-80 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 space-y-4 self-start">
              <div className="flex justify-between items-start">
                <h3 className="font-extrabold text-gray-900 dark:text-white">{selectedLead.name}</h3>
                <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-700">✕</button>
              </div>

              <div className="space-y-2 text-sm">
                {[
                  ['📞', selectedLead.phone],
                  ['📍', selectedLead.pincode],
                  ['🏠', selectedLead.property_type],
                  ['💡', formatInr(selectedLead.monthly_bill) + '/mo'],
                  ['⚡', (selectedLead.estimated_kw || 0) + ' kW'],
                  ['💰', 'Commission: ' + formatInr(selectedLead.estimated_commission)],
                  ['📊', 'Source: ' + (selectedLead.source || 'website')],
                ].map(([icon, text]) => (
                  <div key={text} className="flex gap-2 text-gray-700 dark:text-gray-300">
                    <span>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>

              {/* WhatsApp action */}
              <a
                href={`https://wa.me/${selectedLead.phone?.replace(/\D/g, '').replace(/^0/, '91')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-xl text-sm transition-colors"
              >
                💬 WhatsApp {selectedLead.name.split(' ')[0]}
              </a>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Notes</label>
                <textarea
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  rows={4}
                  placeholder="Site visit notes, follow-up details..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-amber-400 resize-none"
                />
                <button
                  onClick={saveNotes}
                  disabled={savingNotes || !supabaseAdmin}
                  className="mt-2 w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-2 rounded-xl text-sm transition-colors disabled:opacity-50"
                >
                  {savingNotes ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ---- CRM Page with auth gate ----
const CRM = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('crm_auth') === '1');

  const handleAuth = () => {
    sessionStorage.setItem('crm_auth', '1');
    setAuthed(true);
  };

  return (
    <>
      <Helmet>
        <title>CRM Dashboard — SolarHub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {authed ? <Dashboard /> : <PasswordGate onAuth={handleAuth} />}
    </>
  );
};

export default CRM;
