import { downloadDatabase } from "../../utils/alasql";

import DownloadIcon from "../../assets/svg/Download.svg";

function FloatDownloadButton() {
  return (
    <div style={{ position: "absolute", bottom: 50, right: 50 }}>
      <button
        style={{ borderRadius: "20px" }}
        className="btn btn-primary p-2"
        onClick={downloadDatabase}
      >
        <img alt="Baixar Dados" src={DownloadIcon} width={32} />
      </button>
    </div>
  );
}

export default FloatDownloadButton;
