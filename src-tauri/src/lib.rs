mod commands;
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            commands::read_file,
            commands::get_num_files,
            commands::get_cur_directory,
            commands::encrypt_file,
            commands::decrypt_file,
            commands::get_data_file_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
