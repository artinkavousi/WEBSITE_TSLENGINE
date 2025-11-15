'use client';

import { useEngineStore } from '@/lib/store';
import { moduleRegistry } from '@tsl-kit/engine';
import { useEffect, useRef } from 'react';
import { Pane } from 'tweakpane';

export default function ModuleControls() {
  const containerRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<Pane | null>(null);
  const bindingsRef = useRef<any[]>([]);
  
  const activeModuleId = useEngineStore((state) => state.activeModuleId);
  const moduleParams = useEngineStore((state) => state.moduleParams);
  const setParam = useEngineStore((state) => state.setParam);

  // Create pane once
  useEffect(() => {
    if (!containerRef.current || paneRef.current) return;

    const pane = new Pane({
      title: 'Controls',
      container: containerRef.current,
    });

    paneRef.current = pane;

    return () => {
      pane.dispose();
      paneRef.current = null;
    };
  }, []);

  // Update controls when module changes
  useEffect(() => {
    const pane = paneRef.current;
    if (!pane || !activeModuleId) return;

    const module = moduleRegistry.get(activeModuleId);
    if (!module) return;

    // Remove all existing bindings
    bindingsRef.current.forEach(binding => {
      try {
        pane.remove(binding);
      } catch (e) {
        // Binding already removed
      }
    });
    bindingsRef.current = [];

    // Set pane title
    pane.title = module.meta.label;

    // Create local params object with defaults
    const localParams = { ...module.defaultParams, ...moduleParams };

    // Add controls for each parameter
    Object.keys(localParams).forEach((key) => {
      const schema = module.schema?.jsonSchema?.properties?.[key];
      
      try {
        const options: any = {
          label: schema?.description || key,
        };

        // Add constraints for numbers
        if (schema?.type === 'number') {
          if (schema.minimum !== undefined) options.min = schema.minimum;
          if (schema.maximum !== undefined) options.max = schema.maximum;
          if (schema.step) options.step = schema.step;
        }

        const binding = pane.addBinding(localParams, key, options);
        bindingsRef.current.push(binding);

        // Update store on change
        binding.on('change', (ev: any) => {
          setParam(key, ev.value);
        });
      } catch (err) {
        console.warn(`Failed to add control for ${key}:`, err);
      }
    });

  }, [activeModuleId, moduleParams, setParam]);

  return (
    <div
      ref={containerRef}
      className="fixed right-4 top-4 z-20 pointer-events-auto"
      style={{ width: '280px' }}
    />
  );
}
