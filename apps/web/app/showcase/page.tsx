'use client';

import { useEngineStore } from '@/lib/store';
import Link from 'next/link';
import { moduleRegistry } from '@tsl-kit/engine';
import { getTemplateMetadata, listTemplates } from '@/templates';
import { getEnabledServices } from '@/lib/analytics/config';

export default function ShowcasePage() {
  const backend = useEngineStore((state) => state.backend);
  const activeModuleId = useEngineStore((state) => state.activeModuleId);
  const setActiveModule = useEngineStore((state) => state.setActiveModule);

  // Get all modules
  const allModules = moduleRegistry.list();
  const materials = allModules.filter((m) => m.meta.category === 'Materials');
  const noise = allModules.filter((m) => m.meta.category === 'Noise');
  const postfx = allModules.filter((m) => m.meta.category === 'Post-FX');
  const test = allModules.filter((m) => m.meta.category === 'Test');

  // Get all templates
  const templates = listTemplates();

  // Get analytics services
  const analyticsServices = getEnabledServices();

  return (
    <main className="pointer-events-none flex min-h-screen flex-col items-start justify-start p-8">
      <div className="pointer-events-auto w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="rounded-lg bg-black/50 p-8 backdrop-blur-sm">
          <h1 className="text-5xl font-bold text-white">
            🎉 TSL-KIT Website Showcase
          </h1>
          <p className="mt-4 text-xl text-white/70">
            Phase 4: 50% Complete - All Features Preview
          </p>
          <div className="mt-4 flex gap-4 text-sm text-white/50">
            <span>Backend: <span className="font-mono text-white">{backend}</span></span>
            <span>•</span>
            <span>Active Module: <span className="font-mono text-white">{activeModuleId || 'None'}</span></span>
          </div>
        </div>

        {/* Engine Status */}
        <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">🎮 WebGPU Engine</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white/5 p-4">
              <div className="text-2xl font-bold text-blue-400">{allModules.length}</div>
              <div className="text-sm text-white/70">Total Modules</div>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="text-2xl font-bold text-green-400">{backend === 'webgpu' ? 'Active' : 'Fallback'}</div>
              <div className="text-sm text-white/70">WebGPU Status</div>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="text-2xl font-bold text-purple-400">Persistent</div>
              <div className="text-sm text-white/70">R3F Canvas</div>
            </div>
          </div>
        </div>

        {/* Modules by Category */}
        <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">📦 Engine Modules</h2>
          
          <div className="space-y-6">
            {/* Materials */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Materials ({materials.length})</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {materials.map((module) => (
                  <button
                    key={module.meta.id}
                    onClick={() => setActiveModule(module.meta.id)}
                    className={`rounded-lg p-4 text-left transition-all ${
                      activeModuleId === module.meta.id
                        ? 'bg-blue-500/20 border-2 border-blue-500'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="font-semibold text-white">{module.meta.label}</div>
                    <div className="text-xs text-white/50">{module.meta.id}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Noise */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Noise & Math ({noise.length})</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {noise.map((module) => (
                  <button
                    key={module.meta.id}
                    onClick={() => setActiveModule(module.meta.id)}
                    className={`rounded-lg p-4 text-left transition-all ${
                      activeModuleId === module.meta.id
                        ? 'bg-green-500/20 border-2 border-green-500'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="font-semibold text-white">{module.meta.label}</div>
                    <div className="text-xs text-white/50">{module.meta.id}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Post-FX */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Post-Processing ({postfx.length})</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {postfx.map((module) => (
                  <button
                    key={module.meta.id}
                    onClick={() => setActiveModule(module.meta.id)}
                    className={`rounded-lg p-4 text-left transition-all ${
                      activeModuleId === module.meta.id
                        ? 'bg-purple-500/20 border-2 border-purple-500'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="font-semibold text-white">{module.meta.label}</div>
                    <div className="text-xs text-white/50">{module.meta.id}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Test */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Test ({test.length})</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {test.map((module) => (
                  <button
                    key={module.meta.id}
                    onClick={() => setActiveModule(module.meta.id)}
                    className={`rounded-lg p-4 text-left transition-all ${
                      activeModuleId === module.meta.id
                        ? 'bg-yellow-500/20 border-2 border-yellow-500'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="font-semibold text-white">{module.meta.label}</div>
                    <div className="text-xs text-white/50">{module.meta.id}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/test"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-white font-semibold transition-colors hover:bg-blue-600"
            >
              View Full Module Test Page →
            </Link>
          </div>
        </div>

        {/* Blog & Content */}
        <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">📚 Blog & Content</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white/5 p-4">
              <div className="text-2xl font-bold text-blue-400">10</div>
              <div className="text-sm text-white/70">Example Posts</div>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="text-2xl font-bold text-green-400">{templates.length}</div>
              <div className="text-sm text-white/70">3D Templates</div>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="text-2xl font-bold text-purple-400">5</div>
              <div className="text-sm text-white/70">Style Themes</div>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="text-2xl font-bold text-orange-400">MDX</div>
              <div className="text-sm text-white/70">Content Format</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">3D Templates:</h3>
            <div className="grid gap-2 md:grid-cols-2">
              {templates.map((template) => (
                <div key={template.id} className="rounded-lg bg-white/5 p-3">
                  <div className="font-semibold text-white text-sm">{template.label}</div>
                  <div className="text-xs text-white/50">{template.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white font-semibold transition-colors hover:bg-green-600"
            >
              View Blog →
            </Link>
          </div>
        </div>

        {/* Features Completed */}
        <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">✅ Features Completed</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Phase 2 & 3: Engine</h3>
              <ul className="space-y-1 text-sm text-white/70">
                <li>✅ WebGPU renderer with fallback</li>
                <li>✅ 13 functional modules</li>
                <li>✅ TSL integration</li>
                <li>✅ Module registry & runner</li>
                <li>✅ Resource management</li>
                <li>✅ Tweakpane controls</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Phase 4: Website</h3>
              <ul className="space-y-1 text-sm text-white/70">
                <li>✅ Contentlayer MDX</li>
                <li>✅ 3D templates & themes</li>
                <li>✅ Blog pages</li>
                <li>✅ Giscus comments</li>
                <li>✅ SEO & metadata</li>
                <li>✅ Analytics & monitoring</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Analytics Status */}
        <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">📊 Analytics & Monitoring</h2>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Active Services:</h3>
            {analyticsServices.length > 0 ? (
              <ul className="space-y-2">
                {analyticsServices.map((service) => (
                  <li key={service} className="flex items-center gap-2 text-white/70">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    {service}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50 text-sm">
                No analytics configured. Add environment variables to enable.
              </p>
            )}

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg bg-white/5 p-3">
                <div className="text-sm font-semibold text-white">Error Boundaries</div>
                <div className="text-xs text-green-400">✅ Active</div>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <div className="text-sm font-semibold text-white">Web Vitals</div>
                <div className="text-xs text-green-400">✅ Tracking</div>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <div className="text-sm font-semibold text-white">Privacy</div>
                <div className="text-xs text-green-400">✅ GDPR</div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Features */}
        <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">🔍 SEO & Discovery</h2>
          
          <div className="grid gap-3 md:grid-cols-2">
            <Link
              href="/sitemap.xml"
              target="_blank"
              className="rounded-lg bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <div className="font-semibold text-white">Sitemap.xml</div>
              <div className="text-xs text-white/50">Dynamic page indexing</div>
            </Link>
            <Link
              href="/robots.txt"
              target="_blank"
              className="rounded-lg bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <div className="font-semibold text-white">Robots.txt</div>
              <div className="text-xs text-white/50">Search engine rules</div>
            </Link>
          </div>

          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold text-white">Metadata:</h3>
            <ul className="grid gap-2 md:grid-cols-2 text-sm text-white/70">
              <li>✅ OpenGraph tags</li>
              <li>✅ Twitter Cards</li>
              <li>✅ JSON-LD structured data</li>
              <li>✅ Canonical URLs</li>
              <li>✅ Rich snippets</li>
              <li>✅ Social media previews</li>
            </ul>
          </div>
        </div>

        {/* Phase Progress */}
        <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">📈 Phase 4 Progress</h2>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white">Overall Progress</span>
              <span className="text-white font-bold">50%</span>
            </div>
            <div className="h-4 rounded-full bg-white/10">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
            </div>
            <div className="text-xs text-white/50">5 out of 10 sections complete</div>
          </div>

          <div className="mt-6 grid gap-2 md:grid-cols-2 text-sm">
            <div className="space-y-1">
              <h3 className="font-semibold text-green-400">✅ Completed</h3>
              <ul className="space-y-1 text-white/70">
                <li>• Content Pipeline & MDX</li>
                <li>• Website Pages</li>
                <li>• Comments & Community</li>
                <li>• SEO & Metadata</li>
                <li>• Analytics & Monitoring</li>
              </ul>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-yellow-400">⏳ Remaining</h3>
              <ul className="space-y-1 text-white/70">
                <li>• Deployment & CI/CD</li>
                <li>• Polish & Launch</li>
                <li>• Admin Dashboard (optional)</li>
                <li>• AI Assistants (optional)</li>
                <li>• RAG & KB (optional)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">🗺️ Site Navigation</h2>
          
          <div className="grid gap-3 md:grid-cols-3">
            <Link
              href="/"
              className="rounded-lg bg-blue-500/20 p-4 text-center transition-colors hover:bg-blue-500/30"
            >
              <div className="font-semibold text-white">Home</div>
              <div className="text-xs text-white/70">Engine status</div>
            </Link>
            <Link
              href="/test"
              className="rounded-lg bg-green-500/20 p-4 text-center transition-colors hover:bg-green-500/30"
            >
              <div className="font-semibold text-white">Module Test</div>
              <div className="text-xs text-white/70">Try all modules</div>
            </Link>
            <Link
              href="/blog"
              className="rounded-lg bg-purple-500/20 p-4 text-center transition-colors hover:bg-purple-500/30"
            >
              <div className="font-semibold text-white">Blog</div>
              <div className="text-xs text-white/70">10 example posts</div>
            </Link>
          </div>
        </div>

        {/* Documentation */}
        <div className="rounded-lg bg-black/50 p-6 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-4">📚 Documentation</h2>
          
          <div className="space-y-2 text-sm text-white/70">
            <div>📄 <code className="text-white/90">PREVIEW_GUIDE.md</code> - Complete feature tour</div>
            <div>📄 <code className="text-white/90">CURRENT_STATUS.md</code> - Project status</div>
            <div>📄 <code className="text-white/90">docs/GISCUS_SETUP.md</code> - Comments setup</div>
            <div>📄 <code className="text-white/90">docs/ANALYTICS_SETUP.md</code> - Analytics setup</div>
            <div>📄 <code className="text-white/90">PHASE_4_PROGRESS_REPORT.md</code> - Detailed progress</div>
          </div>
        </div>
      </div>
    </main>
  );
}

