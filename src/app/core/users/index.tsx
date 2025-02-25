import { Toaster } from "react-hot-toast";
import UserPage from "./presentation/UserPage";
import "../../../index.css";

const UserMicroFrontEnd = () => {
    return (
        <div className="w-full h-full flex flex-col my-5">
            <div className="mt-10 text-3xl mx-auto">
                <Toaster position="bottom-center"
                    reverseOrder={false} />
                <UserPage />
            </div>
        </div>
    );
};

export default UserMicroFrontEnd;
