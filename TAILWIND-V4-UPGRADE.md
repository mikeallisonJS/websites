# Tailwind CSS v4 Upgrade

This project has been upgraded to Tailwind CSS v4. Here's a summary of the changes:

## Key Changes

1. **Dependencies**:
   - Upgraded `tailwindcss` to version 4.0.0
   - Added `@tailwindcss/postcss`, `@tailwindcss/vite`, and `@tailwindcss/cli`
   - Replaced `tailwindcss-animate` with `tw-animate-css`
   - Removed `autoprefixer` (now integrated in Tailwind v4)

2. **Configuration**:
   - Changed module extension from `.ts` to `.mts` for ESM compatibility
   - Updated `moduleResolution` in tsconfig to `node16`
   - Changed the Tailwind config syntax to use `type: Config` instead of `satisfies Config`

3. **CSS Files**:
   - Replaced `@tailwind base/components/utilities` with `@import "tailwindcss"`
   - Added `@import "tw-animate-css"` for animations
   - Updated HSL color definitions to use standard CSS syntax instead of CSS variables

## Browser Compatibility

Tailwind CSS v4 requires modern browsers:
- Safari 16.4+
- Chrome 111+
- Firefox 128+

## Notes for Developers

1. **Working with CSS Variables**:
   - In v4, use `color-(--my-variable)` instead of `color-[--my-variable]`
   
2. **Ordering of Stacked Variants**:
   - In v4, stacked variants are applied left-to-right instead of right-to-left
   - Example: Change `first:*:pt-0` to `*:first:pt-0`

3. **Transitioning Colors**:
   - Color transitions now include `outline-color` by default

4. **Custom Utilities**:
   - Use `@utility` instead of `@layer utilities` when creating custom utilities

## Shadcn UI Compatibility

The project uses Shadcn UI components which are now updated to work with Tailwind CSS v4. The main changes include:

1. Updated animation handling via `tw-animate-css`
2. Direct CSS variable usage in HSL format
3. Update to the newer color syntax in tailwind.config

## Resources

- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Shadcn UI Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4) 