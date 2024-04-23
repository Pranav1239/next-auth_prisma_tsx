import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import Dasboard from "@/components/dashboard/Dasboard";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const Dashbpardlayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-slate-900 flex flex-row ">
            <div className="">
                <Dasboard />
            </div>
            <div className="w-full  mt-14 xl:mt-2 p-5 overflow-hidden">{children}</div>
            <ToastContainer />
        </div>
    );
};

export default Dashbpardlayout;