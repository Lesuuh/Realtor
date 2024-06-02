import spinner from "../assets/spinner.svg";
function Spinner() {
  return (
    <div className="bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
      <div className="w-20 h-20">
        <img src={spinner} alt="spinner-preloader" />
      </div>
    </div>
  );
}

export default Spinner;
