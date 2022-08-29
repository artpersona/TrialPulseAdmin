import { GrFormClose } from "react-icons/gr";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const studyInformationColumns = [
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Body",
    selector: (row) => row.body,
  },
  {
    cell: (row) => (
      <button
        id={row.body}
        onClick={(e) => {
          e.preventDefault();
          MySwal.fire({
            icon: "info",
            title: "Remove Study Information ?",

            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#c73e1d",
            confirm,
          }).then((result) => {
            if (result.isConfirmed) {
              alert("confirmed");
              // removeSponsor(data.id).then(() => {
              //   Swal.fire({
              //     icon: "success",
              //     title: "Sponsor deleted successfully",
              //   });
              // });
            }
          });
        }}
      >
        <GrFormClose size={20} color="red" />
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    name: "Actions",
  },
];

export const adminIssuesColumns = [
  {
    name: "Title",
    selector: (row) => row.name,
  },
  {
    name: "Body",
    selector: (row) => row.body,
  },
  {
    cell: (row) => (
      <button
        id={row.id}
        onClick={(e) => {
          e.preventDefault();
          // router.push({
          //   pathname: `/trial-sites/${row.id}`,
          //   query: { trial_id: id, site_id: row.id },
          // });
          alert("clicked!");
        }}
      >
        <GrFormClose size={20} color="red" />
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    name: "Actions",
  },
];

export const eligibilityCriteriasColumns = [
  {
    name: "Title",
    selector: (row) => row.name,
  },
  {
    name: "Status",
    selector: (row) => {
      if (row.exclusion) {
        return "Excluded";
      } else if (row.inclusion) {
        return "Included";
      } else {
        return "Not Used";
      }
    },
  },
  {
    cell: (row) => (
      <button
        id={row.id}
        onClick={(e) => {
          e.preventDefault();
          // router.push({
          //   pathname: `/trial-sites/${row.id}`,
          //   query: { trial_id: id, site_id: row.id },
          // });
          alert("clicked!");
        }}
      >
        <GrFormClose size={20} color="red" />
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    name: "Actions",
  },
];
