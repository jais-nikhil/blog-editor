# Quick Reference - Blog Editor New Features

## 🎬 Embed Component - Supported URLs

### YouTube

```
✅ https://www.youtube.com/watch?v=VIDEO_ID
✅ https://youtu.be/VIDEO_ID
✅ https://www.youtube.com/embed/VIDEO_ID
✅ <iframe src="youtube.com/embed/..."></iframe>
```

### Vimeo

```
✅ https://vimeo.com/VIDEO_ID
✅ <iframe src="player.vimeo.com/video/..."></iframe>
```

### Twitter/X

```
✅ https://twitter.com/username/status/TWEET_ID
✅ https://x.com/username/status/TWEET_ID
✅ <blockquote class="twitter-tweet">...</blockquote>
```

### Instagram

```
✅ https://www.instagram.com/p/POST_ID/
✅ https://www.instagram.com/reel/REEL_ID/
✅ <blockquote class="instagram-media">...</blockquote>
```

### LinkedIn

```
✅ https://www.linkedin.com/posts/...
✅ <iframe src="linkedin.com/embed/feed/..."></iframe>
```

---

## ✅ Validation Rules Quick Reference

| Component      | Required           | Optional        | Format                         |
| -------------- | ------------------ | --------------- | ------------------------------ |
| **Text**       | Content            | -               | Plain text                     |
| **Blockquote** | Quote text         | Attribution     | Plain text                     |
| **CTA**        | Title, URL         | -               | URL must start with http(s):// |
| **Big Fact**   | Fact               | Description     | Plain text                     |
| **Blurp**      | Content            | -               | Plain text                     |
| **Question**   | Question           | -               | Plain text                     |
| **Q&A**        | Question, Answer   | -               | Plain text                     |
| **Summary**    | Title, Points (≥1) | -               | Text array                     |
| **Image**      | URL, Alt text      | Caption, Credit | URL format                     |
| **Also Read**  | Title, URL         | Description     | URL must start with http(s):// |
| **Quote**      | Quote, Author      | Source          | Plain text                     |
| **Embed**      | Embed code         | -               | Valid embed code/URL           |
| **Table**      | Headers, Rows (≥1) | -               | Text arrays                    |

---

## 🎯 Validation Behavior

### Empty Subcards (All fields empty)

```
Action: Removed silently ✅
No error shown
```

### Partial Content (Some fields filled)

```
Action: Validated ⚠️
Errors shown in floating panel
Submit blocked until fixed
```

### Valid Content (All required fields filled)

```
Action: Accepted ✅
Included in submission
```

---

## 🛠️ Common Tasks

### Add an Embed

1. Click Plus (+) icon
2. Select "Embed"
3. Paste URL or embed code
4. Wait for auto-detection
5. Preview renders automatically

### Fix Validation Errors

1. Click "Submit Blog"
2. If errors: floating panel appears
3. Click any error to scroll to it
4. Fix the highlighted field
5. Click "Submit Blog" again

### Test Embed Locally

```bash
# Start server
npm run dev

# Open browser
http://localhost:5173/

# Add embed subcard and paste:
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

---

## 📋 Keyboard Shortcuts

| Action                 | Shortcut              |
| ---------------------- | --------------------- |
| Add Card               | None (use button)     |
| Delete Subcard         | Click trash icon      |
| Move Subcard Up        | Click up arrow        |
| Move Subcard Down      | Click down arrow      |
| Close Validation Panel | Click X or fix errors |

---

## 🐛 Troubleshooting

### Embed preview not showing?

- **Wait 2-3 seconds** (Twitter/Instagram need script load time)
- **Check URL format** (must be valid)
- **Check console** for script errors
- **Refresh page** if widgets frozen

### Validation not working?

- **Ensure partial content** (completely empty = removed silently)
- **Check required fields** (see table above)
- **Open browser console** for any errors

### Scripts loading multiple times?

- **This is fixed!** Scripts load once per platform
- **Check Network tab** in DevTools to verify

---

## 📞 Quick Help

| Issue                         | Solution                               |
| ----------------------------- | -------------------------------------- |
| "Could not detect embed type" | Use supported platform URLs            |
| "Action URL is required"      | Add http:// or https:// to URL         |
| "Alt text is required"        | Add description for accessibility      |
| Validation panel stuck        | Click X to close, fix errors, resubmit |
| Preview not loading           | Wait or refresh page                   |

---

## 🎨 UI Elements

### Embed Component

```
┌─────────────────────────────────────┐
│ 📝 Embed                            │
├─────────────────────────────────────┤
│ Embed URL or Code                   │
│ [Paste YouTube, Vimeo, X...]        │
│                                     │
│ ✅ Detected: YouTube                │
│                                     │
│ Live Preview:                       │
│ [▶ YouTube Player]                  │
└─────────────────────────────────────┘
```

### Validation Panel

```
┌─────────────────────────────────┐
│ ⚠️ Validation Errors (2)      X │
├─────────────────────────────────┤
│ 📍 Call to Action               │
│    • Action URL is required     │
│                                 │
│ 📍 Image                        │
│    • Alt text is required       │
│                                 │
│ 💡 Click error to scroll        │
└─────────────────────────────────┘
(Bottom-right corner)
```

---

## 🚀 Production Checklist

Before deploying:

- [ ] All tests passing (see TESTING_GUIDE.md)
- [ ] No console errors
- [ ] Validation working for all subcards
- [ ] Embeds rendering on all platforms
- [ ] Mobile responsive
- [ ] Accessibility compliant

---

**Version:** 2.0.0  
**Status:** ✅ Production Ready  
**Docs:** NEW_FEATURES.md | TESTING_GUIDE.md | SUMMARY.md
