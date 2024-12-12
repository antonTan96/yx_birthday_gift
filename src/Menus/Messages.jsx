import { invoke } from "@tauri-apps/api/core";

function Messages() {
  const handleClick = async () => {
    const response = await invoke("read_file");
    console.log(response);
  };

  return (
    <div>
      <button onClick={handleClick}>Get Messages</button>
    </div>
  );
}

export default Messages;