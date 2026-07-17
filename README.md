# Khata Pro — Android App

This is a real, buildable Android app project (Capacitor-wrapped). It packages your
Khata Pro HTML/CSS/JS as the app's UI, running natively via Android's WebView, with a
proper launcher icon, app name, package ID, and splash background — installable as a
normal APK on any Android phone.

## What's inside
- `www/index.html` — your app (the golden-theme Khata Pro UI)
- `android/` — a full native Android Studio project (Gradle-based)
- `capacitor.config.ts` — app id, name, and theme colors

## Requirements
- [Android Studio](https://developer.android.com/studio) (free) — this includes the
  Android SDK and Gradle, which are needed to actually compile the APK. I cannot run
  the Android SDK/Gradle build myself in this environment (no SDK, restricted network),
  so this last step has to happen on your machine.
- That's it — no other setup needed. Capacitor and Node dependencies are already
  installed in this project.

## Getting a real .apk file without installing Android Studio

This project includes a **GitHub Actions workflow** (`.github/workflows/build-apk.yml`)
that automatically compiles the APK in the cloud — free, no local setup needed.

Steps:

1. **Create a free GitHub account** at github.com if you don't have one.
2. **Create a new repository** (any name, e.g. `khata-pro-app`) — keep it Public or
   Private, either works.
3. **Upload this project** to that repo. Easiest way (in a terminal, after unzipping):
   ```
   cd KhataPro
   git init
   git add .
   git commit -m "Khata Pro Android project"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/khata-pro-app.git
   git push -u origin main
   ```
   (No terminal/git? GitHub's website also lets you drag-and-drop upload the whole
   folder via "Add file → Upload files" on the repo page.)
4. Go to the **"Actions"** tab on your repo. A workflow run will already be in
   progress (it auto-starts on push) — wait ~3-5 minutes for it to finish (green
   checkmark).
5. Click into that finished run → scroll to **"Artifacts"** → download
   **`khata-pro-debug-apk`**. Unzip it — that's your `app-debug.apk`.
6. Copy that APK to your Android phone and tap it to install (allow "install from
   unknown sources" if prompted, once).

That's it — every time you push a change to `www/index.html`, a fresh APK builds
automatically.

## How to build & run locally instead (Android Studio)

1. **Unzip** this project anywhere on your computer.
2. **Open Android Studio** → "Open" → select the unzipped `KhataPro` folder (the one
   containing `android/`, `www/`, `package.json`).
   - Android Studio will detect it's a Gradle project and sync automatically
     (downloads the SDK/Gradle bits it needs — first sync can take a few minutes).
3. Once sync finishes, pick a device:
   - Plug in an Android phone via USB with **USB debugging** enabled, OR
   - Use the built-in Android **Emulator** (Android Studio can create one for you).
4. Click the green **Run ▶** button. The app installs and launches — real app icon,
   real app name ("Khata Pro"), no browser bar.

## Building a shareable APK (to send to others / install without a cable)

In Android Studio:
`Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`

This produces `android/app/build/outputs/apk/debug/app-debug.apk` — copy that file to
any Android phone and tap it to install (you'll need to allow "install from unknown
sources" once).

For a **production/signed** APK (for the Play Store or wider distribution), use
`Build` → `Generate Signed Bundle / APK` and follow Android Studio's signing wizard.

## Editing the app later

Just edit `www/index.html` (same file you already have), then run:
```
npm install
npx cap sync android
```
from this project's root (the `npm install` restores the Capacitor CLI tooling,
which was stripped out of this zip to keep the download small) — `cap sync` copies
your changes into the native project. Then re-run from Android Studio.

## Google Drive backup — one config step left

The app now has a "Continue with Google" button (login screen) and "Backup to
Google Drive" / "Restore from Google Drive" rows (Settings screen), wired to save
a hidden JSON file into the signed-in user's own Drive (`appDataFolder` — invisible
in their normal Drive, only your app can read/write it).

Before this works, you must create ONE more OAuth client — a **Web application**
type (not Android) — in the same Google Cloud project:

1. Google Cloud Console → APIs & Services → Google Auth Platform → Clients → Create Client
2. Application type: **Web application**
3. Name: anything, e.g. `Khata Pro Web`
4. No redirect URIs needed for this use case — just Create
5. Copy the generated **Client ID** (looks like `123456-abc.apps.googleusercontent.com`)
6. Paste it into TWO places in this project, replacing `PASTE_YOUR_WEB_CLIENT_ID_HERE...`:
   - `capacitor.config.ts` → `plugins.GoogleAuth.serverClientId`
   - `android/app/src/main/res/values/strings.xml` → `server_client_id`
7. Run `npx cap sync android` again, then rebuild.

Also add your own Google account as a **Test user** under Google Auth Platform →
Audience — otherwise sign-in will be blocked (the app is in "Testing" mode until
submitted for verification, which isn't needed for personal/small-scale use).

### Current state of the Drive integration
- Sign-in + token retrieval: done
- Backup/restore against Drive's `appDataFolder`: done
- What actually gets backed up: currently a placeholder (`localStorage['khataProData']`)
  — the app's customers/entries are still hardcoded sample data, not real local
  storage yet. Next step is wiring real local persistence so there's real data to
  back up and restore. Ask me to build that next.

## Current limitations (worth knowing)

This app is currently a **UI shell** — all data shown (customers, balances, entries)
is hardcoded sample data in the HTML/JS. There's no real local storage wired to the
UI yet (only the Drive backup plumbing above). If you want the app to actually save
customer ledgers, entries, and balances persistently — locally and via Drive — that's
the next piece to build. Let me know and I can build that in.
