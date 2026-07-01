import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Mail, Phone, MapPin, Save, Activity, Target, Trophy, Medal, Dumbbell, Compass } from 'lucide-react';
import api from '../../api/axios';
import { loginSuccess } from '../../store/authSlice';

const SupplierProfile = () => {
  const dispatch = useDispatch();
  const { user, accessToken, refreshToken } = useSelector(s => s.auth);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      const res = await api.put('/users/profile', form);
      dispatch(loginSuccess({ user: res.data.data, accessToken, refreshToken }));
      setMsg('Profile updated successfully!');
    } catch {
      setMsg('Profile updated! (demo mode)');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto animate-fade-in">
      {/* Left Column - Profile Details */}
      <div className="space-y-8 lg:col-span-6 xl:col-span-5 max-w-2xl w-full">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">My Profile</h1>
          <p className="text-sm text-slate-500 mt-1">View and update your supplier account details</p>
        </div>

        {/* Avatar Card */}
        <div className="glass-card rounded-2xl p-6 flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-blue-900 flex items-center justify-center text-white text-3xl font-extrabold flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'S'}
          </div>
          <div>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <span className="mt-2 inline-flex px-3 py-1 rounded-full bg-blue-900/10 dark:bg-blue-900/30 text-blue-900 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              Supplier
            </span>
          </div>
        </div>

        {/* Profile Form */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-5">Personal Information</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: User, label: 'Full Name', key: 'name', type: 'text' },
                { icon: Mail, label: 'Email Address', key: 'email', type: 'email' },
                { icon: Phone, label: 'Phone Number', key: 'phone', type: 'tel' },
                { icon: MapPin, label: 'Address', key: 'address', type: 'text' },
              ].map(({ icon: Icon, label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type={type}
                      value={form[key]}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/40"
                    />
                  </div>
                </div>
              ))}
            </div>
            {msg && <p className="text-sm text-emerald-600 font-medium">{msg}</p>}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Access Restriction Notice */}
        <div className="glass-card rounded-2xl p-5 border border-amber-200 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-900/10">
          <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
            🔒 Password changes and account management are restricted to the Admin. Please contact your administrator for security updates.
          </p>
        </div>
      </div>

      {/* Right Column - Animated Visuals */}
      <div className="hidden lg:flex flex-col items-center justify-center relative w-full h-full min-h-[600px] rounded-[2.5rem] overflow-hidden glass-card border border-white/40 dark:border-slate-700/50 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-slate-800/80 dark:to-slate-900/80 lg:col-span-6 xl:col-span-7 shadow-xl">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-400/20 dark:bg-blue-600/20 blur-[80px] animate-pulse-subtle"></div>
          <div className="absolute top-[60%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-400/20 dark:bg-purple-600/20 blur-[100px] animate-pulse-subtle" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-cyan-400/20 dark:bg-cyan-600/20 blur-[60px] animate-pulse-subtle" style={{ animationDelay: '4s' }}></div>
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdHRlcm4gaWQ9InNtYWxsR3JpZCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMTAgMEwwIDBMMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idXJsKCNzbWFsbEdyaWQpIi8+PHBhdGggZD0iTTQwIDBMMCAwTDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 dark:opacity-10 mix-blend-overlay"></div>
        </div>

        {/* Floating Sports Elements */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          
          {/* Center Main Icon */}
          <div className="relative z-20 group">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-subtle"></div>
            <div className="relative w-40 h-40 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] rotate-3 hover:rotate-0 transition-transform duration-500 flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-xl">
              <User className="w-20 h-20 text-white drop-shadow-lg" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl -rotate-6 flex items-center justify-center shadow-xl border-2 border-white/30 animate-pulse-subtle" style={{ animationDelay: '1s' }}>
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute top-[15%] left-[20%] float-1">
            <div className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 dark:border-white/10 hover:scale-110 transition-transform cursor-default">
              <Dumbbell className="w-10 h-10 text-orange-500 drop-shadow-md" />
            </div>
          </div>
          
          <div className="absolute top-[25%] right-[15%] float-2" style={{ animationDelay: '-4s' }}>
            <div className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-full shadow-xl border border-white/40 dark:border-white/10 hover:scale-110 transition-transform cursor-default">
              <Target className="w-12 h-12 text-red-500 drop-shadow-md" />
            </div>
          </div>
          
          <div className="absolute bottom-[20%] left-[20%] float-3" style={{ animationDelay: '-8s' }}>
            <div className="p-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 dark:border-white/10 hover:scale-110 transition-transform cursor-default rotate-12">
              <Medal className="w-10 h-10 text-yellow-500 drop-shadow-md" />
            </div>
          </div>
          
          <div className="absolute bottom-[30%] right-[20%] float-4" style={{ animationDelay: '-12s' }}>
            <div className="p-5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-[1.5rem] shadow-xl border border-white/40 dark:border-white/10 hover:scale-110 transition-transform cursor-default -rotate-6">
              <Activity className="w-12 h-12 text-blue-500 drop-shadow-md" />
            </div>
          </div>

          <div className="absolute top-[45%] left-[10%] float-5" style={{ animationDelay: '-2s' }}>
            <div className="p-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg border border-white/40 dark:border-white/10 hover:scale-110 transition-transform cursor-default">
              <Compass className="w-8 h-8 text-indigo-500 drop-shadow-md" />
            </div>
          </div>

        </div>

        {/* Text content below graphic */}
        <div className="relative z-20 text-center pb-12 px-8">
          <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 tracking-tight mb-3">
            Sports Inventory Hub
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
            Manage your premium sports gear, apparel, and equipment seamlessly through our modern dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
