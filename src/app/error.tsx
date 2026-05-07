import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "4😅4",
}

const GlobalErrorBoundary = () => {

    return (
        <main className="h-dvh flex flex-cntr-all">
            <section className="flex flex-col flex-cntr-all gap-3">
                <div className="inline-flex mx-auto flex-cntr-all gap-4">
                    <svg className="size-24 sm:size-32 aspect-auto inline" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M496 256A240 240 0 1 0 16 256a240 240 0 1 0 480 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm251.8 48h8.4c46.3 0 83.8 37.5 83.8 83.8c0 6.7-5.5 12.2-12.2 12.2H180.2c-6.7 0-12.2-5.5-12.2-12.2c0-46.3 37.5-83.8 83.8-83.8zm8.4 16h-8.4c-36.2 0-65.7 28.3-67.7 64H327.9c-2-35.7-31.5-64-67.7-64zM106.3 138.3c3.1-3.1 8.2-3.1 11.3 0L160 180.7l42.3-42.3c3.1-3.1 8.2-3.1 11.3 0s3.1 8.2 0 11.3L171.3 192l42.3 42.3c3.1 3.1 3.1 8.2 0 11.3s-8.2 3.1-11.3 0L160 203.3l-42.3 42.3c-3.1 3.1-8.2 3.1-11.3 0s-3.1-8.2 0-11.3L148.7 192l-42.3-42.3c-3.1-3.1-3.1-8.2 0-11.3zm192 0c3.1-3.1 8.2-3.1 11.3 0L352 180.7l42.3-42.3c3.1-3.1 8.2-3.1 11.3 0s3.1 8.2 0 11.3L363.3 192l42.3 42.3c3.1 3.1 3.1 8.2 0 11.3s-8.2 3.1-11.3 0L352 203.3l-42.3 42.3c-3.1 3.1-8.2 3.1-11.3 0s-3.1-8.2 0-11.3L340.7 192l-42.3-42.3c-3.1-3.1-3.1-8.2 0-11.3z"></path>
                    </svg>
                </div>
                <h3 className="text-xl text-center">
                    Uh oh! Something went wrong
                </h3>

                <p className="text-zinc-500 sapce-y-2 text-sm text-center">
                    Please refresh the page and try again.
                </p>
            </section>
        </main>
    )

}

export default GlobalErrorBoundary;