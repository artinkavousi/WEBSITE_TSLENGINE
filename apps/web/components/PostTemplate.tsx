'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { loadTemplate } from '@/templates';
import { getStyleTokens, styleToCSSVariables } from '@/lib/styles/tokens';

interface PostTemplateProps {
  templateId: string;
  styleId?: string;
  sceneProps?: any;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="white" wireframe />
    </mesh>
  );
}

export default function PostTemplate({
  templateId,
  styleId = 'neon',
  sceneProps,
}: PostTemplateProps) {
  const [TemplateComponent, setTemplateComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Apply style tokens
  const styleTokens = getStyleTokens(styleId);
  const cssVariables = styleToCSSVariables(styleTokens);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        
        const component = await loadTemplate(templateId);
        
        if (mounted) {
          setTemplateComponent(() => component);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(`Failed to load template "${templateId}":`, err);
        if (mounted) {
          setError(err instanceof Error ? err.message : String(err));
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [templateId]);

  if (error) {
    console.error('Template error:', error);
    // Return null to show just the content without 3D background
    return null;
  }

  return (
    <>
      {/* Apply style tokens via CSS variables */}
      <style dangerouslySetInnerHTML={{ __html: cssVariables }} />

      {/* 3D Template Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Suspense fallback={<LoadingFallback />}>
            {TemplateComponent && !isLoading ? (
              <TemplateComponent sceneProps={sceneProps} />
            ) : (
              <LoadingFallback />
            )}
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

