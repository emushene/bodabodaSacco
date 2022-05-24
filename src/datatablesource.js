export const userColumns = [
  { field: "id",
   headerName: "ID", 
   width: 70 
  },
   { field: "ridername",
   headerName: "Full Name", 
   width: 150
   },
  {
    field: "user",
    headerName: "Photo",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="rider" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "county",
    headerName: "County",
    width: 100,
  },

  {
    field: "ridercell",
    headerName: "Phone No.",
    width: 100,
  },
  {
    field: "bikeowner",
    headerName: "Bike Owner",
    width: 100,
  },
  {
    field: "bikeregnumber",
    headerName: "Bike Reg NO.",
    width: 100,
  },
  {
    field: "bikecolor",
    headerName: "Bike Color",
    width: 100,
  },
  {
    field: "riderlocation",
    headerName: "Bike Location",
    width: 100,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];
