import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { Stack, Card, Box, Button, Modal, Pagination, Typography} from "@mui/material";


function SecretTextModal(props) {

  function PasswordForm(props) {
    const [counter, setCounter] = useState(0);
    const [errorText, setErrorText] = useState("");
    const checkPassword = (password) => {
      console.log("Password entered:", password);
      if(password === import.meta.env.VITE_SECRET_PASSWORD) {
        //do decryption
        invoke("decrypt_file").then((response) => {
          invoke("get_data_file_path", {path:"./decrypted.txt"}).then((response) => {
            invoke("read_file", {filePath: response}).then((response) => {
              props.setSecretText(response.split("\n"));
            })
        })})
        props.setDecrypted(true);
      }
      setCounter(counter + 1);
      setErrorText(`You have entered the wrong password ${counter + 1} time${counter === 0 ? "" : "s"}`);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevents the default form submission
      const password = event.target.password.value; // Access the password input field's value
      checkPassword(password); // Call your password validation function
    };
    return (
      <Box>
      <h1>Enter the password to view the secret text</h1>
      <div>{errorText}</div>
      <form onSubmit={handleSubmit}>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </Box>
    )
  }
  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}>
      <Box style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        textAlign: "center",
        width: "60vw",
        backgroundColor: "#F9D87D",
        border: "2px solid #000000",
        borderRadius: "10px",
        padding: "20px",
      }}>
        {props.decrypted ? 
        <div>{props.content.map((line, index) => <p key={index}>{line}</p>)}</div> : 
        <PasswordForm setDecrypted={props.setDecrypted} setSecretText={props.setSecretText} />}
      </Box>
    </Modal>
  )
}

function Messages() {

  const [num_pages, setNum_pages] = useState(0);
  const [page, setPage] = useState(1);
  const [text, setText] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [secretText, setSecretText] = useState([]);
  const [decrypted, setDecrypted] = useState(false);

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
      }}> {text.map((line, index) => index == 0 ?
         <Typography sx={{textDecoration:'underline', textDecorationSkipInk:'none'}} variant="h6">{line}</Typography> :
         <Typography sx={{pt:"20px"}}>{line}</Typography>
         
         )}
      </Card>
      <Stack alignItems="center" style={{
        position: "fixed",
        bottom: "10px",
        width: "100%",
      }}>
        <Pagination count={num_pages} page={page} color="primary" onChange={(event, number) => setPage(number)} />
      </Stack>
      <Button component="span"
        variant="contained"
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
        }}
        onClick={() => {
          invoke("get_data_file_path", { path: "./decrypted.txt" }).then((response) => {
            invoke("read_file", { filePath: response }).then((response) => {
              console.log(response);
              setDecrypted(true);
              setSecretText(response.split("\n"));
            }).catch((error) => {
              console.error(error);
            });
          }).catch((error) => {
            console.error(error);
          }).finally(() => {
            setModalOpen(true);
          });
        }}> Very secret text</Button>
      <SecretTextModal open={modalOpen} 
      setOpen={setModalOpen} 
      decrypted={decrypted}
      setDecrypted={setDecrypted}
      content={secretText}
      setSecretText={setSecretText} />
    </div>
  );
}

export default Messages;