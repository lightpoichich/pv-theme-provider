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
import { TOKEN_DEFAULTS, getTokensForSize } from '../shared/tokens.js';

export default {
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  setup(props) {
    // Build the full set of CSS variables from content props
    const allTokens = computed(() => {
      const c = props.content;
      const tokens = {};

      // Colors — map content props to CSS variable names
      tokens['--pv-primary'] = c?.primaryColor || TOKEN_DEFAULTS['--pv-primary'];
      tokens['--pv-primary-hover'] = c?.primaryHoverColor || TOKEN_DEFAULTS['--pv-primary-hover'];
      tokens['--pv-primary-light'] = c?.primaryLightColor || TOKEN_DEFAULTS['--pv-primary-light'];
      tokens['--pv-primary-contrast'] = c?.primaryContrastColor || TOKEN_DEFAULTS['--pv-primary-contrast'];
      tokens['--pv-danger'] = c?.dangerColor || TOKEN_DEFAULTS['--pv-danger'];
      tokens['--pv-success'] = c?.successColor || TOKEN_DEFAULTS['--pv-success'];
      tokens['--pv-warning'] = c?.warningColor || TOKEN_DEFAULTS['--pv-warning'];
      tokens['--pv-neutral'] = c?.neutralColor || TOKEN_DEFAULTS['--pv-neutral'];
      tokens['--pv-surface'] = c?.surfaceColor || TOKEN_DEFAULTS['--pv-surface'];
      tokens['--pv-border'] = c?.borderColor || TOKEN_DEFAULTS['--pv-border'];
      tokens['--pv-text'] = c?.textColor || TOKEN_DEFAULTS['--pv-text'];
      tokens['--pv-text-muted'] = c?.textMutedColor || TOKEN_DEFAULTS['--pv-text-muted'];

      // Shape
      tokens['--pv-radius-sm'] = c?.radiusSm || TOKEN_DEFAULTS['--pv-radius-sm'];
      tokens['--pv-radius'] = c?.radius || TOKEN_DEFAULTS['--pv-radius'];
      tokens['--pv-radius-lg'] = c?.radiusLg || TOKEN_DEFAULTS['--pv-radius-lg'];
      tokens['--pv-radius-full'] = c?.radiusFull || TOKEN_DEFAULTS['--pv-radius-full'];
      tokens['--pv-transition'] = c?.transition || TOKEN_DEFAULTS['--pv-transition'];

      // Typography
      tokens['--pv-font'] = c?.fontFamily || TOKEN_DEFAULTS['--pv-font'];
      tokens['--pv-font-size-lg'] = c?.fontSizeLg || TOKEN_DEFAULTS['--pv-font-size-lg'];

      // Effects
      tokens['--pv-shadow-sm'] = c?.shadowSm || TOKEN_DEFAULTS['--pv-shadow-sm'];
      tokens['--pv-shadow'] = c?.shadow || TOKEN_DEFAULTS['--pv-shadow'];
      tokens['--pv-focus-ring'] = c?.focusRingColor || TOKEN_DEFAULTS['--pv-focus-ring'];

      // Size density — preset or custom
      const size = c?.size || 'md';
      if (size === 'custom') {
        tokens['--pv-spacing'] = c?.customSpacing || '8px';
        tokens['--pv-input-py'] = c?.customInputPy || '10px';
        tokens['--pv-input-px'] = c?.customInputPx || '14px';
        tokens['--pv-btn-py'] = c?.customBtnPy || '10px';
        tokens['--pv-btn-px'] = c?.customBtnPx || '20px';
        tokens['--pv-font-size'] = c?.customFontSize || '14px';
        tokens['--pv-font-size-sm'] = c?.customFontSizeSm || '12px';
        tokens['--pv-icon-size'] = c?.customIconSize || '18px';
      } else {
        const sizeTokens = getTokensForSize(size);
        Object.assign(tokens, sizeTokens);
      }

      return tokens;
    });

    const tokenCount = computed(() => Object.keys(allTokens.value).length);

    // Track all keys ever set, so switching from custom→preset cleans up stale vars
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
