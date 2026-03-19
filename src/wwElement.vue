<template>
  <div class="pv-theme-provider">
    <div class="pv-theme-provider__inner">
      <!-- wwEditor:start -->
      <div class="pv-theme-provider__badge">
        Theme Provider — {{ tokenCount }} tokens injected ({{ props.content?.size || 'md' }})
      </div>
      <!-- wwEditor:end -->
    </div>
  </div>
</template>

<script>
import { computed, watch, onMounted, onBeforeUnmount } from 'vue';

// Size density presets mapped to PrimeVue variables
const SIZE_PRESETS = {
  sm: {
    '--p-form-field-padding-x': '0.625rem',
    '--p-form-field-padding-y': '0.375rem',
    '--p-button-padding-x': '0.75rem',
    '--p-button-padding-y': '0.375rem',
    '--p-font-size': '0.8125rem',
    '--p-content-padding': '0.625rem',
  },
  md: {
    '--p-form-field-padding-x': '0.75rem',
    '--p-form-field-padding-y': '0.5rem',
    '--p-button-padding-x': '1rem',
    '--p-button-padding-y': '0.5rem',
    '--p-font-size': '0.875rem',
    '--p-content-padding': '0.875rem',
  },
  lg: {
    '--p-form-field-padding-x': '1rem',
    '--p-form-field-padding-y': '0.75rem',
    '--p-button-padding-x': '1.5rem',
    '--p-button-padding-y': '0.75rem',
    '--p-font-size': '1rem',
    '--p-content-padding': '1.125rem',
  },
};

export default {
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  setup(props) {
    // Build PrimeVue CSS variables from editor props
    const allTokens = computed(() => {
      const c = props.content;
      const tokens = {};

      // Colors — Brand
      const primary = c?.primaryColor || '#3B82F6';
      tokens['--p-primary-color'] = primary;
      tokens['--p-primary-500'] = primary;
      tokens['--p-primary-hover-color'] = c?.primaryHoverColor || '#1e40af';
      tokens['--p-primary-700'] = c?.primaryHoverColor || '#1e40af';
      tokens['--p-primary-100'] = c?.primaryLightColor || '#dbeafe';
      tokens['--p-primary-50'] = c?.primaryLightColor || '#dbeafe';
      tokens['--p-primary-contrast-color'] = c?.primaryContrastColor || '#ffffff';
      tokens['--p-highlight-background'] = c?.primaryLightColor || '#dbeafe';
      tokens['--p-highlight-color'] = primary;
      tokens['--p-highlight-focus-background'] = c?.primaryLightColor || '#dbeafe';
      tokens['--p-highlight-focus-color'] = primary;

      // Colors — Semantic
      tokens['--p-red-500'] = c?.dangerColor || '#EF4444';
      tokens['--p-green-500'] = c?.successColor || '#22C55E';
      tokens['--p-yellow-500'] = c?.warningColor || '#F59E0B';

      // Colors — Neutral / Surface
      tokens['--p-content-background'] = c?.surfaceColor || '#ffffff';
      tokens['--p-content-border-color'] = c?.borderColor || '#e2e8f0';
      tokens['--p-surface-border'] = c?.borderColor || '#e2e8f0';
      tokens['--p-text-color'] = c?.textColor || '#0f172a';
      tokens['--p-text-muted-color'] = c?.textMutedColor || '#94a3b8';

      // Form field
      tokens['--p-form-field-border-color'] = c?.borderColor || '#e2e8f0';
      tokens['--p-form-field-hover-border-color'] = c?.primaryHoverColor || '#1e40af';
      tokens['--p-form-field-focus-border-color'] = primary;
      tokens['--p-form-field-invalid-border-color'] = c?.dangerColor || '#EF4444';
      tokens['--p-form-field-background'] = c?.surfaceColor || '#ffffff';
      tokens['--p-form-field-color'] = c?.textColor || '#0f172a';
      tokens['--p-form-field-placeholder-color'] = c?.textMutedColor || '#94a3b8';

      // Shape
      tokens['--p-content-border-radius'] = c?.radius || '8px';
      tokens['--p-form-field-border-radius'] = c?.radius || '8px';
      tokens['--p-rounded-sm'] = c?.radiusSm || '4px';
      tokens['--p-rounded-base'] = c?.radius || '8px';
      tokens['--p-rounded-lg'] = c?.radiusLg || '12px';
      tokens['--p-rounded-full'] = c?.radiusFull || '9999px';

      // Typography
      tokens['--p-font-family'] = c?.fontFamily || 'Inter, system-ui, sans-serif';

      // Effects
      tokens['--p-focus-ring-color'] = c?.focusRingColor || 'rgba(59,130,246,0.3)';
      tokens['--p-overlay-select-shadow'] = c?.shadow || '0 4px 12px rgba(0,0,0,0.1)';

      // Transition
      tokens['--p-transition-duration'] = c?.transition || '150ms';

      // Size density
      const size = c?.size || 'md';
      if (size === 'custom') {
        tokens['--p-form-field-padding-x'] = c?.customInputPx || '14px';
        tokens['--p-form-field-padding-y'] = c?.customInputPy || '10px';
        tokens['--p-button-padding-x'] = c?.customBtnPx || '20px';
        tokens['--p-button-padding-y'] = c?.customBtnPy || '10px';
        tokens['--p-font-size'] = c?.customFontSize || '14px';
      } else {
        Object.assign(tokens, SIZE_PRESETS[size] || SIZE_PRESETS.md);
      }

      return tokens;
    });

    const tokenCount = computed(() => Object.keys(allTokens.value).length);

    // Track all keys ever set, so switching presets cleans up stale vars
    let injectedKeys = new Set();

    const injectTokens = () => {
      const doc = wwLib.getFrontDocument();
      if (!doc) return;
      const root = doc.documentElement;
      const newKeys = new Set();
      for (const [key, value] of Object.entries(allTokens.value)) {
        root.style.setProperty(key, value);
        newKeys.add(key);
      }
      // Remove keys that were set before but aren't in the current token set
      for (const key of injectedKeys) {
        if (!newKeys.has(key)) {
          root.style.removeProperty(key);
        }
      }
      injectedKeys = newKeys;
    };

    const removeTokens = () => {
      const doc = wwLib.getFrontDocument();
      if (!doc) return;
      const root = doc.documentElement;
      for (const key of injectedKeys) {
        root.style.removeProperty(key);
      }
      injectedKeys = new Set();
    };

    onMounted(() => injectTokens());
    watch(allTokens, () => injectTokens(), { deep: true });
    onBeforeUnmount(() => removeTokens());

    return { props, tokenCount };
  },
};
</script>

<style scoped lang="scss">
.pv-theme-provider {
  &__inner {
    // Minimal footprint — this component is invisible in production
  }

  &__badge {
    font-size: 11px;
    color: #6366f1;
    background: #eef2ff;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid #c7d2fe;
    display: inline-block;
  }
}
</style>
