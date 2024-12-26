import React, { useEffect, useState } from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { Button, Paper } from "@mui/material";
import { invoke } from "@tauri-apps/api/core";
import { DataGrid } from '@mui/x-data-grid';


function SavedThoughts() {
    
  const [thoughts, setThoughts] = useState([]);

  const viewportWidth = window.innerWidth;

  useEffect(() => {
      invoke("get_thoughts").then((response) => {
          setThoughts(response);
          console.log(response);
      })
  }, []);

  const cols = [
    {
      field:"time", headerName:"Time", width: 2*window.innerWidth/10,
      renderCell: (params) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word", padding: "10px" }}>
          {params.value}
        </div>
      ),
    },
    {
      field:"content", headerName:"Thought", width: 7.5*window.innerWidth/10,
      renderCell: (params) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word", padding: "10px" }}>
          {params.value.split("\n").map((line, index) => {
            return <div key={index}>{line}</div>

          })}
        </div>
      ),
    }
  ]
  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <div>
        <Button
        component="span"
        style={{ color: "black" }}
        onClick={() => window.history.back()}
        startIcon={<ArrowBackRounded />}>
      </Button>
      <Paper sx={{  width: '100%', }}>
      <DataGrid
        rows={thoughts}
        columns={cols}
        initialState={{ pagination: { paginationModel } }}
        getRowHeight={() => "auto"}
        sx={{
          border: 0,
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal", // Allow wrapping within cells
            wordWrap: "break-word", // Break long words
            lineHeight: 1.5
          },
        }}
      />
      </Paper>
    </div>
  );
}

export default SavedThoughts;