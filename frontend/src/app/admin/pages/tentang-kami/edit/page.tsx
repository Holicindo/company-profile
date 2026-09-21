'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface TentangKamiSections {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  history: {
    title: string;
    description: string;
    timeline: Array<{
      year: string;
      event: string;
    }>;
  };
  visionMission: {
    vision: {
      title: string;
      description: string;
    };
    mission: {
      title: string;
      items: string[];
    };
  };
  values: {
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  team: {
    title: string;
    description: string;
    members: Array<{
      name: string;
      position: string;
      photo: string;
      bio: string;
    }>;
  };
}

export default function EditTentangKamiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageId, setPageId] = useState<number | null>(null);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  
  const [sections, setSections] = useState<TentangKamiSections>({
    hero: {
      title: 'Tentang Kami',
      subtitle: '',
      backgroundImage: '',
    },
    history: {
      title: 'Sejarah Kami',
      description: '',
      timeline: [
        { year: '2000', event: '' },
        { year: '2010', event: '' },
        { year: '2020', event: '' },
      ],
    },
    visionMission: {
      vision: {
        title: 'Visi Kami',
        description: '',
      },
      mission: {
        title: 'Misi Kami',
        items: ['', '', ''],
      },
    },
    values: {
      title: 'Nilai-Nilai Kami',
      items: [
        { icon: '🤝', title: '', description: '' },
        { icon: '💡', title: '', description: '' },
        { icon: '🎯', title: '', description: '' },
        { icon: '🌟', title: '', description: '' },
      ],
    },
    team: {
      title: 'Tim Kami',
      description: '',
      members: [],
    },
  });

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch('/api/pages/slug/tentang-kami', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPageId(data.id);
        setStatus(data.status);
        setSections(data.sections);
      }
    } catch (err) {
      console.error('Failed to fetch page:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!pageId) {
      alert('Halaman belum dibuat. Jalankan seeder terlebih dahulu.');
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`/api/pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sections,
          status,
        }),
      });

      if (res.ok) {
        alert('✅ Halaman Tentang Kami berhasil diperbarui!');
        router.push('/admin/pages');
      } else {
        const error = await res.json();
        alert(`❌ Gagal menyimpan: ${error.message}`);
      }
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const addTimelineItem = () => {
    setSections({
      ...sections,
      history: {
        ...sections.history,
        timeline: [...sections.history.timeline, { year: '', event: '' }],
      },
    });
  };

  const removeTimelineItem = (index: number) => {
    setSections({
      ...sections,
      history: {
        ...sections.history,
        timeline: sections.history.timeline.filter((_, i) => i !== index),
      },
    });
  };

  const addMissionItem = () => {
    setSections({
      ...sections,
      visionMission: {
        ...sections.visionMission,
        mission: {
          ...sections.visionMission.mission,
          items: [...sections.visionMission.mission.items, ''],
        },
      },
    });
  };

  const removeMissionItem = (index: number) => {
    setSections({
      ...sections,
      visionMission: {
        ...sections.visionMission,
        mission: {
          ...sections.visionMission.mission,
          items: sections.visionMission.mission.items.filter((_, i) => i !== index),
        },
      },
    });
  };

  const addTeamMember = () => {
    setSections({
      ...sections,
      team: {
        ...sections.team,
        members: [...sections.team.members, { name: '', position: '', photo: '', bio: '' }],
      },
    });
  };

  const removeTeamMember = (index: number) => {
    setSections({
      ...sections,
      team: {
        ...sections.team,
        members: sections.team.members.filter((_, i) => i !== index),
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={48} className="animate-spin text-[#B8941E]" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/pages')}
            className="p-2 hover:bg-[#F5F1E8] rounded-lg transition"
          >
            <ArrowLeft size={24} className="text-[#2C1810]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#2C1810]">👥 Edit Halaman Tentang Kami</h1>
            <p className="text-[#2C1810]/60">Kelola informasi perusahaan dan tim</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-bold transition ${
              status === 'published'
                ? 'bg-green-100 text-green-700 border-green-300'
                : 'bg-yellow-100 text-yellow-700 border-yellow-300'
            }`}
          >
            {status === 'published' ? <Eye size={18} /> : <EyeOff size={18} />}
            {status === 'published' ? 'Published' : 'Draft'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] rounded-xl border-2 border-[#2C1810]/20 font-bold hover:shadow-lg transition disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            📸 Hero Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul</label>
              <input
                type="text"
                value={sections.hero.title}
                onChange={e => setSections({ ...sections, hero: { ...sections.hero, title: e.target.value } })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Subtitle</label>
              <input
                type="text"
                value={sections.hero.subtitle}
                onChange={e => setSections({ ...sections, hero: { ...sections.hero, subtitle: e.target.value } })}
                placeholder="Contoh: Mitra Terpercaya dalam Industri Manufaktur"
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <ImageUpload
              label="Gambar Background"
              value={sections.hero.backgroundImage}
              onChange={url => setSections({ ...sections, hero: { ...sections.hero, backgroundImage: url } })}
              hint="Resolusi optimal: 1920x600px"
            />
          </div>
        </section>

        {/* History Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            📜 Sejarah Perusahaan
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul</label>
              <input
                type="text"
                value={sections.history.title}
                onChange={e => setSections({ ...sections, history: { ...sections.history, title: e.target.value } })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Deskripsi</label>
              <textarea
                value={sections.history.description}
                onChange={e => setSections({ ...sections, history: { ...sections.history, description: e.target.value } })}
                rows={4}
                placeholder="Ceritakan sejarah singkat perusahaan..."
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-[#2C1810]">Timeline</label>
                <button
                  onClick={addTimelineItem}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300 text-sm font-semibold hover:bg-green-200 transition"
                >
                  <Plus size={14} /> Tambah
                </button>
              </div>
              <div className="space-y-3">
                {sections.history.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-[#FAF7F0] rounded-xl border border-[#2C1810]/10">
                    <input
                      type="text"
                      value={item.year}
                      onChange={e => {
                        const newTimeline = [...sections.history.timeline];
                        newTimeline[idx].year = e.target.value;
                        setSections({ ...sections, history: { ...sections.history, timeline: newTimeline } });
                      }}
                      placeholder="Tahun"
                      className="w-24 px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm font-bold text-[#2C1810]"
                    />
                    <input
                      type="text"
                      value={item.event}
                      onChange={e => {
                        const newTimeline = [...sections.history.timeline];
                        newTimeline[idx].event = e.target.value;
                        setSections({ ...sections, history: { ...sections.history, timeline: newTimeline } });
                      }}
                      placeholder="Peristiwa penting"
                      className="flex-1 px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm text-[#2C1810]"
                    />
                    <button
                      onClick={() => removeTimelineItem(idx)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            🎯 Visi & Misi
          </h2>
          <div className="space-y-6">
            {/* Vision */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul Visi</label>
              <input
                type="text"
                value={sections.visionMission.vision.title}
                onChange={e => setSections({
                  ...sections,
                  visionMission: {
                    ...sections.visionMission,
                    vision: { ...sections.visionMission.vision, title: e.target.value },
                  },
                })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 mb-3"
              />
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Deskripsi Visi</label>
              <textarea
                value={sections.visionMission.vision.description}
                onChange={e => setSections({
                  ...sections,
                  visionMission: {
                    ...sections.visionMission,
                    vision: { ...sections.visionMission.vision, description: e.target.value },
                  },
                })}
                rows={3}
                placeholder="Visi perusahaan..."
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>

            {/* Mission */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul Misi</label>
              <input
                type="text"
                value={sections.visionMission.mission.title}
                onChange={e => setSections({
                  ...sections,
                  visionMission: {
                    ...sections.visionMission,
                    mission: { ...sections.visionMission.mission, title: e.target.value },
                  },
                })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 mb-3"
              />
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-[#2C1810]">Poin-Poin Misi</label>
                <button
                  onClick={addMissionItem}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300 text-sm font-semibold hover:bg-green-200 transition"
                >
                  <Plus size={14} /> Tambah Poin
                </button>
              </div>
              <div className="space-y-2">
                {sections.visionMission.mission.items.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <span className="text-[#2C1810] font-bold">{idx + 1}.</span>
                    <input
                      type="text"
                      value={item}
                      onChange={e => {
                        const newItems = [...sections.visionMission.mission.items];
                        newItems[idx] = e.target.value;
                        setSections({
                          ...sections,
                          visionMission: {
                            ...sections.visionMission,
                            mission: { ...sections.visionMission.mission, items: newItems },
                          },
                        });
                      }}
                      placeholder="Poin misi"
                      className="flex-1 px-4 py-2 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
                    />
                    <button
                      onClick={() => removeMissionItem(idx)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            💎 Nilai-Nilai Perusahaan
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul Section</label>
            <input
              type="text"
              value={sections.values.title}
              onChange={e => setSections({ ...sections, values: { ...sections.values, title: e.target.value } })}
              className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.values.items.map((item, idx) => (
              <div key={idx} className="p-4 bg-[#FAF7F0] rounded-xl border border-[#2C1810]/10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <input
                    type="text"
                    value={item.title}
                    onChange={e => {
                      const newItems = [...sections.values.items];
                      newItems[idx].title = e.target.value;
                      setSections({ ...sections, values: { ...sections.values, items: newItems } });
                    }}
                    placeholder="Nama nilai"
                    className="flex-1 px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm font-semibold text-[#2C1810]"
                  />
                </div>
                <textarea
                  value={item.description}
                  onChange={e => {
                    const newItems = [...sections.values.items];
                    newItems[idx].description = e.target.value;
                    setSections({ ...sections, values: { ...sections.values, items: newItems } });
                  }}
                  rows={2}
                  placeholder="Deskripsi nilai"
                  className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm text-[#2C1810]"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            👨‍💼 Tim Kami
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul Section</label>
              <input
                type="text"
                value={sections.team.title}
                onChange={e => setSections({ ...sections, team: { ...sections.team, title: e.target.value } })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Deskripsi</label>
              <textarea
                value={sections.team.description}
                onChange={e => setSections({ ...sections, team: { ...sections.team, description: e.target.value } })}
                rows={2}
                placeholder="Deskripsi tentang tim..."
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-[#2C1810]">Anggota Tim</label>
                <button
                  onClick={addTeamMember}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300 text-sm font-semibold hover:bg-green-200 transition"
                >
                  <Plus size={14} /> Tambah Anggota
                </button>
              </div>
              <div className="space-y-4">
                {sections.team.members.map((member, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF7F0] rounded-xl border border-[#2C1810]/10">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-[#2C1810]">Anggota #{idx + 1}</h4>
                      <button
                        onClick={() => removeTeamMember(idx)}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={member.name}
                        onChange={e => {
                          const newMembers = [...sections.team.members];
                          newMembers[idx].name = e.target.value;
                          setSections({ ...sections, team: { ...sections.team, members: newMembers } });
                        }}
                        placeholder="Nama lengkap"
                        className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm text-[#2C1810]"
                      />
                      <input
                        type="text"
                        value={member.position}
                        onChange={e => {
                          const newMembers = [...sections.team.members];
                          newMembers[idx].position = e.target.value;
                          setSections({ ...sections, team: { ...sections.team, members: newMembers } });
                        }}
                        placeholder="Posisi/Jabatan"
                        className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm text-[#2C1810]"
                      />
                      <ImageUpload
                        label="Foto"
                        value={member.photo}
                        onChange={url => {
                          const newMembers = [...sections.team.members];
                          newMembers[idx].photo = url;
                          setSections({ ...sections, team: { ...sections.team, members: newMembers } });
                        }}
                      />
                      <textarea
                        value={member.bio}
                        onChange={e => {
                          const newMembers = [...sections.team.members];
                          newMembers[idx].bio = e.target.value;
                          setSections({ ...sections, team: { ...sections.team, members: newMembers } });
                        }}
                        rows={2}
                        placeholder="Bio singkat"
                        className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm text-[#2C1810]"
                      />
                    </div>
                  </div>
                ))}
                {sections.team.members.length === 0 && (
                  <p className="text-center text-[#2C1810]/50 py-8">Belum ada anggota tim. Klik "Tambah Anggota" untuk menambahkan.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Save Button (Bottom) */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] rounded-xl border-2 border-[#2C1810]/20 font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
        >
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
}
