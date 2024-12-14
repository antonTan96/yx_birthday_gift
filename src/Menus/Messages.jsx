import { invoke } from "@tauri-apps/api/core";
import { Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { Card } from "@mui/material";

function Messages() {

  const [num_pages, setNum_pages] = useState(0);
  const [page, setPage] = useState(1);
  const [text, setText] = useState([]);

  async function get_num_files() {
    const response = await invoke("get_num_files", { dir: import.meta.env.VITE_SPEECH_DIRECTORY });
    setNum_pages(response);
    setPage(1)
  }

  async function get_file(page) {
    const filename = `${page}.txt`
    const path = import.meta.env.VITE_SPEECH_DIRECTORY + "/" + filename;
    console.log(path);
    const response = await invoke("read_file", { filePath: path });
    setText(response.split("\n"));
  }

  async function get_directory() {
    const response = await invoke("get_cur_directory");
    console.log(response);
  }

  useEffect(() => {
    get_num_files();
    get_directory();
  }, []);

  useEffect(() => {
    get_file(page);
  }, [page]);

  return (
    <div>
      <Button
        component="span"
        style={{ color: "black" }}
        onClick={() => window.history.back()}
        startIcon={<ArrowBackRounded />}>
      </Button>
      <Card style={{
        width: "80%",
        transform: "translateX(10%)",
        paddingLeft: "20px",
        paddingRight: "20px",
        maxHeight: 'calc(100vh - 100px)', 
        overflow: 'auto',
        backgroundColor: "transparent",
        border: "1px solid black",
        scrollbarWidth: "thin",
      }}> {text.map((line, index) => <p key={index}>{line}</p>)}
      </Card>
      <Stack alignItems="center" style={{
        position: "fixed",
        bottom: "10px",
        width: "100%",
      }}>
        <Pagination count={num_pages} page={page} color="primary" onChange={(event, number) => setPage(number)} />
      </Stack>
    </div>
  );
}

export default Messages;