use std::fs;
use std::path::PathBuf;
use tauri::ipc::Response;
use tauri::Result;

#[tauri::command]
pub fn read_file(file_path: String) -> Result<String> {
    let path = PathBuf::from(file_path);
    println!("file path: {}", path.display());
    match fs::read_to_string(path) {
        Ok(content) => Ok(content),          // Return the file content on success
        Err(err) => Err(err.into()),         // Convert the error to a Tauri-compatible error
    }
}

#[tauri::command]
pub fn get_num_files(dir: String) -> Result<usize> {
    let path = PathBuf::from(dir);
    println!("dir path: {}", path.display());

    let entries = fs::read_dir(path).map_err(|e| tauri::Error::from(e))?;
    Ok(entries.count())
}

#[tauri::command]
pub fn get_cur_directory() -> Result<String> {
    let path = std::env::current_dir().map_err(|e| tauri::Error::from(e))?;
    Ok(path.to_string_lossy().to_string()) 
}