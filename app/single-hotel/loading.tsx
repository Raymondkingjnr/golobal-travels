import {Spinner} from "@/app/components";


export default function Loader(){
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Spinner />
        </div>
    )
}