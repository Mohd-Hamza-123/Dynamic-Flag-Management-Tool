export const Spinner = () => (
    <div className="size-10 border-4 border-zinc-100 rounded-full border-b-transparent animate-spin"></div>
)

export const FullPageSpinner = () => (
    <div className="fixed z-2 inset-0 bg-black/50 flex flex-cntr-all">
        <Spinner />
    </div>
)