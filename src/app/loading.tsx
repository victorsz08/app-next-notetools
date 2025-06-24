export default function Loading() {
    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce" />
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]" />
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
            </div>
        </main>
    );
}
