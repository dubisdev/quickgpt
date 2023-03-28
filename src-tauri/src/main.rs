// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_autostart::MacosLauncher;
use tauri::Manager;

#[derive(Clone, serde::Serialize)]
struct Payload {
  args: Vec<String>,
  cwd: String,
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec![""])))
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
        app.emit_all("single-instance", Payload { args: argv, cwd }).unwrap();
        }))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
