export default function MovieDetailLoading() {
    return (
        <div className="min-h-screen py-10 animate-pulse">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0 w-full md:w-80">
                        <div className="aspect-[2/3] w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 shadow-2xl" />
                    </div>

                    <div className="flex-1">
                        <div className="h-5 w-32 rounded bg-zinc-200 dark:bg-zinc-800 mb-4" />
                        <div className="h-12 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-800 mb-2" />
                        <div className="h-6 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800 mb-4" />

                        <div className="flex gap-4 mb-6">
                            <div className="h-5 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="h-5 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
                            <div className="h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                        </div>

                        <div className="flex gap-2 mb-6">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-8 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800"
                                />
                            ))}
                        </div>

                        <div className="mb-6">
                            <div className="h-7 w-28 rounded bg-zinc-200 dark:bg-zinc-800 mb-3" />
                            <div className="space-y-2">
                                <div className="h-5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                                <div className="h-5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                                <div className="h-5 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
                                <div className="h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
