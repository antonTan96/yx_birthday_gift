# Nameless Gift

Send a letter to someone you care about today.

# Prerequisites
* Set up [Tauri 2.0](https://v2.tauri.app/start/prerequisites/) on your machine.

# Quick Start

To start development run the following:
```bash
npm run tauri dev
```

To package the executable run the following:
```bash
npm run tauri build
```

# File Structure
```text
birthday_project/
│
├── public/
├── src/
│   ├── assets/           # images used by the program 
│   ├── Components/       # Custom components
│   ├── fonts/
│   ├── Menus/            # User interfaces
│   ├── main.jsx          # Main entry point
│   └── routes.jsx        # Links Menus to Main
├── src-tauri
│   ├── capabilities/           
│   ├── data/             
│   │   └ speech/         # Stores messages to recipient
│   │       ├ 1.txt
│   │       ├ 2.txt
│   │       └...
│   ├── icons/
│   ├── src/
│   │   ├ commands.rs     # Asynchronous functions executed by the backend
│   │   ├ lib.rs          # Stores list of commands
│   │   └ main.rs
│   ├── Cargo.toml
│   └── tauri.conf.json   # Tauri configs
├── package.json
├── README.md
└── vite.condfig.js
```
# Next Steps
* Data modelling
* implement AI
* uh blockchain as currency?