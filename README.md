<div align="center">

# 📱 WhatsApp Group Contact Extractor

**Extract all contacts from any WhatsApp group in seconds — no apps, no extensions, just one script.**

[![License: MIT](https://img.shields.io/badge/License-MIT-25D366.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-WhatsApp%20Web-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/Pure-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()

<br/>

<img src="https://img.shields.io/badge/✅-Plug%20%26%20Play-brightgreen?style=flat-square" />
<img src="https://img.shields.io/badge/📥-Auto%20Download-blue?style=flat-square" />
<img src="https://img.shields.io/badge/🔒-100%25%20Client--Side-orange?style=flat-square" />
<img src="https://img.shields.io/badge/💰-Free%20Forever-purple?style=flat-square" />

---

*Perfect for marketers, community managers, and growth hackers who need contact lists from WhatsApp groups — fast.*

</div>

---

## 🤔 What Is This?

A simple **copy-paste JavaScript snippet** that runs in your browser's developer console on [WhatsApp Web](https://web.whatsapp.com). It automatically scrolls through a group's member list, extracts every contact, and downloads a clean `.tsv` file you can open in **Excel**, **Google Sheets**, or any spreadsheet app.

### What You Get

| Column | Description |
|---|---|
| `formatted_phone` | Phone number in international format (e.g. `+2348012345678`) |
| `is_my_contact` | `Yes` if saved in your contacts, `No` if unsaved |
| `saved_name` | The name you saved them as (if applicable) |
| `public_name` | Their WhatsApp display name / "About" name |

---

## ⚡ Quick Start (5 Minutes)

### Prerequisites

- A computer with a modern browser (Chrome, Edge, Firefox, Brave)
- Your WhatsApp account linked to [WhatsApp Web](https://web.whatsapp.com)
- You must be a **member** of the group you want to extract from

### Step-by-Step

```
Step 1 → Open WhatsApp Web & connect your account
Step 2 → Open the group chat → Click the group name at the top
Step 3 → Click on the members section so the full member list panel opens
Step 4 → Press F12 to open Developer Tools → Click the "Console" tab
Step 5 → Type: allow pasting  (and hit Enter — only if the browser asks)
Step 6 → Copy everything from whatsapp_extractor_v3.js, paste it into the console, hit Enter
Step 7 → Don't touch anything — let it run for 1–3 minutes
Step 8 → A .tsv file auto-downloads. Open it in Excel or Google Sheets. Done!
```

> **🍎 Mac Users:** Use `Cmd + Option + J` (Chrome) or `Cmd + Option + I` (Firefox/Safari) to open the console instead of F12.

---

## 🖥️ Visual Walkthrough

### 1. Open the Group Members Panel

Open WhatsApp Web → click the group name → click on the members count to expand the full member list.

### 2. Open the Console

Press **F12** → click the **Console** tab. If you see a warning about pasting, type `allow pasting` and press Enter.

### 3. Paste & Run

Copy the entire contents of [`whatsapp_extractor_v3.js`](whatsapp_extractor_v3.js), paste it into the console, and press **Enter**.

### 4. Wait for the Magic

You'll see real-time progress logs in the console:

```
🔍 STEP A: Finding the members scroll panel...
✅ Found the panel! (42 members visible, scrollHeight: 3200px)
🟢 You should see a GREEN border flash around the members list.
⏳ Auto-proceeding to extraction in 3 seconds...
🚀 EXTRACTING CONTACTS...
⏳ Phase 1: Scrolling to bottom to load all members...
   Scrolling... loaded ~120 elements (scroll 0)
   Scrolling... loaded ~340 elements (scroll 30)
📋 Phase 2: Extracting contacts (scrolling back up slowly)...
   Extracted 156 contacts... (scroll 50)
   Extracted 287 contacts... (scroll 100)

🎉 COMPLETE! Extracted 312 contacts

📥 File downloaded: whatsapp_group_contacts.tsv

📊 Summary:
   Total contacts: 312
   Your saved contacts: 89
   Unsaved (phone only): 223
```

### 5. Open Your File

The downloaded `whatsapp_group_contacts.tsv` opens directly in Excel or Google Sheets. Each row is a contact with their phone number, name, and whether they're saved in your phone.

---

## 📊 Output Sample

| formatted_phone | is_my_contact | saved_name | public_name |
|---|---|---|---|
| +2348012345678 | No | | John D. |
| +447911123456 | Yes | Alice Smith | Alice |
| +12025551234 | No | | Marketing Pro |
| +919876543210 | Yes | Raj Kumar | Raj |

---

## 💡 Use Cases

- **📣 Marketing campaigns** — Build targeted outreach lists from niche WhatsApp communities
- **🤝 Networking** — Save contacts from professional groups and events
- **📋 Community management** — Audit and track group membership
- **📈 Lead generation** — Capture prospects from industry-specific groups
- **🗂️ CRM import** — Export contacts directly into your CRM or mailing list

---

## ❓ FAQ

<details>
<summary><b>Is this safe to use?</b></summary>

Yes. The script runs **entirely in your browser** — no data is sent to any server. Everything stays on your computer. The code is open source, so you can read every line.
</details>

<details>
<summary><b>Will my WhatsApp account get banned?</b></summary>

This script simulates scrolling through the members list — something you can do manually. It doesn't use any unofficial APIs or modify WhatsApp's code. That said, use responsibly and avoid running it excessively in a short period.
</details>

<details>
<summary><b>Why is it downloading a .tsv instead of .csv?</b></summary>

TSV (Tab-Separated Values) handles phone numbers and international characters better than CSV. It opens perfectly in Excel and Google Sheets without any extra configuration.
</details>

<details>
<summary><b>The script says "Could not find the members panel"</b></summary>

Make sure the **members list panel is fully open and visible** on screen. Click the group name → click the members count → you should see a scrollable list of names/numbers.
</details>

<details>
<summary><b>It extracted 0 contacts</b></summary>

Try scrolling the members list manually once (up and down), then run the script again. This helps WhatsApp load the DOM elements the script looks for.
</details>

<details>
<summary><b>Can I use this on WhatsApp Desktop app?</b></summary>

No. This only works on [WhatsApp Web](https://web.whatsapp.com) in a browser. The desktop app doesn't expose a developer console the same way.
</details>

<details>
<summary><b>How large a group can it handle?</b></summary>

It has been tested on groups with **1000+ members**. Larger groups just take longer to scroll through (3–5 minutes).
</details>

---

## 🛡️ Privacy & Ethics

- ✅ **100% client-side** — no data ever leaves your browser
- ✅ **No tracking, no analytics, no telemetry**
- ✅ **Open source** — audit every line of code yourself
- ⚠️ **Respect privacy** — only extract contacts from groups where you have legitimate access
- ⚠️ **Follow local laws** — ensure your use complies with data protection regulations (GDPR, etc.)

---

## 🤝 Contributing

Contributions are welcome! If you have ideas, bug fixes, or improvements:

1. **Fork** this repository
2. Create a feature branch (`git checkout -b feature/amazing-improvement`)
3. Commit your changes (`git commit -m 'Add amazing improvement'`)
4. Push to the branch (`git push origin feature/amazing-improvement`)
5. Open a **Pull Request**

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this tool. No strings attached. 🎉

---

## ⭐ Star This Repo

If this saved you time, drop a ⭐ — it helps others discover the tool!

---

<div align="center">

**Made with ☕ and curiosity.**

</div>
