import registry from './registry.json';

export interface TemplateMetadata {
  component: string;
  label: string;
  description: string;
  category: string;
  schemaKeys: string[];
  thumbnail: string;
  tags: string[];
}

export interface Template {
  id: string;
  metadata: TemplateMetadata;
  Component: React.ComponentType<any>;
}

/**
 * Load a template component by ID
 * @param templateId - The ID of the template to load
 * @returns Promise resolving to the template component
 */
export async function loadTemplate(templateId: string): Promise<React.ComponentType<any>> {
  const template = (registry as Record<string, TemplateMetadata>)[templateId];
  
  if (!template) {
    throw new Error(`Template "${templateId}" not found in registry`);
  }
  
  try {
    // Dynamic import of template component
    const module = await import(`${template.component}`);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to load template "${templateId}":`, error);
    throw new Error(`Failed to load template "${templateId}"`);
  }
}

/**
 * Get metadata for a template without loading the component
 * @param templateId - The ID of the template
 * @returns Template metadata or undefined if not found
 */
export function getTemplateMetadata(templateId: string): TemplateMetadata | undefined {
  return (registry as Record<string, TemplateMetadata>)[templateId];
}

/**
 * List all available templates
 * @returns Array of templates with their IDs and metadata
 */
export function listTemplates(): Array<{ id: string } & TemplateMetadata> {
  return Object.entries(registry as Record<string, TemplateMetadata>).map(([id, meta]) => ({
    id,
    ...meta,
  }));
}

/**
 * Get templates by category
 * @param category - Category name
 * @returns Array of templates in that category
 */
export function getTemplatesByCategory(category: string): Array<{ id: string } & TemplateMetadata> {
  return listTemplates().filter((t) => t.category === category);
}

/**
 * Get templates by tag
 * @param tag - Tag name
 * @returns Array of templates with that tag
 */
export function getTemplatesByTag(tag: string): Array<{ id: string } & TemplateMetadata> {
  return listTemplates().filter((t) => t.tags.includes(tag));
}

/**
 * Get all template categories
 * @returns Array of unique category names
 */
export function getCategories(): string[] {
  const categories = new Set<string>();
  Object.values(registry as Record<string, TemplateMetadata>).forEach((t) => categories.add(t.category));
  return Array.from(categories).sort();
}

/**
 * Get all template tags
 * @returns Array of unique tag names
 */
export function getTags(): string[] {
  const tags = new Set<string>();
  Object.values(registry as Record<string, TemplateMetadata>).forEach((t) => 
    t.tags.forEach((tag) => tags.add(tag))
  );
  return Array.from(tags).sort();
}

