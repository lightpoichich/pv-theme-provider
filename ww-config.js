export default {
  editor: {
    label: { en: 'PV Theme Provider' },
    icon: 'palette',
    customSettingsPropertiesOrder: [
      {
        label: 'Size & Density',
        isCollapsible: true,
        properties: [
          'size',
          'customSpacing', 'customInputPy', 'customInputPx',
          'customBtnPy', 'customBtnPx', 'customFontSize',
          'customFontSizeSm', 'customIconSize',
        ],
      },
      {
        label: 'Colors — Brand',
        isCollapsible: true,
        properties: ['primaryColor', 'primaryHoverColor', 'primaryLightColor', 'primaryContrastColor'],
      },
      {
        label: 'Colors — Semantic',
        isCollapsible: true,
        properties: ['dangerColor', 'successColor', 'warningColor'],
      },
      {
        label: 'Colors — Neutral',
        isCollapsible: true,
        properties: ['neutralColor', 'surfaceColor', 'borderColor', 'textColor', 'textMutedColor'],
      },
      {
        label: 'Shape',
        isCollapsible: true,
        properties: ['radiusSm', 'radius', 'radiusLg', 'radiusFull', 'transition'],
      },
      {
        label: 'Typography',
        isCollapsible: true,
        properties: ['fontFamily', 'fontSizeLg'],
      },
      {
        label: 'Effects',
        isCollapsible: true,
        properties: ['shadowSm', 'shadow', 'focusRingColor'],
      },
    ],
  },
  properties: {
    // ── Size & Density ──
    size: {
      label: { en: 'Size Preset' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'sm', label: { en: 'Small' } },
          { value: 'md', label: { en: 'Medium' } },
          { value: 'lg', label: { en: 'Large' } },
          { value: 'custom', label: { en: 'Custom' } },
        ],
      },
      defaultValue: 'md',
    },
    customSpacing: {
      label: { en: 'Spacing' },
      type: 'Length',
      section: 'settings',
      defaultValue: '8px',
      hidden: (content) => content?.size !== 'custom',
    },
    customInputPy: {
      label: { en: 'Input Padding Y' },
      type: 'Length',
      section: 'settings',
      defaultValue: '10px',
      hidden: (content) => content?.size !== 'custom',
    },
    customInputPx: {
      label: { en: 'Input Padding X' },
      type: 'Length',
      section: 'settings',
      defaultValue: '14px',
      hidden: (content) => content?.size !== 'custom',
    },
    customBtnPy: {
      label: { en: 'Button Padding Y' },
      type: 'Length',
      section: 'settings',
      defaultValue: '10px',
      hidden: (content) => content?.size !== 'custom',
    },
    customBtnPx: {
      label: { en: 'Button Padding X' },
      type: 'Length',
      section: 'settings',
      defaultValue: '20px',
      hidden: (content) => content?.size !== 'custom',
    },
    customFontSize: {
      label: { en: 'Font Size' },
      type: 'Length',
      section: 'settings',
      defaultValue: '14px',
      hidden: (content) => content?.size !== 'custom',
    },
    customFontSizeSm: {
      label: { en: 'Font Size Small' },
      type: 'Length',
      section: 'settings',
      defaultValue: '12px',
      hidden: (content) => content?.size !== 'custom',
    },
    customIconSize: {
      label: { en: 'Icon Size' },
      type: 'Length',
      section: 'settings',
      defaultValue: '18px',
      hidden: (content) => content?.size !== 'custom',
    },

    // ── Colors — Brand ──
    primaryColor: {
      label: { en: 'Primary' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#3B82F6',
    },
    primaryHoverColor: {
      label: { en: 'Primary Hover' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#1e40af',
    },
    primaryLightColor: {
      label: { en: 'Primary Light' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#dbeafe',
    },
    primaryContrastColor: {
      label: { en: 'Primary Contrast' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#ffffff',
    },

    // ── Colors — Semantic ──
    dangerColor: {
      label: { en: 'Danger' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#EF4444',
    },
    successColor: {
      label: { en: 'Success' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#22C55E',
    },
    warningColor: {
      label: { en: 'Warning' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#F59E0B',
    },

    // ── Colors — Neutral ──
    neutralColor: {
      label: { en: 'Neutral' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#64748b',
    },
    surfaceColor: {
      label: { en: 'Surface' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#f8fafc',
    },
    borderColor: {
      label: { en: 'Border' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#e2e8f0',
    },
    textColor: {
      label: { en: 'Text' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#0f172a',
    },
    textMutedColor: {
      label: { en: 'Text Muted' },
      type: 'Color',
      section: 'settings',
      defaultValue: '#94a3b8',
    },

    // ── Shape ──
    radiusSm: {
      label: { en: 'Radius Small' },
      type: 'Length',
      section: 'settings',
      defaultValue: '4px',
    },
    radius: {
      label: { en: 'Radius' },
      type: 'Length',
      section: 'settings',
      defaultValue: '8px',
    },
    radiusLg: {
      label: { en: 'Radius Large' },
      type: 'Length',
      section: 'settings',
      defaultValue: '12px',
    },
    radiusFull: {
      label: { en: 'Radius Full' },
      type: 'Length',
      section: 'settings',
      defaultValue: '9999px',
    },
    transition: {
      label: { en: 'Transition Duration' },
      type: 'Text',
      section: 'settings',
      defaultValue: '150ms',
    },

    // ── Typography ──
    fontFamily: {
      label: { en: 'Font Family' },
      type: 'TextSelect',
      section: 'settings',
      options: {
        options: [
          { value: 'Inter, system-ui, sans-serif', label: { en: 'Inter' } },
          { value: 'system-ui, sans-serif', label: { en: 'System' } },
          { value: '"IBM Plex Sans", sans-serif', label: { en: 'IBM Plex' } },
          { value: '"DM Sans", sans-serif', label: { en: 'DM Sans' } },
          { value: '"Outfit", sans-serif', label: { en: 'Outfit' } },
        ],
      },
      defaultValue: 'Inter, system-ui, sans-serif',
    },
    fontSizeLg: {
      label: { en: 'Font Size Large' },
      type: 'Length',
      section: 'settings',
      defaultValue: '16px',
    },

    // ── Effects ──
    shadowSm: {
      label: { en: 'Shadow Small' },
      type: 'Text',
      section: 'settings',
      defaultValue: '0 1px 3px rgba(0,0,0,0.1)',
    },
    shadow: {
      label: { en: 'Shadow' },
      type: 'Text',
      section: 'settings',
      defaultValue: '0 4px 12px rgba(0,0,0,0.1)',
    },
    focusRingColor: {
      label: { en: 'Focus Ring' },
      type: 'Color',
      section: 'settings',
      defaultValue: 'rgba(59,130,246,0.3)',
    },
  },
};
