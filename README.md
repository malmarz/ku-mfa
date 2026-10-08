# KU MFA self-help page

Bilingual (Arabic / English) self-help page for the Kuwait University MFA activation campaign.
Static files, no build step: open `index.html` in a browser.

## Editing

- All text is in `index.html`. Each piece appears twice, once with `class="ar"` and once with
  `class="en"`; keep the two in step.
- Each topic is a `<details class="topic" id="...">` block. The `id` is the direct link
  (`index.html#new-phone`), so do not rename one after links have been shared.
- `data-keys` on a topic holds extra search words.
- `<!-- EDIT: ... -->` comments mark the campaign date, the videos, the snooze answer and the
  support contacts.
- Links: `?lang=en` or `?lang=ar` forces a language; `#setup-phone` opens one answer.

## Sources

- Microsoft's suggested user guide (Maher Tuffaha, 2026-10-08).
- `cis.ku.edu.kw/services/mfa` for the support contacts and videos, read 2026-10-08.
