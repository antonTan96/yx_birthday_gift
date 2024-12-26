use std::fs;
use std::cmp;
use std::path::PathBuf;
use tauri::ipc::Response;
use tauri::Result;
use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Nonce, Key // Or `Aes128Gcm`
};
use serde_json::Value;
use chrono::prelude::*;
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
pub fn get_data_file_path(path: String) -> Result<String> {
    let data_directory = std::env::var("DATA_DIR").unwrap();
    let data_directory = PathBuf::from(data_directory);
    let file_path = data_directory.join(path);
    Ok(file_path.to_string_lossy().to_string())
}

#[tauri::command]
pub fn encrypt_file() {

    let file_destination = PathBuf::from("./data/extras/encrypt.txt");
    println!("file_destination: {}", file_destination.display());

    let encrypted_file = PathBuf::from("./data/extras/encrypted_file.bin");
    let plaintext = fs::read_to_string(file_destination).unwrap();

    // Generate a random key
    let key = Key::<Aes256Gcm>::from_slice(b"12345678901234567890123456789012");
    let cipher = Aes256Gcm::new(key);

    // Generate a random nonce
    let nonce = Nonce::from_slice(b"unique nonce");

    println!("Nonce: {:?}", nonce);

    // Encrypt the plaintext
    let ciphertext = cipher.encrypt(nonce, plaintext.as_ref()).unwrap();
    println!("Ciphertext: {:?}", ciphertext);

    // Write nonce and ciphertext to the file
    let mut output = nonce.to_vec(); // Start with the nonce
    output.extend(ciphertext); // Append the ciphertext
    fs::write(encrypted_file, output).unwrap();

    println!("File encrypted successfully!");
}

#[tauri::command]
pub fn decrypt_file() {


    let encrypted_file = PathBuf::from("./data/extras/encrypted_file.bin");
    let ciphertext = fs::read(encrypted_file).unwrap(); // Read as bytes

    // Split the nonce and the ciphertext
    let (nonce, ciphertext) = ciphertext.split_at(12); // 12 bytes for the nonce
    println!("Nonce: {:?}", nonce);
    println!("Ciphertext: {:?}", ciphertext);

    // Use the same key as in encryption
    let key = Key::<Aes256Gcm>::from_slice(b"12345678901234567890123456789012");
    let cipher = Aes256Gcm::new(key);

    // Decrypt the ciphertext
    let decrypted = match cipher.decrypt(Nonce::from_slice(nonce), ciphertext.as_ref()) {
        Ok(plaintext) => {
            println!("Decryption successful: {:?}", String::from_utf8_lossy(&plaintext));
            plaintext
        }
        Err(e) => {
            eprintln!("Decryption failed: {}", e);
            vec![]
        }
    };

    // Write the decrypted text to a file
    let data_directory = std::env::var("DATA_DIR").unwrap();
    let data_directory = PathBuf::from(data_directory);
    let decrypted_file = data_directory.join("decrypted.txt");
    fs::write(decrypted_file, decrypted).unwrap();
    println!("Decrypted file written successfully!");
}


#[tauri::command]
pub fn save_thought(content: String)  {
    
    let thought_directory = PathBuf::from(get_data_file_path("thoughts".to_string()).unwrap());
    if(!thought_directory.exists()) {
        fs::create_dir(thought_directory.clone()).unwrap();
    } 
    let num_files: isize = get_num_files(thought_directory.clone().to_string_lossy().to_string()).unwrap().try_into().unwrap();
    let mut file_path = thought_directory.join(format!("{}.json", cmp::max(num_files , 1)));

    if(!file_path.exists()) {
        fs::write(file_path.clone(), "[]").unwrap();
    }

    let records = fs::read_to_string(file_path.clone()).expect("Unable to read file");

    let mut records: Value = serde_json::from_str(&records).unwrap();

    if records.as_array().unwrap().len() >= 100 {
        file_path = thought_directory.join(format!("{}.json", num_files + 1));
        fs::write(file_path.clone(), "[]").unwrap();
        records = serde_json::from_str("[]").unwrap();
    }

    //records is an array of json objects
    records.as_array_mut().unwrap().push(serde_json::json!({
        "content": content,
        "time": chrono::Local::now().to_string()
    }));
    
    fs::write(file_path, serde_json::to_string_pretty(&records).unwrap()).unwrap();
}

#[tauri::command]
pub fn get_thoughts(file_path: String) -> Result<Vec<Value>> {
    let thought_directory = PathBuf::from(get_data_file_path("thoughts".to_string()).unwrap());
    let file_path = thought_directory.join(file_path);
    let content : Value = serde_json::from_str(&read_file(file_path.to_string_lossy().to_string()).unwrap()).unwrap();


    Ok(content.as_array().unwrap().to_vec())

}