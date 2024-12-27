import React, { useEffect, useState } from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, TableFooter, TablePagination } from "@mui/material";
import { invoke } from "@tauri-apps/api/core";


function SavedThoughts() {

  const [page, setPage] = useState(0);
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    invoke("get_thoughts").then((response) => {
      setThoughts(response);
      console.log(response);
    })
  }, [page]);

  return (
    <div>
      <Button
        component="span"
        style={{ color: "black" }}
        onClick={() => window.history.back()}
        startIcon={<ArrowBackRounded />}>
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "20%" }}>Time</TableCell>
              <TableCell sx={{ width: "80%", wordWrap: "break-word", whiteSpace: "normal" }}>
                Thought
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {thoughts.slice((page) * 10, page+1 * 10).map((thought) => (
              <TableRow key={thought.time}>
                <TableCell>{thought.time}</TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "normal", // Ensure text wraps
                    wordWrap: "break-word", // Break long words
                    overflowWrap: "break-word", // Ensure long words wrap properly
                  }}
                >
                  {thought.content.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                count={thoughts.length}
                rowsPerPage={10}
                page={page}
                onPageChange={(event, number) => {setPage(number)}}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SavedThoughts;