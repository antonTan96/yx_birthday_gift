// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::path::Path;
use std::fs::File;
use serde_json::Value;
use std::io::Write;
use dirs;
use std::env;
fn main() {
    if let Ok(exe_path) = env::current_exe() {
        if let Some(exe_dir) = exe_path.parent() {
            env::set_current_dir(exe_dir).expect("Failed to set working directory");
        }
    }

    let data_directory = dirs::data_dir().unwrap();
    let data_directory = data_directory.join("birthday_project");// change this to your project name
    if !Path::new(&data_directory).exists() {
        std::fs::create_dir_all(&data_directory).unwrap();
    }
     
    env::set_var("DATA_DIR", data_directory);
    birthday_project_lib::run()
}
