# Blog Editor - Testing Guide

## 🧪 How to Test the New Features

### Prerequisites

- Development server running at `http://localhost:5173/`
- If not running: `npm run dev`

---

## Test 1: Embed Component - YouTube

### Steps:

1. Click "Add Card" button
2. In the card, click the Plus (+) icon
3. Select "Embed" from the content type menu
4. Paste this YouTube URL:
   ```
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```

### Expected Results:

- ✅ Green badge appears: "Detected: YouTube"
- ✅ YouTube video player preview renders immediately
- ✅ Video is playable in preview
- ✅ No errors in console

### Alternative URLs to Test:

```
https://youtu.be/dQw4w9WgXcQ
https://www.youtube.com/embed/dQw4w9WgXcQ
```

---

## Test 2: Embed Component - Vimeo

### Steps:

1. Add an Embed subcard
2. Paste this Vimeo URL:
   ```
   https://vimeo.com/148751763
   ```

### Expected Results:

- ✅ Green badge: "Detected: Vimeo"
- ✅ Vimeo player preview renders
- ✅ Video controls visible

---

## Test 3: Embed Component - Twitter/X

### Steps:

1. Add an Embed subcard
2. Paste this Twitter URL:
   ```
   https://twitter.com/elonmusk/status/1593899029687803906
   ```

### Expected Results:

- ✅ Green badge: "Detected: X (Twitter)"
- ✅ Tweet preview renders (may take 1-2 seconds to load)
- ✅ Tweet shows with proper formatting
- ✅ No duplicate script tags in the textarea

### Note:

Twitter embeds require their external script to load. The preview may show a placeholder initially and then populate.

---

## Test 4: Embed Component - Instagram

### Steps:

1. Add an Embed subcard
2. Paste this Instagram URL:
   ```
   https://www.instagram.com/p/CpqhH8YOzGz/
   ```

### Expected Results:

- ✅ Green badge: "Detected: Instagram"
- ✅ Instagram post preview begins loading
- ✅ Post preview shows with image/video
- ✅ No duplicate script tags in textarea

### Note:

Instagram embeds also require external script. Preview may take 2-3 seconds to fully render.

---

## Test 5: Embed Component - Error Handling

### Steps:

1. Add an Embed subcard
2. Paste invalid text:
   ```
   This is not a valid embed
   ```

### Expected Results:

- ✅ Yellow warning box appears
- ✅ Message: "Could not detect embed type..."
- ✅ No preview shown
- ✅ No crashes

---

## Test 6: Validation System - Empty Subcards

### Steps:

1. Add a card with rich text content: "Test Blog Post"
2. Add a CTA subcard but leave it completely empty
3. Add an Embed subcard but leave it empty
4. Click "Submit Blog" button

### Expected Results:

- ✅ No validation errors shown
- ✅ Empty CTA and Embed removed automatically
- ✅ Success alert: "Blog content submitted successfully!"
- ✅ Console shows only the card with text content

---

## Test 7: Validation System - Partial Content

### Steps:

1. Add a CTA subcard
2. Fill in Title: "Click Here"
3. Leave Action URL empty
4. Click "Submit Blog"

### Expected Results:

- ✅ Floating validation panel appears (bottom-right)
- ✅ Shows error: "Call to Action - Action URL is required"
- ✅ Can click error to scroll to CTA
- ✅ Red ring highlight appears around CTA for 2 seconds
- ✅ Submit blocked until fixed

---

## Test 8: Validation System - Multiple Errors

### Steps:

1. Add a CTA with title but no URL
2. Add a Quote with quote text but no author
3. Add an Image with URL but no alt text
4. Click "Submit Blog"

### Expected Results:

- ✅ Validation panel shows all 3 errors grouped by subcard
- ✅ "Validation Errors (3)" in header
- ✅ Each subcard listed separately
- ✅ Click any error scrolls to that subcard
- ✅ Can close panel with X button

---

## Test 9: Validation System - Fix and Resubmit

### Steps:

1. Create validation errors (use Test 7)
2. Fix the Action URL field
3. Click "Submit Blog" again

### Expected Results:

- ✅ Validation panel disappears
- ✅ Submit succeeds
- ✅ Success alert shown
- ✅ Console shows clean data (no empty fields)

---

## Test 10: Also Read Component

### Steps:

1. Add an Also Read subcard
2. Click "Story Mode" toggle
3. Type "test" in search box
4. Select a story from dropdown
5. Try to edit the title field

### Expected Results:

- ✅ Search filters stories
- ✅ Selected story populates title, URL, description
- ✅ Title and URL fields are locked (disabled) when story selected
- ✅ Can toggle back to "Custom Entry" to unlock fields
- ✅ Validation works for required fields

---

## Test 11: Validation - All Subcard Types

Test each subcard type for proper validation:

### Text

- **Required:** Content
- **Test:** Leave content empty, should show error

### Blockquote

- **Required:** Quote text
- **Test:** Leave quote empty, should show error

### CTA

- **Required:** Title and valid URL
- **Test:** Missing URL or invalid URL format

### Big Fact

- **Required:** Fact text
- **Test:** Leave fact empty

### Q&A

- **Required:** Question and answer
- **Test:** Fill question but not answer

### Summary

- **Required:** Title and at least one point
- **Test:** Add title but remove all points

### Image

- **Required:** URL and alt text (accessibility)
- **Test:** Add URL but no alt text

### Quote

- **Required:** Quote and author
- **Test:** Add quote but no author

### Embed

- **Required:** Embed code
- **Test:** Leave embed empty (should be removed silently)

### Table

- **Required:** Headers and at least one row
- **Test:** Delete all rows or headers

---

## Test 12: URL Validation

### Steps:

1. Add a CTA subcard
2. Fill title: "Test"
3. Fill URL without protocol: "example.com"
4. Click Submit

### Expected Results:

- ✅ Validation error: "Please enter a valid URL (must start with http:// or https://)"
- ✅ Same validation for Also Read component

---

## Test 13: Script Tag Removal

### Steps:

1. Add an Embed subcard
2. Paste this code with script tag:
   ```html
   <blockquote class="twitter-tweet">
     <a href="https://twitter.com/user/status/123"></a>
   </blockquote>
   <script async src="https://platform.twitter.com/widgets.js"></script>
   ```
3. Wait 1 second
4. Check the textarea

### Expected Results:

- ✅ Script tag removed from textarea
- ✅ Only blockquote remains in stored code
- ✅ Preview still works (script loaded separately)
- ✅ No duplicate scripts added on re-render

---

## Test 14: Multiple Embeds on Same Page

### Steps:

1. Add 3 Embed subcards
2. First: YouTube URL
3. Second: Twitter URL
4. Third: Instagram URL

### Expected Results:

- ✅ All three previews render correctly
- ✅ Scripts loaded only once (check browser console)
- ✅ All widgets process correctly
- ✅ No performance issues

---

## Test 15: Validation Panel Interaction

### Steps:

1. Create multiple validation errors
2. Click the X button on validation panel
3. Click Submit again

### Expected Results:

- ✅ Panel closes on X click
- ✅ Errors still exist (panel reopens on Submit)
- ✅ Panel has smooth slide-up animation
- ✅ Panel is positioned bottom-right, doesn't block content

---

## 🐛 Common Issues and Solutions

### Issue: Instagram/Twitter preview not showing

**Solution:** Wait 2-3 seconds for external scripts to load. Check browser console for script loading errors.

### Issue: Validation panel not appearing

**Solution:** Ensure you have partial content (not completely empty). Empty subcards are removed silently.

### Issue: YouTube embed not working

**Solution:** Check that the URL contains a valid 11-character video ID.

### Issue: Scroll-to-error not working

**Solution:** Check that the subcard has the `data-subcard-id` attribute in the DOM.

---

## 📊 Performance Checks

### What to Monitor:

- [ ] Page loads without errors
- [ ] Embed scripts load only once
- [ ] No infinite re-render loops
- [ ] Validation is instant (no lag)
- [ ] Smooth animations throughout
- [ ] No memory leaks with multiple embeds
- [ ] Form submission is fast

### Browser Console Checks:

```javascript
// Should see these scripts loaded:
// - https://platform.twitter.com/widgets.js (if Twitter used)
// - //www.instagram.com/embed.js (if Instagram used)

// Should NOT see:
// - Multiple copies of same script
// - Repeated errors or warnings
// - React warnings about keys or effects
```

---

## ✅ Success Criteria

### Embed Component:

- ✅ 5 platforms auto-detected correctly
- ✅ Previews render for all platforms
- ✅ No script duplication
- ✅ Clean embed code stored
- ✅ Error handling works

### Validation System:

- ✅ Empty subcards removed silently
- ✅ Partial content validated
- ✅ Errors displayed clearly
- ✅ Scroll-to-error works
- ✅ All 13 subcard types validated
- ✅ URL format validation works
- ✅ No more alert() dialogs

### Overall:

- ✅ No TypeScript errors
- ✅ No console errors during normal use
- ✅ Smooth user experience
- ✅ Accessible (alt text required for images)
- ✅ Mobile responsive (validation panel)

---

## 🎯 Edge Cases to Test

1. **Very long URLs**: Paste 500+ character URL
2. **Malformed HTML**: Paste broken iframe code
3. **Multiple cards with validation**: 10+ cards with errors
4. **Rapid typing**: Type fast in embed textarea
5. **Copy-paste with formatting**: Paste from Word/Google Docs
6. **Special characters**: URLs with unicode, spaces, etc.
7. **Network issues**: Test with slow connection (throttle in DevTools)
8. **Browser back/forward**: Navigation should preserve state

---

**Last Updated**: November 28, 2025
**Test Status**: ✅ All tests passing
**Known Issues**: None
