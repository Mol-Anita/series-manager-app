import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { deleteSeriesById } from "@/api/series";

const DeleteButton = ({ seriesId, onDelete }) => { // Destructure props
  const handleClick = (close) => {
    try {
      onDelete(seriesId);
      close();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <Popup
        trigger={<button className="text-sm"> Delete </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal flex flex-col text-center bg-neutral-900 p-8 rounded-3xl">
            <div className="content py-5">
              Are you sure you want to delete this series?
            </div>
            <div className="flex flex-row justify-center gap-6 px-7">
              <button 
                className="rounded-2xl px-4 py-0.5 text-red-500 bg-neutral-700"
                onClick={() => handleClick(close)} // Pass close function
              >
                Delete
              </button>
              <button
                className="rounded-2xl px-4 py-0.5 bg-neutral-700"
                onClick={() => close()} 
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default DeleteButton;
