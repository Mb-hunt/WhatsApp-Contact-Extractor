// ============================================
// WHATSAPP GROUP CONTACT EXTRACTOR v3
// TWO-STEP APPROACH - Much more reliable
// ============================================
// STEP A: Run this FIRST to find the scroll container
// STEP B: Then run the extraction
// ============================================

// ---------- STEP A: IDENTIFY THE PANEL ----------
// This highlights the members list so we can confirm we found it

(async function() {
  console.clear();
  console.log("🔍 STEP A: Finding the members scroll panel...\n");

  // Strategy: The members panel is the scrollable div that contains
  // span[title] elements with phone numbers like "+234..."
  // It's in the left/center area and has a search bar above it

  let found = null;
  let bestScore = 0;

  // Check every div on the page
  const allDivs = document.querySelectorAll('div');
  
  for (const div of allDivs) {
    // Must be scrollable
    if (div.scrollHeight <= div.clientHeight + 20) continue;
    
    const rect = div.getBoundingClientRect();
    // Must be reasonably sized (not too tiny, not the whole page)
    if (rect.height < 200 || rect.width < 150 || rect.width > 700) continue;
    
    // Count phone-number-like spans inside
    const spans = div.querySelectorAll('span[title]');
    let phoneCount = 0;
    let nameCount = 0;
    
    for (const s of spans) {
      const t = (s.title || "").trim();
      if (/^\+?\d[\d\s\-]{7,}$/.test(t)) phoneCount++;
      else if (t.length > 2 && t.length < 60 && !/search|member|admin|contact/i.test(t)) nameCount++;
    }
    
    const totalMembers = phoneCount + nameCount;
    
    // Score this container
    if (totalMembers > bestScore) {
      bestScore = totalMembers;
      found = div;
    }
  }

  if (!found || bestScore < 3) {
    console.error("❌ Could not find the members panel.");
    console.log("Make sure the members list is visible and showing names/numbers.");
    return;
  }

  // Highlight it briefly
  const origBorder = found.style.border;
  found.style.border = "3px solid #25D366";
  setTimeout(() => { found.style.border = origBorder; }, 3000);

  console.log(`✅ Found the panel! (${bestScore} members visible, scrollHeight: ${found.scrollHeight}px)`);
  console.log("🟢 You should see a GREEN border flash around the members list.");
  console.log("");
  console.log("If the GREEN border is around the correct members list:");
  console.log("👉 Copy and paste STEP B below and press Enter\n");

  // Store it globally so Step B can use it
  window.__waScrollPanel = found;
  
  // ============================================================
  // STEP B: PASTE THIS AFTER CONFIRMING THE GREEN BORDER IS RIGHT
  // ============================================================
  // (It's all in one script - Step B runs automatically after Step A)
  // Let's just ask if they want to proceed

  console.log("⏳ Auto-proceeding to extraction in 3 seconds...");
  console.log("   (The green border should be around the members list)\n");
  
  await new Promise(r => setTimeout(r, 3000));

  // --- NOW DO THE EXTRACTION ---
  const panel = window.__waScrollPanel;
  
  if (!panel) {
    console.error("❌ Lost reference to panel. Run again.");
    return;
  }

  console.log("🚀 EXTRACTING CONTACTS...");
  console.log("⏳ Phase 1: Scrolling to bottom to load all members...\n");

  // PHASE 1: Scroll to bottom to force WhatsApp to load all members
  let lastScrollHeight = 0;
  let noChangeCount = 0;
  let scrollRound = 0;

  // First scroll to top
  panel.scrollTop = 0;
  await new Promise(r => setTimeout(r, 500));

  // Now scroll to bottom repeatedly
  while (noChangeCount < 20 && scrollRound < 400) {
    panel.scrollTop = panel.scrollHeight + 10000;
    await new Promise(r => setTimeout(r, 150));
    
    if (panel.scrollHeight === lastScrollHeight) {
      noChangeCount++;
      // Sometimes WhatsApp needs more time to load
      if (noChangeCount % 5 === 0) {
        await new Promise(r => setTimeout(r, 800));
      }
    } else {
      noChangeCount = 0;
      if (scrollRound % 30 === 0) {
        console.log(`   Scrolling... loaded ~${panel.querySelectorAll('span[title]').length} elements (scroll ${scrollRound})`);
      }
    }
    
    lastScrollHeight = panel.scrollHeight;
    scrollRound++;
  }

  console.log(`   Done scrolling! Panel height: ${panel.scrollHeight}px after ${scrollRound} scrolls`);
  console.log("\n📋 Phase 2: Extracting contacts (scrolling back up slowly)...\n");

  // PHASE 2: Go back to top
  panel.scrollTop = 0;
  await new Promise(r => setTimeout(r, 1000));

  const contacts = new Map();

  function grabContacts() {
    const spans = panel.querySelectorAll('span[title]');
    
    for (const span of spans) {
      const title = (span.title || "").trim();
      if (!title || title.length < 2 || title.length > 200) continue;
      
      // Skip UI elements
      if (/^(Search|You|View past|members|admin|Group|search contacts)/i.test(title)) continue;
      if (title === "Search members" || title === "Search contacts") continue;
      
      // Is this a phone number?
      const cleanTitle = title.replace(/[\s\-()]/g, "");
      const isPhone = /^\+?\d{10,15}$/.test(cleanTitle);
      
      // Skip if we already have this one
      if (contacts.has(title)) continue;
      
      // Try to get secondary info from the same row
      let secondaryText = "";
      let parentEl = span.parentElement;
      
      // Walk up to find the row container (usually 3-5 levels up)
      for (let i = 0; i < 6; i++) {
        if (!parentEl) break;
        if (parentEl.getAttribute('role') === 'listitem' || 
            parentEl.getAttribute('role') === 'option' ||
            parentEl.getAttribute('tabindex') === '-1') {
          break;
        }
        parentEl = parentEl.parentElement;
      }
      
      if (parentEl) {
        const otherSpans = parentEl.querySelectorAll('span[title], span[dir="auto"]');
        for (const os of otherSpans) {
          const ot = (os.title || os.textContent || "").trim();
          if (ot && ot !== title && ot.length > 1 && ot.length < 150) {
            // Skip common status messages for secondary text
            if (ot === "Hey there! I am using WhatsApp." || 
                ot === "Busy" || ot === "Available" || ot === "At work" ||
                ot === "Urgent calls only" || 
                ot.includes("member") || ot.includes("admin")) continue;
            secondaryText = ot;
            break;
          }
        }
      }

      let formatted_phone = "";
      let is_my_contact = "No";
      let saved_name = "";
      let public_name = "";

      if (isPhone) {
        // Unsaved contact - showing phone number
        formatted_phone = cleanTitle.startsWith("+") ? cleanTitle : "+" + cleanTitle;
        is_my_contact = "No";
        
        if (secondaryText) {
          if (secondaryText.startsWith("~")) {
            public_name = secondaryText.substring(1).trim();
          } else {
            public_name = secondaryText;
          }
        }
      } else {
        // Saved contact - showing name
        saved_name = title;
        is_my_contact = "Yes";
        
        if (secondaryText) {
          const cleanSec = secondaryText.replace(/[\s\-()]/g, "");
          if (/^\+?\d{10,15}$/.test(cleanSec)) {
            formatted_phone = cleanSec.startsWith("+") ? cleanSec : "+" + cleanSec;
          } else if (secondaryText.startsWith("~")) {
            public_name = secondaryText.substring(1).trim();
          } else {
            public_name = secondaryText;
          }
        }
      }

      contacts.set(title, {
        formatted_phone: formatted_phone || "N/A",
        is_my_contact,
        saved_name,
        public_name
      });
    }
  }

  // Scroll from top to bottom slowly, extracting along the way
  panel.scrollTop = 0;
  await new Promise(r => setTimeout(r, 500));
  
  noChangeCount = 0;
  let extractRound = 0;
  let prevScrollTop = -1;

  while (noChangeCount < 12 && extractRound < 600) {
    grabContacts();
    
    prevScrollTop = panel.scrollTop;
    panel.scrollTop += 200;
    await new Promise(r => setTimeout(r, 150));
    
    if (Math.abs(panel.scrollTop - prevScrollTop) < 2) {
      noChangeCount++;
      await new Promise(r => setTimeout(r, 300));
    } else {
      noChangeCount = 0;
    }
    
    extractRound++;
    
    if (extractRound % 50 === 0) {
      console.log(`   Extracted ${contacts.size} contacts... (scroll ${extractRound})`);
    }
  }

  // Final grab
  grabContacts();

  // PHASE 3: Download
  console.log(`\n🎉 COMPLETE! Extracted ${contacts.size} contacts\n`);

  if (contacts.size === 0) {
    console.error("❌ No contacts extracted. The DOM structure might be different.");
    console.log("Try this: scroll the members list manually once, then run again.");
    return;
  }

  // Build TSV
  let tsv = "formatted_phone\tis_my_contact\tsaved_name\tpublic_name\n";
  for (const [, c] of contacts) {
    const phone = (c.formatted_phone || "").replace(/\t/g, "");
    const saved = (c.saved_name || "").replace(/\t/g, " ");
    const pub = (c.public_name || "").replace(/\t/g, " ");
    tsv += `${phone}\t${c.is_my_contact}\t${saved}\t${pub}\n`;
  }

  // Download
  const blob = new Blob(["\uFEFF" + tsv], { type: "text/tab-separated-values;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "whatsapp_group_contacts.tsv";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);

  console.log("📥 File downloaded: whatsapp_group_contacts.tsv\n");
  
  // Stats
  const saved = Array.from(contacts.values()).filter(c => c.is_my_contact === "Yes").length;
  console.log(`📊 Summary:`);
  console.log(`   Total contacts: ${contacts.size}`);
  console.log(`   Your saved contacts: ${saved}`);
  console.log(`   Unsaved (phone only): ${contacts.size - saved}`);
  
  // Preview
  console.log(`\n👀 First 20 contacts:`);
  console.table(Array.from(contacts.values()).slice(0, 20));

})();
