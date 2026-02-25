# 📝 Submission Drafts — Ready to Copy-Paste

Pre-written texts for every platform. Just copy, paste, and submit.

---

## 1. GitHub Repo Description (Settings → General)

**Description:**
```
Extract all contacts from any WhatsApp Web group in seconds. Paste a script in the console, wait 1-3 min, get a clean .tsv file. Free, open source, no installs needed.
```

**Website:**
```
https://github.com/Mb-hunt/WhatsApp-Contact-Extractor
```

**Topics (add all of these):**
```
whatsapp, whatsapp-web, contact-extractor, contacts, javascript, marketing, lead-generation, growth-hacking, community-management, browser-console, web-scraping, data-extraction, tsv, open-source, free-tool, whatsapp-group, phone-numbers, export-contacts
```

---

## 2. Reddit — r/opensource

**Title:**
```
I built a free, open-source WhatsApp Group Contact Extractor — paste a script, wait 2 min, get all contacts as a .tsv file
```

**Body:**
```
Hey r/opensource! 👋

I built a simple JavaScript tool that extracts all contacts from any WhatsApp Web group. No apps, no extensions, no sign-ups — just paste a script into your browser console and get a clean .tsv file.

**How it works:**
1. Open WhatsApp Web → open a group → click the group name → open the members list
2. Press F12 → Console tab
3. Paste the script, hit Enter
4. Wait 1-3 minutes while it auto-scrolls and extracts
5. A .tsv file auto-downloads with phone numbers, names, and contact status

**What you get:**
- Phone numbers in international format
- Whether they're saved in your contacts
- Their saved name + WhatsApp display name

**Tech:**
- Pure JavaScript, zero dependencies
- 100% client-side — nothing leaves your browser
- MIT licensed

Useful for marketers, community managers, networking, CRM imports, etc.

GitHub: https://github.com/Mb-hunt/WhatsApp-Contact-Extractor

Feedback welcome! ⭐ if it saves you time.
```

---

## 3. Reddit — r/sideproject

**Title:**
```
I made a free tool that extracts all contacts from a WhatsApp group in 2 minutes — open source, no install needed
```

**Body:**
```
Just shipped this as an open source tool. It's a single JavaScript file you paste into the browser console on WhatsApp Web.

It auto-scrolls through the member list, grabs every contact (phone number, name, saved status), and downloads a .tsv file you can open in Excel/Google Sheets.

Built it because I needed to pull contacts from marketing groups and doing it manually for 500+ member groups was painful.

Completely free, MIT licensed, works in Chrome/Edge/Firefox.

🔗 https://github.com/Mb-hunt/WhatsApp-Contact-Extractor

Would love feedback!
```

---

## 4. Reddit — r/webdev (Showoff Saturday)

**Title:**
```
[Showoff Saturday] WhatsApp Group Contact Extractor — a single JS file you paste in the console to extract all group members
```

**Body:**
```
Built a pure JavaScript tool that runs in the browser developer console on WhatsApp Web.

It finds the members scroll panel, auto-scrolls to load all members, then slowly scrolls back extracting every contact along the way. Outputs a .tsv file with formatted phone numbers.

No dependencies, no npm, no build step. Just a .js file.

Interesting technical challenges:
- WhatsApp uses virtual scrolling, so you have to scroll slowly to force DOM elements to render
- Member rows share similar DOM structures with chat items, so the panel detection uses heuristics (element size, phone number pattern matching)
- Two-phase approach: scroll down to load, scroll up to extract

GitHub: https://github.com/Mb-hunt/WhatsApp-Contact-Extractor
```

---

## 5. Reddit — r/javascript

**Title:**
```
Single-file JS tool: WhatsApp Group Contact Extractor — runs in browser console, zero dependencies
```

**Body:**
```
Built a ~300 line vanilla JavaScript tool that extracts group contacts from WhatsApp Web.

Interesting patterns used:
- Async IIFE with `await` for scroll timing
- DOM tree walking to find the scroll container via heuristic scoring
- `Map` for deduplication during multi-pass extraction
- Blob + dynamic anchor element for file download
- Virtual scroll handling (WhatsApp only renders visible rows)

No frameworks, no npm, no build tools. Just paste and run.

MIT licensed: https://github.com/Mb-hunt/WhatsApp-Contact-Extractor
```

---

## 6. Reddit — r/whatsapp

**Title:**
```
Free tool to export all contacts from a WhatsApp group to a spreadsheet — open source, no install needed
```

**Body:**
```
I built a free tool that lets you extract all the contacts from any WhatsApp group you're in.

**How:**
1. Open WhatsApp Web in your browser
2. Open the group → click the group name → open members list
3. Press F12, go to Console tab
4. Paste the script from the GitHub link below, hit Enter
5. Wait 1-3 minutes
6. A file auto-downloads that you can open in Excel or Google Sheets

**Each row has:**
- Phone number (formatted with country code)
- Whether they're saved in your contacts
- Their name

It's 100% free, open source, and runs entirely in your browser — no data is sent anywhere.

GitHub: https://github.com/Mb-hunt/WhatsApp-Contact-Extractor

Works with groups of 1000+ members.
```

---

## 7. Hacker News — Show HN

**Title:**
```
Show HN: WhatsApp Group Contact Extractor – Paste a JS script, get all group contacts as .tsv
```

**URL:**
```
https://github.com/Mb-hunt/WhatsApp-Contact-Extractor
```

---

## 8. DEV.to — Article

**Title:**
```
I built a free tool to extract contacts from WhatsApp groups — here's how it works
```

**Tags:**
```
javascript, opensource, webdev, tutorial
```

**Body:**
```markdown
## The Problem

If you've ever tried to save contacts from a large WhatsApp group — for networking, marketing, or community management — you know the pain. Scrolling through 500+ members and copying numbers one by one is not fun.

## The Solution

I built a single JavaScript file that you paste into your browser's developer console while on WhatsApp Web. It automatically:

1. **Finds** the member list scroll container
2. **Scrolls** to the bottom to force-load all members
3. **Scrolls** back up slowly, extracting every contact
4. **Downloads** a `.tsv` file with all the data

No installs. No extensions. No accounts. Fully open source.

## How It Works (Technical)

### Step 1: Finding the Panel

WhatsApp Web doesn't use semantic IDs or classes we can rely on. So the script checks every `<div>` on the page and scores them based on:

- Is it scrollable? (`scrollHeight > clientHeight`)
- Is it a reasonable size? (not too small, not the whole page)
- Does it contain `<span title="...">` elements that look like phone numbers?

The div with the highest score wins.

### Step 2: Loading All Members

WhatsApp uses virtualized scrolling — it only renders the members currently visible. To get all members, the script scrolls to the bottom repeatedly until `scrollHeight` stops changing.

### Step 3: Extraction

The script scrolls from top to bottom slowly, grabbing contacts at each position. For each `<span title>` it finds, it determines:

- Is this a phone number or a saved name?
- What's the secondary text (display name, phone number)?
- Is this person in your contacts?

### Step 4: Download

It builds a TSV (tab-separated values) file and triggers a download using `Blob` + `URL.createObjectURL`.

## Output

| formatted_phone | is_my_contact | saved_name | public_name |
|---|---|---|---|
| +2348012345678 | No | | John D. |
| +447911123456 | Yes | Alice Smith | Alice |

## Try It

1. Open [WhatsApp Web](https://web.whatsapp.com)
2. Open a group → click group name → open members
3. Press F12 → Console
4. Paste the script, hit Enter
5. Wait 1-3 minutes

**GitHub:** [Mb-hunt/WhatsApp-Contact-Extractor](https://github.com/Mb-hunt/WhatsApp-Contact-Extractor)

MIT licensed. Free forever. ⭐ if it helps!
```

---

## 9. Product Hunt

**Name:**
```
WhatsApp Contact Extractor
```

**Tagline:**
```
Extract all contacts from any WhatsApp group in 2 minutes — free & open source
```

**Description:**
```
A free, open-source JavaScript tool that extracts all contacts from WhatsApp Web groups.

No apps. No extensions. No sign-ups. Just paste a script into your browser console, wait 1-3 minutes, and get a clean .tsv file with phone numbers, names, and contact status.

Perfect for:
🎯 Marketing teams building outreach lists
🤝 Networking from professional groups
📋 Community managers auditing membership
📈 Lead generation from industry groups

100% client-side — no data ever leaves your browser.
```

**Pricing:**
```
Free
```

**Link:**
```
https://github.com/Mb-hunt/WhatsApp-Contact-Extractor
```

---

## 10. AlternativeTo

**Name:**
```
WhatsApp Contact Extractor
```

**Alternative to:**
```
WA Web Plus, JECY WA Contact Saver, WAToolkit
```

**Description:**
```
A free, open-source JavaScript tool that extracts all contacts from WhatsApp Web groups. No extension needed — just paste a script in the browser console and get a downloadable .tsv file with phone numbers and names.
```

**License:**
```
MIT (Open Source)
```

**Platform:**
```
Web / Browser
```

---

## 11. DevHunt

**Name:**
```
WhatsApp Contact Extractor
```

**Description:**
```
Free open-source JS tool to extract contacts from WhatsApp Web groups. Paste in console → wait 2 min → get .tsv file. Zero dependencies, 100% client-side.
```

**GitHub:**
```
https://github.com/Mb-hunt/WhatsApp-Contact-Extractor
```

---

## 12. SourceForge

**Name:**
```
WhatsApp Contact Extractor
```

**Summary:**
```
A free, open-source JavaScript tool to extract all contacts from any WhatsApp Web group. Paste the script into your browser console, wait 1-3 minutes, and download a .tsv file with phone numbers, names, and contact status.
```

**Categories:**
```
Data Extraction, Marketing, Communications
```

---

## 13. Hashnode — Blog Post

**Title:**
```
How I Built a WhatsApp Group Contact Extractor with Vanilla JavaScript
```

Use similar content to the DEV.to article above, with a more personal storytelling angle about why you built it and the journey.
