import { AlertCircleIcon, MapIcon } from "lucide-react";
import Link from "next/link";

const mapButtons = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <div className="flex-1">
        <Link href={"#"}>
          <MapIcon />
        </Link>
      </div>
      <div className="flex-1">
        <Link href={"#"}>
          <AlertCircleIcon />
        </Link>
      </div>
    </div>
  );
};

export default mapButtons;
