import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Heart, Save, Edit, RefreshCw, Wand2, Plus, Trash2 } from 'lucide-react';
import { ScrapbookContent, PhotoMemory } from '../types';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ScrapbookContent;
  onSaveContent: (newContent: ScrapbookContent) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  content,
  onSaveContent,
}) => {
  const [formData, setFormData] = useState<ScrapbookContent>({ ...content });
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'titles' | 'essay' | 'ai'>('titles');

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveContent(formData);
    onClose();
  };

  const handleAiGenerate = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/gemini/romantic-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt || 'A sweet romantic letter expressing deep love for my girlfriend Aruu on Girlfriend\'s Day',
          name: formData.girlfriendName || 'Aruu',
        }),
      });

      const data = await res.json();
      if (data.note) {
        // Split note into paragraphs and update essay body
        const paragraphs = data.note.split('\n\n').filter(Boolean);
        setFormData({
          ...formData,
          essayBody: paragraphs,
        });
        setActiveTab('essay');
      }
    } catch (err) {
      console.error('AI generation error:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="max-w-2xl w-full bg-[#160d1b] border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 relative my-auto max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-rose-500/20 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-600/30 border border-rose-400/30 flex items-center justify-center text-rose-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-script text-2xl sm:text-3xl text-rose-200">
                Personalize Scrapbook for {formData.girlfriendName} 💕
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 border-b border-rose-500/10 text-xs font-medium">
            <button
              onClick={() => setActiveTab('titles')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeTab === 'titles' ? 'bg-rose-600 text-white' : 'bg-slate-900/60 text-rose-200/70'
              }`}
            >
              Titles & Names
            </button>
            <button
              onClick={() => setActiveTab('essay')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeTab === 'essay' ? 'bg-rose-600 text-white' : 'bg-slate-900/60 text-rose-200/70'
              }`}
            >
              Essay & Quote
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'ai' ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white' : 'bg-slate-900/60 text-amber-200/80'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI Romantic Assistant</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-4 overflow-y-auto pr-1 flex-1">
            {activeTab === 'titles' && (
              <>
                <div>
                  <label className="block text-xs uppercase text-rose-300/80 mb-1">
                    Her Name / Nickname
                  </label>
                  <input
                    type="text"
                    value={formData.girlfriendName}
                    onChange={(e) =>
                      setFormData({ ...formData, girlfriendName: e.target.value })
                    }
                    className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-rose-300/80 mb-1">
                    Cover Title
                  </label>
                  <input
                    type="text"
                    value={formData.coverTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, coverTitle: e.target.value })
                    }
                    className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-rose-300/80 mb-1">
                    Cover Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={formData.coverSubtitle}
                    onChange={(e) =>
                      setFormData({ ...formData, coverSubtitle: e.target.value })
                    }
                    className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-rose-300/80 mb-1">
                    Relationship Start Date (for Days Together counter)
                  </label>
                  <input
                    type="date"
                    value={formData.relationshipStartDate}
                    onChange={(e) =>
                      setFormData({ ...formData, relationshipStartDate: e.target.value })
                    }
                    className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>
              </>
            )}

            {activeTab === 'essay' && (
              <>
                <div>
                  <label className="block text-xs uppercase text-rose-300/80 mb-1">
                    Essay Heading
                  </label>
                  <input
                    type="text"
                    value={formData.essayHeading}
                    onChange={(e) =>
                      setFormData({ ...formData, essayHeading: e.target.value })
                    }
                    className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-rose-300/80 mb-1">
                    Featured Quote
                  </label>
                  <textarea
                    rows={2}
                    value={formData.essayQuote}
                    onChange={(e) =>
                      setFormData({ ...formData, essayQuote: e.target.value })
                    }
                    className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-rose-300/80 mb-1">
                    Essay Body (Paragraphs separated by new lines)
                  </label>
                  <textarea
                    rows={6}
                    value={formData.essayBody.join('\n\n')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        essayBody: e.target.value.split('\n\n').filter(Boolean),
                      })
                    }
                    className="w-full bg-slate-900/80 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-100 font-sans"
                  />
                </div>
              </>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-4 bg-rose-950/20 p-4 rounded-2xl border border-rose-500/20">
                <div className="flex items-center gap-2 text-amber-200">
                  <Wand2 className="w-5 h-5" />
                  <h4 className="font-script text-2xl">Gemini AI Romantic Letter Generator</h4>
                </div>
                <p className="text-xs text-rose-200/80 leading-relaxed font-light">
                  Want help writing the perfect message or essay for {formData.girlfriendName}? Type any special memories, inside jokes, or feelings below, and Gemini will compose a classy, touching letter!
                </p>

                <textarea
                  rows={3}
                  placeholder="e.g. Write about how much I love her smile, our trip to the beach, and how grateful I am for her patience."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full bg-slate-900 border border-rose-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                />

                <button
                  onClick={handleAiGenerate}
                  disabled={isGeneratingAi}
                  className="w-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-medium py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingAi ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Composing With Gemini AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Romantic Essay For {formData.girlfriendName}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Footer Save Button */}
          <div className="pt-6 mt-4 border-t border-rose-500/20 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-slate-900 text-slate-300 text-sm hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-medium px-6 py-2.5 rounded-full text-sm shadow-lg shadow-rose-950/50"
            >
              <Save className="w-4 h-4" />
              <span>Apply Changes</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
