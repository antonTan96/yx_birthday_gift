use std::fs;
use std::path::PathBuf;
use tauri::ipc::Response;

#[tauri::command]
pub fn my_custom_command() -> Result<String, ()> {
  println!("I was invoked from JavaScript!");
  Ok("teehee".to_string())
}

#[tauri::command]
pub fn read_file() -> Response {
    let file_path = PathBuf::from("./data/ext_file.txt");

    // Get the full path for debugging purposes
    let full_path = fs::canonicalize(&file_path).expect("Failed to get the full path");

    println!("Full path to file: {}", full_path.display());

    // Read the file
    let data = fs::read(&file_path).expect("Failed to read the file");

    Response::new(data)
}

