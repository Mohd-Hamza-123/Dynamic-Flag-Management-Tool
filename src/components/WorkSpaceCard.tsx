import { ChevronRight, FolderIcon } from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"
import Link from "next/link"
import { Workspace } from "@/types/frontend"

const WorkSpaceCard = ({ environment, name, description, _id }: Workspace) => {

    return (
        <Card className="bg-gray-500/10">
            <CardHeader className="flex gap-2 px-4">
                <div className="size-8 flex flex-cntr-all rounded-full bg-gray-500/40">
                    <FolderIcon className="size-5" />
                </div>
                <h4 className="text-lg">{name}</h4>
            </CardHeader>

            <CardContent>
                <p className="text-sm">{description || "No description provided"}</p>
                <p className="mt-4">Environment: {environment}</p>
            </CardContent>

            <CardFooter className="border-0 bg-transparent p-2">
                <Link
                    className="p-2 h-10 w-full flex-cntr-all text-base flex rounded-md bg-gray-500/10 border border-gray-500/10"
                    href={`workspace/${_id}`}>
                    <span>
                        Visit
                    </span>
                    <ChevronRight />
                </Link>
            </CardFooter>

        </Card >
    )

}

export default WorkSpaceCard;
