// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::path::Path;
use std::fs::File;
use serde_json::Value;
use std::io::Write;
fn main() {
    let path = Path::new("config.json");

    if !path.exists() {
        let mut file = File::create("config.json").unwrap();
        let json_data = r#"
        {
            "gayfuck": "true"
        }
        "#;
        let value: Value = serde_json::from_str(json_data).unwrap();
        let pretty_json = serde_json::to_string_pretty(&value).unwrap();
        println!("{}", pretty_json);
        file.write_all(pretty_json.as_bytes()).unwrap();
    } 
    birthday_project_lib::run()
}
