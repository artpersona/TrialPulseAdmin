import styles from "../styles/SponsorItem.module.css";
import { RiEditBoxLine, RiDeleteBin2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSponsorContext } from "../shared/contexts/SponsorsContext";
const MySwal = withReactContent(Swal);

export default function SponsorItem({ onPress, data }) {
  const { removeSponsor } = useSponsorContext();

  const onDelete = () => {
    MySwal.fire({
      icon: "info",
      title: "Delete Sponsor and all of its protocols ?",
      text: "All data within this sponsor will be deleted",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#c73e1d",
      confirm,
    }).then((result) => {
      if (result.isConfirmed) {
        removeSponsor(data.id).then(() => {
          Swal.fire({
            icon: "success",
            title: "Sponsor deleted successfully",
          });
        });
      }
    });
  };

  return (
    <div className={styles.item__container}>
      <h7 className={styles.centered__text}>{data?.name}</h7>

      <div className={styles.buttons__container}>
        <button className={styles.buttonEdit} onClick={onPress}>
          <RiEditBoxLine size={25} color={"white"} />
        </button>
        <button className={styles.buttonDelete} onClick={onDelete}>
          <RiDeleteBin2Fill size={25} color={"white"} />
        </button>
      </div>
    </div>
  );
}
